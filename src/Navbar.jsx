import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaCode } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: '_home' },
    { id: 'about', label: '_about' },
    { id: 'skills', label: '_skills' },
    { id: 'projects', label: '_projects' },
    { id: 'experience', label: '_experience' },
    { id: 'contact', label: '_contact' }
  ];

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <motion.a 
          href="#home" 
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaCode className="logo-icon" />
          <span className="logo-text">const dev = {"{"} <span className="logo-name">Lucky</span> {"}"};</span>
        </motion.a>

        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          {menuItems.map((item, index) => (
            <motion.a
              key={index}
              href={`#${item.id}`}
              className={`navbar-item ${activeSection === item.id ? 'active' : ''}`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        <motion.button 
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;