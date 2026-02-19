import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaCode } from 'react-icons/fa';
import Typed from 'typed.js';
import './Hero.css';


const Hero = () => {
  const typedRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        'MERN Stack Developer',
        'React Specialist',
        'Node.js Expert',
        'Full Stack Engineer',
        'API Architect'
      ],
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });

    return () => typed.destroy();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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
      id="home" 
      className="hero"
      style={{ y, opacity }}
    >
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="code-comment" variants={itemVariants}>
            &lt;!-- Hello, World! --&gt;
          </motion.div>
          
          <motion.h1 className="hero-title" variants={itemVariants}>
            <span className="hero-greeting">const developer = </span>
            <span className="hero-brace">{'{'}</span>
          </motion.h1>
          
          <motion.div className="hero-name" variants={itemVariants}>
            <span className="line-number">01.</span>
            <span className="property">name</span>
            <span className="operator">: </span>
            <span className="value">"Lucky Shankhala"</span>
            <span className="punctuation">,</span>
          </motion.div>
          
          <motion.div className="hero-role" variants={itemVariants}>
            <span className="line-number">02.</span>
            <span className="property">role</span>
            <span className="operator">: </span>
            <span className="value typed-string">
              "<span ref={typedRef}></span>"
            </span>
          </motion.div>
          
          <motion.div className="hero-brace-close" variants={itemVariants}>
            <span className="hero-brace">{'};'}</span>
          </motion.div>
          
          <motion.p className="hero-description" variants={itemVariants}>
            Passionate full-stack developer with 1+ years of experience building 
            web applications. I specialize in the MERN stack, crafting 
            pixel-perfect interfaces backed by robust serverless architectures.
          </motion.p>
          
          <motion.div className="hero-buttons" variants={itemVariants}>
            <motion.a 
              href="#projects" 
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              view projects()
            </motion.a>
            <motion.a 
              href="\public\Lucky.jpg" 
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              download
            >
              download cv()
            </motion.a>
          </motion.div>

          <motion.div className="hero-social" variants={itemVariants}>
            {[
              { icon: FaGithub, url: 'https://github.com/Lucky842662' },
              { icon: FaLinkedin, url: 'https://linkedin.com' },
              { icon: FaTwitter, url: 'https://twitter.com' },
              { icon: FaCode, url: 'https://codepen.io' }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <social.icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="code-snippet">
            <div className="code-line">
              <span className="line-number">1</span>
              <span className="line-content">
                <span className="keyword">import</span> {'{'} <span className="string">useState</span>, <span className="string">useEffect</span> {'}'} <span className="keyword">from</span> <span className="string">'react'</span>;
              </span>
            </div>
            <div className="code-line">
              <span className="line-number">2</span>
              <span className="line-content">
                <span className="keyword">import</span> {'{'} <span className="string">motion</span> {'}'} <span className="keyword">from</span> <span className="string">'framer-motion'</span>;
              </span>
            </div>
            <div className="code-line">
              <span className="line-number">3</span>
              <span className="line-content">
                <span className="keyword">import</span> {'{'} <span className="string">MongoClient</span> {'}'} <span className="keyword">from</span> <span className="string">'mongodb'</span>;
              </span>
            </div>
            <div className="code-line">
              <span className="line-number">4</span>
              <span className="line-content">
                <span className="keyword">const</span> <span className="function">Developer</span> = <span className="punctuation">(</span><span className="punctuation">)</span> {'=>'} {'{'}
              </span>
            </div>
            <div className="code-line">
              <span className="line-number">5</span>
              <span className="line-content">
                &nbsp;&nbsp;<span className="keyword">const</span> [stack] = <span className="function">useState</span><span className="punctuation">(</span><span className="string">['MERN']</span><span className="punctuation">)</span>;
              </span>
            </div>
            <div className="code-line">
              <span className="line-number">6</span>
              <span className="line-content">
                &nbsp;&nbsp;<span className="keyword">return</span> <span className="string">&lt;div&gt;Building Amazing website&lt;/div&gt;</span>;
              </span>
            </div>
            <div className="code-line">
              <span className="line-number">7</span>
              <span className="line-content">
                {'}'}
              </span>
            </div>
          </div>
          
          <div className="floating-elements">
            <motion.div 
              className="floating-icon mongo"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🍃
            </motion.div>
            <motion.div 
              className="floating-icon express"
              animate={{ y: [0, -30, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
            >
              ⚡
            </motion.div>
            <motion.div 
              className="floating-icon react"
              animate={{ y: [0, -25, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
            >
              ⚛️
            </motion.div>
            <motion.div 
              className="floating-icon node"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
            >
              🟢
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <a href="#about">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </motion.div>
    </motion.section>
  );
};

export default Hero;