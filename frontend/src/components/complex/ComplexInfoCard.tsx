import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import StarRating from "@/components/ui/star-rating";
import { useState, useEffect } from "react";

interface ComplexInfo {
  name: string;
  totalUnits: string;
  buildingType: string;
  completionDate: string;
  parking: string;
  facilities: string[];
  rating: number;
  images: string[];
}

interface ComplexInfoCardProps {
  complexInfo: ComplexInfo;
  className?: string;
}

const ComplexInfoCard = ({ complexInfo, className }: ComplexInfoCardProps) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateScrollButtons = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };

    updateScrollButtons();
    carouselApi.on("select", updateScrollButtons);

    return () => {
      carouselApi.off("select", updateScrollButtons);
    };
  }, [carouselApi]);

  return (
    <Card className={className}>
      <CardHeader className="pb-3 md:pb-4">
        <CardTitle className="text-base md:text-lg">단지 정보</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {/* 단지 사진 캐러셀 */}
        {complexInfo.images && complexInfo.images.length > 0 && (
          <div className="mb-4 md:mb-6">
            <p className="text-xs md:text-sm text-real-darkGray mb-2 md:mb-3">단지 사진</p>
            {complexInfo.images.length === 1 ? (
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <img 
                  src={complexInfo.images[0]} 
                  alt="단지 사진"
                  className="w-full h-full object-cover" 
                />
              </div>
            ) : (
              <Carousel className="w-full" setApi={setCarouselApi}>
                <CarouselContent>
                  {complexInfo.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-video overflow-hidden rounded-lg">
                        <img 
                          src={image} 
                          alt={`단지 사진 ${index + 1}`}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {canScrollPrev && <CarouselPrevious />}
                {canScrollNext && <CarouselNext />}
              </Carousel>
            )}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
          <div>
            <p className="text-xs md:text-sm text-real-darkGray">단지명</p>
            <p className="font-medium text-sm md:text-base">{complexInfo.name}</p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-real-darkGray">총 세대수</p>
            <p className="font-medium text-sm md:text-base">{complexInfo.totalUnits}</p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-real-darkGray">준공년도</p>
            <p className="font-medium text-sm md:text-base">{complexInfo.completionDate}</p>
          </div>
          <div>
            <p className="text-xs md:text-sm text-real-darkGray">주차</p>
            <p className="font-medium text-sm md:text-base">{complexInfo.parking}</p>
          </div>
        </div>
        <div className="mb-3 md:mb-4">
          <p className="text-xs md:text-sm text-real-darkGray mb-2">편의시설</p>
          <div className="flex flex-wrap gap-1 md:gap-2">
            {complexInfo.facilities.map((facility, index) => (
              <Badge key={index} variant="outline" className="text-xs">{facility}</Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs md:text-sm text-real-darkGray mb-2">평점</p>
          <div className="flex items-center space-x-2">
            <StarRating rating={complexInfo.rating} size="md" />
            <span className="font-medium text-base md:text-lg">{complexInfo.rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplexInfoCard;