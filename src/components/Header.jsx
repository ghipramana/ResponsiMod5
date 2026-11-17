import { Coffee, ShoppingCart, Package, User } from 'lucide-react'
import { useStore } from '../context/StoreContext'

const NAV = [
  { id: 'katalog', label: 'Katalog', icon: Coffee },
  { id: 'keranjang', label: 'Keranjang', icon: ShoppingCart },
  { id: 'kelola', label: 'Kelola Produk', short: 'Kelola', icon: Package },
  { id: 'profil', label: 'Profil', icon: User },
]

export default function Header({ page, onNavigate }) {
  const { cartCount } = useStore()

  const Badge = ({ id }) =>
    id === 'keranjang' && cartCount > 0 ? (
      <span className="ml-1 rounded-full bg-caramel px-1.5 text-[11px] font-bold leading-5 text-white">{cartCount}</span>
    ) : null

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-espresso text-cream">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <button onClick={() => onNavigate('katalog')} className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-caramel text-espresso">
              <Coffee size={18} />
            </span>
            BrewSpace
          </button>
          <nav className="hidden gap-1 sm:flex" aria-label="Navigasi utama">
            {NAV.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                aria-current={page === id ? 'page' : undefined}
                className={`flex items-center rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  page === id ? 'bg-white/15 text-white' : 'text-cream/70 hover:text-white'
                }`}
              >
                {label}
                <Badge id={id} />
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Navigasi bawah untuk layar HP */}
      <nav
        aria-label="Navigasi utama"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-latte bg-white pb-[env(safe-area-inset-bottom)] sm:hidden"
      >
        {NAV.map(({ id, label, short, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            aria-current={page === id ? 'page' : undefined}
            className={`relative flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium ${
              page === id ? 'text-espresso' : 'text-roast/60'
            }`}
          >
            <span className="relative">
              <Icon size={21} strokeWidth={page === id ? 2.4 : 1.8} />
              {id === 'keranjang' && cartCount > 0 && (
                <span className="absolute -right-2.5 -top-1.5 rounded-full bg-caramel px-1 text-[10px] font-bold leading-4 text-white">
                  {cartCount}
                </span>
              )}
            </span>
            {short || label}
            {page === id && <span className="absolute top-0 h-0.5 w-8 rounded-full bg-caramel" />}
          </button>
        ))}
      </nav>
    </>
  )
}
