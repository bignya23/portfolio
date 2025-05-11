import React, { useEffect, useRef } from 'react';
import { Message } from '../types';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  // Extract links if they exist in the message text
  const renderMessageContent = () => {
    // Simple link detection for URLs in text
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = message.text.split(urlRegex);
    
    if (parts.length === 1) {
      // No links, just render the text with line breaks
      return (
        <p className="whitespace-pre-line">{message.text}</p>
      );
    }
    
    // If we have links, render them as actual links
    return (
      <p className="whitespace-pre-line">
        {parts.map((part, index) => {
          if (part.match(urlRegex)) {
            return (
              <a 
                key={index} 
                href={part} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#00FFD1] underline"
              >
                {part}
              </a>
            );
          }
          return part;
        })}
      </p>
    );
  };
  
  return (
    <div className={`mb-4 ${isBot ? 'pr-10' : 'pl-10'}`}>
      <div className="flex flex-col">
        <span className={`text-xs mb-1 ${isBot ? 'text-[#00FFD1]' : 'text-gray-400'}`}>
          {isBot ? 'Bot' : 'You'}
        </span>
        <div 
          className={`rounded-lg p-3 ${
            isBot 
              ? 'bg-[#1a1a1a] border border-[#00FFD1]/30 text-gray-300' 
              : 'bg-[#2a2a2a] text-white'
          }`}
        >
          {renderMessageContent()}
          
          {/* Render any action links from bot responses */}
          {isBot && message.text.includes('Download Resume') && (
            <div className="mt-2">
              <a 
                href="#" 
                className="inline-block mt-2 bg-[#00FFD1]/20 border border-[#00FFD1]/40 rounded px-3 py-1 text-[#00FFD1] text-sm hover:bg-[#00FFD1]/30 transition-colors"
              >
                Download Resume (PDF)
              </a>
            </div>
          )}
          
          {isBot && message.text.includes('GitHub') && (
            <div className="mt-2 flex flex-wrap gap-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-[#00FFD1]/20 border border-[#00FFD1]/40 rounded px-3 py-1 text-[#00FFD1] text-sm hover:bg-[#00FFD1]/30 transition-colors"
              >
                View GitHub
              </a>
              
              <a 
                href="https://example.com/demo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-[#00FFD1]/20 border border-[#00FFD1]/40 rounded px-3 py-1 text-[#00FFD1] text-sm hover:bg-[#00FFD1]/30 transition-colors"
              >
                Project Demo
              </a>
            </div>
          )}
          
          {isBot && message.text.includes('AI Research') && (
            <div className="mt-2">
              <a 
                href="https://arxiv.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-[#00FFD1]/20 border border-[#00FFD1]/40 rounded px-3 py-1 text-[#00FFD1] text-sm hover:bg-[#00FFD1]/30 transition-colors"
              >
                AI Research Paper
              </a>
            </div>
          )}
        </div>
        <span className="text-xs text-gray-500 mt-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="rounded-md bg-[#121212] p-4 h-[400px] overflow-y-auto text-sm border border-gray-700 custom-scrollbar">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>Ask a question to start the conversation</p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <div className="mb-4 pr-10">
              <div className="flex flex-col">
                <span className="text-xs mb-1 text-[#00FFD1]">Bot</span>
                <div className="rounded-lg p-3 bg-[#1a1a1a] border border-[#00FFD1]/30 text-gray-300">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-[#00FFD1] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-[#00FFD1] animate-bounce" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-[#00FFD1] animate-bounce" style={{ animationDelay: '400ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;