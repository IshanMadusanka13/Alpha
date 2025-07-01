'use client';

import { motion } from 'framer-motion';
import { socials } from '../constants';
import styles from '../styles';
import { footerVariants } from '../utils/motion';

const Footer = () => (
  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    <div className="footer-gradient" />
    <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>

      <div className="flex flex-col">
        <div className="mb-[32px] h-[2px] bg-white opacity-10" />

        <div className="flex items-center justify-between flex-wrap gap-4">
          <h4 className="font-extrabold text-[20px] text-white tracking-wider">
            Alpha
          </h4>
          <p className="font-normal text-[14px] text-white opacity-50">
            &copy; {new Date().getFullYear()} Alpha. All rights reserved.
          </p>
          <div className="flex gap-4">
            {socials.map((social) => (
              <a key={social.name} href={social.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={social.url}
                  alt={social.name}
                  className="w-[24px] h-[24px] object-contain hover:scale-110 transition-transform"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
