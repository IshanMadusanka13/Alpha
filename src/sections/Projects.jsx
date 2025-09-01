'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Add this import
import styles from '../styles';
import { projects } from '../constants';
import { TitleText, TypingText } from '../components';
import { staggerContainer, fadeIn } from '../utils/motion';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(0);
  const router = useRouter(); // Add router

  // Handler for View Full Project button
  const handleViewProject = () => {
    const project = projects[selectedProject];
    
    // Option 1: Navigate to project detail page
    router.push(`/projects/${project.id}`);
    
    // Option 2: Open in new tab if project has a URL
    if (project.url) {
      window.open(project.url, '_blank');
    }
    
    // Option 3: Show alert (temporary - replace with your preferred action)
    // alert(`Viewing project: ${project.name}`);
  };

  return (
    <section className={`${styles.paddings} relative z-10`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| Our Projects" textStyles="text-center" />
        <TitleText title="Explore Our Work" textStyles="text-center" />

        {/* Main Showcase Area */}
        <div className="mt-16 flex flex-col lg:flex-row gap-8 items-center">
          {/* Monitor Display */}
          <motion.div 
            variants={fadeIn('right', 'tween', 0.2, 1)}
            className="flex-1 relative"
          >
            <div className="relative mx-auto max-w-[800px]">
              {/* Monitor Frame */}
              <div className="relative bg-gray-900 rounded-t-3xl p-6 shadow-2xl">
                {/* Monitor Screen */}
                <div className="relative bg-black rounded-2xl overflow-hidden aspect-[16/10] border-4 border-gray-800">
                  {/* Screen Content */}
                  <motion.div
                    key={selectedProject}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                  >
                    <img
                      src={projects[selectedProject].image}
                      alt={projects[selectedProject].name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay with project info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                      <div>
                        <motion.h3 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-white text-3xl font-bold mb-2"
                        >
                          {projects[selectedProject].name}
                        </motion.h3>
                        <motion.p 
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-gray-300 text-lg"
                        >
                          {projects[selectedProject].type}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Screen Reflection Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>

                {/* Monitor Notch/Camera */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-700 rounded-full" />
              </div>

              {/* Monitor Stand */}
              <div className="relative">
                <div className="mx-auto w-32 h-20 bg-gradient-to-b from-gray-900 to-gray-800 clip-path-trapezoid" />
                <div className="mx-auto w-48 h-2 bg-gray-900 rounded-b-lg" />
              </div>

              {/* Desk Shadow */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-64 h-4 bg-black/20 blur-xl rounded-full" />
            </div>
          </motion.div>

          {/* Project Selector */}
          <motion.div 
            variants={fadeIn('left', 'tween', 0.3, 1)}
            className="flex-1 lg:max-w-md"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Select Project</h3>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedProject(index)}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
                    selectedProject === index
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold text-lg">{project.name}</h4>
                      <p className="text-gray-400 text-sm mt-1">{project.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Completed' 
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {project.status}
                      </span>
                      {selectedProject === index && (
                        <motion.div
                          layoutId="selector"
                          className="w-2 h-2 bg-purple-500 rounded-full"
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View Project Button - Now with onClick handler */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewProject}
              className="mt-8 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">View Full Project</span>
              {/* Button hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            {/* Optional: Add more action buttons */}
            {/* <div className="mt-4 flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Add GitHub link functionality
                  const project = projects[selectedProject];
                  if (project.github) {
                    window.open(project.github, '_blank');
                  }
                }}
                className="flex-1 bg-gray-800 text-white font-medium py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300"
              >
                View Code
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Add demo link functionality
                  const project = projects[selectedProject];
                  if (project.demo) {
                    window.open(project.demo, '_blank');
                  }
                }}
                className="flex-1 bg-gray-800 text-white font-medium py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300"
              >
                Live Demo
              </motion.button>
            </div> */}
          </motion.div>
        </div>

        {/* Additional Features */}
        <motion.div 
          variants={fadeIn('up', 'tween', 0.5, 1)}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {['Modern Design', 'Responsive', 'High Performance'].map((feature, index) => (
            <motion.div
              key={feature}
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center"
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-400 text-xl">✓</span>
              </div>
              <h4 className="text-white font-semibold">{feature}</h4>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Add custom CSS for trapezoid shape */}
      <style jsx>{`
        .clip-path-trapezoid {
          clip-path: polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%);
        }
      `}</style>
    </section>
  );
};

export default Projects;