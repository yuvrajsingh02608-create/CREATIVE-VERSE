'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const ringX = useSpring(mouseX, { damping: 20, stiffness: 250, restDelta: 0.001 });
  const ringY = useSpring(mouseY, { damping: 20, stiffness: 250, restDelta: 0.001 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
        const target = e.target;
        if (
            target.tagName === 'BUTTON' || 
            target.tagName === 'A' || 
            target.closest('button') || 
            target.closest('a') ||
            target.classList.contains('interactive')
        ) {
            setIsHovering(true);
        } else {
            setIsHovering(false);
        }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Small Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-acid rounded-full pointer-events-none z-[10000] mix-blend-exclusion"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
            scale: isHovering ? 8 : 1,
            backgroundColor: isHovering ? 'rgba(184, 255, 0, 0.4)' : '#b8ff00'
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />

      {/* Lagging Ring */}
      <motion.div
        className="fixed top-0 left-0 w-11 h-11 border border-acid/30 rounded-full pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
            scale: isHovering ? 1.5 : 1,
            borderColor: isHovering ? 'rgba(184, 255, 0, 0.8)' : 'rgba(184, 255, 0, 0.3)'
        }}
      />
    </>
  );
};

export default CustomCursor;
