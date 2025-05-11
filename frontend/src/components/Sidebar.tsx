import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Github, Linkedin, FileDown, Instagram } from 'lucide-react';
import { RotatingModel } from './3D/RotatingModel';
import { SkillPanel, ContactCTA } from './SidebarExtras';

const skills = [
  { name: 'C++', color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30' },
  { name: 'Python', color: 'bg-orange-500/20 text-orange-400 border border-orange-500/30' },
  { name: 'Django', color: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' },
  { name: 'ASM', color: 'bg-green-500/20 text-green-400 border border-green-500/30' },
  { name: 'GenAI', color: 'bg-purple-500/20 text-purple-400 border border-purple-500/30' }
];

const timelineEvents = [
  { year: 2025, title: 'NeuroSphere', url: 'https://neurosphere.support/' },
  { year: 2024, title: 'FusionLang', url: 'https://github.com/bignya23/FusionLang' },
  { year: 2024, title: 'Database', url: 'https://github.com/bignya23/database-cpp' }
];

const Timeline = ({ events }: { events: typeof timelineEvents }) => (
  <div className="mt-8 w-full text-center">
    <h2 className="text-xl text-[#00FFD1] mb-4">Projects</h2>
    <ul className="space-y-3">
      {events.map((event, idx) => (
        <li key={idx} className="text-gray-300">
          <span className="text-sm text-gray-500 mr-2">{event.year}</span>
          {event.url ? (
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00FFD1] transition-colors"
            >
              {event.title}
            </a>
          ) : (
            <span>{event.title}</span>
          )}
        </li>
      ))}
    </ul>
  </div>
);

const Sidebar: React.FC = () => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 20 }}
      className="w-full lg:w-1/4 bg-[#1e1e1e]/80 backdrop-blur-md p-6 lg:h-screen overflow-y-auto"
    >
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold text-[#00FFD1] mb-2">Bignya Gogoi</h1>
        <p className="text-gray-400 mb-6">Low-Level & AI/ML Developer</p>

        <div className="flex space-x-4 mb-8">
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="https://github.com/bignya23"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#00FFD1] transition-colors"
          >
            <Github size={24} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="https://linkedin.com/bignya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#00FFD1] transition-colors"
          >
            <Linkedin size={24} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            href="https://instagram.com/gogoi_bignya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#00FFD1] transition-colors"
          >
            <Instagram size={24} />
          </motion.a>
        </div>

        {/* Let's Talk CTA at the top */}
        <ContactCTA />

        {/* 3D Model */}
        <div className="w-full h-40 mt-8">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
              <RotatingModel url="/models/robot-head.glb" />
            </Suspense>
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>

        <SkillPanel skills={skills} />
        <Timeline events={timelineEvents} />

        {/* Moved Download Resume here */}
        <motion.a
          whileHover={{ scale: 1.02, boxShadow: '0 0 8px #00FFD1' }}
          href="https://drive.google.com/file/d/1_4oAb_P3fDLSs8dNij9IOWYG75U18ygg/view?usp=drive_link"
          className="w-full mt-6 bg-[#00FFD1]/10 border border-[#00FFD1]/40 rounded-lg px-4 py-2 text-[#00FFD1] hover:bg-[#00FFD1]/20 transition-colors flex items-center justify-center gap-2"
          target="_blank"
          rel="noopener noreferrer"

        >
          <FileDown size={18} className="align-middle" />
          Download Resume
        </motion.a>
      </div>
    </motion.div>
  );
};

export default Sidebar;
