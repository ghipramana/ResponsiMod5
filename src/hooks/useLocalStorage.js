import { useEffect, useState } from 'react'

// State yang otomatis tersimpan di localStorage (aman untuk mode privat / quota penuh).
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw !== null) return JSON.parse(raw)
    } catch {
      /* data rusak -> pakai nilai awal */
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* quota penuh -> abaikan */
    }
  }, [key, value])

  return [value, setValue]
}
