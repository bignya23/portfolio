import React from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import { Analytics } from "@vercel/analytics/next"

function App() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-mono flex flex-col lg:flex-row">
      <Sidebar />
      <ChatArea />
    </div>
  );
}

export default App;