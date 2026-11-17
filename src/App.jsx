import { useEffect, useState } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import Header from './components/Header.jsx'
import PWABadge from './components/PWABadge.jsx'
import Katalog from './pages/Katalog.jsx'
import Keranjang from './pages/Keranjang.jsx'
import Kelola from './pages/Kelola.jsx'
import Profil from './pages/Profil.jsx'
import { useStore } from './context/StoreContext.jsx'

const PAGES = ['katalog', 'keranjang', 'kelola', 'profil']
const readHash = () => {
  const h = window.location.hash.replace(/^#\/?/, '')
  return PAGES.includes(h) ? h : 'katalog'
}

export default function App() {
  const [page, setPage] = useState(readHash)
  const { toast } = useStore()

  // Navigasi sederhana berbasis hash: tombol back browser tetap jalan & refresh tidak kehilangan halaman
  useEffect(() => {
    const onHash = () => {
      setPage(readHash())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const navigate = (p) => {
    window.location.hash = `/${p}`
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header page={page} onNavigate={navigate} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-28 pt-6 sm:pb-10">
        {page === 'katalog' && <Katalog />}
        {page === 'keranjang' && <Keranjang onNavigate={navigate} />}
        {page === 'kelola' && <Kelola />}
        {page === 'profil' && <Profil />}
      </main>
      <footer className="hidden border-t border-latte py-5 text-center text-sm text-roast sm:block">
        BrewSpace &copy; 2026 - Marketplace Kopi
      </footer>

      {toast && (
        <div
          role="status"
          className={`fixed left-1/2 top-16 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white shadow-lg ${
            toast.type === 'error' ? 'bg-[#b3261e]' : 'bg-espresso'
          }`}
        >
          {toast.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
          {toast.message}
        </div>
      )}
      <PWABadge />
    </div>
  )
}
