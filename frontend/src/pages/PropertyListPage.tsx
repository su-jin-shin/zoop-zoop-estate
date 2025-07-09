
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/property/PropertyCard";
import Map from "@/components/maps/Map";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";

// Extended mock properties for pagination demo
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
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
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

const ITEMS_PER_PAGE = 4;

const PropertyListPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(mockProperties.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProperties = mockProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleBackButton = () => {
    navigate(-1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleBackButton}
            className="mr-3"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">매물 지도</h1>
        </div>
      </div>

      {/* Map */}
      <div className="px-4 py-4">
        <div className="w-full h-[200px] relative">
          <Map />
        </div>
      </div>

      {/* Property List */}
      <div className="px-4">
        <div className="mb-4">
          <h2 className="text-lg font-bold">강남역 주변 매물 {mockProperties.length}개</h2>
        </div>
        
        <div className="space-y-3 mb-6">
          {currentProperties.map((property) => (
            <PropertyCard 
              key={property.id} 
              {...property} 
              cardHeight="tall"
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mb-8">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="cursor-pointer"
                    />
                  </PaginationItem>
                )}
                
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
                
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="cursor-pointer"
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyListPage;
