import React from 'react'
export default function StatsCard({ title, value }) {
  return (
    <div className="card p-4 text-center">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}