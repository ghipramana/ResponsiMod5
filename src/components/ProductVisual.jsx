import { Coffee } from 'lucide-react'
import { ROAST_COLOR } from '../utils/format'

// Gambar produk berupa gradasi sesuai tingkat sangrai (tidak butuh internet).
export default function ProductVisual({ roast, className = '' }) {
  const [from, to] = ROAST_COLOR[roast] || ROAST_COLOR.Medium
  return (
    <div
      className={`grid place-items-center text-white/90 ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      aria-hidden="true"
    >
      <Coffee size={40} strokeWidth={1.5} />
    </div>
  )
}
