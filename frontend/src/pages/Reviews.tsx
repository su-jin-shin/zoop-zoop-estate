import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/layout/Navbar";
import { ArrowLeft, Star, Edit2, Trash2, MessageSquare, Clock, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const Reviews = () => {
  const [reviewCurrentPage, setReviewCurrentPage] = useState(1);
  const [inquiryCurrentPage, setInquiryCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState<'review' | 'inquiry'>('review');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { toast } = useToast();
  const itemsPerPage = 3;

  // Mock data for reviews
  const [reviews, setReviews] = useState([
    {
      id: 1,
      propertyTitle: "강남구 역삼동 오피스텔",
      propertyId: 1,
      propertyImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      rating: 5,
      comment: "교통이 편리하고 시설이 깨끗해서 매우 만족합니다. 관리사무소 직원분들도 친절하시고 주변 편의시설도 많아서 좋아요.",
      date: "2024-06-15",
      status: "공개"
    },
    {
      id: 2,
      propertyTitle: "서초구 서초동 아파트",
      propertyId: 2,
      propertyImage: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=400&h=300&fit=crop",
      rating: 4,
      comment: "전반적으로 만족하지만 주차가 조금 불편합니다. 그래도 위치가 좋고 관리가 잘 되어 있어서 추천할만해요.",
      date: "2024-06-10",
      status: "공개"
    },
    {
      id: 3,
      propertyTitle: "마포구 홍대입구 원룸",
      propertyId: 3,
      propertyImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      rating: 3,
      comment: "가격 대비 괜찮은 편이지만 방음이 조금 아쉬워요.",
      date: "2024-06-05",
      status: "비공개"
    },
    {
      id: 4,
      propertyTitle: "송파구 잠실동 아파트",
      propertyId: 4,
      propertyImage: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=400&h=300&fit=crop",
      rating: 5,
      comment: "위치도 좋고 시설도 훌륭합니다. 특히 한강뷰가 정말 좋아요!",
      date: "2024-06-01",
      status: "공개"
    }
  ]);

  // Mock data for inquiries
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      title: "임대료 협상 문의",
      propertyTitle: "강남구 역삼동 오피스텔",
      propertyId: 1,
      propertyImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      content: "월세를 조금 더 저렴하게 할 수 있는지 문의드립니다. 장기계약을 고려하고 있어서요.",
      date: "2024-06-20",
      status: "답변완료",
      response: "안녕하세요. 장기계약시 월세 협상이 가능합니다. 자세한 상담은 전화로 연락드리겠습니다."
    },
    {
      id: 2,
      title: "견학 일정 문의",
      propertyTitle: "서초구 서초동 아파트",
      propertyId: 2,
      propertyImage: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=400&h=300&fit=crop",
      content: "이번 주말에 견학이 가능한지 문의드립니다. 오후 시간대가 좋겠습니다.",
      date: "2024-06-18",
      status: "처리중",
      response: null
    },
    {
      id: 3,
      title: "주차 공간 문의",
      propertyTitle: "마포구 홍대입구 원룸",
      propertyId: 3,
      propertyImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      content: "주차 공간이 별도로 있는지, 있다면 추가 비용이 얼마나 드는지 알고 싶습니다.",
      date: "2024-06-15",
      status: "미처리",
      response: null
    },
    {
      id: 4,
      title: "계약 조건 문의",
      propertyTitle: "종로구 종로3가 오피스텔",
      propertyId: 4,
      propertyImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
      content: "보증금과 월세 외에 추가로 드는 비용이 있는지 문의드립니다.",
      date: "2024-06-12",
      status: "답변완료",
      response: "관리비 월 5만원, 인터넷비 별도입니다. 기타 자세한 사항은 계약시 안내드리겠습니다."
    },
    {
      id: 5,
      title: "애완동물 키우기 문의",
      propertyTitle: "강남구 청담동 아파트",
      propertyId: 5,
      propertyImage: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=400&h=300&fit=crop",
      content: "소형견 키우는 것이 가능한지 문의드립니다.",
      date: "2024-06-10",
      status: "처리중",
      response: null
    }
  ]);

  const reviewTotalPages = Math.ceil(reviews.length / itemsPerPage);
  const reviewStartIndex = (reviewCurrentPage - 1) * itemsPerPage;
  const reviewEndIndex = reviewStartIndex + itemsPerPage;
  const currentReviews = reviews.slice(reviewStartIndex, reviewEndIndex);

  const inquiryTotalPages = Math.ceil(inquiries.length / itemsPerPage);
  const inquiryStartIndex = (inquiryCurrentPage - 1) * itemsPerPage;
  const inquiryEndIndex = inquiryStartIndex + itemsPerPage;
  const currentInquiries = inquiries.slice(inquiryStartIndex, inquiryEndIndex);

  const handleDeleteClick = (id: number, type: 'review' | 'inquiry') => {
    setDeleteId(id);
    setDeleteType(type);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      if (deleteType === 'review') {
        setReviews(prev => prev.filter(review => review.id !== deleteId));
        toast({
          title: "리뷰가 삭제되었습니다",
          description: "선택한 리뷰가 삭제되었습니다.",
        });
      } else {
        setInquiries(prev => prev.filter(inquiry => inquiry.id !== deleteId));
        toast({
          title: "문의가 삭제되었습니다",
          description: "선택한 문의가 삭제되었습니다.",
        });
      }
      setDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "답변완료":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "처리중":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "미처리":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "답변완료":
        return "default";
      case "처리중":
        return "secondary";
      case "미처리":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-3 sm:px-4 py-4 flex-1 max-w-3xl">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" className="mr-2 h-8 w-8" asChild>
            <Link to="/mypage">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          {/* <h1 className="text-base sm:text-lg font-semibold">나의 활동</h1> */}
          <h1 className="text-base sm:text-lg font-semibold">내가 작성한 리뷰</h1>
        </div>

        {/* 삭제 확인 다이얼로그 */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent className="mx-4 sm:mx-0">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-base sm:text-lg">
                {deleteType === 'review' ? '리뷰를 삭제하시겠습니까?' : '문의를 삭제하시겠습니까?'}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm">
                {deleteType === 'review' 
                  ? '삭제된 리뷰는 복구할 수 없습니다.' 
                  : '삭제된 문의는 복구할 수 없습니다.'
                }
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
              <AlertDialogCancel onClick={handleDeleteCancel} className="w-full sm:w-auto">
                취소
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm} className="w-full sm:w-auto">
                삭제
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Card className="h-full overflow-hidden">
          <CardContent className="p-0 h-full">
            <Tabs defaultValue="reviews" className="w-full h-full flex flex-col">
              {/* <div className="px-3 sm:px-4 pt-3 sm:pt-4">
                <TabsList className="grid w-full grid-cols-2 flex-shrink-0">
                  <TabsTrigger value="reviews" className="text-xs sm:text-sm">내가 쓴 리뷰 ({reviews.length})</TabsTrigger>
                  <TabsTrigger value="inquiries" className="text-xs sm:text-sm">문의 내역 ({inquiries.length})</TabsTrigger>
                </TabsList>
              </div> */}
              
              <TabsContent value="reviews" className="mt-0 flex-1 overflow-hidden">
                <ScrollArea className="h-[calc(100vh-200px)]">
                  {reviews.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      <Star className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-sm">작성한 리뷰가 없습니다.</p>
                      <p className="text-xs mt-1">직접 살아본 공간, 리뷰로 공유해 주세요.</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 p-3">
                        {currentReviews.map((review) => (
                          <Card key={review.id} className="border border-gray-200">
                            <CardContent className="p-3">
                              {/* Mobile optimized layout */}
                              <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                  <Link to={`/property/${review.propertyId}`} className="flex-shrink-0">
                                    <img
                                      src={review.propertyImage}
                                      alt={review.propertyTitle}
                                      className="w-16 h-12 object-cover rounded-md"
                                    />
                                  </Link>
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center space-x-1">
                                        {renderStars(review.rating)}
                                        <span className="text-xs font-medium ml-1">({review.rating}/5)</span>
                                      </div>
                                      <div className="flex items-center space-x-1">
                                        <Button variant="ghost" size="icon" className="h-6 w-6">
                                          <Edit2 className="h-3 w-3" />
                                        </Button>
                                        <Button 
                                          variant="ghost" 
                                          size="icon" 
                                          className="h-6 w-6 text-red-500"
                                          onClick={() => handleDeleteClick(review.id, 'review')}
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 mb-1">
                                      <Badge variant={review.status === "공개" ? "default" : "secondary"} className="text-xs">
                                        {review.status}
                                      </Badge>
                                      <span className="text-xs text-gray-500">
                                        {review.date}
                                      </span>
                                    </div>
                                    
                                    <p className="text-xs text-gray-600 mb-2 truncate">
                                      매물: 
                                      <Link 
                                        to={`/property/${review.propertyId}`}
                                        className="text-blue-600 hover:text-blue-800 hover:underline ml-1"
                                      >
                                        {review.propertyTitle}
                                      </Link>
                                    </p>
                                  </div>
                                </div>
                                
                                <div>
                                  <p className="text-xs font-medium text-gray-700 mb-1">리뷰 내용</p>
                                  <p className="text-xs text-gray-900 bg-gray-50 p-2 rounded-md leading-relaxed">
                                    {review.comment}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                      {reviewTotalPages > 1 && (
                        <div className="p-3">
                          <Pagination>
                            <PaginationContent className="flex-wrap gap-1">
                              <PaginationItem>
                                <PaginationPrevious 
                                  onClick={() => setReviewCurrentPage(Math.max(1, reviewCurrentPage - 1))}
                                  className={`${reviewCurrentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} text-xs px-2 h-8`}
                                />
                              </PaginationItem>
                              {Array.from({ length: Math.min(5, reviewTotalPages) }, (_, i) => i + 1).map((page) => (
                                <PaginationItem key={page}>
                                  <PaginationLink
                                    onClick={() => setReviewCurrentPage(page)}
                                    isActive={reviewCurrentPage === page}
                                    className="cursor-pointer text-xs h-8 w-8"
                                  >
                                    {page}
                                  </PaginationLink>
                                </PaginationItem>
                              ))}
                              <PaginationItem>
                                <PaginationNext 
                                  onClick={() => setReviewCurrentPage(Math.min(reviewTotalPages, reviewCurrentPage + 1))}
                                  className={`${reviewCurrentPage === reviewTotalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} text-xs px-2 h-8`}
                                />
                              </PaginationItem>
                            </PaginationContent>
                          </Pagination>
                        </div>
                      )}
                    </>
                  )}
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="inquiries" className="mt-0 flex-1 overflow-hidden">
                <ScrollArea className="h-[calc(100vh-200px)]">
                  {inquiries.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-sm">문의 내역이 없습니다.</p>
                      <p className="text-xs mt-1">궁금한 것이 있으면 언제든 문의해주세요!</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 p-3">
                        {currentInquiries.map((inquiry) => (
                          <Card key={inquiry.id} className="border border-gray-200">
                            <CardContent className="p-3">
                              {/* Mobile optimized layout */}
                              <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                  <Link to={`/property/${inquiry.propertyId}`} className="flex-shrink-0">
                                    <img
                                      src={inquiry.propertyImage}
                                      alt={inquiry.propertyTitle}
                                      className="w-16 h-12 object-cover rounded-md"
                                    />
                                  </Link>
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center space-x-2">
                                        {getStatusIcon(inquiry.status)}
                                        <Badge variant={getStatusBadgeVariant(inquiry.status)} className="text-xs">
                                          {inquiry.status}
                                        </Badge>
                                      </div>
                                      <div className="flex items-center space-x-1">
                                        <Button variant="ghost" size="icon" className="h-6 w-6">
                                          <Edit2 className="h-3 w-3" />
                                        </Button>
                                        <Button 
                                          variant="ghost" 
                                          size="icon" 
                                          className="h-6 w-6 text-red-500"
                                          onClick={() => handleDeleteClick(inquiry.id, 'inquiry')}
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                    
                                    <h3 className="font-medium text-sm mb-1 line-clamp-1">{inquiry.title}</h3>
                                    
                                    <p className="text-xs text-gray-600 mb-1 truncate">
                                      매물: 
                                      <Link 
                                        to={`/property/${inquiry.propertyId}`}
                                        className="text-blue-600 hover:text-blue-800 hover:underline ml-1"
                                      >
                                        {inquiry.propertyTitle}
                                      </Link>
                                    </p>
                                    
                                    <p className="text-xs text-gray-500">
                                      문의일: {inquiry.date}
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <div>
                                    <p className="text-xs font-medium text-gray-700 mb-1">문의 내용</p>
                                    <p className="text-xs text-gray-900 bg-gray-50 p-2 rounded-md leading-relaxed">
                                      {inquiry.content}
                                    </p>
                                  </div>
                                  
                                  {inquiry.response && (
                                    <div>
                                      <p className="text-xs font-medium text-gray-700 mb-1">답변</p>
                                      <p className="text-xs text-gray-900 bg-blue-50 p-2 rounded-md border-l-4 border-blue-200 leading-relaxed">
                                        {inquiry.response}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                      {inquiryTotalPages > 1 && (
                        <div className="p-3">
                          <Pagination>
                            <PaginationContent className="flex-wrap gap-1">
                              <PaginationItem>
                                <PaginationPrevious 
                                  onClick={() => setInquiryCurrentPage(Math.max(1, inquiryCurrentPage - 1))}
                                  className={`${inquiryCurrentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} text-xs px-2 h-8`}
                                />
                              </PaginationItem>
                              {Array.from({ length: Math.min(5, inquiryTotalPages) }, (_, i) => i + 1).map((page) => (
                                <PaginationItem key={page}>
                                  <PaginationLink
                                    onClick={() => setInquiryCurrentPage(page)}
                                    isActive={inquiryCurrentPage === page}
                                    className="cursor-pointer text-xs h-8 w-8"
                                  >
                                    {page}
                                  </PaginationLink>
                                </PaginationItem>
                              ))}
                              <PaginationItem>
                                <PaginationNext 
                                  onClick={() => setInquiryCurrentPage(Math.min(inquiryTotalPages, inquiryCurrentPage + 1))}
                                  className={`${inquiryCurrentPage === inquiryTotalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} text-xs px-2 h-8`}
                                />
                              </PaginationItem>
                            </PaginationContent>
                          </Pagination>
                        </div>
                      )}
                    </>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reviews;
