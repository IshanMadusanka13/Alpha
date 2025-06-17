'use client';

import { motion } from 'framer-motion';
import styles from '../styles';
import { projects } from '../constants';
import { TitleText, TypingText } from '../components';
import { staggerContainer } from '../utils/motion';
import ProjectCard from '../components/ProjectCard';

const Projects = () => (
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

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            index={i + 1}
            id={project.id}
            image={project.image}
            name={project.name}
            type={project.type}
            status={project.status}
          />

        ))}
      </div>
    </motion.div>
  </section>
);

export default Projects;
