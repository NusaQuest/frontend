import React from "react";
import HeroSection from "../components/sections/HeroSection";
import AdvantageSection from "../components/sections/AdvantageSection";

const Home = ({ address }) => {
  return (
    <div>
      <HeroSection address={address} />
      <AdvantageSection />
    </div>
  );
};

export default Home;
