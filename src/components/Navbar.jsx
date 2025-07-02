'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from '../styles';
import { navVariants } from '../utils/motion';

const Navbar = () => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  // Updated color schemes to match the dragon aesthetic and hero section
  const colorSchemes = [
    {
      background: 'from-purple-900/30 via-pink-900/20 to-blue-900/30',
      logo: 'from-purple-400 via-pink-500 to-red-500',
      overlay: 'from-purple-500/10 to-pink-500/10'
    },
    {
      background: 'from-cyan-900/30 via-blue-900/20 to-purple-900/30',
      logo: 'from-cyan-400 via-blue-500 to-purple-500',
      overlay: 'from-cyan-500/10 to-blue-500/10'
    },
    {
      background: 'from-emerald-900/30 via-teal-900/20 to-cyan-900/30',
      logo: 'from-emerald-400 via-teal-500 to-cyan-500',
      overlay: 'from-emerald-500/10 to-teal-500/10'
    },
    {
      background: 'from-rose-900/30 via-pink-900/20 to-purple-900/30',
      logo: 'from-rose-400 via-pink-500 to-purple-500',
      overlay: 'from-rose-500/10 to-pink-500/10'
    },
    {
      background: 'from-amber-900/30 via-orange-900/20 to-red-900/30',
      logo: 'from-amber-400 via-orange-500 to-red-500',
      overlay: 'from-amber-500/10 to-orange-500/10'
    }
  ];

  // Auto color change synchronized with hero section (same timing)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % colorSchemes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentColors = colorSchemes[currentColorIndex];

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className={`${styles.xPaddings} py-8 relative overflow-hidden backdrop-blur-md`}
    >
      {/* Primary Animated Background - matches hero exactly */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`navbar-primary-${currentColorIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className={`absolute inset-0 bg-gradient-to-br ${currentColors.background} blur-2xl`}
        />
      </AnimatePresence>

      {/* Secondary gradient overlay for depth */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`navbar-overlay-${currentColorIndex}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
          className={`absolute inset-0 bg-gradient-to-r ${currentColors.overlay} blur-xl`}
        />
      </AnimatePresence>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_transparent_0%,_rgba(0,0,0,0.3)_100%)]" />

      {/* Original gradient overlay */}
      <div className="absolute w-[50%] inset-0 gradient-01 opacity-60" />

      <div className={`${styles.innerWidth} mx-auto flex justify-between items-center gap-8 relative z-10`}>
        {/* Enhanced Logo with synchronized color transitions */}
        <AnimatePresence mode="wait">
          <motion.h2
            key={`logo-${currentColorIndex}`}
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 1.1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className={`font-extrabold text-[24px] leading-[30px] text-transparent bg-clip-text bg-gradient-to-r ${currentColors.logo} drop-shadow-2xl filter brightness-110`}
          >
            Alpha
          </motion.h2>
        </AnimatePresence>

        {/* Enhanced Navigation Links with dragon-themed styling */}
        <div className="flex gap-4">
          <motion.a
            href="#home"
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              y: -2,
              boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
            className="text-white font-semibold px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-purple-400/50"
          >
            Home
          </motion.a>
          <motion.a
            href="#about"
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              y: -2,
              boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
            className="text-white font-semibold px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-purple-400/50"
          >
            About
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              y: -2,
              boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
            className="text-white font-semibold px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-purple-400/50"
          >
            Contact
          </motion.a>
          <motion.a
            href="#projects"
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              y: -2,
              boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
            className="text-white font-semibold px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-purple-400/50"
          >
            Projects
          </motion.a>
        </div>
      </div>

      {/* Enhanced floating decorative elements with color sync */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`particle-1-${currentColorIndex}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.6, 1, 0.6],
            y: [-10, 10, -10],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute top-4 right-20 w-2 h-2 bg-gradient-to-r ${currentColors.logo.split(' ')[0]} ${currentColors.logo.split(' ')[2]} rounded-full shadow-lg`}
        />
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`particle-2-${currentColorIndex}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            y: [10, -10, 10],
            x: [-5, 5, -5],
            rotate: [0, -180, -360],
            scale: [0.8, 1.3, 0.8]
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute bottom-4 left-20 w-3 h-3 bg-gradient-to-r ${currentColors.logo.split(' ')[4]} ${currentColors.logo.split(' ')[6]} rounded-full shadow-lg`}
        />
      </AnimatePresence>

      {/* Dragon-themed mystical glow effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`mystical-glow-${currentColorIndex}`}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1.2, 0.8]
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute inset-0 bg-gradient-to-r ${currentColors.background} rounded-full blur-3xl opacity-20`}
        />
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
