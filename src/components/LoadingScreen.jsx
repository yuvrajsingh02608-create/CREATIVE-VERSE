'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } }}
          className="fixed inset-0 z-[10001] bg-[#05050a] flex flex-col items-center justify-center"
        >
          {/* Ambient Glow Pulse */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[600px] h-[600px] bg-violet rounded-full blur-[120px] pointer-events-none"
          />

          <div className="relative z-10 text-center">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-6xl font-bebas tracking-[12px] text-white mb-2"
            >
              CREATIVEVERSE
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                className="font-mono text-[10px] tracking-[6px] text-white/40 uppercase mb-12"
            >
                WHERE ART MEETS OPPORTUNITY
            </motion.p>

            {/* Progress Track */}
            <div className="w-[240px] h-[1px] bg-white/10 relative overflow-hidden mb-4 mx-auto">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet to-acid"
                />
            </div>

            <motion.span 
                className="font-mono text-[10px] text-acid/60 tracking-widest"
            >
                {Math.min(100, progress)}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
