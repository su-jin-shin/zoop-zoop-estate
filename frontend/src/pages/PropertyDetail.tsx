import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Heart, Share, MapPin, Home, Ruler, Calendar, Star, User, Edit, Bed, Bath, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ContactModal from "@/components/modals/ContactModal";
import StarRating from "@/components/ui/star-rating";

// Mock property data for the detail page
const propertyData = {
  id: 1,
  title: "모던한 신축 아파트, 역세권 위치",
  address: "서울시 강남구 역삼동 123-45",
  price: "80만원",
  deposit: "1억",
  rentalType: "전세",
  propertyType: "아파트",
  size: "24평",
  rooms: 3,
  baths: 2,
  floor: "8층",
  builtIn: "2022년",
  features: ["주차가능", "엘리베이터", "신축", "풀옵션", "즉시입주"],
  description: "역삼역 도보 5분 거리에 위치한 신축 아파트입니다. 햇살이 잘 들어오는 거실과 3개의 방, 2개의 화장실을 갖추고 있으며, 모던한 인테리어가 특징입니다. 주변에 편의시설이 잘 갖춰져 있고, 교통이 편리합니다. 연락주시면 언제든지 방문가능합니다.",
  images: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3"
  ],
  agent: {
    name: "김부동",
    company: "한국부동산",
    phone: "010-1234-5678",
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  createdAt: "2025-05-15",
  complexInfo: {
    name: "역삼 더샵 아파트",
    totalUnits: "총 120세대",
    buildingType: "아파트형 주택",
    completionDate: "2022년 3월",
    parking: "세대당 1.2대",
    facilities: ["피트니스센터", "어린이놀이터", "커뮤니티시설", "관리사무소"],
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3"
    ],
    priceInfo: [
      {
        area: "20평대",
        minPrice: "7억 5천만원",
        avgPrice: "8억 2천만원",
        count: 24,
        sampleProperty: {
          id: 101,
          description: "남향, 고층, 풀옵션"
        }
      },
      {
        area: "24평",
        minPrice: "8억원",
        avgPrice: "8억 7천만원",
        count: 18,
        sampleProperty: {
          id: 102,
          description: "남동향, 중층, 신축"
        }
      },
      {
        area: "30평대",
        minPrice: "9억 8천만원",
        avgPrice: "10억 5천만원",
        count: 32,
        sampleProperty: {
          id: 103,
          description: "한강뷰, 고층, 프리미엄"
        }
      },
      {
        area: "40평대",
        minPrice: "12억원",
        avgPrice: "13억 2천만원",
        count: 16,
        sampleProperty: {
          id: 104,
          description: "펜트하우스급, 최고층"
        }
      }
    ]
  },
  nearbyFacilities: [
    { name: "역삼역", distance: "도보 5분", type: "지하철" },
    { name: "이마트", distance: "도보 3분", type: "마트" },
    { name: "삼성서울병원", distance: "차량 10분", type: "병원" },
    { name: "역삼초등학교", distance: "도보 8분", type: "학교" }
  ]
};

// Mock reviews data - 페이징을 위한 더 많은 데이터
const mockReviews = [
  {
    id: 1,
    author: "김철수",
    rating: 4,
    date: "2024-12-15",
    content: "교통이 정말 편리하고 주변 상권도 잘 발달되어 있어요. 다만 주차가 조금 아쉽습니다.",
    helpful: 12
  },
  {
    id: 2,
    author: "이영희",
    rating: 5,
    date: "2024-12-10",
    content: "신축이라 시설이 깨끗하고 관리도 잘 되어 있습니다. 특히 보안이 잘 되어 있어서 만족해요.",
    helpful: 8
  },
  {
    id: 3,
    author: "박민수",
    rating: 3,
    date: "2024-12-05",
    content: "위치는 좋지만 소음이 조금 있어요. 그래도 전반적으로는 괜찮습니다.",
    helpful: 5
  },
  {
    id: 4,
    author: "정수진",
    rating: 5,
    date: "2024-12-01",
    content: "단지 시설이 정말 좋고 관리도 잘 되어 있어요. 아이들 놀이터도 깨끗하고 안전해서 만족합니다.",
    helpful: 15
  },
  {
    id: 5,
    author: "이민호",
    rating: 4,
    date: "2024-11-28",
    content: "역삼역에서 도보 5분이라 출퇴근이 너무 편해요. 주변에 먹거리도 많고 좋습니다.",
    helpful: 9
  },
  {
    id: 6,
    author: "박지영",
    rating: 5,
    date: "2024-11-25",
    content: "한강뷰가 정말 멋져요. 저녁에 보는 야경이 환상적입니다. 강력 추천!",
    helpful: 20
  },
  {
    id: 7,
    author: "최영수",
    rating: 4,
    date: "2024-11-20",
    content: "신축이라 깨끗하고 시설이 좋아요. 피트니스센터도 잘 되어 있어서 만족합니다.",
    helpful: 7
  },
  {
    id: 8,
    author: "김민정",
    rating: 3,
    date: "2024-11-15",
    content: "전반적으로는 괜찮지만 엘리베이터 대기시간이 조금 길어요. 그래도 살만합니다.",
    helpful: 4
  },
  {
    id: 9,
    author: "장동건",
    rating: 5,
    date: "2024-11-10",
    content: "보안이 철저하고 관리사무소 직원분들이 친절해요. 안심하고 살 수 있어서 좋습니다.",
    helpful: 11
  },
  {
    id: 10,
    author: "윤서희",
    rating: 4,
    date: "2024-11-05",
    content: "채광이 정말 좋고 남향이라 따뜻해요. 구조도 효율적으로 잘 되어 있습니다.",
    helpful: 8
  },
  {
    id: 11,
    author: "조현우",
    rating: 5,
    date: "2024-11-01",
    content: "주차공간이 넉넉하고 지하주차장이 깨끗해요. 차량 관리하기 정말 편리합니다.",
    helpful: 13
  },
  {
    id: 12,
    author: "한예슬",
    rating: 4,
    date: "2024-10-28",
    content: "단지 내 조경이 아름답고 산책하기 좋아요. 아이들이 뛰어놀기도 안전합니다.",
    helpful: 6
  }
];

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [mainImage, setMainImage] = useState(propertyData.images[0]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [reviews, setReviews] = useState(mockReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [reviewCurrentPage, setReviewCurrentPage] = useState(1);
  const [isPriceInfoOpen, setIsPriceInfoOpen] = useState(false);
  const reviewsSectionRef = useRef<HTMLDivElement>(null);

  // 리뷰 페이징 설정
  const reviewsPerPage = 4;
  const totalReviewPages = Math.ceil(reviews.length / reviewsPerPage);
  const startReviewIndex = (reviewCurrentPage - 1) * reviewsPerPage;
  const currentPageReviews = reviews.slice(startReviewIndex, startReviewIndex + reviewsPerPage);

  const handleBackButton = () => {
    setTimeout(() => {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate('/');
      }
    }, 100);
  };

  const handleSubmitReview = () => {
    if (newReview.trim()) {
      const review = {
        id: reviews.length + 1,
        author: "익명 사용자",
        rating: newRating,
        date: new Date().toISOString().split('T')[0],
        content: newReview,
        helpful: 0
      };
      setReviews([review, ...reviews]);
      setNewReview("");
      setNewRating(5);
    }
  };

  const handleAgentClick = () => {
    navigate(`/agency/1`);
  };

  const handleContactClick = () => {
    setShowContactModal(true);
  };
  
  const handlePropertyClick = (propertyId: number) => {
    navigate(`/property/${propertyId}`);
  };

  const handleReviewPageChange = (page: number) => {
    setReviewCurrentPage(page);
    // Scroll to reviews section when page changes
    if (reviewsSectionRef.current) {
      reviewsSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

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

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    if (interactive && onRatingChange) {
      // Keep interactive version for review form
      return (
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              } cursor-pointer hover:text-yellow-400`}
              onClick={() => onRatingChange(star)}
            />
          ))}
        </div>
      );
    }
    
    // Use new StarRating component for display
    return <StarRating rating={rating} size="sm" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Fixed Navbar */}
      <Navbar />
      
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-6 max-w-3xl mt-4">
        <div className="mb-4 md:mb-6">
          {/* 개선된 헤더 섹션 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6 mb-4">
            {/* 상단 액션 바 */}
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={handleBackButton}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 bg-gray-50 hover:bg-blue-50 rounded-full px-3 py-2 group"
              >
                <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-0.5" />
                <span className="text-sm font-medium">돌아가기</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex items-center transition-all duration-200 px-3 py-2 h-9 border-gray-200 hover:border-red-200 ${
                    isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-600 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-4 w-4 mr-1.5 transition-all ${isFavorite ? 'fill-red-500 scale-110' : ''}`} />
                  <span className="text-sm">관심</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 px-3 py-2 h-9 border-gray-200 hover:border-blue-200 hover:bg-blue-50"
                >
                  <Share className="h-4 w-4 mr-1.5" />
                  <span className="text-sm">공유</span>
                </Button>
              </div>
            </div>
            
            {/* 매물 타입 배지들 */}
            <div className="flex items-center space-x-2 mb-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-2.5 py-1 text-xs font-medium">
                {propertyData.rentalType}
              </Badge>
              <Badge variant="outline" className="border-gray-300 text-gray-600 px-2.5 py-1 text-xs">
                {propertyData.propertyType}
              </Badge>
            </div>
            
            {/* 매물 제목 */}
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight">
              {propertyData.title}
            </h1>
            
            {/* 주소 정보 */}
            <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
              <MapPin className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
              <span className="text-sm">{propertyData.address}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 md:space-y-6">
          {/* 이미지 섹션 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative aspect-video">
              <img 
                src={mainImage} 
                alt={propertyData.title}
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="p-1 overflow-x-auto">
              <div className="flex space-x-1">
                {propertyData.images.map((image, index) => (
                  <button 
                    key={index}
                    onClick={() => setMainImage(image)}
                    className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded overflow-hidden ${mainImage === image ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <img 
                      src={image} 
                      alt={`${propertyData.title} ${index + 1}`}
                      className="w-full h-full object-cover" 
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* 가격 및 기본 정보 */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <div className="mb-4 md:mb-6">
              <p className="text-xs md:text-sm text-gray-600 mb-1">가격</p>
              <div className="flex items-baseline flex-wrap">
                {propertyData.deposit && (
                  <span className="font-bold text-xl md:text-2xl text-gray-900 mr-1">
                    {propertyData.deposit} /
                  </span>
                )}
                <span className="font-bold text-xl md:text-2xl text-gray-900">
                  {propertyData.price}
                </span>
              </div>
            </div>
            
            <Separator className="my-3 md:my-4" />
            
            {/* 기본 정보 - 원래 형태로 복원 */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="flex items-center">
                <Home className="h-4 w-4 text-gray-600 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-900">{propertyData.propertyType}</span>
              </div>
              
              <div className="flex items-center">
                <Ruler className="h-4 w-4 text-gray-600 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-900">{propertyData.size}</span>
              </div>
              
              <div className="flex items-center">
                <Bed className="h-4 w-4 text-gray-600 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-900">{propertyData.rooms}개 방</span>
              </div>
              
              <div className="flex items-center">
                <Bath className="h-4 w-4 text-gray-600 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-900">{propertyData.baths}개 화장실</span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-600 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-900">{propertyData.builtIn}</span>
              </div>
              
              <div className="flex items-center">
                <div className="h-4 w-4 text-gray-600 mr-2 flex-shrink-0 rounded bg-gray-300 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">층</span>
                </div>
                <span className="text-sm text-gray-900">{propertyData.floor}</span>
              </div>
            </div>
            
            <Separator className="my-3 md:my-4" />
            
            {/* 중개사 정보 - 클릭 가능하게 수정 */}
            <div className="mb-4 md:mb-6">
              <div 
                className="flex items-center mb-3 md:mb-4 cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
                onClick={handleAgentClick}
              >
                <img 
                  src={propertyData.agent.image} 
                  alt={propertyData.agent.name} 
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-3 flex-shrink-0" 
                />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm md:text-base truncate">{propertyData.agent.name}</p>
                  <p className="text-xs md:text-sm text-gray-600 truncate">{propertyData.agent.company}</p>
                </div>
                <div className="text-xs text-blue-600 font-medium">보기 &gt;</div>
              </div>
              <p className="text-xs md:text-sm text-gray-600">
                등록일: {propertyData.createdAt}
              </p>
            </div>
          </div>
          
          {/* 탭 섹션 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Tabs defaultValue="property-info">
              <TabsList className="bg-real-lightBlue border-b w-full justify-start rounded-none p-0 h-auto">
                <TabsTrigger value="property-info" className="py-2.5 md:py-3 px-3 md:px-6 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-real-blue text-xs md:text-sm flex-1 text-center">매물 정보</TabsTrigger>
                <TabsTrigger value="location" className="py-2.5 md:py-3 px-3 md:px-6 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-real-blue text-xs md:text-sm flex-1 text-center">위치</TabsTrigger>
                <TabsTrigger value="reviews" className="py-2.5 md:py-3 px-3 md:px-6 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-real-blue text-xs md:text-sm flex-1 text-center">리뷰</TabsTrigger>
              </TabsList>
              
              <TabsContent value="property-info" className="p-4 md:p-6">
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <h3 className="font-medium text-base md:text-lg mb-3">상세 정보</h3>
                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                      <div>
                        <p className="text-real-darkGray text-xs md:text-sm">매물 종류</p>
                        <p className="font-medium text-sm md:text-base text-real-black">{propertyData.propertyType}</p>
                      </div>
                      <div>
                        <p className="text-real-darkGray text-xs md:text-sm">평수</p>
                        <p className="font-medium text-sm md:text-base text-real-black">{propertyData.size}</p>
                      </div>
                      <div>
                        <p className="text-real-darkGray text-xs md:text-sm">방 / 화장실</p>
                        <p className="font-medium text-sm md:text-base text-real-black">{propertyData.rooms}개 / {propertyData.baths}개</p>
                      </div>
                      <div>
                        <p className="text-real-darkGray text-xs md:text-sm">층수</p>
                        <p className="font-medium text-sm md:text-base text-real-black">{propertyData.floor}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium text-base md:text-lg mb-3">매물 특징</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
                      {propertyData.features.map((feature, index) => (
                        <div key={index} className="flex items-center bg-real-lightBlue rounded-lg p-2.5 md:p-3">
                          <div className="bg-real-blue/10 rounded-full p-1.5 md:p-2 mr-2 flex-shrink-0">
                            <Home className="h-3 w-3 md:h-5 md:w-5 text-real-blue" />
                          </div>
                          <span className="text-sm md:text-base text-real-black">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium text-base md:text-lg mb-3">상세 설명</h3>
                    <p className="text-sm md:text-base text-real-darkGray whitespace-pre-line leading-relaxed">
                      {propertyData.description}
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="p-4 md:p-6">
                <div className="mb-4 md:mb-6">
                  <h3 className="font-medium text-base md:text-lg mb-3">위치 정보</h3>
                  <div className="bg-gray-200 h-48 md:h-64 rounded-lg flex items-center justify-center">
                    <p className="text-real-darkGray text-sm md:text-base text-center px-4">지도 영역 (실제 앱에서는 지도 API 통합)</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-real-darkGray text-sm md:text-base flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{propertyData.address}</span>
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="mt-4">
                  <h4 className="font-medium mb-3">주변 편의시설</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {propertyData.nearbyFacilities.map((facility, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{facility.name}</p>
                          <p className="text-xs text-gray-500">{facility.type}</p>
                        </div>
                        <span className="text-xs text-gray-600">{facility.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="p-4 md:p-6">
                <div className="space-y-4 md:space-y-6">
                  {/* 단지 정보 */}
                  <Card>
                    <CardHeader className="pb-3 md:pb-4">
                      <CardTitle className="text-base md:text-lg">단지 정보</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {/* 단지 사진 캐러셀 */}
                      {propertyData.complexInfo.images && propertyData.complexInfo.images.length > 0 && (
                        <div className="mb-4 md:mb-6">
                          <p className="text-xs md:text-sm text-real-darkGray mb-2 md:mb-3">단지 사진</p>
                          {propertyData.complexInfo.images.length === 1 ? (
                            <div className="relative aspect-video overflow-hidden rounded-lg">
                              <img 
                                src={propertyData.complexInfo.images[0]} 
                                alt="단지 사진"
                                className="w-full h-full object-cover" 
                              />
                            </div>
                          ) : (
                            <Carousel className="w-full" setApi={setCarouselApi}>
                              <CarouselContent>
                                {propertyData.complexInfo.images.map((image, index) => (
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
                          <p className="font-medium text-sm md:text-base">{propertyData.complexInfo.name}</p>
                        </div>
                        <div>
                          <p className="text-xs md:text-sm text-real-darkGray">총 세대수</p>
                          <p className="font-medium text-sm md:text-base">{propertyData.complexInfo.totalUnits}</p>
                        </div>
                        <div>
                          <p className="text-xs md:text-sm text-real-darkGray">준공년도</p>
                          <p className="font-medium text-sm md:text-base">{propertyData.complexInfo.completionDate}</p>
                        </div>
                        <div>
                          <p className="text-xs md:text-sm text-real-darkGray">주차</p>
                          <p className="font-medium text-sm md:text-base">{propertyData.complexInfo.parking}</p>
                        </div>
                      </div>
                      <div className="mb-3 md:mb-4">
                        <p className="text-xs md:text-sm text-real-darkGray mb-2">편의시설</p>
                        <div className="flex flex-wrap gap-1 md:gap-2">
                          {propertyData.complexInfo.facilities.map((facility, index) => (
                            <Badge key={index} variant="outline" className="text-xs">{facility}</Badge>
                          ))}
                        </div>
                      </div>

                      {/* 면적별 가격 정보 - 개선된 콜랩시블 버전 */}
                      <div className="mb-3 md:mb-4">
                        <Collapsible open={isPriceInfoOpen} onOpenChange={setIsPriceInfoOpen}>
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full justify-between p-0 h-auto font-normal hover:bg-transparent"
                            >
                              <p className="text-xs md:text-sm text-real-darkGray">면적별 시세</p>
                              {isPriceInfoOpen ? (
                                <ChevronUp className="h-4 w-4 text-gray-500" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-gray-500" />
                              )}
                            </Button>
                          </CollapsibleTrigger>  
                          <CollapsibleContent className="mt-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                              {propertyData.complexInfo.priceInfo.map((info, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                      <span className="font-medium text-sm text-gray-900">{info.area}</span>
                                      <span className="text-xs text-gray-500">({info.count}세대)</span>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                                    <div>
                                      <p className="text-gray-600">최저가</p>
                                      <button
                                        onClick={() => handlePropertyClick(info.sampleProperty.id)}
                                        className="font-medium text-real-blue hover:text-real-blue/80 transition-colors text-left"
                                      >
                                        {info.minPrice}
                                      </button>
                                    </div>
                                    <div>
                                      <p className="text-gray-600">평균가</p>
                                      <p className="font-medium text-gray-900">{info.avgPrice}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>

                      <div>
                        <p className="text-xs md:text-sm text-real-darkGray mb-2">평점</p>
                        <div className="flex items-center space-x-2">
                          <StarRating rating={propertyData.complexInfo.rating} size="md" />
                          <span className="font-medium text-base md:text-lg">{propertyData.complexInfo.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 리뷰 작성 버튼 */}
                  <div ref={reviewsSectionRef} className="flex justify-between items-center">
                    <h3 className="font-medium text-base md:text-lg">거주 후기 ({reviews.length})</h3>
                    <Button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      variant="outline"
                      size="sm"
                      className="flex items-center text-xs md:text-sm h-8 md:h-9 px-2 md:px-3"
                    >
                      <Edit className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                      {showReviewForm ? '취소' : '리뷰 작성'}
                    </Button>
                  </div>

                  {/* 리뷰 작성 폼 - 조건부 렌더링 */}
                  {showReviewForm && (
                    <Card>
                      <CardHeader className="pb-3 md:pb-4">
                        <CardTitle className="text-base md:text-lg">리뷰 작성</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3 md:space-y-4">
                          <div>
                            <Label htmlFor="rating" className="text-xs md:text-sm font-medium">평점</Label>
                            <div className="mt-1">
                              {renderStars(newRating, true, setNewRating)}
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="review" className="text-xs md:text-sm font-medium">리뷰</Label>
                            <Textarea
                              id="review"
                              placeholder="이 매물에 대한 거주 후기를 작성해주세요..."
                              value={newReview}
                              onChange={(e) => setNewReview(e.target.value)}
                              className="mt-1 text-sm"
                              rows={3}
                            />
                          </div>
                          <div className="flex space-x-2">
                            <Button onClick={handleSubmitReview} disabled={!newReview.trim()} size="sm" className="text-xs md:text-sm">
                              리뷰 등록
                            </Button>
                            <Button variant="outline" onClick={() => setShowReviewForm(false)} size="sm" className="text-xs md:text-sm">
                              취소
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                   {/* 리뷰 목록 */}
                   <div className="space-y-3 md:space-y-4">
                     {currentPageReviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="p-3 md:p-4">
                          <div className="flex items-start space-x-2 md:space-x-3">
                            <div className="bg-gray-200 rounded-full p-1.5 md:p-2 flex-shrink-0">
                              <User className="h-3 w-3 md:h-4 md:w-4 text-gray-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2 gap-2">
                                <div className="flex items-center space-x-2 min-w-0">
                                  <span className="font-medium text-xs md:text-sm truncate">{review.author}</span>
                                  <div className="flex-shrink-0">
                                    <StarRating rating={review.rating} size="sm" />
                                  </div>
                                </div>
                                <span className="text-xs text-real-darkGray flex-shrink-0">{review.date}</span>
                              </div>
                              <p className="text-xs md:text-sm text-real-darkGray mb-2 leading-relaxed">{review.content}</p>
                              <div className="flex items-center space-x-3 text-xs text-real-darkGray">
                                <span>도움됨 {review.helpful}</span>
                                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs hover:bg-gray-100">
                                  도움돼요
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                       </Card>
                     ))}
                   </div>

                   {/* 리뷰 페이징 */}
                   {totalReviewPages > 1 && (
                     <div className="mt-6 flex justify-center">
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious 
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setReviewCurrentPage(Math.max(1, reviewCurrentPage - 1));
                                }}
                                className={reviewCurrentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                              />
                            </PaginationItem>
                            
                            {Array.from({ length: totalReviewPages }, (_, i) => i + 1).map((page) => (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  href="#"
                                  isActive={reviewCurrentPage === page}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setReviewCurrentPage(page);
                                  }}
                                  className="cursor-pointer"
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            ))}

                            <PaginationItem>
                              <PaginationNext 
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setReviewCurrentPage(Math.min(totalReviewPages, reviewCurrentPage + 1));
                                }}
                                className={reviewCurrentPage === totalReviewPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                     </div>
                   )}
                 </div>
               </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* 하단 고정 버튼 - 연락하기 버튼 수정 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-30">
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 max-w-3xl">
          <div className="flex space-x-2 md:space-x-3">
            <Button 
              onClick={handleContactClick}
              className="flex-1 text-sm md:text-base py-2.5 md:py-3" 
              size="lg"
            >
              연락하기
            </Button>
            {/* <Button variant="outline" className="flex-1 text-sm md:text-base py-2.5 md:py-3" size="lg">
              문의하기
            </Button> */}
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        agent={propertyData.agent}
      />
    </div>
  );
};

export default PropertyDetail;
