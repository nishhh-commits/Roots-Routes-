export type Experience = {
  id: string
  title: string
  kind: 'Workshop' | 'Cultural walk' | 'Food experience'
  duration: string
  price: number
  description: string
  isDemo: boolean
}