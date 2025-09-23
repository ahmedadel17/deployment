'use client'

import React, {useMemo, useState} from 'react'

type Props = {
  sizes?: string[]
  shoeSizes?: string[]
  colors?: string[]
  onApply?: (filters: {sizes: string[]; colors: string[]}) => void
}

const DEFAULT_SIZES = ['XS','S','M','L','XL','XXL']
const DEFAULT_SHOE_SIZES = ['38','39','40','41','42','43','44','45']
const DEFAULT_COLORS = ['black','white','gray','red','blue','yellow','green']

export default function VariableWidget({
  sizes = DEFAULT_SIZES,
  shoeSizes = DEFAULT_SHOE_SIZES,
  colors = DEFAULT_COLORS,
  onApply
}: Props) {
  const allSizes = useMemo(() => [...sizes, ...shoeSizes], [sizes, shoeSizes])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])

  const toggleIn = (list: string[], value: string, setter: (next: string[]) => void) => {
    if (list.includes(value)) setter(list.filter(v => v !== value))
    else setter([...list, value])
  }

  const clearAll = () => {
    setSelectedSizes([])
    setSelectedColors([])
  }

  const apply = () => onApply?.({sizes: selectedSizes, colors: selectedColors})

  // Derived result count (placeholder heuristic)
  const resultsCount = useMemo(() => {
    const base = 124
    const s = selectedSizes.length ? 0.3 + selectedSizes.length * 0.1 : 1
    const c = selectedColors.length ? 0.4 + selectedColors.length * 0.1 : 1
    return Math.max(5, Math.floor(base * s * c))
  }, [selectedSizes, selectedColors])

  return (
    <div className="variable-widget w-full max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Size & Color</h3>
        <button onClick={clearAll} className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors" aria-label="Clear all size and color filters">Clear</button>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Size</h4>
        <div className="grid grid-cols-4 gap-2">
          {sizes.map(size => (
            <button
              key={size}
              className={`size-option px-3 py-2 rounded-md text-sm border transition-colors ${selectedSizes.includes(size) ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50'}`}
              onClick={() => toggleIn(selectedSizes, size, setSelectedSizes)}
              aria-label={`Select size ${size}`}
            >
              {size}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Shoe Sizes</div>
          <div className="grid grid-cols-4 gap-2">
            {shoeSizes.map(s => (
              <button
                key={s}
                className={`size-option px-3 py-2 rounded-md text-sm border transition-colors ${selectedSizes.includes(s) ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-blue-50'}`}
                onClick={() => toggleIn(selectedSizes, s, setSelectedSizes)}
                aria-label={`Select shoe size ${s}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Color</h4>
        <div className="flex flex-wrap gap-3">
          {colors.map(color => (
            <button
              key={color}
              className={`color-option w-7 h-7 rounded-full border-2 ${selectedColors.includes(color) ? 'border-blue-600' : 'border-gray-300 dark:border-gray-600'}`}
              style={{backgroundColor: color}}
              onClick={() => toggleIn(selectedColors, color, setSelectedColors)}
              title={color}
              aria-label={`Select color ${color}`}
            >
              <span className="sr-only">{color}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={`${selectedSizes.length || selectedColors.length ? '' : 'hidden'} mb-6`}>
        <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Selected:</div>
        <div className="space-y-2">
          <div className={`${selectedSizes.length ? '' : 'hidden'}`}>
            <span className="text-xs text-gray-500 dark:text-gray-400">Sizes:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {selectedSizes.map(size => (
                <span key={size} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-800 dark:text-blue-100">
                  {size}
                  <button className="hover:bg-blue-200 rounded-full p-0.5 dark:hover:bg-blue-700" onClick={() => setSelectedSizes(prev => prev.filter(s => s !== size))} aria-label={`Remove size ${size}`}>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className={`${selectedColors.length ? '' : 'hidden'}`}>
            <span className="text-xs text-gray-500 dark:text-gray-400">Colors:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {selectedColors.map(color => (
                <span key={color} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-800 dark:text-blue-100">
                  {color}
                  <button className="hover:bg-blue-200 rounded-full p-0.5 dark:hover:bg-blue-700" onClick={() => setSelectedColors(prev => prev.filter(c => c !== color))} aria-label={`Remove color ${color}`}>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button onClick={apply} className="w-full te-btn te-btn-default" aria-label="Apply size and color filters">Apply Filter</button>

      <div className="mt-4 text-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">Showing {resultsCount} products</span>
      </div>
    </div>
  )
}


