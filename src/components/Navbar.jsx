'use client';

import { motion } from 'framer-motion';
import styles from '../styles';
import { navVariants } from '../utils/motion';

const Navbar = () => (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    <div className="absolute w-[50%] inset-0 gradient-01" />
    <div className={`${styles.innerWidth} mx-auto flex justify-between items-center gap-8`}>
      <h2 className="font-extrabold text-[24px] text-white leading-[30px]">
        Alpha
      </h2>
      <div className="flex gap-4">
        <button className="text-white font-semibold px-4 py-2 rounded hover:bg-white/10 transition-colors">Home</button>
        <button className="text-white font-semibold px-4 py-2 rounded hover:bg-white/10 transition-colors">About</button>
        <button className="text-white font-semibold px-4 py-2 rounded hover:bg-white/10 transition-colors">Contact</button>
        <button className="text-white font-semibold px-4 py-2 rounded hover:bg-white/10 transition-colors">Projects</button>
      </div>
    </div>
  </motion.nav>
);

export default Navbar;
