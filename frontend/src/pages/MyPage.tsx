
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { User, Settings, ArrowRight, Bell } from "lucide-react";

const MyPage = () => {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "로그아웃 되었습니다",
      description: "다음에 또 뵙겠습니다!",
    });
  };

  return (
    <div className="min-h-[100dvh] bg-gray-50 flex flex-col">
      <Navbar />

      {/* max-w-3xl로 너비를 제한 */}
      <div className="container mx-auto px-3 sm:px-4 py-4 flex-1 max-w-3xl">
        <div className="bg-white rounded-lg shadow p-3 sm:p-4 mb-4">
          <div className="flex items-center">
            <div className="bg-real-blue/10 rounded-full p-2">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-real-blue" />
            </div>
            <div className="ml-3">
              <h2 className="text-sm sm:text-base font-semibold">홍길동님</h2>
              <p className="text-real-darkGray text-xs sm:text-sm">example@email.com</p>
            </div>
          </div>

          <div className="flex space-x-2 mt-3">
            <Button
              variant="outline"
              className="flex-1 text-xs sm:text-sm py-1.5 h-8 sm:h-9"
              asChild
              size="sm"
            >
              <Link to="/profile-edit">프로필 수정</Link>
            </Button>
            <Button
              variant="outline"
              className="flex-1 text-xs sm:text-sm py-1.5 h-8 sm:h-9"
              asChild
              size="sm"
            >
              <Link to="/password-change">비밀번호 변경</Link>
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-3">
            <h3 className="text-sm sm:text-base font-medium">나의 활동</h3>
          </div>

          <Separator />

          <div>
            <Link to="/favorites" className="flex items-center justify-between p-3 hover:bg-gray-50 active:bg-gray-100">
              <span className="text-real-black text-xs sm:text-sm">관심 • 최근 본 매물</span>
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
            </Link>
            <Separator />
            <Link to="/reviews" className="flex items-center justify-between p-3 hover:bg-gray-50 active:bg-gray-100">
              {/* <span className="text-real-black text-xs sm:text-sm">리뷰 • 문의 내역</span> */}
              <span className="text-real-black text-xs sm:text-sm">내가 작성한 리뷰</span>
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
            </Link>
            <Separator />
            <Link to="/notifications" className="flex items-center justify-between p-3 hover:bg-gray-50 active:bg-gray-100">
              <div className="flex items-center">
                <Bell className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-real-darkGray" />
                <span className="text-real-black text-xs sm:text-sm">알림</span>
              </div>
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden mt-4">
          <div>
            <Link to="/settings" className="flex items-center justify-between p-3 hover:bg-gray-50 active:bg-gray-100">
              <div className="flex items-center">
                <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-real-darkGray" />
                <span className="text-real-black text-xs sm:text-sm">설정</span>
              </div>
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
            </Link>
            <Separator />
            <Link to="/help" className="flex items-center justify-between p-3 hover:bg-gray-50 active:bg-gray-100">
              <span className="text-real-black text-xs sm:text-sm">고객센터</span>
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
            </Link>
            <Separator />
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 hover:bg-gray-50 active:bg-gray-100 text-left text-red-500 font-medium text-xs sm:text-sm"
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
