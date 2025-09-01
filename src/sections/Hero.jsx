// Updated Hero.js - Remove DragonModel import and usage
'use client';

import { motion } from 'framer-motion';
import styles from '../styles';
import { slideIn, staggerContainer, textVariant, fadeIn, zoomIn } from '../utils/motion';
// Remove this import: import DragonModel from '../components/DragonModel';

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const Hero = () => (
  <section className={`${styles.yPaddings} sm:pl-16 pl-6 relative overflow-hidden`}>
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth2} mx-auto flex flex-col`}
    >
      {/* Main Content Grid with Enhanced Integration */}
      <div className="relative z-10 grid lg:grid-cols-2 grid-cols-1 gap-12 items-center min-h-[80vh]">

        {/* Left Side - Enhanced Text Content */}
        <div className="flex flex-col items-start justify-center space-y-8">
          <motion.div
            variants={fadeIn('right', 'spring', 0.2, 1)}
            className="flex flex-col space-y-3"
          >
            <motion.h1
              variants={textVariant(0.5)}
              className={`${styles.heroHeading} text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-lg`}
            >
              Alpha
            </motion.h1>
            <motion.div
              variants={textVariant(0.7)}
              className="flex flex-row items-center justify-start space-x-3"
            >
              <h1 className={`${styles.heroHeading} text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500`}>
                Co
              </h1>
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
              <h1 className={`${styles.heroHeading} text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600`}>
                ing
              </h1>
            </motion.div>
            <motion.h1
              variants={textVariant(0.9)}
              className={`${styles.heroHeading} text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 drop-shadow-lg`}
            >
              Solutions
            </motion.h1>
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

        {/* Right Side - Dragon Space (Now handled by global canvas) */}
        <motion.div
          variants={zoomIn(0.6, 1.4)}
          className="relative flex justify-center items-center order-first lg:order-last"
        >
          {/* Multi-layered glowing effects - Keep for visual appeal */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-pink-500/10 to-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute inset-4 bg-gradient-to-tl from-cyan-500/10 via-purple-500/15 to-pink-500/10 rounded-full blur-2xl"></div>

          {/* Dragon Model Container - Now just a placeholder for effects */}
          <div className="relative z-10 w-full max-w-2xl mx-auto h-[600px] lg:h-[700px] flex items-center justify-center">
            {/* Placeholder content or keep empty - Dragon is now global */}
            <div className="text-center">
              <div className="text-6xl text-purple-400/20 mb-4">🐉</div>
              <p className="text-purple-300/60 text-lg">Dragon Loading...</p>
            </div>
          </div>

          {/* Enhanced floating elements with more variety */}
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

      
    </motion.div>
  </section>
);

export default Hero;