import { Link } from "react-router-dom";
import SimulationComponent from "../../components/Simulations/SimulationCategoryCard.jsx";

export default function ScienceSimulationPage() {
  const sims = [
  {
    id: "atom-builder",
    title: "Build an Atom",
    thumbnail:
      "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom-600.png",
    description:
      "Learn how protons, neutrons, and electrons determine atomic structure.",
    url: "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_en.html",
  },
  {
    id: "molecule-shapes",
    title: "Molecule Shapes",
    thumbnail:
      "https://phet.colorado.edu/sims/html/molecule-shapes/latest/molecule-shapes-600.png",
    description:
      "Explore VSEPR theory and how molecular shapes are formed.",
    url: "https://phet.colorado.edu/sims/html/molecule-shapes/latest/molecule-shapes_en.html",
  },
  {
    id: "states-of-matter",
    title: "States of Matter",
    thumbnail:
      "https://phet.colorado.edu/sims/html/states-of-matter/latest/states-of-matter-600.png",
    description:
      "Experiment with temperature and molecular movement across phases.",
    url: "https://phet.colorado.edu/sims/html/states-of-matter/latest/states-of-matter_en.html",
  },
  {
    id: "balancing-equations",
    title: "Balancing Chemical Equations",
    thumbnail:
      "https://phet.colorado.edu/sims/html/balancing-chemical-equations/latest/balancing-chemical-equations-600.png",
    description:
      "Learn how to balance chemical equations through interactive challenges.",
    url: "https://phet.colorado.edu/sims/html/balancing-chemical-equations/latest/balancing-chemical-equations_en.html",
  },
  {
    id: "acid-base-solutions",
    title: "Acid-Base Solutions",
    thumbnail:
      "https://phet.colorado.edu/sims/html/acid-base-solutions/latest/acid-base-solutions-600.png",
    description:
      "Discover pH levels, conductivity, and strength of acids and bases.",
    url: "https://phet.colorado.edu/sims/html/acid-base-solutions/latest/acid-base-solutions_en.html",
  }
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
