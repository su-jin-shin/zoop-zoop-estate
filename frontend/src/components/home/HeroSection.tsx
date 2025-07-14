
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building, MapPin } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-real-blue to-blue-500 text-white py-4 sm:py-6 overflow-hidden select-none">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-full mx-auto">
          <h1 className="text-lg sm:text-xl font-bold mb-2 text-center">
            당신의 완벽한 집을 찾아보세요
          </h1>
          <p className="text-xs sm:text-sm opacity-90 mb-3 sm:mb-4 text-center px-2">
            수천 개의 매물 중에서 당신에게 맞는 공간을 쉽고 빠르게 찾을 수 있습니다.
          </p>
          
          <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 px-4">
            <div className="flex items-center justify-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <Building className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              <span className="text-xs sm:text-sm font-medium">10,000+ 매물</span>
            </div>
            <div className="flex items-center justify-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              {/* <span className="text-xs sm:text-sm font-medium">전국 주요 도시</span> */}
              <span className="text-xs sm:text-sm font-medium">서울 전역</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/3 -left-8 sm:-left-10 w-16 h-16 sm:w-20 sm:h-20 bg-blue-300/20 rounded-full filter blur-3xl" />
    </section>
  );
};

export default HeroSection;
