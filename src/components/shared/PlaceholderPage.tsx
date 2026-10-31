type Props = { title: string; owner: string }

export default function PlaceholderPage({ title, owner }: Props) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <p className="text-sm font-medium text-sandstone-600 uppercase tracking-wide">Owner: {owner}</p>
      <h1 className="mt-2 text-4xl font-semibold text-plum-900">{title}</h1>
      <p className="mt-3 text-ink-500">This page is a placeholder and will be built soon.</p>
    </div>
  )
}