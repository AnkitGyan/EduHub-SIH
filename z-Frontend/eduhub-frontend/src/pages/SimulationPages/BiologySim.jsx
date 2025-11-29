import { Link } from "react-router-dom";
import SimulationComponent from "../../components/Simulations/SimulationCategoryCard.jsx";

export default function ScienceSimulationPage() {
  const sims = [
  {
    id: "natural-selection",
    title: "Natural Selection",
    thumbnail:
      "https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection-600.png",
    description:
      "Explore how environmental factors affect evolution and survival.",
    url: "https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection_en.html",
  },
  {
    id: "gene-expression",
    title: "Gene Expression Essentials",
    thumbnail:
      "https://phet.colorado.edu/sims/html/gene-expression-essentials/latest/gene-expression-essentials-600.png",
    description:
      "Learn how genes turn on/off and how proteins are made.",
    url: "https://phet.colorado.edu/sims/html/gene-expression-essentials/latest/gene-expression-essentials_en.html",
  },
  {
    id: "membrane-channels",
    title: "Membrane Channels",
    thumbnail:
      "https://phet.colorado.edu/sims/membrane-channels/membrane-channels-600.png",
    description:
      "Understand how ions pass through cell membranes using channel proteins.",
    url: "https://phet.colorado.edu/sims/html/membrane-channels/latest/membrane-channels_en.html",
  },
  {
    id: "neuron",
    title: "Neuron Simulation",
    thumbnail:
      "https://phet.colorado.edu/sims/html/neuron/latest/neuron-600.png",
    description:
      "See how neurons send electrical signals and communicate.",
    url: "https://phet.colorado.edu/sims/html/neuron/latest/neuron_en.html",
  },

  {
    id: "cell-division",
    title: "Cell Division (Mitosis Simulator)",
    thumbnail:
      "https://phet.colorado.edu/sims/html/neuron/latest/neuron-600.png",
    description:
      "Visualize the stages of mitosis: prophase, metaphase, anaphase, and telophase.",
    url: "https://biologysimulations.com/cell-division-mitosis-simulator/",
  },
  {
    id: "ecosystem-sim",
    title: "Ecosystem Interactions Simulator",
    thumbnail:
      "https://images.activelylearn.com/coverart/b77e1464-fd97-4ae1-8c09-0ea3e434e99b.jpg",
    description:
      "Study food chains, predators, prey, and population balance in ecosystems.",
    url: "https://biologysimulations.com/ecosystem-interactions/",
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
