import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Hero from './Hero.jsx';
import About from './About';
import Skill from './Skill';
import Project from './Project';
import Experience from './Experience';
import Contact from './Contact';
import Footer from './Footer';
import N8NChatbot from './N8NChatbot'; // Add this import
import './Global.css';
import './App.css';
import CustomCursor from './CustomCursor';

function App() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      document.body.style.overflow = 'unset';
    }, 2000);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
        <main>
          <Hero />
          <About /> 
          <Skill />
          <Project />
          <Experience />
          <Contact />
          <CustomCursor
            color="#6366f1"
            dotSize={8}
            ringSize={40}
            magneticElements={['a', 'button', '.magnetic-button', '.project-card', '.nav-item']}
          />
          {/* Add chatbot here - after CustomCursor but before Footer */}
          {/* Use the default webhook URL defined inside N8NChatbot.jsx */}
          <N8NChatbot 
            title="Sophia"
            primaryColor="#6366f1"
          />
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;