
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { User, Settings, ArrowRight } from "lucide-react";

const MyPage = () => {
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "로그아웃 되었습니다",
      description: "다음에 또 뵙겠습니다!",
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-4 flex-1">
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex items-center">
            <div className="bg-real-blue/10 rounded-full p-2">
              <User className="h-5 w-5 text-real-blue" />
            </div>
            <div className="ml-3">
              <h2 className="text-base font-semibold">홍길동님</h2>
              <p className="text-real-darkGray text-sm">example@email.com</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            className="w-full mt-3 text-sm py-1.5"
            asChild
            size="sm"
          >
            <Link to="/profile-edit">프로필 수정</Link>
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-3">
            <h3 className="text-base font-medium">나의 활동</h3>
          </div>
          
          <Separator />
          
          <div>
            <Link to="/favorites" className="flex items-center justify-between p-3 hover:bg-gray-50">
              <span className="text-real-black text-sm">관심 매물</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>
            
            <Separator />
            
            <Link to="/recent-view" className="flex items-center justify-between p-3 hover:bg-gray-50">
              <span className="text-real-black text-sm">최근 본 매물</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>
            
            <Separator />
            
            <Link to="/inquiries" className="flex items-center justify-between p-3 hover:bg-gray-50">
              <span className="text-real-black text-sm">문의 내역</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden mt-4">
          <div>
            <Link to="/settings" className="flex items-center justify-between p-3 hover:bg-gray-50">
              <div className="flex items-center">
                <Settings className="h-4 w-4 mr-2 text-real-darkGray" />
                <span className="text-real-black text-sm">설정</span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>
            
            <Separator />
            
            <Link to="/help" className="flex items-center justify-between p-3 hover:bg-gray-50">
              <span className="text-real-black text-sm">고객센터</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>
            
            <Separator />
            
            <button 
              onClick={handleLogout} 
              className="flex items-center w-full p-3 hover:bg-gray-50 text-left text-red-500 font-medium text-sm"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
