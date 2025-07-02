'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from '../styles';
import { slideIn, staggerContainer, textVariant, fadeIn, zoomIn } from '../utils/motion';
import DragonModel from '../components/DragonModel';

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const Hero = () => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  // Color schemes for smooth transitions
  const colorSchemes = [
    {
      alpha: 'from-purple-400 via-pink-500 to-red-500',
      co: 'from-blue-400 via-purple-500 to-pink-500',
      ing: 'from-green-400 via-blue-500 to-purple-600',
      solutions: 'from-yellow-400 via-red-500 to-pink-500',
      background: 'from-purple-900/20 via-pink-900/15 to-blue-900/20'
    },
    {
      alpha: 'from-cyan-400 via-blue-500 to-purple-500',
      co: 'from-green-400 via-cyan-500 to-blue-500',
      ing: 'from-yellow-400 via-green-500 to-cyan-600',
      solutions: 'from-red-400 via-pink-500 to-purple-500',
      background: 'from-cyan-900/20 via-blue-900/15 to-purple-900/20'
    },
    {
      alpha: 'from-emerald-400 via-teal-500 to-cyan-500',
      co: 'from-yellow-400 via-orange-500 to-red-500',
      ing: 'from-pink-400 via-purple-500 to-indigo-600',
      solutions: 'from-blue-400 via-indigo-500 to-purple-500',
      background: 'from-emerald-900/20 via-teal-900/15 to-cyan-900/20'
    },
    {
      alpha: 'from-rose-400 via-pink-500 to-purple-500',
      co: 'from-orange-400 via-red-500 to-pink-500',
      ing: 'from-violet-400 via-purple-500 to-indigo-600',
      solutions: 'from-indigo-400 via-blue-500 to-cyan-500',
      background: 'from-rose-900/20 via-pink-900/15 to-purple-900/20'
    },
    {
      alpha: 'from-amber-400 via-orange-500 to-red-500',
      co: 'from-lime-400 via-green-500 to-emerald-500',
      ing: 'from-sky-400 via-blue-500 to-indigo-600',
      solutions: 'from-fuchsia-400 via-purple-500 to-pink-500',
      background: 'from-amber-900/20 via-orange-900/15 to-red-900/20'
    }
  ];

  // Auto color change with smooth transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % colorSchemes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentColors = colorSchemes[currentColorIndex];

  return (
    <section className={`${styles.yPaddings} sm:pl-16 pl-6 relative overflow-hidden`}>
      {/* Unified Animated Background */}
      <motion.div
        key={currentColorIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className={`absolute inset-0 bg-gradient-to-br ${currentColors.background} blur-3xl`}
      />
      
      {/* Additional background layers for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth2} mx-auto flex flex-col relative z-10`}
      >
        <div className="relative z-10 grid lg:grid-cols-2 grid-cols-1 gap-12 items-center min-h-[80vh]">
          {/* Left Side - Enhanced Text Content with Smooth Color Transitions */}
          <div className="flex flex-col items-start justify-center space-y-8">
            <motion.div
              variants={fadeIn('right', 'spring', 0.2, 1)}
              className="flex flex-col space-y-3"
            >
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`alpha-${currentColorIndex}`}
                  variants={textVariant(0.5)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className={`${styles.heroHeading} text-transparent bg-clip-text bg-gradient-to-r ${currentColors.alpha} drop-shadow-lg`}
                >
                  Alpha
                </motion.h1>
              </AnimatePresence>

              <motion.div
                variants={textVariant(0.7)}
                className="flex flex-row items-center justify-start space-x-3"
              >
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={`co-${currentColorIndex}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className={`${styles.heroHeading} text-transparent bg-clip-text bg-gradient-to-r ${currentColors.co}`}
                  >
                    Co
                  </motion.h1>
                </AnimatePresence>

                <motion.div
                  className={`${styles.heroDText} bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg`}
                  animate={{
                    scale: [1, 1.15, 1],
                    rotate: [0, 8, -8, 0],
                    boxShadow: [
                      '0 0 20px rgba(6, 182, 212, 0.3)',
                      '0 0 40px rgba(59, 130, 246, 0.5)',
                      '0 0 20px rgba(6, 182, 212, 0.3)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                />

                <AnimatePresence mode="wait">
                  <motion.h1
                    key={`ing-${currentColorIndex}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className={`${styles.heroHeading} text-transparent bg-clip-text bg-gradient-to-r ${currentColors.ing}`}
                  >
                    ing
                  </motion.h1>
                </AnimatePresence>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.h1
                  key={`solutions-${currentColorIndex}`}
                  variants={textVariant(0.9)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className={`${styles.heroHeading} text-transparent bg-clip-text bg-gradient-to-r ${currentColors.solutions} drop-shadow-lg`}
                >
                  Solutions
                </motion.h1>
              </AnimatePresence>
            </motion.div>

            {/* Enhanced Subtitle */}
            <motion.p
              variants={fadeIn('right', 'tween', 1.2, 1)}
              className="text-xl md:text-2xl text-gray-200 max-w-xl leading-relaxed font-light"
            >
              Transforming ideas into powerful digital experiences with cutting-edge technology and creative innovation.
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div
              variants={fadeIn('up', 'tween', 1.4, 1)}
              className="flex flex-wrap gap-6 mt-10"
            >
              <motion.button
                whileHover={{
                  scale: 1.08,
                  boxShadow: '0 25px 50px rgba(139, 92, 246, 0.4)',
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 border border-purple-400/20"
              >
                Contact Us
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.08,
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('projects')}
                className="px-10 py-5 border-2 border-purple-400 rounded-full text-purple-300 font-bold text-lg hover:text-white transition-all duration-300 backdrop-blur-sm"
              >
                View Projects
              </motion.button>
            </motion.div>
          </div>

          {/* Right Side - Enhanced 3D Dragon Integration */}
          <motion.div
            variants={zoomIn(0.6, 1.4)}
            className="relative flex justify-center items-center order-first lg:order-last"
          >
            {/* Multi-layered glowing effects that sync with color changes */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`glow-${currentColorIndex}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className={`absolute inset-0 bg-gradient-to-br ${currentColors.background} rounded-full blur-3xl animate-pulse`}
              />
            </AnimatePresence>

            {/* Dragon Model Container */}
            <div className="relative z-10 w-full max-w-2xl mx-auto h-[600px] lg:h-[700px]">
              <DragonModel currentColorIndex={currentColorIndex} />
            </div>

            {/* Enhanced floating elements with color sync */}
            <motion.div
              animate={{
                y: [-20, 20, -20],
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-12 right-12 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-70 shadow-lg"
            />
            <motion.div
              animate={{
                y: [20, -20, 20],
                x: [-10, 10, -10],
                rotate: [0, -180, -360]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-20 left-12 w-5 h-5 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-50 shadow-lg"
            />
            <motion.div
              animate={{
                y: [-15, 15, -15],
                x: [8, -8, 8],
                scale: [0.8, 1.3, 0.8]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 left-8 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-60 shadow-lg"
            />
          </motion.div>
        </div>

        {/* Enhanced Bottom Section */}
        <motion.div
          variants={slideIn('up', 'tween', 1.8, 1)}
          className="relative w-full mt-16 lg:mt-12"
        >
          <div className="absolute w-full h-[300px] hero-gradient rounded-tl-[140px] z-[0] -top-[20px] shadow-2xl"></div>
          <img
            src="/hero.png"
            alt="Alpha Coding Solutions showcase"
            className="w-full sm:h-[400px] h-[300px] object-cover rounded-tl-[140px] z-10 relative shadow-2xl border border-purple-500/20"
          />

          <a href="#explore">
            <div className="w-full flex justify-end sm:-mt-[80px] -mt-[60px] pr-[40px] relative z-20">
              <motion.div
                whileHover={{ scale: 1.15, rotate: 15 }}
                className="relative"
              >
                <motion.img
                  src="/stamp.png"
                  alt="certification stamp"
                  className="sm:w-[140px] w-[100px] sm:h-[140px] h-[100px] object-contain drop-shadow-2xl"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute inset-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-lg"></div>
              </motion.div>
            </div>
          </a>
        </motion.div>

        {/* Enhanced Background decorative elements with color sync */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={`bg-1-${currentColorIndex}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0.03, 0.12, 0.03],
                scale: [1, 1.2, 1],
                rotate: [0, 90, 180, 270, 360]
              }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`absolute top-32 left-32 w-96 h-96 bg-gradient-to-r ${currentColors.background} rounded-full blur-3xl`}
            />
          </AnimatePresence>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={`bg-2-${currentColorIndex}`}
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{
                opacity: [0.05, 0.15, 0.05],
                scale: [1.2, 1, 1.2],
                rotate: [360, 270, 180, 90, 0]
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-r ${currentColors.background} rounded-full blur-3xl`}
            />
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
