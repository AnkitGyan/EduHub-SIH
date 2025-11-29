import { Link } from "react-router-dom";
import SimulationComponent from "../../components/Simulations/SimulationCategoryCard.jsx";

export default function ScienceSimulationPage() {
  const sims = [
  {
    id: "gravity",
    title: "Gravity & Orbits",
    thumbnail:
      "https://www.datocms-assets.com/117510/1722315471-earth-moon-system-and-gravity20150925-22503-1j7na2m.jpg",
    description: "Explore how gravity controls planets and orbits.",
    url: "https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_en.html",
  },

  {
    id: "forces-motion",
    title: "Forces & Motion: Basics",
    thumbnail:
      "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics-600.png",
    description:
      "Learn how forces like friction and pushes affect motion.",
    url: "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_en.html",
  },
  {
    id: "projectile-motion",
    title: "Projectile Motion",
    thumbnail:
      "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion-600.png",
    description:
      "Experiment with angle, velocity, and mass to observe trajectories.",
    url: "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html",
  },
  {
    id: "circuit-builder",
    title: "Circuit Construction Kit",
    thumbnail:
      "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc-600.png",
    description:
      "Build circuits using batteries, wires, bulbs, and switches.",
    url: "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html",
  },
  {
    id: "gravity-force-lab",
    title: "Gravity Force Lab",
    thumbnail:
      "https://phet.colorado.edu/sims/html/gravity-force-lab/latest/gravity-force-lab-600.png",
    description:
      "Visualize gravitational force between objects with different masses.",
    url: "https://phet.colorado.edu/sims/html/gravity-force-lab/latest/gravity-force-lab_en.html",
  },
  {
    id: "wave-interference",
    title: "Wave Interference",
    thumbnail:
      "https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference-600.png",
    description:
      "Study wave patterns, interference, diffraction, and oscillations.",
    url: "https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference_en.html",
  },
];

  return (
    <div className="p-10">
      <div className="grid md:grid-cols-3 gap-8">
        {sims.map(sim => (
          <Link
            key={sim.id}
            to={`/simulate/science/${sim.id}`}
            state={sim}           // 🔥 sends data to simulation player page
          >
            <SimulationComponent sim={sim} />
          </Link>
        ))}
      </div>
    </div>
  );
}
