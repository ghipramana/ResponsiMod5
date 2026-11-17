import { useState } from 'react'
import { Coffee, IdCard, Users, GraduationCap, RotateCcw } from 'lucide-react'
import ConfirmModal from '../components/ConfirmModal'
import { useStore } from '../context/StoreContext'
import { PROFILE } from '../config/profile'

export default function Profil() {
  const { products, cartCount, resetProducts } = useStore()
  const [confirm, setConfirm] = useState(false)

  const rows = [
    { icon: IdCard, label: 'NIM', value: PROFILE.nim },
    { icon: Users, label: 'Kelompok', value: PROFILE.kelompok },
    { icon: GraduationCap, label: 'Mata Kuliah', value: PROFILE.mataKuliah },
    { icon: Coffee, label: 'Proyek', value: PROFILE.proyek },
  ]

  return (
    <section className="mx-auto max-w-xl">
      <div className="overflow-hidden rounded-2xl border border-latte bg-white">
        <div className="flex items-center gap-4 bg-espresso p-6 text-cream">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-caramel text-2xl font-extrabold text-espresso">
            {PROFILE.nama.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wider text-caramel">Profil Mahasiswa</p>
            <h1 className="text-xl font-extrabold leading-tight">{PROFILE.nama}</h1>
          </div>
        </div>

        <dl className="divide-y divide-latte">
          {rows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3 px-6 py-3.5">
              <Icon size={18} className="mt-0.5 shrink-0 text-caramel" />
              <dt className="w-28 shrink-0 text-sm text-roast">{label}</dt>
              <dd className="min-w-0 flex-1 text-sm font-semibold">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="grid grid-cols-2 gap-px border-t border-latte bg-latte text-center">
          <div className="bg-white py-4"><p className="text-2xl font-extrabold">{products.length}</p><p className="text-xs text-roast">Produk di katalog</p></div>
          <div className="bg-white py-4"><p className="text-2xl font-extrabold">{cartCount}</p><p className="text-xs text-roast">Item di keranjang</p></div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-latte bg-white p-5">
        <h2 className="font-bold">Data aplikasi</h2>
        <p className="mt-1 text-sm text-roast">Semua data tersimpan di perangkat ini (localStorage) sehingga tetap ada saat offline.</p>
        <button className="btn btn-ghost mt-3" onClick={() => setConfirm(true)}><RotateCcw size={16} /> Reset data contoh</button>
      </div>

      <ConfirmModal
        open={confirm}
        danger
        title="Reset data?"
        message="Semua produk akan dikembalikan ke data awal dan keranjang dikosongkan."
        confirmLabel="Reset"
        onConfirm={() => { resetProducts(); setConfirm(false) }}
        onCancel={() => setConfirm(false)}
      />
    </section>
  )
}
