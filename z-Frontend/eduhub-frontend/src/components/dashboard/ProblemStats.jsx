import React from 'react'
export default function ProblemStats({ easy, medium, hard }) {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Problem Stats</h3>
      <div className="flex justify-around">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-bold">{easy}</div>
          <span className="text-sm mt-1">Easy</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 font-bold">{medium}</div>
          <span className="text-sm mt-1">Medium</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 text-red-600 font-bold">{hard}</div>
          <span className="text-sm mt-1">Hard</span>
        </div>
      </div>
    </div>
  )
}