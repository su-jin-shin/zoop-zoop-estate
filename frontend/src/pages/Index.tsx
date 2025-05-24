
import HeroSection from "@/components/home/HeroSection";
import SearchFilters from "@/components/layout/SearchFilters";
import FeaturedProperties from "@/components/property/FeaturedProperties";
import PropertyList from "@/components/property/PropertyList";
import Navbar from "@/components/layout/Navbar";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import Map from "@/components/maps/Map";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatBotToggle from "@/components/chat/ChatBotToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <HeroSection />
      
      <main className="container mx-auto px-4 py-3 flex-1 max-w-2xl">
        <h2 className="font-bold text-lg mb-2">추천매물</h2>
        <Map />
        
        <SearchFilters />
        
        <div className="mb-4">
          <Tabs defaultValue="all">
            <TabsList className="w-full grid grid-cols-4 h-9 mb-3">
              <TabsTrigger value="all" className="text-xs">전체</TabsTrigger>
              <TabsTrigger value="oneroom" className="text-xs">원룸</TabsTrigger> 
              <TabsTrigger value="tworoom" className="text-xs">투룸</TabsTrigger>
              <TabsTrigger value="apt" className="text-xs">아파트</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <PropertyList />
            </TabsContent>
            <TabsContent value="oneroom">
              <PropertyList />
            </TabsContent>
            <TabsContent value="tworoom">
              <PropertyList />
            </TabsContent>
            <TabsContent value="apt">
              <PropertyList />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-real-darkGray mb-2 text-xs">
            더 많은 매물이 기다리고 있습니다
          </p>
          <button className="text-real-blue font-medium hover:underline text-sm">
            더 불러오기
          </button>
        </div>
      </main>
      
      <div className="bg-white border-t border-gray-200 py-4 mt-4">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="flex flex-col items-center">
            <div className="mb-3 text-center">
              <h2 className="text-base font-bold text-real-blue mb-1">줍줍</h2>
              <p className="text-xs text-real-darkGray">당신의 완벽한 집을 찾아보세요</p>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center mb-3">
              <div className="flex gap-3">
                <Link to="/login" className="text-xs hover:text-real-blue transition-colors">
                  로그인
                </Link>
                <Link to="/register" className="text-xs hover:text-real-blue transition-colors">
                  회원가입
                </Link>
              </div>
              <div className="flex gap-3">
                <Link to="/terms" className="text-xs hover:text-real-blue transition-colors">
                  이용약관
                </Link>
                <Link to="/privacy" className="text-xs hover:text-real-blue transition-colors">
                  개인정보 처리방침
                </Link>
              </div>
            </div>
            
            <div className="text-center text-xs text-real-darkGray">
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
