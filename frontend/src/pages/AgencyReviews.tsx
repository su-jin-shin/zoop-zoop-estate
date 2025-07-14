
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import StarRating from "@/components/ui/star-rating";
import Navbar from "@/components/layout/Navbar";

// Expanded mock reviews data with property images and IDs
const agencyReviews = [
  {
    id: 1,
    userName: "김철수",
    rating: 5,
    date: "2024.06.15",
    comment: "매우 친절하시고 신뢰할 수 있는 부동산입니다. 원하는 조건의 매물을 빠르게 찾아주셨어요.",
    propertyTitle: "강남구 역삼동 신축 아파트",
    propertyId: 1,
    propertyImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&w=150&h=150&fit=crop"
  },
  {
    id: 2,
    userName: "이영희",
    rating: 4,
    date: "2024.06.10", 
    comment: "전문적이고 꼼꼼하게 상담해주셨습니다. 계약 과정도 투명하게 진행되었어요.",
    propertyTitle: "논현동 오피스텔",
    propertyId: 2,
    propertyImage: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3&w=150&h=150&fit=crop"
  },
  {
    id: 3,
    userName: "박민수",
    rating: 5,
    date: "2024.06.05",
    comment: "20년 경력답게 지역에 대해 너무 잘 아시고, 숨겨진 좋은 매물까지 보여주셨습니다.",
    propertyTitle: "삼성동 상가",
    propertyId: 3,
    propertyImage: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&w=150&h=150&fit=crop"
  },
  {
    id: 4,
    userName: "최수진",
    rating: 4,
    date: "2024.05.28",
    comment: "빠른 응답과 정확한 정보 제공으로 만족스러운 거래를 할 수 있었습니다.",
    propertyTitle: "역삼동 원룸",
    propertyId: 4,
    propertyImage: "https://images.unsplash.com/photo-1560184897-ae75f418493e?ixlib=rb-4.0.3&w=150&h=150&fit=crop"
  },
  {
    id: 5,
    userName: "정우진",
    rating: 5,
    date: "2024.05.20",
    comment: "고객 입장에서 꼼꼼히 체크해주시고, 부담스럽지 않게 상담해주셔서 좋았어요.",
    propertyTitle: "논현동 투룸",
    propertyId: 5,
    propertyImage: "https://images.unsplash.com/photo-1549517045-bc93de075e53?ixlib=rb-4.0.3&w=150&h=150&fit=crop"
  },
  {
    id: 6,
    userName: "김민경",
    rating: 4,
    date: "2024.05.15",
    comment: "위치도 좋고 시설도 깨끗해서 만족합니다. 다만 주차가 조금 불편해요.",
    propertyTitle: "도곡동 신축 빌라",
    propertyId: 6,
    propertyImage: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&w=150&h=150&fit=crop"
  },
  {
    id: 7,
    userName: "이준호",
    rating: 5,
    date: "2024.05.10",
    comment: "한강뷰가 정말 멋있고, 교통도 편리해서 매우 만족합니다.",
    propertyTitle: "삼성동 프리미엄 오피스텔",
    propertyId: 7,
    propertyImage: "https://images.unsplash.com/photo-1581407720400-0dd0c9cdcc9d?ixlib=rb-4.0.3&w=150&h=150&fit=crop"
  },
  {
    id: 8,
    userName: "박지영",
    rating: 3,
    date: "2024.05.05",
    comment: "매물 자체는 좋았지만 소음이 조금 있어서 아쉬웠어요.",
    propertyTitle: "역삼동 코너 상가",
    propertyId: 8,
    propertyImage: "https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&w=150&h=150&fit=crop"
  },
  {
    id: 9,
    userName: "최영수",
    rating: 5,
    date: "2024.04.28",
    comment: "투자 목적으로 구매했는데 임대료도 잘 나오고 만족합니다.",
    propertyTitle: "강남구 투자용 아파트",
    propertyId: 9,
    propertyImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&w=150&h=150&fit=crop"
  },
  {
    id: 10,
    userName: "김서현",
    rating: 4,
    date: "2024.04.20",
    comment: "깔끔하고 관리가 잘 되어있어서 좋습니다. 추천해요!",
    propertyTitle: "논현동 리모델링 아파트",
    propertyId: 10,
    propertyImage: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&w=150&h=150&fit=crop"
  }
];

const ratingDistribution = [
  { stars: 5, count: 89, percentage: 57 },
  { stars: 4, count: 45, percentage: 29 },
  { stars: 3, count: 15, percentage: 10 },
  { stars: 2, count: 5, percentage: 3 },
  { stars: 1, count: 2, percentage: 1 }
];

const AgencyReviews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  const totalReviews = agencyReviews.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = agencyReviews.slice(startIndex, startIndex + reviewsPerPage);
  const averageRating = 4.7;

  const handleBackButton = () => {
    setTimeout(() => {
      navigate(`/agency/${id}`);
    }, 100);
  };

  const handlePropertyClick = (propertyId: number) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Fixed Navbar */}
      <Navbar />
      
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-6 max-w-3xl mt-4">
        <div className="space-y-6">
          {/* Review Summary */}
          <Card>
            <CardContent className="p-6">
              {/* Header with back button inside card */}
              <div className="mb-6">
                <button 
                  onClick={handleBackButton}
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 bg-gray-50 hover:bg-blue-50 rounded-full px-3 py-2 group mb-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-0.5" />
                  <span className="text-sm font-medium">부동산 상세로 돌아가기</span>
                </button>
              </div>

              <CardHeader className="px-0 pb-4">
                <CardTitle>한국부동산 리뷰</CardTitle>
              </CardHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Overall Rating */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">{averageRating}</div>
                  <div className="flex flex-col items-center gap-2">
                    <StarRating rating={averageRating} size="md" />
                    <p className="text-gray-600 text-sm">총 {totalReviews}개 리뷰</p>
                  </div>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2">
                  {ratingDistribution.map((item) => (
                    <div key={item.stars} className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 w-8">{item.stars}점</span>
                      <Progress value={item.percentage} className="flex-1" />
                      <span className="text-sm text-gray-600 w-8">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews List */}
          <Card>
            <CardHeader>
              <CardTitle>리뷰 목록</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentReviews.map((review, index) => (
                  <div key={review.id}>
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium text-gray-900">{review.userName}</p>
                            <div className="flex items-center mb-2">
                              <StarRating rating={review.rating} size="sm" />
                            </div>
                          </div>
                          <span className="text-xs text-gray-500 flex-shrink-0">{review.date}</span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed mb-3">{review.comment}</p>
                        
                        {/* Property info with image */}
                        <div 
                          className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => handlePropertyClick(review.propertyId)}
                        >
                          <img 
                            src={review.propertyImage} 
                            alt={review.propertyTitle}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                              {review.propertyTitle}
                            </p>
                            <p className="text-xs text-gray-500">매물 상세보기 &gt;</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < currentReviews.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6">
                  <Pagination>
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(currentPage - 1);
                            }}
                          />
                        </PaginationItem>
                      )}
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === page}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(page);
                            }}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(currentPage + 1);
                            }}
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgencyReviews;
