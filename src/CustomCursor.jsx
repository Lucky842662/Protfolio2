import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = ({ 
  color = '#6366f1',
  dotSize = 8,
  ringSize = 40,
  magneticElements = ['a', 'button', '[data-magnetic]', '.magnetic-button', '.project-card']
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isOnMagnetic, setIsOnMagnetic] = useState(false);
  
  // Cursor position
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Smooth spring animations
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  
  // Ring position (slightly behind for trail effect)
  const ringX = useSpring(cursorX, { damping: 30, stiffness: 200, mass: 0.8 });
  const ringY = useSpring(cursorY, { damping: 30, stiffness: 200, mass: 0.8 });

  useEffect(() => {
    // Show cursor when mouse moves
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX - (dotSize / 2));
      cursorY.set(e.clientY - (dotSize / 2));
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detect hover on interactive elements
    const handleMouseOver = (e) => {
      const isMagnetic = magneticElements.some(selector => 
        e.target.closest(selector)
      );
      
      setIsHovering(true);
      setIsOnMagnetic(isMagnetic);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
      setIsOnMagnetic(false);
    };

    // Add event listeners
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Cleanup
    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY, dotSize, magneticElements]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className={`cursor-dot ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''} ${isOnMagnetic ? 'magnetic' : ''}`}
        style={{
          x: springX,
          y: springY,
          width: dotSize,
          height: dotSize,
          backgroundColor: color,
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      />

      {/* Cursor ring */}
      <motion.div
        className={`cursor-ring ${isHovering ? 'hover' : ''} ${isClicking ? 'click' : ''} ${isOnMagnetic ? 'magnetic' : ''}`}
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          borderColor: color,
        }}
        animate={{
          scale: isClicking ? 0.9 : isHovering ? 1.5 : 1,
          rotate: isHovering ? 45 : 0,
          borderWidth: isHovering ? 3 : 2,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
      />
    </>
  );
};

export default CustomCursor;