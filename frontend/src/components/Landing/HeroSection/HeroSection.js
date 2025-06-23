import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import mainBgImage from '../../../assets/mainbg.png'; 
import './HeroSection.css';
import FloatingRaffle from '../../RaffleFloatingWidget/FloatingRaffle'; 

const HeroSection = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/feed');
  };

  return (
    <section className="hero">
      <div 
        className="hero__background"
        style={{ backgroundImage: `url(${mainBgImage})` }}
      >
        <div className="hero__overlay"></div>
      </div>
      
      <div className="hero__content">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="hero__title">
            Unlock Bangkok's Secrets,
            <br />
            <span className="hero__title-accent">One Story at a Time</span>
          </h1>
          
          <motion.p
            className="hero__description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            BangkokLore.com is a vibrant microsite that brings Bangkok’s hidden soul to life through stories shared by locals and visitors alike. It weaves a rich tapestry of culture, history, and everyday experiences, offering a deeper look into the city's true character. From forgotten alleyway legends to bold street art, each post captures a side of Bangkok rarely seen in guidebooks. Through photos, videos, poems, and reflections, users can explore and contribute to a living archive of creativity and memory. Whether you're a curious traveler or a lifelong local, BangkokLore invites you to see the city through new eyes.
          </motion.p>
          
          <motion.button
            className="hero__cta"
            onClick={handleExploreClick}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Exploring
          </motion.button>
        </motion.div>

        <motion.div
  className="hero__seo-placeholder"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 1.1 }}
>
  <p>
    <strong>Discover</strong> the unseen charm of Bangkok’s neighborhoods through stories told by real people. Dive into alleyways, art, and aromas that shape the city’s identity.
  </p>
  <p>
    <strong>BangkokLore</strong> captures the cultural heartbeat of the city. From murals to myths, each contribution builds a living mosaic of creativity and memory.
  </p>
</motion.div>

      
      </div>
    <FloatingRaffle userId={123} />

    </section>
    
  );
};

export default HeroSection;
