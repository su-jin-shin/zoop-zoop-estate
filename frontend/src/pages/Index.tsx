
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
      
      <main className="container mx-auto px-6 py-4 flex-1 max-w-3xl">
        <h2 className="font-bold text-xl mb-3">추천매물</h2>
        <Map />
        
        <SearchFilters />
        
        <div className="mb-5">
          <Tabs defaultValue="all">
            <TabsList className="w-full grid grid-cols-4 h-11 mb-4">
              <TabsTrigger value="all" className="text-sm">전체</TabsTrigger>
              <TabsTrigger value="oneroom" className="text-sm">원룸</TabsTrigger> 
              <TabsTrigger value="tworoom" className="text-sm">투룸</TabsTrigger>
              <TabsTrigger value="apt" className="text-sm">아파트</TabsTrigger>
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
        
        <div className="mt-5 text-center">
          <p className="text-real-darkGray mb-3 text-sm">
            더 많은 매물이 기다리고 있습니다
          </p>
          <button className="text-real-blue font-medium hover:underline text-base">
            더 불러오기
          </button>
        </div>
      </main>
      
      <div className="bg-white border-t border-gray-200 py-5 mt-5">
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
