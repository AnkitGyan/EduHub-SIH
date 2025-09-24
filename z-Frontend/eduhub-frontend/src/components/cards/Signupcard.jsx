import { useState } from "react";
import RegistrationForm from "../form/RegistrationForm";
import { Button } from "../buttons/button";

const SignupCard = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [initialForm, setInitialForm] = useState("login");

  return (
    <>
      <div className="bg-[#0d1b2a] text-white p-6 rounded-xl flex flex-col items-center gap-4 w-fit mx-auto">
        <h2 className="text-xl font-semibold">Start Your Adventure!</h2>
        <div className="flex gap-3">
          <Button
            text="Register"
            onClick={() => {
              setInitialForm("register");
              setAuthOpen(true);
            }}
          />
          <Button
            text="Explore"
            onClick={() => {
              setInitialForm("login");
              setAuthOpen(true);
            }}
          />
        </div>
      </div>
      <RegistrationForm
        isOpen={authOpen}
        initialForm={initialForm}
        onClose={() => setAuthOpen(false)}
      />
    </>
  );
};

export default SignupCard;
