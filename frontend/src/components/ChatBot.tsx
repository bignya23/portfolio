import React, { useState, useEffect } from 'react';
import { Terminal, FileCode, Database, Award, Workflow, Mail } from 'lucide-react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import SuggestionButton from './SuggestionButton';
import generateResponse from '../data/botResponses';
import { Message } from '../types';

// Suggested questions for quick access
const SUGGESTED_QUESTIONS = [
  "What are your top projects?",
  "Tell me about your AI experience",
  "What technical skills do you have?", 
  "What's your work experience?",
  "How can I contact you?"
];

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Add initial welcome message when component mounts
  useEffect(() => {
    const welcomeMessage = generateResponse("hello").text;
    
    setTimeout(() => {
      setMessages([
        {
          id: Date.now().toString(),
          text: welcomeMessage,
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }, 500);
  }, []);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate bot thinking time
    const thinkingTime = 1000 + Math.random() * 1500;
    
    setTimeout(() => {
      const response = generateResponse(text);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, thinkingTime);
  };

  return (
    <div className="w-full max-w-xl bg-[#1e1e1e]/80 backdrop-blur-md shadow-2xl rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Terminal className="text-[#00FFD1] mr-2" size={24} />
          <h2 className="text-2xl font-bold text-[#00FFD1]">Sanjay Singh</h2>
        </div>
        <div className="text-[#00FFD1] bg-[#00FFD1]/10 px-2 py-1 rounded text-xs border border-[#00FFD1]/30">
          Low-Level & AI Developer
        </div>
      </div>
      
      <div className="text-sm text-gray-400 mb-6">
        Welcome to my interactive resume! Ask me anything about my skills, projects, or experience.
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
        <div className="flex items-center text-gray-300 text-sm">
          <FileCode size={16} className="text-[#00FFD1] mr-2" />
          <span>C++, Python, Rust</span>
        </div>
        <div className="flex items-center text-gray-300 text-sm">
          <Database size={16} className="text-[#00FFD1] mr-2" />
          <span>PyTorch, TensorFlow</span>
        </div>
        <div className="flex items-center text-gray-300 text-sm">
          <Award size={16} className="text-[#00FFD1] mr-2" />
          <span>MSc Computer Science</span>
        </div>
        <div className="flex items-center text-gray-300 text-sm">
          <Workflow size={16} className="text-[#00FFD1] mr-2" />
          <span>5+ Years Experience</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-2 mb-6">
        {SUGGESTED_QUESTIONS.map((question, index) => (
          <SuggestionButton 
            key={index}
            text={question}
            onClick={handleSendMessage}
          />
        ))}
      </div>
      
      <MessageList messages={messages} isTyping={isTyping} />
      <MessageInput onSendMessage={handleSendMessage} disabled={isTyping} />
      
      <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
        <div className="text-xs text-gray-500">
          © 2025 Sanjay Singh
        </div>
        <a 
          href="mailto:sanjay@example.com"
          className="flex items-center text-xs text-[#00FFD1] hover:text-[#00FFD1]/80"
        >
          <Mail size={14} className="mr-1" />
          Contact directly
        </a>
      </div>
    </div>
  );
};

export default ChatBot;