const fs = require('fs')

const files = [
  'landing/editorial-1.jpg',
  'landing/editorial-2.jpg',
  'hotel/hero.jpg',
  'destinations/city-palace.jpg',
  'destinations/jagdish-temple.jpg',
  'destinations/lake-pichola.jpg',
  'destinations/saheliyon-ki-bari.jpg',
  'destinations/sajjangarh.jpg',
  'destinations/fateh-sagar.jpg',
  'destinations/bagore-ki-haveli.jpg',
  'destinations/ahar-cenotaphs.jpg',
  'destinations/miniature-studio.jpg',
  'destinations/block-print-workshop.jpg',
  'destinations/puppet-show.jpg',
  'artisans/a1.jpg',
  'artisans/a2.jpg',
  'artisans/a3.jpg',
  'artisans/a4.jpg',
  'places/c1.jpg',
  'places/c2.jpg',
  'places/c3.jpg',
  'places/c4.jpg',
]

const missing = files.filter((file) => !fs.existsSync(`public/images/${file}`))
const hero = fs.existsSync('src/assets/udaipur-hero.jpg')

console.log(hero ? 'Hero photo found.' : 'MISSING: src/assets/udaipur-hero.jpg')
console.log(missing.length === 0 ? 'All other photos found.' : `Missing photos:\n${missing.join('\n')}`)