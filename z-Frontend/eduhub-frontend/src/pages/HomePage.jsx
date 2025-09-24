import React from "react";
import HeroCard from "../components/cards/HeroCard";
import CategoryCard from "../components/cards/CategoryCard";
import LeaderboardItem from "../components/cards/LeaderboardItem";
import SuccessStoryItem from "../components/cards/SuccessStoryItem";
import { RocketIcon, CpuIcon, WrenchIcon, CalculatorIcon, DropletsIcon } from "lucide-react";
import { Button } from "../components/buttons/button";
import Footer from "../components/footer/Footer";

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      
      {/* --- Banner --- */}
      <HeroCard />

      {/* --- Main Content Grid --- */}
      <div className="max-w-7xl w-full px-6 md:px-12 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ---------- Left & Center (2/3) ---------- */}
        <div className="lg:col-span-2 flex flex-col gap-8">

          {/* Hero's Journey Progress */}
          <section>
            <h2 className="font-bold text-lg mb-2">Hero's Journey</h2>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-green-400 h-3 rounded-full" style={{ width: "60%" }}></div>
            </div>

            {/* Categories Icons Row */}
            <div className="flex gap-6 mt-4">
              <DropletsIcon className="text-blue-400" />
              <DropletsIcon className="text-purple-400" />
              <DropletsIcon className="text-orange-400" />
              <DropletsIcon className="text-cyan-400" />
              <DropletsIcon className="text-yellow-400" />
            </div>
          </section>

          {/* Subject Categories */}
          <section>
            <h2 className="font-bold text-lg mb-4">Subject Categories</h2>
            <div className="flex flex-wrap gap-6">
              <CategoryCard
                title="Science Wiz"
                icon={<RocketIcon size={48} className="text-red-500" />}
                bgColor="bg-white"
              />
              <CategoryCard
                title="Tech Master"
                icon={<CpuIcon size={48} className="text-blue-500" />}
                bgColor="bg-yellow-100"
              />
              <CategoryCard
                title="Engineer's Workshop"
                icon={<WrenchIcon size={48} className="text-orange-500" />}
                bgColor="bg-white"
              />
              <CategoryCard
                title="Math Magician"
                icon={<CalculatorIcon size={48} className="text-purple-500" />}
                bgColor="bg-blue-500"
              />
            </div>
          </section>

        </div>

        {/* ---------- Right Column ---------- */}
        <div className="flex flex-col gap-8">

          {/* Leaderboard */}
          <section className="bg-white rounded-xl p-4 shadow-md">
            <h2 className="font-bold text-lg mb-4">Leaderboard</h2>
            <LeaderboardItem avatar="/images/user1.jpg" name="Top Scoring" score="09–12" />
            <LeaderboardItem avatar="/images/user2.jpg" name="Soseedling" score="18–13" />
            <LeaderboardItem avatar="/images/user3.jpg" name="Top Scoring" score="19–12" />
          </section>

          {/* Success Stories */}
          <section className="bg-white rounded-xl p-4 shadow-md">
            <h2 className="font-bold text-lg mb-4">Success Stories</h2>
            <SuccessStoryItem avatar="/images/student1.jpg" title="Students Sturentt" subtitle="Students and parents" />
            <SuccessStoryItem avatar="/images/student2.jpg" title="Eudeng Sunand" subtitle="Students and parents" />
          </section>
        </div>
      </div>

      {/* --- Footer should be OUTSIDE the grid --- */}
      <Footer />

    </div>
  );
}
