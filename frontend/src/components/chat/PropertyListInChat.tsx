
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/property/PropertyCard";
import Map from "@/components/maps/Map";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { useEffect } from "react";

// 확장된 매물 목록 (페이징 데모용)
const mockProperties = [
  {
    id: 1,
    title: "햇살 가득한 오피스텔, 풀옵션",
    address: "서울시 마포구 서교동 456-78",
    price: "65만원",
    deposit: "5000만원",
    rentalType: "월세",
    propertyType: "오피스텔",
    size: "16평",
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    title: "넓은 테라스가 있는 복층 빌라",
    address: "서울시 용산구 한남동 789-10",
    price: "1억 2000만원",
    rentalType: "매매",
    propertyType: "빌라",
    size: "32평",
    imageUrl: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    title: "신축 투룸, 역 5분거리, 주차가능",
    address: "서울시 서대문구 연희동 321-54",
    price: "55만원",
    deposit: "3000만원",
    rentalType: "월세",
    propertyType: "빌라",
    size: "18평",
    imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 4,
    title: "모던한 신축 아파트, 역세권 위치",
    address: "서울시 강남구 역삼동 123-45",
    price: "80만원",
    deposit: "1억",
    rentalType: "전세",
    propertyType: "아파트",
    size: "24평",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 5,
    title: "한강뷰 럭셔리 아파트, 고층",
    address: "서울시 성동구 성수동 654-32",
    price: "1억 8000만원",
    rentalType: "매매",
    propertyType: "아파트",
    size: "42평",
    imageUrl: "https://images.unsplash.com/photo-1486304873000-235643847519?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 6,
    title: "대학가 인근 원룸, 풀옵션",
    address: "서울시 관악구 신림동 987-65",
    price: "45만원",
    deposit: "1000만원",
    rentalType: "월세",
    propertyType: "원룸",
    size: "9평",
    imageUrl: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 7,
    title: "깔끔한 투룸 오피스텔, 신축",
    address: "서울시 송파구 잠실동 111-22",
    price: "70만원",
    deposit: "4000만원",
    rentalType: "월세",
    propertyType: "오피스텔",
    size: "20평",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 8,
    title: "조용한 주택가 빌라, 주차 2대",
    address: "서울시 노원구 상계동 333-44",
    price: "50만원",
    deposit: "2000만원",
    rentalType: "월세",
    propertyType: "빌라",
    size: "22평",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 9,
    title: "역세권 신축 아파트, 풀옵션",
    address: "서울시 구로구 구로동 555-66",
    price: "1억 5000만원",
    rentalType: "매매",
    propertyType: "아파트",
    size: "36평",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  }
];

interface PropertyListInChatProps {
  onBackToChat: () => void;
}

const PropertyListInChat = ({ onBackToChat }: PropertyListInChatProps) => {
  console.log('[PropertyListInChat] Component is rendering');
  const [currentPage, setCurrentPage] = useState(1);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // 반응형 페이지당 매물 수: 모바일에서는 3개, 데스크톱에서는 2개
  const propertiesPerPage = isMobile ? 3 : 2;
  const totalPages = Math.ceil(mockProperties.length / propertiesPerPage);

  // 캐러셀 API 변경 감지 (데스크톱에서만)
  useEffect(() => {
    if (!carouselApi || isMobile) {
      return;
    }

    const onSelect = () => {
      const selectedIndex = carouselApi.selectedScrollSnap();
      setCurrentPage(selectedIndex + 1);
    };

    carouselApi.on("select", onSelect);
    onSelect();

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi, isMobile]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (!isMobile && carouselApi) {
      carouselApi.scrollTo(page - 1);
    }
  };

  // 현재 페이지에 표시할 매물들 계산
  const getCurrentPageProperties = () => {
    const startIndex = (currentPage - 1) * propertiesPerPage;
    return mockProperties.slice(startIndex, startIndex + propertiesPerPage);
  };

  // 매물의 전체 순서 번호 계산
  const getPropertyIndex = (propertyId: number) => {
    return mockProperties.findIndex(p => p.id === propertyId) + 1;
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-3 flex-shrink-0 bg-white">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => {
              console.log('[PropertyListInChat] Back button clicked');
              onBackToChat();
            }}
            className="mr-3"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">매물 목록</h1>
        </div>
      </div>

      {/* Content - 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-4 pb-8">
          {/* Map */}
          <div className="mb-4">
            <div className="h-48 rounded-lg overflow-hidden border border-gray-200">
              <Map />
            </div>
          </div>

          {/* Properties Header */}
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900">조건에 맞는 매물 {mockProperties.length}개</h2>
          </div>
          
          {/* Properties - 모바일과 데스크톱 다르게 렌더링 */}
          <div className="mb-6">
            {isMobile ? (
              // 모바일: 간단한 목록 (캐러셀 없음)
              <div className="flex flex-col space-y-4">
                {getCurrentPageProperties().map((property) => (
                  <div key={property.id} className="w-full relative">
                    {/* 순서 번호 */}
                    <div className="absolute top-2 left-2 z-10 bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-real-blue border border-real-blue shadow-sm">
                      {getPropertyIndex(property.id)}
                    </div>
                    <PropertyCard 
                      {...property} 
                      cardHeight="tall"
                      vertical={true}
                    />
                  </div>
                ))}
              </div>
            ) : (
              // 데스크톱: 캐러셀 사용
              <div className="relative px-16">
                <Carousel className="w-full" setApi={setCarouselApi}>
                  <CarouselContent>
                    {Array.from({ length: totalPages }, (_, pageIndex) => {
                      const pageStartIndex = pageIndex * propertiesPerPage;
                      const pageProperties = mockProperties.slice(pageStartIndex, pageStartIndex + propertiesPerPage);
                      
                      return (
                        <CarouselItem key={pageIndex} className="basis-full">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[400px]">
                            {pageProperties.map((property) => (
                              <div key={property.id} className="h-full relative">
                                {/* 순서 번호 */}
                                <div className="absolute top-2 left-2 z-10 bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-real-blue border border-real-blue shadow-sm">
                                  {getPropertyIndex(property.id)}
                                </div>
                                <PropertyCard 
                                  {...property} 
                                  cardHeight="tall"
                                  vertical={true}
                                />
                              </div>
                            ))}
                          </div>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg border hover:bg-gray-50" />
                  <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg border hover:bg-gray-50" />
                </Carousel>
              </div>
            )}
          </div>

          {/* Pagination - 모바일과 데스크톱 모두에서 표시 */}
          <div className="flex justify-center mb-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                    </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListInChat;
