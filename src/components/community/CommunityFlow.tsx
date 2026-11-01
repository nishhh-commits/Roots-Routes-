const steps = [
  { title: 'A local submits a place', note: 'Name, description, location, photo' },
  { title: 'It enters moderation', note: 'Status: Pending Verification' },
  { title: 'A moderator approves it', note: 'Only approved places are public' },
  { title: 'Trip Planner can use it', note: 'Planned, not built yet' },
]

export default function CommunityFlow() {
  return (
    <ol className="mt-8 grid gap-4 border-y border-sand-300 py-4 sm:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title}>
          <p className="font-display text-xl text-sandstone-500">{index + 1}</p>
          <p className="text-sm font-medium text-plum-900">{step.title}</p>
          <p className="text-xs text-ink-500">{step.note}</p>
        </li>
      ))}
    </ol>
  )
}