import React from 'react'

export default function Heatmap() {
  const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']

  // Example: each month stores contribution count per index (0-24)
  const subs = { 
    Mar:[2,0,4,1,6,3,5,2,1,0,0,1,4,3,2,6,7,2,1,0,3,5,0,1,2],
    Apr:[0,1,0,2,3,6,7,1,0,0,2,4,3,2,5,1,2,0,3,4,6,7,0,2,5],
    May:[0,0,0,1,2,0,3,5,6,7,3,1,2,0,4,5,3,2,1,0,6,7,4,2,3],
    Jun:[1,2,3,0,0,0,5,6,2,4,7,1,0,2,3,4,5,6,7,0,1,2,3,4,5],
    Jul:[4,6,5,0,0,2,1,3,7,4,2,0,6,5,1,3,2,7,6,5,4,3,2,1,0],
    Aug:[0,1,2,0,4,6,3,2,1,0,0,5,6,7,4,2,3,1,0,6,7,4,2,1,3]
  }

  // map contributions to orange shades
  const getColor = (val) => {
    if (val === 0) return 'bg-gray-200'
    if (val < 2) return 'bg-orange-100'
    if (val < 4) return 'bg-orange-300'
    if (val < 6) return 'bg-orange-500'
    return 'bg-orange-700'
  }

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Activity (Last 6 months)</h3>
      <div className="grid grid-cols-6 gap-4">
        {months.map(m => (
          <div key={m} className="flex flex-col items-center">
            <div className="grid grid-cols-5 gap-1">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-sm ${getColor(subs[m]?.[i] || 0)}`}
                  title={`${subs[m]?.[i] || 0} contributions`}
                />
              ))}
            </div>
            <span className="text-xs mt-2 text-gray-500">{m}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
