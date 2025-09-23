'use client'

import React, {useMemo, useState} from 'react'

type Props = {
  min?: number
  max?: number
  step?: number
  defaultMin?: number
  defaultMax?: number
  quickRanges?: Array<{min: number; max: number; label?: string}>
  onApply?: (range: {min: number; max: number}) => void
}

export default function PriceWidget({
  min = 0,
  max = 1000,
  step = 10,
  defaultMin = 0,
  defaultMax = 1000,
  quickRanges,
  onApply
}: Props) {
  const [minVal, setMinVal] = useState<number>(Math.min(Math.max(min, defaultMin), max))
  const [maxVal, setMaxVal] = useState<number>(Math.max(Math.min(max, defaultMax), min))
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  const clamped = (v: number) => Math.min(max, Math.max(min, v))

  const percent = (v: number) => ((v - min) / (max - min)) * 100

  const trackStyle = useMemo(() => {
    const left = percent(Math.min(minVal, maxVal))
    const width = Math.abs(percent(maxVal) - percent(minVal))
    return {left: `${left}%`, width: `${width}%`}
  }, [minVal, maxVal, min, max])

  const ranges = quickRanges ?? [
    {min: 0, max: 50, label: 'Under 50'},
    {min: 50, max: 100},
    {min: 100, max: 250},
    {min: 250, max: 500},
    {min: 500, max: 1000, label: '500+'}
  ]

  const applyQuick = (r: {min: number; max: number}, idx: number) => {
    setMinVal(clamped(r.min))
    setMaxVal(clamped(r.max))
    setActiveIdx(idx)
  }

  const clear = () => {
    setMinVal(min)
    setMaxVal(max)
    setActiveIdx(null)
  }

  const apply = () => {
    onApply?.({min: minVal, max: maxVal})
  }

  // Derived example count (placeholder)
  const resultsCount = useMemo(() => {
    const span = Math.max(1, maxVal - minVal)
    return Math.max(10, Math.floor(200 * (span / (max - min))))
  }, [minVal, maxVal, min, max])

  return (
    <div className="price-widget w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filter by Price</h3>
        <button onClick={clear} className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-100 dark:hover:text-primary-300 font-medium transition-colors">Clear</button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">Price Range</span>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
            <span><span className="icon-riyal-symbol text-xs me-1" />{minVal}</span>
            <span className="text-gray-400">-</span>
            <span><span className="icon-riyal-symbol text-xs me-1" />{maxVal}</span>
          </div>
        </div>

        <div className="relative mb-4 py-2">
          <div className="relative h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
            <div className="absolute h-full bg-primary-500 rounded-full dark:bg-primary-300" style={trackStyle} />
          </div>

          <div className="slider-container">
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={minVal}
              onChange={(e) => {
                const v = clamped(Number(e.target.value))
                setMinVal(Math.min(v, maxVal - step))
                setActiveIdx(null)
              }}
              className="range-input range-input-min absolute -top-4 w-full h-6 bg-transparent appearance-none cursor-pointer"
            />
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={maxVal}
              onChange={(e) => {
                const v = clamped(Number(e.target.value))
                setMaxVal(Math.max(v, minVal + step))
                setActiveIdx(null)
              }}
              className="range-input range-input-max absolute -top-4 w-full h-6 bg-transparent appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Min</label>
            <input
              type="number"
              min={min}
              max={max - step}
              value={minVal}
              onChange={(e) => { setMinVal(clamped(Number(e.target.value) || min)); setActiveIdx(null) }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Max</label>
            <input
              type="number"
              min={min + step}
              max={max}
              value={maxVal}
              onChange={(e) => { setMaxVal(clamped(Number(e.target.value) || max)); setActiveIdx(null) }}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Quick Select</h4>
        <div className="grid grid-cols-2 gap-2">
          {ranges.map((r, idx) => (
            <button
              key={`${r.min}-${r.max}`}
              onClick={() => applyQuick(r, idx)}
              className={`price-quick-btn px-3 py-2 text-sm border rounded-md transition-colors ${activeIdx === idx ? 'bg-primary-500 border-primary-500 text-white' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-primary-50 hover:border-primary-300 hover:text-white dark:hover:bg-primary-200 dark:hover:border-primary-300 dark:hover:text-white'}`}
            >
              {r.label ?? (<><span className="icon-riyal-symbol text-xs me-1" />{r.min} - <span className="icon-riyal-symbol text-xs me-1" />{r.max}</>)}
            </button>
          ))}
        </div>
      </div>

      <button onClick={apply} className="w-full te-btn te-btn-default">Apply Filter</button>

      <div className="mt-4 text-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">Showing {resultsCount} products</span>
      </div>
    </div>
  )
}


