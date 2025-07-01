import { Footer, Navbar } from '../components';
import { About, Hero, Projects } from '../sections';
import Contact from '../sections/Contact';
import StarsCanvas from "../utils/Stars";

const Page = () => (
  <div className="bg-primary-black overflow-hidden scroll-smooth">
    <Navbar />
    <div id="home">
      <Hero />
    </div>
    <div id="about" className="relative">
      <About />
    </div>
    <div id="projects" className="relative">
      <Projects />
    </div>
    <div id="contact" className="relative">
      <Contact />
      <StarsCanvas />
    </div>
    <Footer />
  </div>
);

export default Page;
