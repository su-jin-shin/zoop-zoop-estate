
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, Maximize } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full h-full min-h-[200px] rounded-md overflow-hidden border border-gray-200">
      <div 
        ref={mapContainerRef} 
        className="bg-gray-100 absolute inset-0 flex items-center justify-center"
      >
        <div className="text-center p-3">
          <MapPin className="h-8 w-8 mx-auto mb-2 text-real-blue" />
          <h3 className="text-xs font-medium mb-1">지도를 사용하려면 API 키가 필요합니다</h3>
          <p className="text-xs text-gray-500 mb-2">실제 서비스에서는 지도 API가 여기에 연동됩니다</p>
          <Button 
            size="sm"
            className="bg-real-blue hover:bg-blue-700 text-xs py-1 px-2 h-7"
          >
            지도로 보기
          </Button>
        </div>
      </div>
      
      {/* Full screen dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            size="sm" 
            variant="outline" 
            className="absolute bottom-2 right-2 z-10 bg-white text-real-darkGray hover:bg-gray-100 text-xs h-6 px-2 py-0 shadow-md border"
          >
            <Maximize className="h-3 w-3 mr-1" />
            전체화면
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[95vw] h-[90vh] max-w-none p-0 border-0">
          <div className="relative h-full w-full bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-10 w-10 mx-auto mb-2 text-real-blue" />
              <h3 className="text-sm font-medium mb-1">전체화면 지도</h3>
              <p className="text-xs text-gray-500">실제 서비스에서는 전체화면 지도가 표시됩니다</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Map;
