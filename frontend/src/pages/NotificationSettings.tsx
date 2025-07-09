import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Home, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";

const NotificationSettings = () => {
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "알림 설정이 저장되었습니다",
      description: "설정한 조건에 맞는 알림을 받으실 수 있습니다.",
    });
  };

  const handleCancel = () => {
    toast({
      title: "변경사항이 취소되었습니다",
      description: "알림 설정이 변경되지 않았습니다.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-3 sm:px-4 py-4 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Link to="/notifications">
              <Button variant="ghost" size="icon" className="mr-2 h-8 w-8 sm:h-10 sm:w-10">
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <h1 className="text-base sm:text-lg font-semibold">알림 등록</h1>
          </div>
        </div>

        <div className="space-y-4">
          {/* 지역 설정 */}
          <Card>
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-real-blue mr-2" />
                  <h3 className="text-sm sm:text-base font-medium">관심 지역</h3>
                </div>
              </div>
              <Separator />
              <div className="p-4 space-y-4">
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">시/도</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="시/도를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seoul">서울특별시</SelectItem>
                      <SelectItem value="busan">부산광역시</SelectItem>
                      <SelectItem value="daegu">대구광역시</SelectItem>
                      <SelectItem value="incheon">인천광역시</SelectItem>
                      <SelectItem value="gwangju">광주광역시</SelectItem>
                      <SelectItem value="daejeon">대전광역시</SelectItem>
                      <SelectItem value="ulsan">울산광역시</SelectItem>
                      <SelectItem value="gyeonggi">경기도</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">구/군</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="구/군을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gangnam">강남구</SelectItem>
                      <SelectItem value="gangdong">강동구</SelectItem>
                      <SelectItem value="gangbuk">강북구</SelectItem>
                      <SelectItem value="gangseo">강서구</SelectItem>
                      <SelectItem value="gwanak">관악구</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">동/읍/면</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="동/읍/면을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cheongdam">청담동</SelectItem>
                      <SelectItem value="apgujeong">압구정동</SelectItem>
                      <SelectItem value="sinsa">신사동</SelectItem>
                      <SelectItem value="nonhyeon">논현동</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 매물 타입 */}
          <Card>
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <Home className="h-4 w-4 sm:h-5 sm:w-5 text-real-blue mr-2" />
                  <h3 className="text-sm sm:text-base font-medium">매물 타입</h3>
                </div>
              </div>
              <Separator />
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">아파트</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">오피스텔</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">빌라/연립</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm">단독주택</span>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 가격 범위 */}
          <Card>
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-real-blue mr-2" />
                  <h3 className="text-sm sm:text-base font-medium">가격 범위</h3>
                </div>
              </div>
              <Separator />
              <div className="p-4 space-y-4">
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">최소 가격</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="최소 가격을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">제한 없음</SelectItem>
                      <SelectItem value="1">1억원</SelectItem>
                      <SelectItem value="2">2억원</SelectItem>
                      <SelectItem value="3">3억원</SelectItem>
                      <SelectItem value="5">5억원</SelectItem>
                      <SelectItem value="10">10억원</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">최대 가격</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="최대 가격을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">제한 없음</SelectItem>
                      <SelectItem value="3">3억원</SelectItem>
                      <SelectItem value="5">5억원</SelectItem>
                      <SelectItem value="10">10억원</SelectItem>
                      <SelectItem value="20">20억원</SelectItem>
                      <SelectItem value="50">50억원</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 버튼 그룹 */}
          <div className="flex gap-3">
            <Button 
              onClick={handleSaveSettings}
              className="flex-1 bg-real-blue hover:bg-real-blue/90 text-white"
            >
              알림 설정 저장
            </Button>
            <Button 
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
              asChild
            >
              <Link to="/notifications">
                취소하기
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
