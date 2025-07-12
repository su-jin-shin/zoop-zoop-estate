
import ChatBot from "@/components/chat/ChatBot";
import Navbar from "@/components/layout/Navbar";
import { useState, useRef } from "react";

const Chat = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const scrollPositionRef = useRef<number>(0);
  const chatBotRef = useRef<any>(null);

  const handleMouseEnter = () => {
    // navbar 표시 전 스크롤 위치 저장
    if (chatBotRef.current && chatBotRef.current.saveCurrentScrollPosition) {
      chatBotRef.current.saveCurrentScrollPosition();
    }
    setShowNavbar(true);
  };

  const handleMouseLeave = () => {
    // navbar 숨김 전 스크롤 위치 저장
    if (chatBotRef.current && chatBotRef.current.saveCurrentScrollPosition) {
      chatBotRef.current.saveCurrentScrollPosition();
    }
    setShowNavbar(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-50 overflow-hidden">
      {/* Hover trigger area for navbar - smaller on mobile */}
      <div 
        className="absolute top-0 left-0 w-full h-4 sm:h-5 z-40"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      
      {/* Navbar with animation */}
      <div 
        className={`absolute top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out ${
          showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Navbar />
      </div>

      {/* ChatBot with mobile-optimized layout */}
      {/* <div className="h-screen"> */}
      <div className="h-dvh flex flex-col overflow-hidden">   
        {/* <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 h-full max-w-3xl"> */}
        <div className="mx-auto px-3 sm:px-4 lg:px-6 pt-3 md:pt-4 h-full w-full md:max-w-3xl flex flex-col">
          <ChatBot ref={chatBotRef} navbarVisible={showNavbar} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
