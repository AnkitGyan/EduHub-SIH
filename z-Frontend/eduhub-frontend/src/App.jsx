import HeroCard from "./components/cards/HeroCard";
import { CategoryCard } from "./components/cards/CategoryCard";

const App = () => {
  return (
    <div>
   <HeroCard></HeroCard>
   <CategoryCard  title ="Science Wiz"
  bgColor = "bg-blue-200"
  onClick={()=>alert('science wiz')}></CategoryCard>
    </div>
   
  );
};

export default App;   
