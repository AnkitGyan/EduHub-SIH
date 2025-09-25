import React from 'react'
export default function Badges({ badges }) {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Earned Badges</h3>
      <div className="flex gap-4 flex-wrap">
        {badges.map((b, i) => (
          <div key={i} className="flex flex-col items-center p-3 border rounded-xl shadow-sm bg-gray-50 w-36 h-28 justify-center">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600">🏆</div>
            <span className="text-sm mt-2 text-center">{b}</span>
          </div>
        ))}
      </div>
    </div>
  )
}