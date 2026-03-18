import HeroSection from "../commponent/HeroSection";

import HowItWorks from "../commponent/HowItWorks";
import TrustFeatures from "../commponent/TrustFeatures";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import OurSpecialty from "../commponent/OurSpecialty";
import TopDoctors from "../commponent/TopDoctors";

function Home() {
  return (
    <div>
      <div className="min-h-screen bg-[#F0F0F0]">
        <div className="container mx-auto px-2 py-2">
          <HeroSection />
          <TrustFeatures />
          <OurSpecialty />
          <TopDoctors />
          <HowItWorks />
        </div>
      </div>
    </div>
  );
}

export default Home;
