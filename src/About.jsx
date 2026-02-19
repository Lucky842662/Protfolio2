import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaUser, FaCode, FaServer, FaDatabase, FaCloud, FaTools } from 'react-icons/fa';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const stats = [
    { icon: <FaCode />, value: '1+', label: 'Years Experience' },
    { icon: <FaServer />, value: '5+', label: 'Projects Completed' },
    { icon: <FaDatabase />, value: '3+', label: 'Happy Clients' },
    { icon: <FaCloud />, value: '2+', label: 'API Integrations' }
  ];

  const bioLines = [
    { line: '01', text: "I'm a full-stack developer who loves building things that live on the internet." },
    { line: '02', text: 'I develop exceptional websites and web apps that provide intuitive, pixel-perfect user interfaces with efficient and modern backends.' },
    { line: '03', text: 'Over the past 1 years, I\'ve worked with startups and established companies to deliver high-quality software solutions.' },
    { line: '04', text: 'I believe in clean code, continuous learning, and sharing knowledge with the developer community.' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.section 
      id="about" 
      className="about"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="container">
        <motion.h2 className="section-title" variants={itemVariants}>
          _about me
        </motion.h2>

        <div className="about-content">
          <motion.div className="about-left" variants={itemVariants}>
            <div className="code-comment">&lt;!-- Personal Info --&gt;</div>
            
            <div className="bio-container">
              {bioLines.map((bio, index) => (
                <motion.div 
                  key={index}
                  className="bio-line"
                  variants={itemVariants}
                  custom={index}
                >
                  <span className="line-number">{bio.line.padStart(2, '0')}</span>
                  <span className="bio-text">{bio.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div className="stats-grid" variants={itemVariants}>
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="stat-card"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="about-right" variants={itemVariants}>
            <div className="code-snippet">
              <div className="code-line">
                <span className="line-number">1</span>
                <span className="line-content">
                  <span className="keyword">const</span> <span className="function">Developer</span> = {'{'}
                </span>
              </div>
              <div className="code-line">
                <span className="line-number">2</span>
                <span className="line-content">
                  &nbsp;&nbsp;<span className="property">name</span>: <span className="string">'Lucky Shankhala'</span>,
                </span>
              </div>
              <div className="code-line">
                <span className="line-number">3</span>
                <span className="line-content">
                  &nbsp;&nbsp;<span className="property">location</span>: <span className="string">'Delhi,India'</span>,
                </span>
              </div>
              <div className="code-line">
                <span className="line-number">4</span>
                <span className="line-content">
                  &nbsp;&nbsp;<span className="property">languages</span>: [<span className="string">'JavaScript'</span>, <span className="string">'Python'</span>, <span className="string">'TypeScript'</span>],
                </span>
              </div>
              <div className="code-line">
                <span className="line-number">5</span>
                <span className="line-content">
                  &nbsp;&nbsp;<span className="property">frameworks</span>: [<span className="string">'React'</span>, <span className="string">'Node'</span>, <span className="string">'Express'</span>],
                </span>
              </div>
              <div className="code-line">
                <span className="line-number">6</span>
                <span className="line-content">
                  &nbsp;&nbsp;<span className="property">database</span>: [<span className="string">'MongoDB'</span>, <span className="string">'PostgreSQL'</span>],
                </span>
              </div>
              <div className="code-line">
                <span className="line-number">7</span>
                <span className="line-content">
                  &nbsp;&nbsp;<span className="property">passionate</span>: <span className="keyword">true</span>,
                </span>
              </div>

              
              <div className="code-line">
                <span className="line-number">8</span>
                <span className="line-content">
                  &nbsp;&nbsp;<span className="property">education</span>: <span className="string">"Self-taught Developer"</span>
                </span>
              </div>
              <div className="code-line">
                <span className="line-number">9</span>
                <span className="line-content">{'};'}</span>
              </div>
            </div>

            <motion.div 
              className="quote-container"
              // whileHover={{ scale: 1.5 }}
              // transition={{ type: "spring", stiffness: 300 }}  
            >
              <div className="quote-icon">"</div>
              <p className="quote-text">
              "I didn't learn to code in a classroom. I learned at 2 AM, fueled by coffee and curiosity."
              </p>
              <div className="quote-author">- Lucky Shankhala</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;