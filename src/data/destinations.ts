
import type { Destination } from '../types/destinations'

export const destinations: Destination[] = [
  { id: 'city-palace', name: 'City Palace', area: 'Old City', interests: ['Heritage', 'Culture', 'Photography'], entryCost: 300, visitMinutes: 120, typicalCrowd: 3, lat: 24.5763, lng: 73.6835 },
  { id: 'jagdish-temple', name: 'Jagdish Temple', area: 'Old City', interests: ['Heritage', 'Culture'], entryCost: 0, visitMinutes: 45, typicalCrowd: 2, lat: 24.5802, lng: 73.6838 },
  { id: 'lake-pichola', name: 'Lake Pichola boat ride', area: 'Old City', interests: ['Photography', 'Relaxation', 'Nature'], entryCost: 400, visitMinutes: 60, typicalCrowd: 3, lat: 24.5719, lng: 73.6798 },
  { id: 'saheliyon-ki-bari', name: 'Saheliyon-ki-Bari', area: 'North Udaipur', interests: ['Heritage', 'Relaxation', 'Nature'], entryCost: 50, visitMinutes: 60, typicalCrowd: 1, lat: 24.5992, lng: 73.6891 },
  { id: 'sajjangarh', name: 'Sajjangarh (Monsoon Palace)', area: 'West Udaipur', interests: ['Nature', 'Photography', 'Heritage'], entryCost: 300, visitMinutes: 90, typicalCrowd: 2, lat: 24.5959, lng: 73.6358 },
  { id: 'fateh-sagar', name: 'Fateh Sagar Lake', area: 'North Udaipur', interests: ['Nature', 'Relaxation', 'Photography'], entryCost: 0, visitMinutes: 60, typicalCrowd: 2, lat: 24.5987, lng: 73.6797 },
  { id: 'bagore-ki-haveli', name: 'Bagore ki Haveli', area: 'Old City', interests: ['Heritage', 'Culture'], entryCost: 100, visitMinutes: 60, typicalCrowd: 2, lat: 24.5791, lng: 73.6797 },
  { id: 'ahar-cenotaphs', name: 'Ahar Cenotaphs', area: 'East Udaipur', interests: ['Heritage', 'Photography'], entryCost: 0, visitMinutes: 45, typicalCrowd: 1, lat: 24.5922, lng: 73.7237 },
  { id: 'shilpgram', name: 'Shilpgram crafts village', area: 'West Udaipur', interests: ['Culture', 'Shopping'], entryCost: 50, visitMinutes: 90, typicalCrowd: 1, lat: 24.6094, lng: 73.6571 },
  { id: 'gulab-bagh', name: 'Gulab Bagh', area: 'East Udaipur', interests: ['Nature', 'Relaxation'], entryCost: 0, visitMinutes: 45, typicalCrowd: 1, lat: 24.581, lng: 73.6924 },
  { id: 'hathi-pol-bazaar', name: 'Hathi Pol Bazaar', area: 'Old City', interests: ['Shopping', 'Culture'], entryCost: 0, visitMinutes: 75, typicalCrowd: 2, lat: 24.5812, lng: 73.6853 },
  { id: 'old-city-food-lanes', name: 'Old City food lanes', area: 'Old City', interests: ['Food', 'Culture'], entryCost: 0, visitMinutes: 60, typicalCrowd: 2, lat: 24.579, lng: 73.683 },
]

import type { Destination } from '../types/destination'

export const destinations: Destination[] = [
  { id: 'city-palace', cityId: 'udaipur', name: 'City Palace', area: 'Old City', interests: ['Heritage', 'Culture', 'Photography'], entryCost: 300, visitMinutes: 120, typicalCrowd: 3, lat: 24.5763, lng: 73.6835, famous: true },
  { id: 'jagdish-temple', cityId: 'udaipur', name: 'Jagdish Temple', area: 'Old City', interests: ['Heritage', 'Culture'], entryCost: 0, visitMinutes: 45, typicalCrowd: 2, lat: 24.5802, lng: 73.6838 },
  { id: 'lake-pichola', cityId: 'udaipur', name: 'Lake Pichola boat ride', area: 'Old City', interests: ['Photography', 'Relaxation', 'Nature'], entryCost: 400, visitMinutes: 60, typicalCrowd: 3, lat: 24.5719, lng: 73.6798, famous: true },
  { id: 'saheliyon-ki-bari', cityId: 'udaipur', name: 'Saheliyon-ki-Bari', area: 'North Udaipur', interests: ['Heritage', 'Relaxation', 'Nature'], entryCost: 50, visitMinutes: 60, typicalCrowd: 1, lat: 24.5992, lng: 73.6891 },
  { id: 'sajjangarh', cityId: 'udaipur', name: 'Sajjangarh (Monsoon Palace)', area: 'West Udaipur', interests: ['Nature', 'Photography', 'Heritage'], entryCost: 300, visitMinutes: 90, typicalCrowd: 2, lat: 24.5959, lng: 73.6358 },
  { id: 'fateh-sagar', cityId: 'udaipur', name: 'Fateh Sagar Lake', area: 'North Udaipur', interests: ['Nature', 'Relaxation', 'Photography'], entryCost: 0, visitMinutes: 60, typicalCrowd: 2, lat: 24.5987, lng: 73.6797 },
  { id: 'bagore-ki-haveli', cityId: 'udaipur', name: 'Bagore ki Haveli', area: 'Old City', interests: ['Heritage', 'Culture'], entryCost: 100, visitMinutes: 60, typicalCrowd: 2, lat: 24.5791, lng: 73.6797 },
  { id: 'ahar-cenotaphs', cityId: 'udaipur', name: 'Ahar Cenotaphs', area: 'East Udaipur', interests: ['Heritage', 'Photography'], entryCost: 0, visitMinutes: 45, typicalCrowd: 1, lat: 24.5922, lng: 73.7237 },
  { id: 'shilpgram', cityId: 'udaipur', name: 'Shilpgram crafts village', area: 'West Udaipur', interests: ['Culture', 'Shopping'], entryCost: 50, visitMinutes: 90, typicalCrowd: 1, lat: 24.6094, lng: 73.6571 },
  { id: 'gulab-bagh', cityId: 'udaipur', name: 'Gulab Bagh', area: 'East Udaipur', interests: ['Nature', 'Relaxation'], entryCost: 0, visitMinutes: 45, typicalCrowd: 1, lat: 24.581, lng: 73.6924 },
  { id: 'hathi-pol-bazaar', cityId: 'udaipur', name: 'Hathi Pol Bazaar', area: 'Old City', interests: ['Shopping', 'Culture'], entryCost: 0, visitMinutes: 75, typicalCrowd: 2, lat: 24.5812, lng: 73.6853 },
  { id: 'old-city-food-lanes', cityId: 'udaipur', name: 'Old City food lanes', area: 'Old City', interests: ['Food', 'Culture'], entryCost: 0, visitMinutes: 60, typicalCrowd: 2, lat: 24.579, lng: 73.683 },
  { id: 'miniature-studio', cityId: 'udaipur', name: 'Miniature painting studio (demo)', area: 'Old City', interests: ['Local art', 'Culture', 'Shopping'], entryCost: 800, visitMinutes: 120, typicalCrowd: 1, lat: 24.5785, lng: 73.682, local: true, artisanId: 'a1' },
  { id: 'block-print-workshop', cityId: 'udaipur', name: 'Block printing workshop (demo)', area: 'Old City', interests: ['Local art', 'Culture', 'Shopping'], entryCost: 600, visitMinutes: 90, typicalCrowd: 1, lat: 24.577, lng: 73.685, local: true, artisanId: 'a3' },
  { id: 'puppet-show', cityId: 'udaipur', name: 'Puppet making and show (demo)', area: 'Old City', interests: ['Local art', 'Culture'], entryCost: 500, visitMinutes: 60, typicalCrowd: 1, lat: 24.58, lng: 73.6815, local: true, artisanId: 'a4' },
]
 origin/feature/nisha-firestore
