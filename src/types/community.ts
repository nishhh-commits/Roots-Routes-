export type PlaceStatus = 'pending' | 'approved' | 'rejected'

export type CommunityPlace = {
  id: string
  name: string
  description: string
  category: 'Heritage' | 'Nature' | 'Food' | 'Craft' | 'Viewpoint'
  location: string
  submittedBy: string
  submittedOn: string
  status: PlaceStatus
  isDemo: boolean
}