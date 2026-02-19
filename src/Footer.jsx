import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaCode, FaInstagram, FaGithub, FaLinkedin, FaTimes } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [imageExpanded, setImageExpanded] = useState(false);

  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <div className="container">
        <div className="footer-content">
          
          {/* Profile Section with Image - Fixed */}
          <motion.div 
            className="footer-profile"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          >
            <div className="profile-image-wrapper">
              <div 
                className="profile-image-container profile-image-clickable"
                onClick={() => setImageExpanded(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setImageExpanded(true)}
                aria-label="View full profile photo"
              >
                <img 
                  src="/Luckypic.jpg"
                  alt="Lucky Shankhala"
                  className="profile-image"
                />
                <div className="profile-glow"></div>
              </div>
            </div>

            {/* Image preview overlay - full image in compact view */}
            <AnimatePresence>
              {imageExpanded && (
                <motion.div
                  className="image-preview-overlay"
                  onClick={() => setImageExpanded(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="image-preview-box"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <button
                      className="image-preview-close"
                      onClick={() => setImageExpanded(false)}
                      aria-label="Close preview"
                    >
                      <FaTimes />
                    </button>
                    <img 
                      src="/Luckypic.jpg"
                      alt="Lucky Shankhala - Full view"
                      className="image-preview-img"
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="profile-info">
              <h4>Lucky Shankhala</h4>
              <p>MERN Stack Developer</p>
              <div className="profile-social">
                <a href="https://www.instagram.com/iamluckyshankhala_?igsh=bDNnMmZ4eWNzb2Ez" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
                <a href="https://github.com/Lucky842662" target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com/in/luckyshankhala" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Logo Section */}
          {/* <div className="footer-logo">
            <FaCode className="logo-icon" />
            <span className="logo-text">Lucky Shankhala</span>
          </div> */}

          {/* Navigation Links */}
          <div className="footer-links">
            <a href="#home">_home</a>
            <a href="#about">_about</a>
            <a href="#skills">_skills</a>
            <a href="#projects">_projects</a>
            <a href="#contact">_contact</a>
          </div>

          {/* Copyright */}
          <div className="footer-copyright">
            <p>
              © {currentYear} Built with <FaHeart className="heart-icon" /> using React 
            </p>
            <p className="footer-signature">
              <span className="code-comment">&lt;DevelopedBy /&gt;</span> Lucky Shankhala
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;