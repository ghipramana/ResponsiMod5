import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { SEED_PRODUCTS } from '../data/seedProducts'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [products, setProducts] = useLocalStorage('brewspace_products', SEED_PRODUCTS)
  const [cart, setCart] = useLocalStorage('brewspace_cart', []) // [{ id, qty }]
  const [toast, setToast] = useState(null)
  const timer = useRef(null)

  const notify = useCallback((message, type = 'success') => {
    clearTimeout(timer.current)
    setToast({ message, type })
    timer.current = setTimeout(() => setToast(null), 2600)
  }, [])

  // ---------- CRUD produk ----------
  const addProduct = (data) => {
    const item = { ...data, id: `p${Date.now()}` }
    setProducts((prev) => [item, ...prev])
    notify('Produk berhasil ditambahkan')
  }

  const updateProduct = (id, data) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data, id } : p)))
    // jaga agar qty di keranjang tidak melebihi stok baru
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, qty: Math.min(c.qty, Number(data.stock)) } : c))
        .filter((c) => c.qty > 0),
    )
    notify('Produk berhasil diperbarui')
  }

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
    setCart((prev) => prev.filter((c) => c.id !== id))
    notify('Produk dihapus')
  }

  const resetProducts = () => {
    setProducts(SEED_PRODUCTS)
    setCart([])
    notify('Data dikembalikan ke awal')
  }

  // ---------- Keranjang ----------
  const addToCart = (id) => {
    const product = products.find((p) => p.id === id)
    if (!product || product.stock <= 0) return notify('Stok habis', 'error')
    const existing = cart.find((c) => c.id === id)
    if (existing && existing.qty >= product.stock) return notify('Jumlah sudah mencapai stok', 'error')
    setCart(existing ? cart.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c)) : [...cart, { id, qty: 1 }])
    notify(`${product.name} ditambahkan ke keranjang`)
  }

  const changeQty = (id, delta) => {
    const product = products.find((p) => p.id === id)
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, qty: Math.min(c.qty + delta, product?.stock ?? c.qty) } : c))
        .filter((c) => c.qty > 0),
    )
  }

  const removeFromCart = (id) => setCart((prev) => prev.filter((c) => c.id !== id))

  const checkout = () => {
    // kurangi stok sesuai pesanan, lalu kosongkan keranjang
    setProducts((prev) =>
      prev.map((p) => {
        const item = cart.find((c) => c.id === p.id)
        return item ? { ...p, stock: Math.max(0, p.stock - item.qty) } : p
      }),
    )
    setCart([])
  }

  const cartItems = useMemo(
    () => cart.map((c) => ({ ...c, product: products.find((p) => p.id === c.id) })).filter((c) => c.product),
    [cart, products],
  )
  const cartCount = cartItems.reduce((sum, c) => sum + c.qty, 0)
  const cartTotal = cartItems.reduce((sum, c) => sum + c.qty * c.product.price, 0)

  const value = {
    products, addProduct, updateProduct, deleteProduct, resetProducts,
    cartItems, cartCount, cartTotal, addToCart, changeQty, removeFromCart, checkout,
    toast, notify,
  }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore harus dipakai di dalam StoreProvider')
  return ctx
}
