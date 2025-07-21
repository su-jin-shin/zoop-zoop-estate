import { useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { List, ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PropertyCard from "@/components/property/PropertyCard";
import Map from "@/components/maps/Map";
import MapSearchBar from "@/components/maps/MapSearchBar";
import CollapsiblePriceFilter from "@/components/maps/CollapsiblePriceFilter";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import AreaPriceInfo from "@/components/property/AreaPriceInfo";

// Mock properties for the map view - expanded for pagination demo
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
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
    isLowestPrice: true
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
  },
  {
    id: 4,
    title: "신축 투룸, 역 5분거리, 주차가능",
    address: "서울시 서대문구 연희동 321-54",
    price: "55만원",
    deposit: "3000만원",
    rentalType: "월세",
    propertyType: "빌라",
    size: "18평",
    imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3",
    isLowestPrice: true
  },
  {
    id: 5,
    title: "한강뷰 럭셔리 아파트, 고층",
    address: "서울시 성동구 성수동 654-32",
    price: "1억 8000만원",
    rentalType: "매매",
    propertyType: "아파트",
    size: "42평",
    imageUrl: "https://images.unsplash.com/photo-1486304873000-235643847519?ixlib=rb-4.0.3"
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
    imageUrl: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?ixlib=rb-4.0.3"
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
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3"
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
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3"
  },
  {
    id: 9,
    title: "역세권 신축 아파트, 풀옵션",
    address: "서울시 구로구 구로동 555-66",
    price: "1억 5000만원",
    rentalType: "매매",
    propertyType: "아파트",
    size: "36평",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3"
  },
  {
    id: 10,
    title: "채광 좋은 남향 아파트",
    address: "서울시 양천구 목동 777-88",
    price: "90만원",
    deposit: "8000만원",
    rentalType: "전세",
    propertyType: "아파트",
    size: "28평",
    imageUrl: "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3"
  }
];

const MapSearch = () => {
  /* ───────────── URL 쿼리 읽기 ───────────── */
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const keyword = searchParams.get("keyword") || "";   // 검색어
  const isComplexSearch = searchParams.get("isComplexSearch") === "true"; // 단지여부
  /* ─────────────────────────────────── */
  
  const [showList, setShowList] = useState(false);
  const [transactionType, setTransactionType] = useState("all");
  const [propertyType, setPropertyType] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minDeposit, setMinDeposit] = useState("");
  const [maxDeposit, setMaxDeposit] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("ranking");
  // const [isComplexSearch, setIsComplexSearch] = useState(true); // 단지명 검색 여부 (임시로 true로 설정)
  const [isPriceInfoOpen, setIsPriceInfoOpen] = useState(true);
  
  // 면적별 시세 더보기 상태 관리
  const [showAllSale, setShowAllSale] = useState(false);
  const [showAllJeonse, setShowAllJeonse] = useState(false);
  const [showAllMonthly, setShowAllMonthly] = useState(false);

  const propertyListRef = useRef<HTMLDivElement>(null);

  const propertiesPerPage = 5;
  const totalPages = Math.ceil(mapProperties.length / propertiesPerPage);

  // Calculate current page properties
  const getCurrentPageProperties = () => {
    const startIndex = (currentPage - 1) * propertiesPerPage;
    return mapProperties.slice(startIndex, startIndex + propertiesPerPage);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to property list when page changes
    if (propertyListRef.current) {
      propertyListRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1); // Reset to first page when sorting changes
    console.log('Sort changed to:', value);
  };

  const handleListViewClick = () => {
    setShowList(!showList);
    // Scroll to property list when showing list
    if (!showList && propertyListRef.current) {
      propertyListRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const isMonthlyRent = transactionType === "monthly";
  const shouldShowPriceRange = transactionType !== "all";

  // Price formatting functions
  const formatInputDisplay = (value: string, isMonthly = false) => {
    if (!value) return "";
    const num = parseInt(value);
    if (isMonthly) {
      if (num >= 10000) {
        const eok = Math.floor(num / 10000);
        const remainder = num % 10000;
        if (remainder === 0) {
          return `${eok}억`;
        } else {
          return `${eok}억${remainder}만원`;
        }
      }
      return `${num}만원`;
    }
    if (num >= 10000) {
      const eok = Math.floor(num / 10000);
      const remainder = num % 10000;
      if (remainder === 0) {
        return `${eok}억`;
      } else {
        return `${eok}억${remainder}만원`;
      }
    }
    return `${num}만원`;
  };

  const handleApplyPriceFilter = () => {
    console.log('Price filters applied:', { minPrice, maxPrice, minDeposit, maxDeposit });
    // Reset to first page when applying filters
    setCurrentPage(1);
  };

  const handleResetPriceFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    if (isMonthlyRent) {
      setMinDeposit("");
      setMaxDeposit("");
    }
    // Reset to first page when resetting filters
    setCurrentPage(1);
  };

  const handleTransactionTypeChange = (value: string) => {
    setTransactionType(value);
    setMinPrice("");
    setMaxPrice("");
    setMinDeposit("");
    setMaxDeposit("");
    // Reset to first page when changing transaction type
    setCurrentPage(1);
  };

    const handlePropertyClick = (propertyId: number) => {
    navigate(`/property/${propertyId}`);
  };

  // 면적별 시세 데이터 (단지 정보용) - 거래 유형별로 구분
  const complexPriceInfo = {
    sale: [
      {
        area: "20평대",
        minPrice: "7억 5천만원",
        avgPrice: "8억 2천만원",
        count: 12,
        sampleProperty: { id: 101, description: "남향, 고층, 풀옵션" }
      },
      {
        area: "24평",
        minPrice: "8억원",
        avgPrice: "8억 7천만원",
        count: 8,
        sampleProperty: { id: 102, description: "남동향, 중층, 신축" }
      },
      {
        area: "30평대",
        minPrice: "9억 8천만원",
        avgPrice: "10억 5천만원",
        count: 15,
        sampleProperty: { id: 103, description: "한강뷰, 고층, 프리미엄" }
      },
      {
        area: "40평대",
        minPrice: "12억원",
        avgPrice: "13억 2천만원",
        count: 6,
        sampleProperty: { id: 104, description: "펜트하우스급, 최고층" }
      },
      {
        area: "50평대",
        minPrice: "15억원",
        avgPrice: "16억 5천만원",
        count: 4,
        sampleProperty: { id: 105, description: "초대형 평수, 최고급" }
      },
      {
        area: "60평대",
        minPrice: "18억원",
        avgPrice: "20억원",
        count: 2,
        sampleProperty: { id: 106, description: "특별한 설계, 프리미엄급" }
      }
    ],
    jeonse: [
      {
        area: "20평대",
        minPrice: "4억 5천만원",
        avgPrice: "5억 2천만원",
        count: 18,
        sampleProperty: { id: 201, description: "남향, 중층, 풀옵션" }
      },
      {
        area: "24평",
        minPrice: "5억원",
        avgPrice: "5억 7천만원",
        count: 14,
        sampleProperty: { id: 202, description: "남동향, 고층, 신축" }
      },
      {
        area: "30평대",
        minPrice: "6억원",
        avgPrice: "6억 8천만원",
        count: 22,
        sampleProperty: { id: 203, description: "한강뷰, 고층, 프리미엄" }
      },
      {
        area: "40평대",
        minPrice: "7억 5천만원",
        avgPrice: "8억 2천만원",
        count: 10,
        sampleProperty: { id: 204, description: "펜트하우스급, 최고층" }
      },
      {
        area: "50평대",
        minPrice: "9억원",
        avgPrice: "10억원",
        count: 6,
        sampleProperty: { id: 205, description: "초대형 평수, 최고급" }
      }
    ],
    monthly: [
      {
        area: "20평대",
        deposit: "1억~2억",
        minRent: "80만원",
        avgRent: "95만원",
        count: 25,
        sampleProperty: { id: 301, description: "남향, 중층, 풀옵션" }
      },
      {
        area: "24평",
        deposit: "1억 5천~2억 5천",
        minRent: "90만원",
        avgRent: "110만원",
        count: 20,
        sampleProperty: { id: 302, description: "남동향, 고층, 신축" }
      },
      {
        area: "30평대",
        deposit: "2억~3억",
        minRent: "120만원",
        avgRent: "145만원",
        count: 28,
        sampleProperty: { id: 303, description: "한강뷰, 고층, 프리미엄" }
      },
      {
        area: "40평대",
        deposit: "3억~4억",
        minRent: "150만원",
        avgRent: "180만원",
        count: 12,
        sampleProperty: { id: 304, description: "펜트하우스급, 최고층" }
      },
      {
        area: "50평대",
        deposit: "4억~5억",
        minRent: "200만원",
        avgRent: "230만원",
        count: 8,
        sampleProperty: { id: 305, description: "초대형 평수, 최고급" }
      },
      {
        area: "60평대",
        deposit: "5억~6억",
        minRent: "250만원",
        avgRent: "280만원",
        count: 5,
        sampleProperty: { id: 306, description: "특별한 설계, 프리미엄급" }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* 새로운 검색바 컴포넌트 사용 */}
      <MapSearchBar />

      {/* Location display */}
      <div className="bg-white border-b border-gray-200 py-2">
        <div className="max-w-3xl mx-auto px-3 sm:px-4">
          <span className="text-sm text-real-darkGray">서울특별시 중구 을지로동</span>
        </div>
      </div>
      
      <main className="flex-grow flex flex-col">
        <div className="max-w-3xl mx-auto w-full px-3 sm:px-4">
          {/* Map container */}
          <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] relative">
            <Map />
            
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-10">
              <Button 
                onClick={handleListViewClick}
                className="bg-white text-real-black shadow-lg hover:bg-gray-100 text-xs py-1.5 px-2.5 sm:py-1 sm:px-3 h-auto"
                size="sm"
              >
                <List className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-1.5" />
                목록 보기 ({mapProperties.length})
              </Button>
            </div>
          </div>

          {/* 단지정보 섹션 - 단지명으로 검색했을 때만 표시 */}
          {isComplexSearch && (
            <div className="bg-white rounded-lg border border-gray-200 mt-3 sm:mt-4 p-4">
              <h3 className="font-medium text-base mb-4">강남래미안 단지정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-xs text-real-darkGray">단지명</p>
                  <p className="font-medium text-sm">강남래미안 아파트</p>
                </div>
                <div>
                  <p className="text-xs text-real-darkGray">총 세대수</p>
                  <p className="font-medium text-sm">총 240세대</p>
                </div>
                <div>
                  <p className="text-xs text-real-darkGray">준공년도</p>
                  <p className="font-medium text-sm">2021년 8월</p>
                </div>
                <div>
                  <p className="text-xs text-real-darkGray">주차</p>
                  <p className="font-medium text-sm">세대당 1.5대</p>
                </div>
              </div>
              <div className="mb-3">
                <p className="text-xs text-real-darkGray mb-2">편의시설</p>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">피트니스센터</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">키즈카페</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">독서실</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">게스트하우스</span>
                </div>
              </div>

              {/* 면적별 시세 섹션 추가 */}
              <AreaPriceInfo
                complexPriceInfo={complexPriceInfo}
                onPropertyClick={handlePropertyClick}
                className="mb-3"
              />

            </div>
          )}
            
          {/* Filter Tabs - 컴팩트하게 변경 */}
          <div className="bg-white border-b border-gray-200 py-3 mt-3 space-y-3">
            {/* 거래 유형 */}
            <Tabs defaultValue="all" onValueChange={handleTransactionTypeChange}>
              <div>
                <span className="text-sm font-medium text-real-darkGray mb-2 block">거래 유형</span>
                <TabsList className="w-full grid grid-cols-4 h-9 sm:h-10 lg:h-11">
                  <TabsTrigger value="all" className="text-xs sm:text-sm">전체</TabsTrigger>
                  <TabsTrigger value="sale" className="text-xs sm:text-sm">매매</TabsTrigger> 
                  <TabsTrigger value="jeonse" className="text-xs sm:text-sm">전세</TabsTrigger>
                  <TabsTrigger value="monthly" className="text-xs sm:text-sm">월세</TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
            
            {/* 접을 수 있는 가격 필터 */}
            {shouldShowPriceRange && (
              <CollapsiblePriceFilter
                transactionType={transactionType}
                minPrice={minPrice}
                maxPrice={maxPrice}
                minDeposit={minDeposit}
                maxDeposit={maxDeposit}
                onMinPriceChange={setMinPrice}
                onMaxPriceChange={setMaxPrice}
                onMinDepositChange={setMinDeposit}
                onMaxDepositChange={setMaxDeposit}
                onApplyFilter={handleApplyPriceFilter}
                onResetFilter={handleResetPriceFilter}
                formatInputDisplay={formatInputDisplay}
              />
            )}
            
            {/* 매물 유형 */}
            {!isComplexSearch && (
              <div>
                <span className="text-sm font-medium text-real-darkGray mb-2 block">매물 유형</span>
                <Tabs defaultValue="all" onValueChange={setPropertyType}>
                  <TabsList className="w-full grid grid-cols-5 h-9 sm:h-10 lg:h-11">
                    <TabsTrigger value="all" className="text-xs sm:text-sm px-1">전체</TabsTrigger>
                    <TabsTrigger value="apartment" className="text-xs sm:text-sm px-1">아파트</TabsTrigger>
                    <TabsTrigger value="officetel" className="text-xs sm:text-sm px-1">오피스텔</TabsTrigger>
                    <TabsTrigger value="villa" className="text-xs sm:text-sm px-1">빌라</TabsTrigger>
                    <TabsTrigger value="house" className="text-xs sm:text-sm px-1">단독/다가구</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            )}
          </div>

          
          {/* Property list - Modified for 2-column layout on larger screens */}
          <div ref={propertyListRef} className="bg-white overflow-auto rounded-lg border border-gray-200 mt-3 sm:mt-4">
            <div className="p-2.5 sm:p-3 border-b sticky top-0 bg-white z-20 flex items-center justify-between">
              <h2 className="font-bold text-sm sm:text-base">주변 매물 {mapProperties.length}개</h2>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[140px] h-8 text-xs">
                  {/* <ArrowUpDown className="h-3 w-3 mr-1" /> */}
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-[100] bg-white border shadow-lg">
                  <SelectItem value="ranking">랭킹순</SelectItem>
                  <SelectItem value="latest">최신순</SelectItem>
                  <SelectItem value="price-low">낮은가격순</SelectItem>
                  <SelectItem value="price-high">높은가격순</SelectItem>
                  <SelectItem value="area-large">넓은면적순</SelectItem>
                  <SelectItem value="area-small">좁은면적순</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="p-2.5 sm:p-3">
              {/* Grid layout for larger screens, single column for mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                {getCurrentPageProperties().map((property, index) => {
                  const sequentialNumber = (currentPage - 1) * propertiesPerPage + index + 1;
                  return (
                    <div key={property.id} className="relative">
                      <div className="absolute top-2 left-2 z-10">
                        <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-real-blue border border-real-blue shadow-sm">
                          {sequentialNumber}
                        </div>
                      </div>
                      <PropertyCard {...property} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="border-t p-4 flex justify-center">
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
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MapSearch;
