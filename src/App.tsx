function App() {
  const swatches = [
    ['bg-cream-100', 'Cream'],
    ['bg-sand-300', 'Sand'],
    ['bg-sandstone-500', 'Sandstone'],
    ['bg-plum-900', 'Plum'],
    ['bg-leaf-500', 'Leaf'],
  ]

  return (
    <div className="min-h-screen px-6 py-16 max-w-3xl mx-auto">
      <p className="text-sm font-medium text-sandstone-600 tracking-wide uppercase">Team MUSAFIR</p>
      <h1 className="mt-3 text-5xl font-semibold text-plum-900">Roots & Routes</h1>
      <p className="mt-4 text-ink-500">Discover Hidden Gems. Connect with Culture. Travel with Purpose.</p>
      <div className="mt-10 flex gap-3">
        {swatches.map(([cls, name]) => (
          <div key={name}>
            <div className={`${cls} h-16 w-16 rounded-md`} />
            <p className="mt-2 text-xs text-ink-700">{name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App