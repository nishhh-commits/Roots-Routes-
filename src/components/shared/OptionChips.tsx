type Props<T extends string> = {
  options: T[]
  selected: T[]
  onToggle: (option: T) => void
}

export default function OptionChips<T extends string>({ options, selected, onToggle }: Props<T>) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onToggle(option)}
          className={
            selected.includes(option)
              ? 'rounded-full bg-plum-700 px-4 py-1.5 text-sm text-cream-50'
              : 'rounded-full border border-sand-300 px-4 py-1.5 text-sm text-ink-700 hover:bg-cream-100'
          }
        >
          {option}
        </button>
      ))}
    </div>
  )
}