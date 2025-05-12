import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { Message } from '../types';

const PRESET_QUESTIONS = [
  "What are his projects?",
  "Tell me about his AI experience",
  "What technical skills does he have?",
  "What's his work experience?"
];

const TypingText: React.FC<{ text: string }> = ({ text }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let index = 0;
    const speed = 12; // milliseconds per character for fast typing
    const timer = setInterval(() => {
      index++;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text]);

  // Split the text for bold formatting
  const parts = displayed.split(/(\*\*(.*?)\*\*)/g); 

  return (
    <span>
      {parts.map((part, i) => {
        // Apply bold only if the text is wrapped in **
        const match = /\*\*(.*?)\*\*/.exec(part);
        if (match) {
          return (
            <strong key={i} className="font-semibold">
              {match[1]} {/* Only render the content inside ** */}
            </strong>
          );
        }
        return <span key={i}>{part}</span>; // Render normal text
      })}
    </span>
  );
};



const ChatArea: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // This function cleans the response text from duplication issues
  const cleanResponseText = (text: string) => {
    // Fix the pattern where bold project names are immediately followed by themselves
    return text.replace(/\*\*([\w\s]+)\*\*\1/g, '**$1**');
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();
      
      // Clean the response text to remove duplications
      const cleanedResponseText = cleanResponseText(data.main_response || data.reply || "No response.");

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: cleanedResponseText,
        sender: 'Cortex',
        timestamp: new Date(),
        links: data.links || []
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I couldn't process your request. Please try again.",
        sender: 'Cortex',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full lg:w-3/4 h-screen flex flex-col p-6"
    >
      <h2 className="text-2xl font-bold text-[#00FFD1] mb-4">Ask Me Anything</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
        {PRESET_QUESTIONS.map((q, i) => (
          <motion.button
            key={i}
            onClick={() => handleSend(q)}
            className="bg-[#00FFD1]/10 border border-[#00FFD1]/40 rounded-lg px-4 py-2 text-[#00FFD1] hover:bg-[#00FFD1]/20 transition-colors text-left text-sm"
            whileHover={{
              scale: 1.02,
              boxShadow: '0 0 8px #00FFD1'
            }}
          >
            {q}
          </motion.button>
        ))}
      </div>

      <div className="flex-1 bg-[#121212] rounded-lg p-4 mb-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-400 text-sm max-w-md"
            >
              Hi! I'm your interactive guide to Bignya's journey. Ask me anything about his projects, skills, or experience!
            </motion.p>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`mb-4 ${msg.sender === 'Cortex' ? 'pr-12' : 'pl-12'}`}
              >
                <div className="flex flex-col">
                  <span className={`text-xs mb-1 ${msg.sender === 'Cortex' ? 'text-[#00FFD1]' : 'text-gray-400'}`}>
                    {msg.sender === 'Cortex' ? 'Cortex' : 'You'}
                  </span>
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className={`rounded-lg p-3 whitespace-pre-wrap ${msg.sender === 'Cortex'
                      ? 'bg-[#1a1a1a] text-gray-300'
                      : 'bg-[#2a2a2a] text-white'
                      }`}
                  >
                    {msg.sender === 'Cortex' ? <TypingText text={msg.text} /> : msg.text}

                    {msg.links && msg.links.length > 0 && (
                      <div className="mt-3 p-3 border border-[#00FFD1]/40 rounded-lg bg-[#0f0f0f] space-y-2">
                        {msg.links.map((link, index) => (
                          <a
                            key={index}
                            href={link.main_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#00FFD1] underline hover:text-[#00FFD1]/80 block text-sm"
                          >
                            🔗 {link.link_name}
                          </a>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex space-x-2 items-center text-[#00FFD1]"
          >
            <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
            <div className="w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <motion.form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="w-full bg-[#0f0f0f] rounded-lg px-4 py-3 pr-12 text-white border border-gray-700 focus:border-[#00FFD1] focus:outline-none"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
          <motion.button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="text-[#00FFD1] disabled:text-gray-600 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Send size={18} />
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default ChatArea;