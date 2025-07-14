
import { Link } from "react-router-dom";
import { ArrowLeft, Bell, Shield, User, Globe, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";

const Settings = () => {
  const { toast } = useToast();

  const handleLanguageClick = () => {
    toast({
      title: "다른 언어 서비스 예정",
      description: "현재 한국어만 지원하며, 다른 언어는 서비스 예정입니다.",
    });
  };

  const handleNewPropertyAlert = () => {
    // Navigate to Interest Areas page when implemented
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-3 sm:px-4 py-4 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Link to="/mypage">
              <Button variant="ghost" size="icon" className="mr-2 h-8 w-8 sm:h-10 sm:w-10">
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <h1 className="text-base sm:text-lg font-semibold">설정</h1>
          </div>
        </div>

        <div className="space-y-4">
          {/* 알림 설정 */}
          <Card>
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-real-blue mr-2" />
                  <h3 className="text-sm sm:text-base font-medium">알림 설정</h3>
                </div>
              </div>
              <Separator />
              <div className="p-4 space-y-4">
                <button
                  onClick={handleNewPropertyAlert}
                  className="flex items-center justify-between w-full text-left"
                >
                  <div>
                    <p className="text-xs sm:text-sm font-medium">새 매물 알림</p>
                    <p className="text-xs text-gray-500">관심 지역에 새 매물이 등록되면 알림을 받습니다</p>
                  </div>
                  <Switch defaultChecked />
                </button>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium">가격 변동 알림</p>
                    <p className="text-xs text-gray-500">관심 매물의 가격이 변동되면 알림을 받습니다</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium">마케팅 알림</p>
                    <p className="text-xs text-gray-500">이벤트 및 프로모션 정보를 받습니다</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 계정 설정 */}
          <Card>
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-real-blue mr-2" />
                  <h3 className="text-sm sm:text-base font-medium">계정 설정</h3>
                </div>
              </div>
              <Separator />
              <div>
                <Link to="/profile-edit" className="flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100">
                  <span className="text-xs sm:text-sm">프로필 수정</span>
                  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 rotate-180" />
                </Link>
                <Separator />
                <Link to="/password-change" className="flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100">
                  <span className="text-xs sm:text-sm">비밀번호 변경</span>
                  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 rotate-180" />
                </Link>
                <Separator />
                <Link to="/withdraw" className="flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100">
                  <span className="text-xs sm:text-sm text-red-500">회원 탈퇴</span>
                  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 rotate-180" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* 개인정보 설정 */}
          <Card>
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-real-blue mr-2" />
                  <h3 className="text-sm sm:text-base font-medium">개인정보 설정</h3>
                </div>
              </div>
              <Separator />
              <div>
                <Link to="/privacy" className="flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100">
                  <span className="text-xs sm:text-sm">개인정보 처리방침</span>
                  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 rotate-180" />
                </Link>
                <Separator />
                <Link to="/terms" className="flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100">
                  <span className="text-xs sm:text-sm">서비스 이용약관</span>
                  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 rotate-180" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* 일반 설정 */}
          <Card>
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-real-blue mr-2" />
                  <h3 className="text-sm sm:text-base font-medium">일반 설정</h3>
                </div>
              </div>
              <Separator />
              <div className="p-4 space-y-4">
                <button
                  onClick={handleLanguageClick}
                  className="flex items-center justify-between w-full text-left"
                >
                  <div>
                    <p className="text-xs sm:text-sm font-medium">언어 설정</p>
                    <p className="text-xs text-gray-500">한국어</p>
                  </div>
                </button>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium">앱 버전</p>
                    <p className="text-xs text-gray-500">v1.0.0</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
