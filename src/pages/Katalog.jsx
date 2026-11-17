import { useMemo, useState } from 'react'
import { Search, PackageOpen } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/StoreContext'

const SORTS = {
  terbaru: 'Urutan awal',
  murah: 'Harga terendah',
  mahal: 'Harga tertinggi',
  nama: 'Nama A-Z',
}

export default function Katalog() {
  const { products, addToCart } = useStore()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('Semua')
  const [sort, setSort] = useState('terbaru')

  const categories = useMemo(() => ['Semua', ...new Set(products.map((p) => p.category))], [products])

  const list = useMemo(() => {
    const term = q.trim().toLowerCase()
    const res = products.filter(
      (p) =>
        (cat === 'Semua' || p.category === cat) &&
        (!term || `${p.name} ${p.origin} ${p.description}`.toLowerCase().includes(term)),
    )
    if (sort === 'murah') res.sort((a, b) => a.price - b.price)
    if (sort === 'mahal') res.sort((a, b) => b.price - a.price)
    if (sort === 'nama') res.sort((a, b) => a.name.localeCompare(b.name))
    return res
  }, [products, q, cat, sort])

  return (
    <section>
      <div className="mb-6 rounded-2xl bg-espresso p-6 text-cream sm:p-8">
        <p className="text-sm font-medium text-caramel">Marketplace kopi</p>
        <h1 className="mt-1 text-2xl font-extrabold leading-tight sm:text-4xl">Biji kopi pilihan, langsung dari petani.</h1>
        <p className="mt-2 max-w-xl text-sm text-cream/75">Jelajahi kopi Arabika, Robusta, dan blend dari berbagai daerah Indonesia.</p>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-roast/60" />
          <input className="input !pl-9" type="search" placeholder="Cari kopi atau daerah..." value={q} onChange={(e) => setQ(e.target.value)} aria-label="Cari produk" />
        </div>
        <select className="input sm:!w-48" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Urutkan">
          {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              cat === c ? 'border-espresso bg-espresso text-white' : 'border-latte bg-white text-roast hover:border-roast'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="grid place-items-center rounded-2xl border border-dashed border-latte bg-white py-16 text-center text-roast">
          <PackageOpen size={36} />
          <p className="mt-2 font-medium">Produk tidak ditemukan</p>
          <p className="text-sm">Coba kata kunci atau kategori lain.</p>
        </div>
      ) : (
        <>
          <p className="mb-3 text-sm text-roast">{list.length} produk</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => <ProductCard key={p.id} product={p} onAdd={addToCart} />)}
          </div>
        </>
      )}
    </section>
  )
}
