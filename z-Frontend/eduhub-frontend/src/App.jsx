import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProblemSectionPage from "./pages/ProblemSectionPage";
import StudentDashboard from "./pages/DashBoard";
import Navbar from "./components/navbar/Navbar";
import ProblemDetailPage from "./pages/ProblemDetails";


const App = () => {
  return (
  //  <Routes>
  //     <Route path="/" element={<HomePage />} />
  //     <Route path="/problems" element={<ProblemSectionPage />} />
  //     <Route path="/dashboard" element={<StudentDashboard/>}/>
  //   </Routes>
  // <Navbar/>
  // <ProblemSectionPage/>
  <ProblemDetailPage/>
   
  );
};

export default App;   
