
import ChatBot from "@/components/chat/ChatBot";
import Navbar from "@/components/layout/Navbar";
import { useState } from "react";

const Chat = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Hover trigger area for navbar - 적당한 크기로 조정 */}
      <div 
        className="absolute top-0 left-0 w-full h-5 z-40"
        onMouseEnter={() => setShowNavbar(true)}
        onMouseLeave={() => setShowNavbar(false)}
      />
      
      {/* Navbar with animation */}
      <div 
        className={`absolute top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out ${
          showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}
        onMouseEnter={() => setShowNavbar(true)}
        onMouseLeave={() => setShowNavbar(false)}
      >
        <Navbar />
      </div>

      {/* ChatBot taking full screen */}
      <div className="h-screen p-4">
        <div className="h-full max-w-3xl mx-auto">
          <ChatBot />
        </div>
      </div>
    </div>
  );
};

export default Chat;
