import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface Skill {
  name: string;
  color: string;
}

interface TimelineEvent {
  year: number;
  title: string;
}

interface SkillPanelProps {
  skills: Skill[];
}

interface TimelineProps {
  events: TimelineEvent[];
}

export const SkillPanel: React.FC<SkillPanelProps> = ({ skills }) => {
  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">Skills & Tools</h3>
      <div className="overflow-x-auto pb-2 -mx-2 px-2">
        <div className="flex space-x-2">
          {skills.map((skill, index) => (
            <motion.span
              key={index}
              className={`inline-flex px-3 py-1 rounded-full text-xs ${skill.color} whitespace-nowrap`}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {skill.name}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold text-gray-400 mb-3">Recent Projects</h3>
      <div className="space-y-4">
        {events.map((event, index) => (
          <motion.div
            key={index}
            className="flex items-start space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="w-16 text-sm text-[#00FFD1]">{event.year}</div>
            <div className="flex-1 text-sm text-gray-300">{event.title}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const ContactCTA = () => {
  return (
    <motion.a
      whileHover={{ scale: 1.02, boxShadow: '0 0 8px #00FFD1' }}
      href="mailto:bignya25@gmail.com?subject=Let's%20Talk&body="
      className="w-full mt-6 bg-[#00FFD1]/10 border border-[#00FFD1]/40 rounded-lg px-4 py-2 text-[#00FFD1] hover:bg-[#00FFD1]/20 transition-colors flex items-center justify-center gap-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="text-sm">Let's Talk</span>
    </motion.a>
  );
};
