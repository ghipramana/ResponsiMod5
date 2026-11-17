import { useState } from 'react'
import { Minus, Plus, Trash2, ShoppingBag, PartyPopper } from 'lucide-react'
import ProductVisual from '../components/ProductVisual'
import { useStore } from '../context/StoreContext'
import { rupiah } from '../utils/format'

export default function Keranjang({ onNavigate }) {
  const { cartItems, cartTotal, cartCount, changeQty, removeFromCart, checkout } = useStore()
  const [done, setDone] = useState(null)

  const handleCheckout = () => {
    setDone({ total: cartTotal, count: cartCount })
    checkout()
  }

  if (done)
    return (
      <section className="grid place-items-center rounded-2xl border border-latte bg-white px-6 py-16 text-center">
        <PartyPopper size={44} className="text-caramel" />
        <h1 className="mt-3 text-2xl font-extrabold">Pesanan berhasil!</h1>
        <p className="mt-1 text-roast">{done.count} item &middot; total {rupiah(done.total)}</p>
        <p className="mt-1 text-sm text-roast/80">Terima kasih sudah berbelanja di BrewSpace.</p>
        <button className="btn btn-primary mt-6" onClick={() => { setDone(null); onNavigate('katalog') }}>Belanja lagi</button>
      </section>
    )

  if (cartItems.length === 0)
    return (
      <section className="grid place-items-center rounded-2xl border border-dashed border-latte bg-white px-6 py-16 text-center text-roast">
        <ShoppingBag size={40} />
        <h1 className="mt-3 text-xl font-bold text-espresso">Keranjang masih kosong</h1>
        <p className="text-sm">Yuk pilih kopi favoritmu dulu.</p>
        <button className="btn btn-primary mt-5" onClick={() => onNavigate('katalog')}>Lihat Katalog</button>
      </section>
    )

  return (
    <section>
      <h1 className="mb-4 text-2xl font-extrabold">Keranjang</h1>
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <ul className="space-y-3">
          {cartItems.map(({ product, qty }) => (
            <li key={product.id} className="flex gap-3 rounded-2xl border border-latte bg-white p-3">
              <ProductVisual roast={product.roast} className="h-20 w-20 shrink-0 rounded-xl" />
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="truncate font-bold">{product.name}</h3>
                    <p className="text-xs text-roast">{product.category} &middot; {product.roast} &middot; {product.weight} g</p>
                  </div>
                  <button onClick={() => removeFromCart(product.id)} aria-label={`Hapus ${product.name}`} className="text-roast/60 hover:text-[#b3261e]">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex items-center rounded-lg border border-latte">
                    <button className="px-2.5 py-1.5" onClick={() => changeQty(product.id, -1)} aria-label="Kurangi"><Minus size={14} /></button>
                    <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                    <button className="px-2.5 py-1.5 disabled:opacity-30" disabled={qty >= product.stock} onClick={() => changeQty(product.id, 1)} aria-label="Tambah"><Plus size={14} /></button>
                  </div>
                  <p className="font-bold">{rupiah(product.price * qty)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-latte bg-white p-5">
          <h2 className="font-bold">Ringkasan</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-roast">Jumlah item</dt><dd>{cartCount}</dd></div>
            <div className="flex justify-between border-t border-latte pt-2 text-base font-bold"><dt>Total</dt><dd>{rupiah(cartTotal)}</dd></div>
          </dl>
          <button className="btn btn-primary mt-4 w-full" onClick={handleCheckout}>Checkout</button>
        </aside>
      </div>
    </section>
  )
}
