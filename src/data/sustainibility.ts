import type { Breakdown, Indicator } from '../types/sustainability'

export const indicators: Indicator[] = [
  { id: 'i1', label: 'Renewable energy share', value: 28, unit: '%', target: 40, higherIsBetter: true },
  { id: 'i2', label: 'Waste recycled', value: 46, unit: '%', target: 60, higherIsBetter: true },
  { id: 'i3', label: 'Water per occupied room night', value: 210, unit: 'L', target: 180, higherIsBetter: false },
  { id: 'i4', label: 'Guests opting in to towel reuse', value: 62, unit: '%', target: 75, higherIsBetter: true },
]

export const breakdowns: Breakdown[] = [
  {
    key: 'water',
    title: 'Water use by area',
    unit: 'kL',
    color: '#1e8f7b',
    items: [
      { name: 'Guest rooms', value: 200 },
      { name: 'Kitchen', value: 85 },
      { name: 'Laundry', value: 75 },
      { name: 'Garden', value: 45 },
      { name: 'Pool', value: 25 },
    ],
  },
  {
    key: 'energy',
    title: 'Energy use by area',
    unit: 'kWh',
    color: '#b8794a',
    items: [
      { name: 'Cooling', value: 3400 },
      { name: 'Kitchen', value: 1700 },
      { name: 'Lighting', value: 1500 },
      { name: 'Laundry', value: 900 },
      { name: 'Other', value: 900 },
    ],
  },
  {
    key: 'waste',
    title: 'Waste by type',
    unit: 'kg',
    color: '#5b3590',
    items: [
      { name: 'Food', value: 320 },
      { name: 'Paper and packaging', value: 160 },
      { name: 'Plastic', value: 110 },
      { name: 'Glass', value: 70 },
      { name: 'Other', value: 80 },
    ],
  },
]

