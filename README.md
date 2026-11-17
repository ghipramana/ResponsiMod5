# BrewSpace - Marketplace Kopi (PWA)

Aplikasi PWA marketplace kopi. Dibuat dengan React + Vite + vite-plugin-pwa + Tailwind CSS + lucide-react.

## Fitur
- 4 halaman: Katalog, Keranjang, Kelola Produk (CRUD), Profil
- CRUD produk (tambah, lihat/cari, edit, hapus) dengan validasi form
- Keranjang + checkout (stok berkurang otomatis)
- Data tersimpan di localStorage, jadi tetap jalan saat offline
- Installable + offline (service worker dari vite-plugin-pwa)

## Menjalankan
```bash
npm install
npm run dev        # mode pengembangan
npm run build      # build produksi
npm run preview    # tes hasil build (PWA/offline hanya aktif di build)
```

## Ganti NIM
Edit `src/config/profile.js`, ubah nilai `nim`.

## Deploy ke Vercel
1. Push ke repository GitHub baru
2. Import repository di vercel.com (preset Vite terdeteksi otomatis, build `npm run build`, output `dist`)
3. Kumpulkan link `.vercel.app` yang diberikan
