import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Github, Linkedin, FileDown, Instagram } from 'lucide-react';
import { RotatingModel } from './3D/RotatingModel';
import { ContactCTA } from './SidebarExtras';


const skills = [
  { name: 'C++', color: 'bg-blue-500/20 text-blue-400 border border-blue-500/30', description: 'Systems programming, socket servers, compilers' },
  { name: 'Python', color: 'bg-orange-500/20 text-orange-400 border border-orange-500/30', description: 'ML, automation, backend development' },
  { name: 'Django', color: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30', description: 'Full-stack web development and APIs' },
  { name: 'Flask', color: 'bg-teal-500/20 text-teal-400 border border-teal-500/30', description: 'Lightweight Python backend for ML apps' },
  { name: 'React', color: 'bg-sky-500/20 text-sky-400 border border-sky-500/30', description: 'Frontend library for interactive UIs' },
  { name: 'GenAI', color: 'bg-purple-500/20 text-purple-400 border border-purple-500/30', description: 'LLMs, Langchain, AI agents and tools' },
  { name: 'Langchain', color: 'bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30', description: 'Framework for building LLM-powered applications' },
  { name: 'Pydantic', color: 'bg-amber-500/20 text-amber-400 border border-amber-500/30', description: 'Data validation and settings management in Python' },
  { name: 'FastAPI', color: 'bg-rose-500/20 text-rose-400 border border-rose-500/30', description: 'High-performance web framework for APIs' },
  { name: 'PyTorch', color: 'bg-red-500/20 text-red-400 border border-red-500/30', description: 'Deep learning research and prototyping' },
  { name: 'TensorFlow', color: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30', description: 'Model building and deployment' },
  { name: 'Docker', color: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30', description: 'Containerization, CI/CD pipelines' },
  { name: 'Linux', color: 'bg-neutral-500/20 text-neutral-300 border border-neutral-600/30', description: 'System-level operations and dev envs' },
  { name: 'SQL', color: 'bg-lime-500/20 text-lime-400 border border-lime-500/30', description: 'Querying and managing relational data' },
  { name: 'MongoDB', color: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30', description: 'NoSQL database for scalable applications' },
  { name: 'Redis', color: 'bg-orange-600/20 text-orange-400 border border-orange-600/30', description: 'In-memory key-value store for fast caching' },
  { name: 'MySQL', color: 'bg-cyan-600/20 text-cyan-400 border border-cyan-600/30', description: 'Relational database system' },
  { name: 'PostgreSQL', color: 'bg-blue-600/20 text-blue-400 border border-blue-600/30', description: 'Advanced open-source SQL database' },
  { name: 'Assembly', color: 'bg-green-500/20 text-green-400 border border-green-500/30', description: 'Low-level architecture and debugging' },
  { name: 'R', color: 'bg-pink-500/20 text-pink-400 border border-pink-500/30', description: 'Statistical computing and visualization' },
  { name: 'MATLAB', color: 'bg-violet-500/20 text-violet-400 border border-violet-500/30', description: 'Numerical computing and simulations' },
  { name: 'HTML/CSS', color: 'bg-zinc-500/20 text-zinc-300 border border-zinc-600/30', description: 'Structuring and styling web content' },
  { name: 'Git', color: 'bg-gray-500/20 text-gray-300 border border-gray-600/30', description: 'Version control and collaboration' },
  { name: 'GitLab CI/CD', color: 'bg-yellow-700/20 text-yellow-500 border border-yellow-700/30', description: 'Automated pipeline for deployment' },
  { name: 'Google Cloud', color: 'bg-blue-400/20 text-blue-300 border border-blue-400/30', description: 'Cloud deployment and infrastructure management' },
  { name: 'Nginx', color: 'bg-stone-500/20 text-stone-300 border border-stone-600/30', description: 'Web server and reverse proxy configuration' },
  { name: 'Postman', color: 'bg-orange-700/20 text-orange-500 border border-orange-700/30', description: 'API testing and debugging' }
];



const timelineEvents = [
  {
    year: 2025,
    title: 'NeuroSphere',
    url: 'https://neurosphere.support/',
    description: 'AI platform aiding neurodiverse individuals in employment and daily life, built with Django, React, and GenAI.'
  },
  {
    year: 2025,
    title: 'AI Phone Agent',
    url: 'https://github.com/bignya23/ai-phone-agent',
    description: 'Cold-call automation using LLMs, STT, and TTS with Flask, React, and GenAI integration.'
  },
  {
    year: 2024,
    title: 'Multithreaded HTTP Server',
    url: 'https://github.com/bignya23/http-server',
    description: 'High-performance HTTP/1.1 server with multithreading and socket programming in modern C++.'
  },
  {
    year: 2024,
    title: 'Database Engine',
    url: 'https://github.com/bignya23/database-cpp',
    description: 'Custom SQL-style C++ database with B+ tree indexing and modular CLI support.'
  },
  {
    year: 2024,
    title: 'FusionLang',
    url: 'https://github.com/bignya23/FusionLang',
    description: 'Natural-language-inspired programming language with ANTLR grammar and compiler support.'
  }
];

type Skill = {
  name: string;
  color: string;
  description: string;
};

const SkillPanel = ({ skills }: { skills: Skill[] }) => (
  <div className="mt-8 w-full">
    <h2 className="text-xl text-[#00FFD1] mb-4 text-center">Skills</h2>
    <div className="flex flex-wrap justify-center gap-2">
      {skills.map((skill, idx) => (
        <div
          key={idx}
          className={`relative group px-3 py-1 text-sm rounded-full cursor-pointer ${skill.color}`}
        >
          {skill.name}
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max max-w-xs bg-gray-800 text-gray-300 text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            {skill.description}
          </div>
        </div>
      ))}
    </div>
  </div>
);

type TimelineEvent = {
  year: number;
  title: string;
  url?: string;
  description: string;
};

const Timeline = ({ events }: { events: TimelineEvent[] }) => (
  <div className="mt-8 w-full text-center">
    <h2 className="text-xl text-[#00FFD1] mb-4">Projects</h2>
    <ul className="space-y-3">
      {events.map((event, idx) => (
        <li key={idx} className="text-gray-300 relative group">
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
          <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-max max-w-xs bg-gray-800 text-gray-300 text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            {event.description}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const Sidebar = () => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 20 }}
className="w-full max-w-full lg:w-1/4 bg-[#1e1e1e]/80 backdrop-blur-md p-6 lg:h-screen overflow-y-auto overflow-x-hidden flex flex-col justify-between"
    >
      <div>
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl font-bold text-[#00FFD1] mb-2">Bignya Gogoi</h1>
          <p className="text-gray-400 mb-6">Low-Level & AI/ML Developer</p>

          <div className="flex space-x-4 mb-8">
            <motion.a whileHover={{ scale: 1.1 }} href="https://github.com/bignya23" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00FFD1] transition-colors">
              <Github size={24} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.1 }} href="https://linkedin.com/bignya" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00FFD1] transition-colors">
              <Linkedin size={24} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.1 }} href="https://instagram.com/gogoi_bignya" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00FFD1] transition-colors">
              <Instagram size={24} />
            </motion.a>
          </div>

          <ContactCTA />

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
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center text-xs text-gray-500">
        © 2025 Bignya
      </div>
    </motion.div>
  );
};

export default Sidebar;
