export const rupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(n) || 0)

export const ROASTS = ['Light', 'Medium', 'Dark']
export const CATEGORIES = ['Arabika', 'Robusta', 'Blend']

export const ROAST_COLOR = {
  Light: ['#e2b47c', '#c68642'],
  Medium: ['#b07a4a', '#7a4a29'],
  Dark: ['#5a3623', '#2b1a12'],
}
