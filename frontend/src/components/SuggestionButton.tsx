import React from 'react';
import { SuggestionButtonProps } from '../types';

const SuggestionButton: React.FC<SuggestionButtonProps> = ({ text, onClick }) => {
  return (
    <button 
      className="bg-[#00FFD1]/10 border border-[#00FFD1]/40 rounded-lg px-4 py-2 text-[#00FFD1] hover:bg-[#00FFD1]/20 transition-colors duration-200 text-left text-sm w-full"
      onClick={() => onClick(text)}
    >
      {text}
    </button>
  );
};

export default SuggestionButton;