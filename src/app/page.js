import { Footer, Navbar } from '../components';
import { About, Hero, Projects } from '../sections';
import Contact from '../sections/Contact';
import StarsCanvas from "../utils/Stars";
import ScrollVideoBackground from '../components/ScrollVideoBackground';


const Page = () => (
  <>
    {/* Video background - render first, outside main container */}
    <ScrollVideoBackground />
   
    {/* Main content with optimized scroll behavior */}
    <div
      className="overflow-hidden relative"
      style={{
        position: 'relative',
        zIndex: 1,
        scrollBehavior: 'auto' // Disable CSS smooth scroll for better video sync
      }}
    >
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
  </>
);


export default Page;