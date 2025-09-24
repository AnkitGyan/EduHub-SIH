import { Button } from "../buttons/button";

const SignupCard = () => {
  return (
    <div className="bg-[#0d1b2a] text-white p-6 rounded-xl flex flex-col items-center gap-4 w-fit mx-auto">
      <h2 className="text-xl font-semibold">Start Your Adventure!</h2>
      <div className="flex gap-3">
        <Button
          variant="yellow"
          size="md"
          text="Register"
          onClick={() => alert("You have signed up")}
        />
        <Button
          variant="transparent"
          size="md"
          text="Explore"
          onClick={() => alert("Explore clicked!")}
        />
      </div>
    </div>
  );
};

export default  SignupCard;
