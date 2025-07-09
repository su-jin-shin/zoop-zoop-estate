
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-3 sm:p-4">
      <div className="text-center max-w-xs sm:max-w-md">
        <div className="bg-real-blue/10 rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-real-blue">404</span>
        </div>
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-real-black mb-3 sm:mb-4">페이지를 찾을 수 없습니다</h1>
        <p className="text-real-darkGray mb-6 sm:mb-8 text-xs sm:text-sm px-2">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다. 
          홈페이지로 돌아가서 다시 시도해주세요.
        </p>
        <Button asChild className="bg-real-blue hover:bg-blue-700 text-xs sm:text-sm h-9 sm:h-10">
          <Link to="/">
            <ArrowLeft className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
            홈으로 돌아가기
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
