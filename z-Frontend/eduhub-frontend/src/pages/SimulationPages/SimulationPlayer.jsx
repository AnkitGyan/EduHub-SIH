import { useLocation, useNavigate } from "react-router-dom";

export default function SimulationPlayer() {
  const { state: sim } = useLocation(); 
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 mb-4 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-4">{sim.title}</h1>

      <div className="w-full h-[80vh] rounded-xl overflow-hidden shadow-lg">
        <iframe
          src={sim.url}
          className="w-full h-full"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
