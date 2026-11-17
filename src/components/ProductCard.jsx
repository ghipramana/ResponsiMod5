import { Plus } from 'lucide-react'
import ProductVisual from './ProductVisual'
import { rupiah } from '../utils/format'

export default function ProductCard({ product, onAdd }) {
  const soldOut = product.stock <= 0
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-latte bg-white shadow-sm">
      <div className="relative">
        <ProductVisual roast={product.roast} className="h-32 w-full" />
        <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold">{product.category}</span>
        <span className="absolute right-2 top-2 rounded-full bg-espresso/80 px-2 py-0.5 text-xs font-medium text-white">{product.roast} roast</span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-bold leading-tight">{product.name}</h3>
        <p className="mt-0.5 text-xs text-roast">{product.origin} &middot; {product.weight} g</p>
        {product.description && <p className="mt-2 line-clamp-2 text-sm text-roast/90">{product.description}</p>}
        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div>
            <p className="text-lg font-bold">{rupiah(product.price)}</p>
            <p className={`text-xs ${soldOut ? 'font-semibold text-[#b3261e]' : 'text-roast'}`}>
              {soldOut ? 'Stok habis' : `Stok ${product.stock}`}
            </p>
          </div>
          <button className="btn btn-primary" disabled={soldOut} onClick={() => onAdd(product.id)} aria-label={`Tambah ${product.name} ke keranjang`}>
            <Plus size={16} /> Keranjang
          </button>
        </div>
      </div>
    </article>
  )
}
