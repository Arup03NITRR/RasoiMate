import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HomePage/HeroSection';
import AboutSection from '../components/HomePage/AboutSection';
import Footer from '../components/HomePage/Footer';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-yellow-50 to-pink-100">
      <HeroSection onStart={() => navigate('/recipe')} />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default HomePage;
