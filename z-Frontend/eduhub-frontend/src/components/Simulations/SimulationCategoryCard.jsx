import React from "react";

const SimulationComponent = ({ sim }) => {
  return (
    <div className="cursor-pointer p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition bg-white">
      
      {/* Thumbnail */}
      <img
        src={sim.thumbnail}
        alt={sim.title}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />

      {/* Title */}
      <h3 className="text-xl font-semibold mb-2">{sim.title}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm">{sim.description}</p>

      {/* Difficulty (optional) */}
      {sim.difficulty && (
        <p className="mt-2 text-sm font-medium text-blue-600">
          Difficulty: {sim.difficulty}
        </p>
      )}
    </div>
  );
};

export default SimulationComponent;
