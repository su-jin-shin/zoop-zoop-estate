
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";

type InterestArea = {
  id: string;
  city: string;
  district: string;
  dong: string;
};

const InterestAreas = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [interestAreas, setInterestAreas] = useState<InterestArea[]>([
    { id: "1", city: "서울시", district: "강남구", dong: "역삼동" },
    { id: "2", city: "서울시", district: "서초구", dong: "방배동" },
  ]);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDong, setSelectedDong] = useState("");

  const cities = ["서울시", "경기도", "인천시", "부산시", "대구시", "광주시", "대전시", "울산시"];
  
  const districts: Record<string, string[]> = {
    "서울시": ["강남구", "서초구", "송파구", "강동구", "영등포구", "구로구", "금천구", "동작구", "관악구", "마포구", "서대문구", "은평구"],
    "경기도": ["수원시", "성남시", "안양시", "부천시", "광명시", "평택시", "안산시", "고양시", "과천시", "구리시"],
  };

  const dongs: Record<string, string[]> = {
    "강남구": ["역삼동", "논현동", "압구정동", "청담동", "삼성동", "대치동"],
    "서초구": ["방배동", "서초동", "반포동", "잠원동", "양재동"],
    "송파구": ["잠실동", "신천동", "풍납동", "석촌동", "송파동"],
  };

  const handleAddArea = () => {
    if (!selectedCity || !selectedDistrict || !selectedDong) {
      toast({
        title: "모든 항목을 선택해주세요",
        description: "시/도, 구/군, 동을 모두 선택해야 합니다.",
        variant: "destructive",
      });
      return;
    }

    const exists = interestAreas.some(
      area => area.city === selectedCity && area.district === selectedDistrict && area.dong === selectedDong
    );

    if (exists) {
      toast({
        title: "이미 등록된 지역입니다",
        description: "해당 지역은 이미 관심 지역으로 등록되어 있습니다.",
        variant: "destructive",
      });
      return;
    }

    const newArea: InterestArea = {
      id: Date.now().toString(),
      city: selectedCity,
      district: selectedDistrict,
      dong: selectedDong,
    };

    setInterestAreas([...interestAreas, newArea]);
    setSelectedCity("");
    setSelectedDistrict("");
    setSelectedDong("");
    
    toast({
      title: "관심 지역이 추가되었습니다",
      description: `${selectedCity} ${selectedDistrict} ${selectedDong}이(가) 추가되었습니다.`,
    });
  };

  const handleRemoveArea = (id: string) => {
    setInterestAreas(interestAreas.filter(area => area.id !== id));
    toast({
      title: "관심 지역이 제거되었습니다",
      description: "해당 지역에 대한 알림을 더 이상 받지 않습니다.",
    });
  };

  const handleSave = () => {
    // TODO: 서버와 연동 시 수정 필요
    toast({
      title: "관심 지역이 저장되었습니다",
      description: "설정한 관심 지역에 새 매물이 등록되면 알림을 받습니다.",
    });
    navigate("/settings");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-3 sm:px-4 py-4 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2 h-8 w-8 sm:h-10 sm:w-10" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <h1 className="text-base sm:text-lg font-semibold">관심 지역 설정</h1>
          </div>
        </div>

        <div className="space-y-4">
          {/* Add New Area */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center mb-4">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-real-blue mr-2" />
                <h3 className="text-sm sm:text-base font-medium">새 관심 지역 추가</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="text-xs sm:text-sm">
                    <SelectValue placeholder="시/도 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city} className="text-xs sm:text-sm">
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select 
                  value={selectedDistrict} 
                  onValueChange={setSelectedDistrict}
                  disabled={!selectedCity}
                >
                  <SelectTrigger className="text-xs sm:text-sm">
                    <SelectValue placeholder="구/군 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCity && districts[selectedCity]?.map(district => (
                      <SelectItem key={district} value={district} className="text-xs sm:text-sm">
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select 
                  value={selectedDong} 
                  onValueChange={setSelectedDong}
                  disabled={!selectedDistrict}
                >
                  <SelectTrigger className="text-xs sm:text-sm">
                    <SelectValue placeholder="동 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedDistrict && dongs[selectedDistrict]?.map(dong => (
                      <SelectItem key={dong} value={dong} className="text-xs sm:text-sm">
                        {dong}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleAddArea}
                className="w-full text-xs sm:text-sm h-9 sm:h-10"
                disabled={!selectedCity || !selectedDistrict || !selectedDong}
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                관심 지역 추가
              </Button>
            </CardContent>
          </Card>

          {/* Current Interest Areas */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm sm:text-base font-medium mb-4">
                현재 관심 지역 ({interestAreas.length}개)
              </h3>
              
              {interestAreas.length > 0 ? (
                <div className="space-y-2">
                  {interestAreas.map(area => (
                    <div key={area.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 mr-2" />
                        <span className="text-xs sm:text-sm">
                          {area.city} {area.district} {area.dong}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveArea(area.id)}
                        className="text-red-500 hover:text-red-600 p-1 h-auto"
                      >
                        <X className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="h-8 w-8 sm:h-10 sm:w-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">아직 설정된 관심 지역이 없습니다</p>
                  <p className="text-xs text-gray-400 mt-1">새 관심 지역을 추가해보세요</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium mb-2">관심 지역 알림 안내</h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• 설정한 관심 지역에 새 매물이 등록되면 푸시 알림을 받습니다</li>
                <li>• 최대 10개의 관심 지역을 설정할 수 있습니다</li>
                <li>• 알림 설정에서 새 매물 알림을 꺼두면 알림을 받지 않습니다</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <Button onClick={handleSave} className="w-full text-xs sm:text-sm h-10 sm:h-11">
            저장하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterestAreas;
