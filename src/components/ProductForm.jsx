import { useState } from 'react'
import { X } from 'lucide-react'
import { CATEGORIES, ROASTS } from '../utils/format'

function Field({ label, error, children }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <div className="mt-1">{children}</div>
      {error && <span className="mt-1 block text-xs text-[#b3261e]">{error}</span>}
    </label>
  )
}

const EMPTY = { name: '', category: 'Arabika', roast: 'Medium', origin: '', price: '', stock: '', weight: 250, description: '' }

// Form tambah / edit produk (dipakai oleh halaman Kelola Produk).
export default function ProductForm({ initial, onSubmit, onClose }) {
  const [form, setForm] = useState(initial ? { ...initial } : EMPTY)
  const [errors, setErrors] = useState({})
  const editing = Boolean(initial)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (form.name.trim().length < 3) e.name = 'Nama minimal 3 karakter'
    if (!form.origin.trim()) e.origin = 'Asal kopi wajib diisi'
    if (!(Number(form.price) > 0)) e.price = 'Harga harus lebih dari 0'
    if (!Number.isInteger(Number(form.stock)) || Number(form.stock) < 0 || form.stock === '') e.stock = 'Stok harus bilangan bulat >= 0'
    if (!(Number(form.weight) > 0)) e.weight = 'Berat harus lebih dari 0'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (ev) => {
    ev.preventDefault()
    if (!validate()) return
    onSubmit({
      name: form.name.trim(),
      category: form.category,
      roast: form.roast,
      origin: form.origin.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      weight: Number(form.weight),
      description: form.description.trim(),
    })
  }

  return (
    <div className="fixed inset-0 z-[65] flex items-end justify-center bg-espresso/60 sm:items-center sm:p-4" onClick={onClose}>
      <form
        onSubmit={submit}
        noValidate
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-cream p-5 shadow-2xl sm:rounded-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{editing ? 'Edit Produk' : 'Tambah Produk'}</h2>
          <button type="button" onClick={onClose} aria-label="Tutup"><X /></button>
        </div>

        <div className="space-y-3">
          <Field label="Nama produk" error={errors.name}>
            <input className="input" value={form.name} onChange={set('name')} placeholder="mis. Gayo Aceh Natural" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Jenis" error={errors.category}>
              <select className="input" value={form.category} onChange={set('category')}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Tingkat sangrai" error={errors.roast}>
              <select className="input" value={form.roast} onChange={set('roast')}>
                {ROASTS.map((r) => <option key={r}>{r}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Asal" error={errors.origin}>
            <input className="input" value={form.origin} onChange={set('origin')} placeholder="mis. Toraja, Sulawesi" />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Harga (Rp)" error={errors.price}>
              <input className="input" type="number" inputMode="numeric" min="0" value={form.price} onChange={set('price')} />
            </Field>
            <Field label="Stok" error={errors.stock}>
              <input className="input" type="number" inputMode="numeric" min="0" value={form.stock} onChange={set('stock')} />
            </Field>
            <Field label="Berat (g)" error={errors.weight}>
              <input className="input" type="number" inputMode="numeric" min="0" value={form.weight} onChange={set('weight')} />
            </Field>
          </div>
          <Field label="Deskripsi" error={errors.description}>
            <textarea className="input" rows={3} value={form.description} onChange={set('description')} placeholder="Cita rasa, aroma, cocok untuk..." />
          </Field>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Batal</button>
          <button type="submit" className="btn btn-primary">{editing ? 'Simpan Perubahan' : 'Tambah Produk'}</button>
        </div>
      </form>
    </div>
  )
}
