// src/pages/Landing/Landing.js
import React from 'react';
import Header from '../../components/Layout/Header/Header';
import HeroSection from '../../components/Landing/HeroSection/HeroSection';


const Landing = () => {
  return (
    <div className="landing">
      <Header isLandingPage={true} />
      <HeroSection />
      
    </div>
  );
};

export default Landing;
