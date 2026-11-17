import { useEffect, useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { Download, WifiOff, RefreshCw, X } from 'lucide-react'

// Menangani: banner offline, tombol install, dan notifikasi update service worker.
export default function PWABadge() {
  const [installEvent, setInstallEvent] = useState(null)
  const [offline, setOffline] = useState(!navigator.onLine)
  const [hideInstall, setHideInstall] = useState(false)

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW()

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault()
      setInstallEvent(e)
    }
    const onInstalled = () => setInstallEvent(null)
    const on = () => setOffline(false)
    const off = () => setOffline(true)
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])

  // pesan "siap offline" hilang sendiri
  useEffect(() => {
    if (!offlineReady) return
    const t = setTimeout(() => setOfflineReady(false), 4000)
    return () => clearTimeout(t)
  }, [offlineReady, setOfflineReady])

  const install = async () => {
    if (!installEvent) return
    installEvent.prompt()
    await installEvent.userChoice
    setInstallEvent(null)
  }

  const box =
    'fixed inset-x-3 bottom-20 z-50 mx-auto flex max-w-md items-center gap-3 rounded-xl border border-latte bg-white p-3 text-sm shadow-xl sm:bottom-5 sm:right-5 sm:left-auto sm:mx-0'

  if (needRefresh)
    return (
      <aside className={box} role="alert">
        <RefreshCw size={18} className="shrink-0 text-caramel" />
        <span className="flex-1">Versi baru tersedia.</span>
        <button className="btn btn-primary !py-1.5" onClick={() => updateServiceWorker(true)}>Muat ulang</button>
        <button aria-label="Tutup" onClick={() => setNeedRefresh(false)}><X size={16} /></button>
      </aside>
    )

  if (offline)
    return (
      <aside className={`${box} !border-caramel`} role="status">
        <WifiOff size={18} className="shrink-0 text-caramel" />
        <span>Mode offline. Data tersimpan di perangkat dan tetap bisa dipakai.</span>
      </aside>
    )

  if (offlineReady)
    return (
      <aside className={box} role="status">
        <Download size={18} className="shrink-0 text-caramel" />
        <span className="flex-1">Aplikasi siap dipakai offline.</span>
        <button aria-label="Tutup" onClick={() => setOfflineReady(false)}><X size={16} /></button>
      </aside>
    )

  if (installEvent && !hideInstall)
    return (
      <aside className={box} role="region" aria-label="Pasang aplikasi">
        <Download size={18} className="shrink-0 text-caramel" />
        <span className="flex-1">Pasang <b>BrewSpace</b> di perangkatmu.</span>
        <button className="btn btn-primary !py-1.5" onClick={install}>Install</button>
        <button aria-label="Tutup" onClick={() => setHideInstall(true)}><X size={16} /></button>
      </aside>
    )

  return null
}
