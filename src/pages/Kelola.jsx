import { useState } from 'react'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import ProductForm from '../components/ProductForm'
import ConfirmModal from '../components/ConfirmModal'
import ProductVisual from '../components/ProductVisual'
import { useStore } from '../context/StoreContext'
import { rupiah } from '../utils/format'

// Halaman CRUD: Create (tambah), Read (daftar + cari), Update (edit), Delete (hapus).
export default function Kelola() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore()
  const [q, setQ] = useState('')
  const [formState, setFormState] = useState(null) // null | { product?: obj }
  const [toDelete, setToDelete] = useState(null)

  const term = q.trim().toLowerCase()
  const list = products.filter((p) => !term || `${p.name} ${p.origin} ${p.category}`.toLowerCase().includes(term))

  const handleSubmit = (data) => {
    if (formState.product) updateProduct(formState.product.id, data)
    else addProduct(data)
    setFormState(null)
  }

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">Kelola Produk</h1>
          <p className="text-sm text-roast">Tambah, ubah, dan hapus produk kopi di tokomu.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setFormState({})}><Plus size={16} /> Tambah Produk</button>
      </div>

      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-roast/60" />
        <input className="input !pl-9" type="search" placeholder="Cari produk..." value={q} onChange={(e) => setQ(e.target.value)} aria-label="Cari produk" />
      </div>

      {list.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-latte bg-white py-12 text-center text-roast">
          {products.length === 0 ? 'Belum ada produk. Klik "Tambah Produk" untuk mulai.' : 'Tidak ada produk yang cocok.'}
        </p>
      ) : (
        <ul className="space-y-3">
          {list.map((p) => (
            <li key={p.id} className="flex items-center gap-3 rounded-2xl border border-latte bg-white p-3">
              <ProductVisual roast={p.roast} className="h-14 w-14 shrink-0 rounded-xl" />
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-bold">{p.name}</h3>
                <p className="truncate text-xs text-roast">{p.category} &middot; {p.roast} &middot; {p.origin}</p>
                <p className="mt-0.5 text-sm">
                  <span className="font-semibold">{rupiah(p.price)}</span>
                  <span className={`ml-2 text-xs ${p.stock <= 0 ? 'font-semibold text-[#b3261e]' : 'text-roast'}`}>
                    {p.stock <= 0 ? 'Stok habis' : `Stok ${p.stock}`}
                  </span>
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button className="btn btn-ghost !px-2.5" onClick={() => setFormState({ product: p })} aria-label={`Edit ${p.name}`}><Pencil size={16} /></button>
                <button className="btn btn-ghost !px-2.5 text-[#b3261e]" onClick={() => setToDelete(p)} aria-label={`Hapus ${p.name}`}><Trash2 size={16} /></button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {formState && (
        <ProductForm initial={formState.product} onSubmit={handleSubmit} onClose={() => setFormState(null)} />
      )}

      <ConfirmModal
        open={Boolean(toDelete)}
        danger
        title="Hapus produk?"
        message={`"${toDelete?.name}" akan dihapus permanen dari katalog dan keranjang.`}
        confirmLabel="Hapus"
        onConfirm={() => { deleteProduct(toDelete.id); setToDelete(null) }}
        onCancel={() => setToDelete(null)}
      />
    </section>
  )
}
