
import HeroSection from "@/components/home/HeroSection";
import SearchFilters from "@/components/layout/SearchFilters";
import Navbar from "@/components/layout/Navbar";
import ChatBotToggle from "@/components/chat/ChatBotToggle";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <HeroSection />
      
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex-1 max-w-3xl">
        <div className="flex justify-between items-center mb-2 sm:mb-3">
          <h2 className="font-bold text-base sm:text-lg lg:text-xl">매물찾기</h2>
        </div>
        <SearchFilters />
        
        {/* 이미지 섹션 추가 */}
        <div className="mt-8 mb-6 flex justify-center">
          <div className="w-full max-w-md rounded-lg overflow-hidden shadow-sm bg-white">
            <img 
              src="/image/zoop-zoop-estate.png" 
              alt="줍줍 메인"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 py-5 mt-5 select-none">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="flex flex-col items-center">
            <div className="mb-4 text-center">
              <h2 className="text-lg font-bold text-real-blue mb-2">줍줍</h2>
              <p className="text-sm text-real-darkGray">당신의 완벽한 집을 찾아보세요</p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center mb-4">
              <div className="flex gap-4">
                <Link to="/login" className="text-sm hover:text-real-blue transition-colors">
                  로그인
                </Link>
                <Link to="/register" className="text-sm hover:text-real-blue transition-colors">
                  회원가입
                </Link>
              </div>
              <div className="flex gap-4">
                <Link to="/terms" className="text-sm hover:text-real-blue transition-colors">
                  이용약관
                </Link>
                <Link to="/privacy" className="text-sm hover:text-real-blue transition-colors">
                  개인정보 처리방침
                </Link>
              </div>
            </div>
            
            <div className="text-center text-sm text-real-darkGray">
              <p>© 2025 줍줍 앱. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>

      <ChatBotToggle />
    </div>
  );
};

export default Index;
