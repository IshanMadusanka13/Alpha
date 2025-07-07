// Updated Page.js with Global Dragon Canvas
'use client';
import { Footer, Navbar } from '../components';
import { About, Hero, Projects } from '../sections';
import Contact from '../sections/Contact';
import StarsCanvas from "../utils/Stars";
import DragonModel from '../components/DragonModel';

export default function Page() {
  return (
    <div className="bg-primary-black overflow-hidden scroll-smooth relative">
      <Navbar />
      
      {/* Global Dragon Canvas - Fixed Position */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-30">
        <DragonModel />
      </div>
      
      <section id="home" className="relative z-10">
        <Hero />
      </section>
      <section id="about" className="relative z-10">
        <About />
      </section>
      <section id="projects" className="relative z-10">
        <Projects />
      </section>
      <section id="contact" className="relative z-10">
        <Contact />
        <StarsCanvas />
      </section>
      <Footer />
    </div>
  );
}