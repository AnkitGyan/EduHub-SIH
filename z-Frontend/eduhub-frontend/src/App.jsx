import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProblemSectionPage from "./pages/ProblemSectionPage";
import StudentDashboard from "./pages/DashBoard";
import Navbar from "./components/navbar/Navbar";
import ProblemDetailPage from "./pages/ProblemDetails";
import { Header } from "./components/header/Header";
import SimulationPlayer from "./pages/SimulationPages/SimulationPlayer";
import ScienceSim from "./pages/SimulationPages/ScienceSim"; 
import ChemistrySim from "./pages/SimulationPages/ChemistrySim";  
import BiologySim from "./pages/SimulationPages/BiologySim";
import MathsSim from "./pages/SimulationPages/MathsSim";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/problems" element={<ProblemSectionPage />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/problem/:id" element={<ProblemDetailPage />} />
        <Route path="/simulate/science" element={<ScienceSim />} />
        <Route path="/simulate/chemistry" element={<ChemistrySim />} />
        <Route path="/simulate/Biology" element={<BiologySim />} />
        <Route path="/simulate/maths" element={<MathsSim />} />
        <Route path="/simulate/:subject/:simId" element={<SimulationPlayer />} />

      </Routes>
    </>
  );
};

export default App;
