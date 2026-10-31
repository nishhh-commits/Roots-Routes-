import type { HotelProfile, MonthlyUsage } from '../types/hotel'

export const hotelProfile: HotelProfile = {
  name: 'Demo Heritage Hotel',
  rooms: 40,
  city: 'Udaipur',
  isDemo: true,
}

export const usageUnits = {
  water: 'kL',
  energy: 'kWh',
  waste: 'kg',
}

export const monthlyUsage: MonthlyUsage[] = [
  { month: 'May', water: 520, energy: 9800, waste: 860 },
  { month: 'Jun', water: 540, energy: 10400, waste: 880 },
  { month: 'Jul', water: 480, energy: 9100, waste: 820 },
  { month: 'Aug', water: 470, energy: 8900, waste: 800 },
  { month: 'Sep', water: 450, energy: 8700, waste: 780 },
  { month: 'Oct', water: 430, energy: 8400, waste: 740 },
]
