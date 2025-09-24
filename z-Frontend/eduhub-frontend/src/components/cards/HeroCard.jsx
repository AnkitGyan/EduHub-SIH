import heroBg from "../../assets/bannerImg.png"; 
import SignupCard from "./Signupcard";


const HeroCard = () => {
  return (
    <div className="relative w-full h-[400px]">
      {/* Background Image */}
      <div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Card */}
        <div className="absolute inset-0 flex items-center justify-center mt-50">
      <SignupCard></SignupCard>
      </div>
      </div>
    </div>
  );
};

export default HeroCard;

