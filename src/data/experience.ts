import type { Experience } from '../types/experience'

export const experiences: Experience[] = [
  {
    id: 'e1',
    title: 'Sunrise old city walk',
    kind: 'Cultural walk',
    duration: '2 hours',
    price: 400,
    description: 'A guided early-morning walk through quiet lanes before the crowds arrive.',
    isDemo: true,
  },
  {
    id: 'e2',
    title: 'Paint your own miniature',
    kind: 'Workshop',
    duration: '2 hours',
    price: 800,
    description: 'Learn basic brushwork and take home a small painting you made yourself.',
    isDemo: true,
  },
  {
    id: 'e3',
    title: 'Home-cooked Rajasthani lunch',
    kind: 'Food experience',
    duration: '3 hours',
    price: 900,
    description: 'Cook and share a regional meal with a local host family.',
    isDemo: true,
  },
  {
    id: 'e4',
    title: 'Block printing basics',
    kind: 'Workshop',
    duration: '90 minutes',
    price: 600,
    description: 'Stamp your own fabric using traditional carved wooden blocks.',
    isDemo: true,
  },
]