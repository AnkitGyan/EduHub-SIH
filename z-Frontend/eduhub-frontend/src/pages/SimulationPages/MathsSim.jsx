import { Link } from "react-router-dom";
import SimulationComponent from "../../components/Simulations/SimulationCategoryCard.jsx";

export default function ScienceSimulationPage() {
  const sims = [
  {
    id: "fractions-intro",
    title: "Fractions: Intro",
    thumbnail:
      "https://phet.colorado.edu/sims/html/fractions-intro/latest/fractions-intro-600.png",
    description:
      "Learn the basics of fractions using shapes and visual models.",
    url: "https://phet.colorado.edu/sims/html/fractions-intro/latest/fractions-intro_en.html",
  },
  {
    id: "fractions-equality",
    title: "Fractions: Equality",
    thumbnail:
      "https://phet.colorado.edu/sims/html/fractions-equality/latest/fractions-equality-600.png",
    description:
      "Compare fractions and understand concepts of equivalence.",
    url: "https://phet.colorado.edu/sims/html/fractions-equality/latest/fractions-equality_en.html",
  },
  {
    id: "graphs",
    title: "Graphing Lines",
    thumbnail:
      "https://phet.colorado.edu/sims/html/graphing-lines/latest/graphing-lines-600.png",
    description:
      "Explore linear equations, slopes, and graph transformations.",
    url: "https://phet.colorado.edu/sims/html/graphing-lines/latest/graphing-lines_en.html",
  },
  {
    id: "geometry",
    title: "Area Builder",
    thumbnail:
      "https://phet.colorado.edu/sims/html/area-builder/latest/area-builder-600.png",
    description:
      "Build shapes, explore area concepts, and solve geometry puzzles.",
    url: "https://phet.colorado.edu/sims/html/area-builder/latest/area-builder_en.html",
  },
  {
    id: "proportions",
    title: "Proportion Playground",
    thumbnail:
      "https://phet.colorado.edu/sims/html/proportion-playground/latest/proportion-playground-600.png",
    description:
      "Understand ratios, proportions, scaling, and math modeling.",
    url: "https://phet.colorado.edu/sims/html/proportion-playground/latest/proportion-playground_en.html",
  },
  {
    id: "simultaneous-equations",
    title: "Simultaneous Equations",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5jyjAYmhUEPKlzalainP45mVYXsjqgJmLHQ&s",
    description:
      "Solve systems of equations visually using graph intersections.",
    url: "https://phet.colorado.edu/sims/html/simultaneous-equations/latest/simultaneous-equations_en.html",
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
