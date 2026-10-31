export type City = {
  id: string
  name: string
  state: string
  status: 'pilot' | 'planned'
}

export const cities: City[] = [
  { id: 'udaipur', name: 'Udaipur', state: 'Rajasthan', status: 'pilot' },
  { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', status: 'planned' },
  { id: 'jodhpur', name: 'Jodhpur', state: 'Rajasthan', status: 'planned' },
]