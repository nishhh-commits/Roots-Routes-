export type Interest =
  | 'Heritage'
  | 'Culture'
  | 'Food'
  | 'Nature'
  | 'Shopping'
  | 'Photography'
  | 'Relaxation'

export type Destination = {
  id: string
  name: string
  area: string
  interests: Interest[]
  entryCost: number
  visitMinutes: number
  typicalCrowd: 1 | 2 | 3
  lat: number
  lng: number
}