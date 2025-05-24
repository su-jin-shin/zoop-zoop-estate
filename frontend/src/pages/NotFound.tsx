
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="bg-real-blue/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-real-blue">404</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-real-black mb-4">페이지를 찾을 수 없습니다</h1>
        <p className="text-real-darkGray mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다. 
          홈페이지로 돌아가서 다시 시도해주세요.
        </p>
        <Button asChild className="bg-real-blue hover:bg-blue-700">
          <Link to="/">
            <ArrowLeft className="mr-2 h-5 w-5" />
            홈으로 돌아가기
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
