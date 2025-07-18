
import React, { useState } from "react";
import { Search, List, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import PropertyCard from "@/components/property/PropertyCard";
import Map from "@/components/maps/Map";
import { PropertyPreferences } from "./types/chatTypes";
// import { ChatMessagesListRef } from "./ChatMessagesList"; // 더 이상 필요 없음

// Mock properties for the map view
const mapProperties = [
  {
    id: 1,
    title: "모던한 신축 아파트, 역세권 위치",
    address: "서울시 강남구 역삼동 123-45",
    price: "80만원",
    deposit: "1억",
    rentalType: "전세",
    propertyType: "아파트",
    size: "24평",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3"
  },
  {
    id: 2,
    title: "햇살 가득한 오피스텔, 풀옵션",
    address: "서울시 마포구 서교동 456-78",
    price: "65만원",
    deposit: "5000만원",
    rentalType: "월세",
    propertyType: "오피스텔",
    size: "16평",
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3"
  },
  {
    id: 3,
    title: "넓은 테라스가 있는 복층 빌라",
    address: "서울시 용산구 한남동 789-10",
    price: "1억 2000만원",
    rentalType: "매매",
    propertyType: "빌라",
    size: "32평",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3"
  }
];

type MapViewInChatProps = {
  onBackToChat: () => void;
  preferences: PropertyPreferences;
  // messagesContainerRef: React.RefObject<ChatMessagesListRef>; // 제거됨
};

const MapViewInChat = ({ onBackToChat, preferences }: MapViewInChatProps) => {
  const [showList, setShowList] = useState(false);

  const handleBackToChat = () => {
    onBackToChat();
  };

  // Create search query based on preferences
  const getSearchPlaceholder = () => {
    let placeholder = "";
    if (preferences.location) placeholder += preferences.location;
    if (preferences.transactionType) placeholder += ` ${preferences.transactionType}`;
    if (preferences.propertyType) placeholder += ` ${preferences.propertyType}`;
    return placeholder || "지역, 지하철역, 학교 등 검색";
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search bar */}
      <div className="bg-white py-2 border-b border-gray-200 flex-shrink-0">
        <div className="px-4">
          <div className="bg-white rounded-full border border-gray-200 py-1 px-2 flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full w-8 h-8 p-0"
              onClick={handleBackToChat}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Input 
              type="text" 
              placeholder={getSearchPlaceholder()}
              className="border-0 focus-visible:ring-0 flex-grow text-sm h-8 px-2" 
            />
            <Button size="sm" className="rounded-full h-7 w-7 p-0 bg-real-blue hover:bg-real-blue/90">
              <Search className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-4 py-2 flex-shrink-0">
          {/* Map container */}
          <div className="w-full h-[200px] relative">
            <Map />
            
            <div className="absolute bottom-4 left-4 z-10">
              <Button 
                onClick={() => setShowList(!showList)}
                className="bg-white text-real-black shadow-lg hover:bg-gray-100 text-xs py-1 px-3"
                size="sm"
              >
                <List className="h-4 w-4 mr-1.5" />
                목록 보기 ({mapProperties.length})
              </Button>
            </div>
          </div>
        </div>
        
        {/* Property list - with ScrollArea */}
        <div className="flex-1 flex flex-col bg-white mx-4 mb-6 rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-3 border-b flex-shrink-0 bg-white">
            <h2 className="font-bold text-base">
              {preferences.location ? `${preferences.location} ` : ''}
              주변 매물 {mapProperties.length}개
            </h2>
          </div>
          
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-3 pb-10">
              {mapProperties.map((property) => (
                <div key={property.id}>
                  <PropertyCard {...property} />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default MapViewInChat;
