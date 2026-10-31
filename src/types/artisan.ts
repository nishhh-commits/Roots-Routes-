export type Artisan = {
  id: string
  name: string
  craft: string
  category: 'Painting' | 'Textile' | 'Puppetry' | 'Metalwork'
  neighborhood: string
  story: string
  workshopPrice: number
  workshopDuration: string
  contact: string
  isDemo: boolean
}