import { Button } from "../buttons/button";
const Navbar = () => {
  return (
    <nav className="bg-[#0d1b2a] text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">Vidya-Verse</h1>
      <div className="flex gap-6">
        <button className="hover:text-yellow-300">Dashboard</button>
        <button className="hover:text-yellow-300">Social</button>
        <button className="hover:text-yellow-300">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
