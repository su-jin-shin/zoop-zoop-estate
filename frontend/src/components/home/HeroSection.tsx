
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building, House, MapPin } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-real-blue to-blue-500 text-white py-6 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-full mx-auto">
          <h1 className="text-xl font-bold mb-2 text-center">
            당신의 완벽한 집을 찾아보세요
          </h1>
          <p className="text-sm opacity-90 mb-4 text-center">
            수천 개의 매물 중에서 당신에게 맞는 공간을 쉽고 빠르게 찾을 수 있습니다.
          </p>
          
          <div className="flex flex-row gap-3 justify-center">
            <Button asChild size="sm" className="bg-white text-real-blue hover:bg-gray-100 text-sm h-10 w-32">
              <Link to="/search">
                <House className="mr-2 h-4 w-4" />
                매물 검색
              </Link>
            </Button>
            <Button asChild size="sm" className="bg-white text-real-blue hover:bg-gray-100 text-sm h-10 w-32">
              <Link to="/map">
                <MapPin className="mr-2 h-4 w-4" />
                지도로 보기
              </Link>
            </Button>
          </div>
          
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <Building className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">10,000+ 매물</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">전국 주요 도시</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-20 h-20 bg-white/10 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/3 -left-10 w-20 h-20 bg-blue-300/20 rounded-full filter blur-3xl" />
    </section>
  );
};

export default HeroSection;
