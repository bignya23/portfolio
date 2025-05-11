import React, { useState, FormEvent } from 'react';
import { SendIcon } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 relative">
      <input
        className="w-full rounded-lg px-4 py-3 bg-[#0f0f0f] border border-gray-600 text-white focus:outline-none focus:border-[#00FFD1] pr-10 placeholder-gray-500"
        placeholder="Type a question..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={!message.trim() || disabled}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00FFD1] disabled:text-gray-600 transition-colors"
      >
        <SendIcon size={18} />
      </button>
    </form>
  );
};

export default MessageInput;