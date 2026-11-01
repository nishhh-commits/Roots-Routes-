export const indicatorActions: Record<string, string> = {
  i1: 'Ask a supplier about adding more solar or green power, and track the share every month.',
  i2: 'Add separate recycling bins in the kitchen and on room floors.',
  i3: 'Check taps, showers and laundry cycles for easy water savings.',
  i4: 'Place towel-reuse cards in every room and mention them at check-in.',
}

export const metricActions: Record<'water' | 'energy' | 'waste', string> = {
  water: 'Check for leaks and review laundry and garden watering schedules.',
  energy: 'Review cooling schedules and switch off systems in empty rooms.',
  waste: 'Check kitchen food waste and make sure recyclables are separated.',
}

export const areaActions: Record<string, string> = {
  'water:Guest rooms': 'Check room fixtures first, since guest rooms use the most water.',
  'energy:Cooling': 'Start the energy review with cooling schedules and maintenance.',
  'waste:Food': 'Start with kitchen portioning and food-waste tracking.',
}