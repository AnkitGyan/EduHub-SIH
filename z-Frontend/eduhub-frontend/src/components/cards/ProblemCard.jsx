import { Link } from "react-router-dom";

export default function ProblemCard({ problem }) {
  return (
    <Link to={`/problem/${problem._id}`}>
      <div className="p-4 border rounded-lg shadow hover:shadow-md transition bg-white">
        <h3 className="font-semibold text-lg">{problem.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{problem.subject}</p>
        <span
          className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
            problem.difficulty === "Easy"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {problem.difficulty}
        </span>
      </div>
    </Link>
  );
}
