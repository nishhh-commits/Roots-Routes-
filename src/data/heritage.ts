import type { CrowdReport } from '../types/crowd'

export const crowdReports: CrowdReport[] = [
  { destinationId: 'city-palace', name: 'City Palace', area: 'Old City', level: 'High', minutesAgo: 12, reports: 14, confidence: 'High', alternativeIds: ['bagore-ki-haveli', 'ahar-cenotaphs'] },
  { destinationId: 'jagdish-temple', name: 'Jagdish Temple', area: 'Old City', level: 'Moderate', minutesAgo: 35, reports: 6, confidence: 'Medium', alternativeIds: ['bagore-ki-haveli'] },
  { destinationId: 'lake-pichola', name: 'Lake Pichola boat ride', area: 'Old City', level: 'High', minutesAgo: 20, reports: 9, confidence: 'High', alternativeIds: ['fateh-sagar', 'saheliyon-ki-bari'] },
  { destinationId: 'saheliyon-ki-bari', name: 'Saheliyon-ki-Bari', area: 'North Udaipur', level: 'Low', minutesAgo: 95, reports: 4, confidence: 'Medium', alternativeIds: [] },
  { destinationId: 'sajjangarh', name: 'Sajjangarh (Monsoon Palace)', area: 'West Udaipur', level: 'Low', minutesAgo: 240, reports: 2, confidence: 'Low', alternativeIds: [] },
  { destinationId: 'fateh-sagar', name: 'Fateh Sagar Lake', area: 'North Udaipur', level: 'Moderate', minutesAgo: 50, reports: 7, confidence: 'Medium', alternativeIds: ['saheliyon-ki-bari', 'sajjangarh'] },
  { destinationId: 'bagore-ki-haveli', name: 'Bagore ki Haveli', area: 'Old City', level: 'Moderate', minutesAgo: 70, reports: 5, confidence: 'Medium', alternativeIds: ['ahar-cenotaphs'] },
  { destinationId: 'ahar-cenotaphs', name: 'Ahar Cenotaphs', area: 'East Udaipur', level: 'Low', minutesAgo: 180, reports: 3, confidence: 'Low', alternativeIds: [] },
]