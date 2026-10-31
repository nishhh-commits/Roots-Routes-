export type Interest =
  | 'Heritage'
  | 'Culture'
  | 'Food'
  | 'Nature'
  | 'Shopping'
  | 'Photography'
  | 'Relaxation'
  | 'Local art'

export type Destination = {
  id: string
  cityId: string
  name: string
  area: string
  interests: Interest[]
  entryCost: number
  visitMinutes: number
  typicalCrowd: 1 | 2 | 3
  lat: number
  lng: number
  famous?: boolean
  local?: boolean
  artisanId?: string
}