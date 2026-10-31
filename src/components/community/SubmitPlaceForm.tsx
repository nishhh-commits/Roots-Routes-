import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { CommunityPlace } from '../../types/community'

export type NewPlace = Pick<CommunityPlace, 'name' | 'description' | 'category' | 'location' | 'image'>

const categories: CommunityPlace['category'][] = ['Heritage', 'Nature', 'Food', 'Craft', 'Viewpoint']

export default function SubmitPlaceForm({ onSubmit }: { onSubmit: (place: NewPlace) => void }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<CommunityPlace['category']>('Heritage')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState<string | undefined>()
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) {
      setImage(undefined)
      return
    }
    if (file.size > 700 * 1024) {
      setError('Image must be smaller than 700 KB.')
      event.target.value = ''
      return
    }
    setError('')
    const reader = new FileReader()
    reader.onload = () => setImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!name.trim() || !location.trim()) {
      setError('Place name and location are required.')
      return
    }
    if (description.trim().length < 20) {
      setError('Please describe the place in at least 20 characters.')
      return
    }
    onSubmit({ name: name.trim(), description: description.trim(), category, location: location.trim(), image })
    setName('')
    setDescription('')
    setLocation('')
    setImage(undefined)
    setError('')
    setSent(true)
  }

  const inputClass =
    'mt-1 w-full rounded-md border border-sand-300 bg-white px-3 py-2 text-ink-900 outline-none focus:border-plum-600'

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <label className="block text-sm text-ink-700">
        Place name
        <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
      </label>
      <label className="block text-sm text-ink-700">
        Description
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={inputClass} />
      </label>
      <label className="block text-sm text-ink-700">
        Category
        <select value={category} onChange={(e) => setCategory(e.target.value as CommunityPlace['category'])} className={inputClass}>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <label className="block text-sm text-ink-700">
        Location
        <input value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} />
      </label>
      <label className="block text-sm text-ink-700">
        Photo (optional, under 700 KB)
        <input type="file" accept="image/*" onChange={handleImage} className="mt-1 block text-sm" />
      </label>
      {image && <img src={image} alt="Preview" className="h-28 rounded-md object-cover" />}
      {error && <p className="text-sm text-red-700">{error}</p>}
      {sent && !error && (
        <p className="text-sm text-leaf-700">Submitted. Your place is now Pending Verification.</p>
      )}
      <button type="submit" className="rounded-md bg-plum-700 px-5 py-2.5 text-sm font-medium text-cream-50 transition hover:bg-plum-900">
        Submit for verification
      </button>
    </form>
  )
}