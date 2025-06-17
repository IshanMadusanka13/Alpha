'use client';

import { useRouter } from 'next/navigation';
import { projects } from '../../../constants';
import { motion } from 'framer-motion';

const codeSnippets = [
  { text: '<div>', color: '#3b82f6', top: '10%', left: '5%', size: 'text-2xl', delay: 0 },
  { text: '{...}', color: '#f472b6', top: '30%', left: '80%', size: 'text-xl', delay: 0.8 },
  { text: 'const', color: '#facc15', top: '60%', left: '15%', size: 'text-lg', delay: 1.2 },
  { text: '</>', color: '#22d3ee', top: '50%', left: '60%', size: 'text-2xl', delay: 0.4 },
  { text: '()', color: '#a78bfa', top: '75%', left: '40%', size: 'text-xl', delay: 1.6 },
  { text: 'return', color: '#34d399', top: '20%', left: '55%', size: 'text-lg', delay: 1.0 },
  { text: '=>', color: '#f59e42', top: '65%', left: '70%', size: 'text-xl', delay: 0.6 },
  { text: 'function', color: '#eab308', top: '85%', left: '20%', size: 'text-base', delay: 1.8 },
];

function AnimatedCodeBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {codeSnippets.map((item, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: [0, 0.7, 0], y: [30, 0, -30] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: item.delay,
            ease: 'easeInOut'
          }}
          className={`absolute select-none font-mono ${item.size}`}
          style={{
            color: item.color,
            top: item.top,
            left: item.left,
            textShadow: '0 4px 24px rgba(0,0,0,0.6)'
          }}
        >
          {item.text}
        </motion.span>
      ))}
    </div>
  );
}




const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, type: 'spring', stiffness: 80 }
    }),
};

export default function ProjectDetailPage({ params }) {
    const router = useRouter();
    const project = projects.find(p => p.id === params.id);

    if (!project) {
        return (
            <div className="text-center text-white mt-20">
                Project not found.
            </div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className="relative min-h-screen py-12 px-4 overflow-hidden bg-[#18181b]"
        >
            <AnimatedCodeBackground />
            {/* Animated Blobs Background */}
            <div className="pointer-events-none absolute inset-0 z-0">
                <svg className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] opacity-50 animate-blob1" viewBox="0 0 600 600">
                    <g transform="translate(300,300)">
                        <path d="M120,-156.8C158.6,-135.5,198.7,-111.8,209.2,-77.1C219.7,-42.4,200.7,3.3,180.7,49.3C160.7,95.4,139.7,141.7,104.3,159.3C68.9,176.9,19.9,165.8,-33.1,168.2C-86.1,170.6,-143.1,186.5,-170.2,162.2C-197.3,137.8,-194.6,73.9,-190.2,17.7C-185.8,-38.5,-179.7,-87.1,-151.2,-110.5C-122.7,-133.9,-71.8,-132,-25.9,-132.2C20.1,-132.3,40.3,-134.1,120,-156.8Z" fill="#3b82f6" />
                    </g>
                </svg>
                <svg className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] opacity-40 animate-blob2" viewBox="0 0 600 600">
                    <g transform="translate(300,300)">
                        <path d="M120,-156.8C158.6,-135.5,198.7,-111.8,209.2,-77.1C219.7,-42.4,200.7,3.3,180.7,49.3C160.7,95.4,139.7,141.7,104.3,159.3C68.9,176.9,19.9,165.8,-33.1,168.2C-86.1,170.6,-143.1,186.5,-170.2,162.2C-197.3,137.8,-194.6,73.9,-190.2,17.7C-185.8,-38.5,-179.7,-87.1,-151.2,-110.5C-122.7,-133.9,-71.8,-132,-25.9,-132.2C20.1,-132.3,40.3,-134.1,120,-156.8Z" fill="#f472b6" />
                    </g>
                </svg>
                <style jsx>{`
          .animate-blob1 {
            animation: blobMove1 18s ease-in-out infinite;
          }
          .animate-blob2 {
            animation: blobMove2 22s ease-in-out infinite;
          }
          @keyframes blobMove1 {
            0%,100% { transform: scale(1) translate(0,0) rotate(0deg);}
            33% { transform: scale(1.1) translate(30px, -20px) rotate(10deg);}
            66% { transform: scale(0.9) translate(-20px, 40px) rotate(-8deg);}
          }
          @keyframes blobMove2 {
            0%,100% { transform: scale(1) translate(0,0) rotate(0deg);}
            25% { transform: scale(1.05) translate(-40px, 20px) rotate(-10deg);}
            75% { transform: scale(0.95) translate(20px, -30px) rotate(8deg);}
          }
        `}</style>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
                {/* Back Button */}
                <motion.button
                    onClick={() => router.back()}
                    className="mb-8 flex items-center gap-2 text-blue-400 hover:underline"
                    variants={fadeInUp}
                    custom={0}
                >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block"><path d="M15 18l-6-6 6-6" /></svg>
                    Back to Projects
                </motion.button>

                {/* Project Image */}
                <motion.img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-64 object-cover rounded-2xl mb-8 shadow-lg"
                    variants={fadeInUp}
                    custom={1}
                />

                {/* Project Title & Tags */}
                <motion.div variants={fadeInUp} custom={2}>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">{project.name}</h1>
                    <div className="flex gap-3 mb-4">
                        <span className="text-xs bg-blue-700 text-white px-2 py-1 rounded">{project.type}</span>
                        <span className={`text-xs px-2 py-1 rounded ${project.status === 'Completed' ? 'bg-green-600' : 'bg-yellow-600'} text-white`}>
                            {project.status}
                        </span>
                    </div>
                </motion.div>

                {/* Description */}
                <motion.p
                    className="mb-8 text-base md:text-lg text-secondary-white"
                    variants={fadeInUp}
                    custom={3}
                >
                    {project.description}
                </motion.p>

                {/* Technologies */}
                <motion.div variants={fadeInUp} custom={4} className="mb-8">
                    <h2 className="text-xl font-semibold mb-2 text-white">Technologies Used</h2>
                    <ul className="flex flex-wrap gap-2">
                        {project.technologies.map(tech => (
                            <li key={tech} className="bg-gray-800 px-3 py-1 rounded text-sm">{tech}</li>
                        ))}
                    </ul>
                </motion.div>

                {/* Features */}
                <motion.div variants={fadeInUp} custom={5} className="mb-8">
                    <h2 className="text-xl font-semibold mb-2 text-white">Key Features</h2>
                    <ul className="list-disc list-inside space-y-1 text-secondary-white">
                        {project.features.map(feature => (
                            <li key={feature}>{feature}</li>
                        ))}
                    </ul>
                </motion.div>

                {/* Links */}
                <motion.div variants={fadeInUp} custom={6} className="flex flex-wrap gap-4 mb-8">
                    {project.projectUrl && (
                        <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded transition-colors"
                        >
                            View Source
                        </a>
                    )}
                </motion.div>

                {project.demoVideo && (
                    <motion.div variants={fadeInUp} custom={7} className="mt-6">
                        <h2 className="text-xl font-semibold mb-2 text-white">Demo Video</h2>
                        <video
                            className="w-full rounded-lg shadow-lg"
                            controls
                            autoPlay
                            poster={project.image}
                        >
                            <source src={project.demoVideo} type="video/mp4" />
                            <source src={project.demoVideo} type="video/mov" />
                            Your browser does not support the video tag.
                        </video>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}