export type Indicator = {
id: string
label: string
value: number
unit: string
target: number
higherIsBetter: boolean
}

export type BreakdownItem = {
name: string
value: number
}

export type Breakdown = {
key: 'water' | 'energy' | 'waste'
title: string
unit: string
color: string
items: BreakdownItem[]
}
