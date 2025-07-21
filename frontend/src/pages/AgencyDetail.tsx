import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail, Star, Calendar, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Navbar from "@/components/layout/Navbar";
import PropertyCard from "@/components/property/PropertyCard";
import ContactModal from "@/components/modals/ContactModal";
import StarRating from "@/components/ui/star-rating";

// Mock agency data
const agencyData = {
  id: 1,
  name: "한국부동산",
  logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&w=200&h=200&fit=crop",
  description: "20년 전통의 믿을 수 있는 부동산 중개업체입니다. 강남구 일대 부동산 전문으로 고객 만족을 최우선으로 하며, 정직하고 투명한 거래를 약속드립니다.",
  address: "서울시 강남구 역삼동 123-45 역삼빌딩 3층",
  phone: "010-1234-5678",
  email: "info@hankoob.com",
  establishedYear: "2004년",
  ceo: "김부동",
  employeeCount: "12명",
  specialties: ["아파트 매매", "오피스텔 임대", "상가 투자"],
  rating: 4.7,
  reviewCount: 156,
  certifications: ["공인중개사", "부동산투자상담사"],
  workingHours: "평일 09:00-18:00, 토요일 09:00-15:00",
  agent: {
    name: "김부동",
    company: "한국부동산",
    phone: "010-1234-5678",
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  }
};

// Expanded mock properties from this agency for pagination testing
const allAgencyProperties = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
    price: "80만원",
    deposit: "1억",
    title: "모던한 신축 아파트, 역세권 위치",
    address: "서울시 강남구 역삼동",
    type: "전세",
    propertyType: "아파트",
    size: "24평",
    rooms: 3,
    baths: 2,
    features: ["주차가능", "엘리베이터", "신축"]
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3",
    price: "120만원",
    deposit: "5000만원",
    title: "깨끗한 오피스텔, 교통 편리",
    address: "서울시 강남구 논현동",
    type: "월세",
    propertyType: "오피스텔",
    size: "18평",
    rooms: 1,
    baths: 1,
    features: ["풀옵션", "주차가능", "보안"]
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3",
    price: "15억",
    title: "투자 가치 높은 상가 매물",
    address: "서울시 강남구 삼성동",
    type: "매매",
    propertyType: "상가",
    size: "30평",
    features: ["역세권", "투자용", "임대수익"]
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1560184897-ae75f418493e?ixlib=rb-4.0.3",
    price: "2억 5천",
    title: "신축 빌라, 남향 채광",
    address: "서울시 강남구 도곡동",
    type: "매매",
    propertyType: "빌라",
    size: "20평",
    rooms: 2,
    baths: 1,
    features: ["신축", "남향", "주차가능"]
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1549517045-bc93de075e53?ixlib=rb-4.0.3",
    price: "90만원",
    deposit: "8000만원",
    title: "깔끔한 원룸, 대학가 인근",
    address: "서울시 강남구 역삼동",
    type: "월세",
    propertyType: "원룸",
    size: "12평",
    rooms: 1,
    baths: 1,
    features: ["풀옵션", "인터넷", "세탁기"]
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3",
    price: "3억 2천",
    title: "리모델링 완료 아파트",
    address: "서울시 강남구 논현동",
    type: "매매",
    propertyType: "아파트",
    size: "26평",
    rooms: 3,
    baths: 2,
    features: ["리모델링", "주차가능", "엘리베이터"]
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1581407720400-0dd0c9cdcc9d?ixlib=rb-4.0.3",
    price: "150만원",
    deposit: "1억 5천",
    title: "프리미엄 오피스텔",
    address: "서울시 강남구 삼성동",
    type: "전세",
    propertyType: "오피스텔",
    size: "22평",
    rooms: 1,
    baths: 1,
    features: ["고층", "한강뷰", "풀옵션"]
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3",
    price: "4억 8천",
    title: "코너 상가, 임대 중",
    address: "서울시 강남구 역삼동",
    type: "매매",
    propertyType: "상가",
    size: "45평",
    features: ["코너", "임대중", "투자용"]
  }
];

const AgencyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  const totalProperties = allAgencyProperties.length;
  const totalPages = Math.ceil(totalProperties / propertiesPerPage);
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const currentProperties = allAgencyProperties.slice(startIndex, startIndex + propertiesPerPage);

  const handleBackButton = () => {
    setTimeout(() => {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate('/');
      }
    }, 100);
  };

  const handleAgencyClick = () => {
    setShowContactModal(false);
  };

  const handleReviewClick = () => {
    navigate(`/agency/${id}/reviews`);
  };

  const scrollToProperties = () => {
    setTimeout(() => {
      const propertiesSection = document.getElementById('properties-section');
      if (propertiesSection) {
        propertiesSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToProperties();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Fixed Navbar */}
      <Navbar />
      
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-6 max-w-3xl mt-4">
        <div className="space-y-6">
          {/* Agency Profile */}
          <Card>
            <CardContent className="p-6">
              {/* Header with back button inside card */}
              <div className="mb-6">
                <button 
                  onClick={handleBackButton}
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 bg-gray-50 hover:bg-blue-50 rounded-full px-3 py-2 group mb-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-0.5" />
                  <span className="text-sm font-medium">돌아가기</span>
                </button>
              </div>

              <div className="flex items-start space-x-4 mb-6">
                <img 
                  src={agencyData.logo} 
                  alt={agencyData.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{agencyData.name}</h1>
                  
                  {/* Rating with responsive layout */}
                  {/* <div className="mb-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                      <div className="flex items-center space-x-2 mb-1 sm:mb-0">
                        <StarRating rating={agencyData.rating} size="md" />
                        <span className="font-medium text-lg">{agencyData.rating}</span> */}
                        {/* Review count for desktop - hidden on mobile */}
                        {/* <button 
                          onClick={handleReviewClick}
                          className="text-gray-600 hover:text-blue-600 transition-colors text-sm underline hidden sm:inline"
                        >
                          ({agencyData.reviewCount}개 리뷰)
                        </button>
                      </div> */}
                      {/* Review count for mobile - on separate line */}
                      {/* <button 
                        onClick={handleReviewClick}
                        className="text-gray-600 hover:text-blue-600 transition-colors text-sm underline sm:hidden self-start"
                      >
                        ({agencyData.reviewCount}개 리뷰)
                      </button>
                    </div>
                  </div> */}
                  
                  <p className="text-gray-700 text-sm leading-relaxed">{agencyData.description}</p>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{agencyData.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{agencyData.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{agencyData.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">설립: {agencyData.establishedYear}</span>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Agency Info */}
          <Card>
            <CardHeader>
              <CardTitle>업체 정보</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">대표자</p>
                  <p className="font-medium">{agencyData.ceo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">직원 수</p>
                  <p className="font-medium">{agencyData.employeeCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">영업시간</p>
                  <p className="font-medium text-sm">{agencyData.workingHours}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">전문 분야</p>
                <div className="flex flex-wrap gap-2">
                  {agencyData.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary">{specialty}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">보유 자격</p>
                <div className="flex flex-wrap gap-2">
                  {agencyData.certifications.map((cert, index) => (
                    <Badge key={index} variant="outline" className="flex items-center">
                      <Award className="h-3 w-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Properties - with smaller cards and pagination */}
          <Card id="properties-section">
            <CardHeader>
              <CardTitle>등록 매물 ({totalProperties})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentProperties.map((property) => (
                  <div key={property.id} className="transform scale-90">
                    <PropertyCard 
                      id={property.id}
                      title={property.title}
                      address={property.address}
                      price={property.price}
                      deposit={property.deposit}
                      rentalType={property.type}
                      propertyType={property.propertyType}
                      size={property.size}
                      imageUrl={property.image}
                      vertical={true}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6">
                  <Pagination>
                    <PaginationContent className="flex-wrap gap-1">
                      {/* ← 이전 버튼 : 항상 렌더링하되 1페이지면 비활성화 */}
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) handlePageChange(currentPage - 1);
                          }}
                          className={`
                            text-xs sm:text-sm px-2 sm:px-3
                            ${currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"}
                          `}
                        />
                      </PaginationItem>
              
                      {/* 페이지 번호 */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === page}
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(page);
                            }}
                            className="h-8 w-8 text-xs sm:text-sm"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
              
                      {/* → 다음 버튼 : 항상 렌더링하되 마지막 페이지면 비활성화 */}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) handlePageChange(currentPage + 1);
                          }}
                          className={`
                            text-xs sm:text-sm px-2 sm:px-3
                            ${currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"}
                          `}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        onAgencyClick={handleAgencyClick}
        agent={agencyData.agent}
      />
    </div>
  );
};

export default AgencyDetail;
