const fs = require('fs')

const pages = [
  ['pages/Landing', 'Landing', 'Landing Page', 'Nisha'],
  ['pages/auth/Login', 'Login', 'Login', 'Nisha'],
  ['pages/tourist/Dashboard', 'Dashboard', 'Tourist Dashboard', 'Nisha'],
  ['pages/tourist/TripPlanner', 'TripPlanner', 'Trip Planner', 'Nisha'],
  ['pages/tourist/HeritageFlow', 'HeritageFlow', 'HeritageFlow', 'Garima'],
  ['pages/tourist/KalaConnect', 'KalaConnect', 'KalaConnect', 'Garima'],
  ['pages/tourist/CommunityDiscover', 'CommunityDiscover', 'Community Discover', 'Garima'],
  ['pages/hotel/HotelDashboard', 'HotelDashboard', 'Hotel Dashboard', 'Gaurav'],
  ['pages/hotel/GreenStay', 'GreenStay', 'GreenStay OS', 'Gaurav'],
]

pages.forEach(([path, name, title, owner]) => {
  const depth = path.split('/').length - 1
  const rel = '../'.repeat(depth)
  const code = `import PlaceholderPage from '${rel}components/shared/PlaceholderPage'\n\nexport default function ${name}() {\n  return <PlaceholderPage title="${title}" owner="${owner}" />\n}\n`
  fs.writeFileSync('src/' + path + '.tsx', code)
})