import { useState } from "react";
import { Heart, ArrowLeft, Trash2, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import Navbar from "@/components/layout/Navbar";
import FavoritePropertyCard from "@/components/property/FavoritePropertyCard";
import { useToast } from "@/hooks/use-toast";
import { useMediaQuery } from "@/hooks/use-media-query";
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

// Type definitions
interface PriceChange {
  type: 'increase' | 'decrease';
  percentage: number;
}

interface FavoriteProperty {
  id: number;
  title: string;
  address: string;
  price: string;
  deposit: string;
  rentalType: string;
  propertyType: string;
  size: string;
  imageUrl: string;
  featured: boolean;
  sold: boolean;
  priceChange?: PriceChange;
}

interface RecentProperty {
  id: number;
  title: string;
  address: string;
  price: string;
  deposit?: string;
  rentalType: string;
  propertyType: string;
  size: string;
  imageUrl: string;
  viewedAt: string;
  featured?: boolean;
}

// Mock data for favorites with price change information
const favoritePropertiesInit: FavoriteProperty[] = [
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
    featured: true,
    sold: false,
    priceChange: {
      type: 'decrease',
      percentage: 3
    }
  },
  {
    id: 3,
    title: "넓은 테라스가 있는 복층 빌라",
    address: "서울시 용산구 한남동 789-10",
    price: "1억 2000만원",
    deposit: "",
    rentalType: "매매",
    propertyType: "빌라",
    size: "32평",
    imageUrl: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?ixlib=rb-4.0.3",
    sold: true,
    featured: false,
  },
  {
    id: 5,
    title: "한강뷰 럭셔리 아파트, 고층",
    address: "서울시 성동구 성수동 654-32",
    price: "1억 8000만원",
    deposit: "",
    rentalType: "매매",
    propertyType: "아파트",
    size: "42평",
    imageUrl: "https://images.unsplash.com/photo-1486304873000-235643847519?ixlib=rb-4.0.3",
    featured: true,
    sold: false,
    priceChange: {
      type: 'increase',
      percentage: 5
    }
  },
  {
    id: 7,
    title: "신축 오피스텔, 풀옵션",
    address: "서울시 강남구 테헤란로 456-78",
    price: "70만원",
    deposit: "5000만원",
    rentalType: "월세",
    propertyType: "오피스텔",
    size: "20평",
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3",
    featured: false,
    sold: false,
  },
  {
    id: 8,
    title: "역세권 투룸, 리모델링 완료",
    address: "서울시 서초구 방배동 321-54",
    price: "60만원",
    deposit: "3000만원",
    rentalType: "월세",
    propertyType: "아파트",
    size: "22평",
    imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3",
    featured: true,
    sold: false,
  },
  {
    id: 9,
    title: "조용한 주택가 원룸",
    address: "서울시 관악구 신림동 987-65",
    price: "45만원",
    deposit: "1000만원",
    rentalType: "월세",
    propertyType: "원룸",
    size: "12평",
    imageUrl: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?ixlib=rb-4.0.3",
    featured: false,
    sold: false,
  }
];

// Mock data for recent views
const recentPropertiesInit: RecentProperty[] = [
  {
    id: 2,
    title: "햇살 가득한 오피스텔, 풀옵션",
    address: "서울시 마포구 서교동 456-78",
    price: "65만원",
    deposit: "5000만원",
    rentalType: "월세",
    propertyType: "오피스텔",
    size: "16평",
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3",
    viewedAt: "2시간 전",
    featured: true,
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
    viewedAt: "1일 전",
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
    imageUrl: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?ixlib=rb-4.0.3",
    viewedAt: "3일 전",
    featured: true,
  },
  {
    id: 10,
    title: "복층 펜트하우스",
    address: "서울시 강남구 청담동 111-22",
    price: "2억원",
    rentalType: "매매",
    propertyType: "펜트하우스",
    size: "50평",
    imageUrl: "https://images.unsplash.com/photo-1486304873000-235643847519?ixlib=rb-4.0.3",
    viewedAt: "5일 전",
    featured: false,
  },
  {
    id: 11,
    title: "신축 원룸텔",
    address: "서울시 동작구 흑석동 333-44",
    price: "40만원",
    deposit: "5000만원",
    rentalType: "월세",
    propertyType: "원룸",
    size: "8평",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3",
    viewedAt: "1주일 전",
    featured: true,
  }
];

const ITEMS_PER_PAGE = 5;

const Favorites = () => {
  const [favoriteProperties, setFavoriteProperties] = useState<FavoriteProperty[]>(favoritePropertiesInit);
  const [recentProperties, setRecentProperties] = useState<RecentProperty[]>(recentPropertiesInit);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [clearAllDialogOpen, setClearAllDialogOpen] = useState(false);
  const [recentDeleteDialogOpen, setRecentDeleteDialogOpen] = useState(false);
  const [clearAllType, setClearAllType] = useState<'favorites' | 'recent'>('favorites');
  const [removeId, setRemoveId] = useState<number|null>(null);
  const [recentRemoveId, setRecentRemoveId] = useState<number|null>(null);
  const [favoritesPage, setFavoritesPage] = useState(1);
  const [recentPage, setRecentPage] = useState(1);
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 640px)");

  const handleHeartClick = (id: number) => {
    setRemoveId(id);
    setDialogOpen(true);
  };

  const handleRemoveConfirm = () => {
    if (removeId) {
      setFavoriteProperties((prev) => prev.filter((property) => property.id !== removeId));
      setDialogOpen(false);
      setRemoveId(null);
      toast({
        title: "관심 매물에서 제거되었습니다",
        description: "해당 매물이 관심 목록에서 제거되었습니다.",
      });
    }
  };

  const handleRemoveCancel = () => {
    setDialogOpen(false);
    setRemoveId(null);
  };

  const handleRecentRemove = (id: number) => {
    setRecentRemoveId(id);
    setRecentDeleteDialogOpen(true);
  };

  const handleRecentRemoveConfirm = () => {
    if (recentRemoveId) {
      setRecentProperties((prev) => prev.filter((property) => property.id !== recentRemoveId));
      setRecentDeleteDialogOpen(false);
      setRecentRemoveId(null);
      toast({
        title: "최근 본 매물에서 삭제되었습니다",
        description: "해당 매물이 최근 본 목록에서 제거되었습니다.",
      });
    }
  };

  const handleRecentRemoveCancel = () => {
    setRecentDeleteDialogOpen(false);
    setRecentRemoveId(null);
  };

  const handleRecentHeartClick = (id: number) => {
    // 최근 본 매물에서 하트 클릭 처리 - 알림창 없이 바로 처리
    const property = recentProperties.find(p => p.id === id);
    const isFavorite = favoriteProperties.some(fp => fp.id === id);
    
    if (isFavorite) {
      // 관심 매물에서 제거
      setFavoriteProperties(prev => prev.filter(fp => fp.id !== id));
      toast({
        title: "관심 매물에서 제거되었습니다",
        description: "해당 매물이 관심 목록에서 제거되었습니다.",
      });
    } else if (property) {
      // 관심 매물에 추가
      const { viewedAt, ...propertyData } = property;
      const propertyForFavorites: FavoriteProperty = {
        ...propertyData,
        deposit: propertyData.deposit || "",
        featured: propertyData.featured || false,
        sold: false,
        priceChange: undefined
      };
      setFavoriteProperties(prev => [...prev, propertyForFavorites]);
      toast({
        title: "관심 매물에 추가되었습니다",
        description: "해당 매물이 관심 목록에 추가되었습니다.",
      });
    }
  };

  const clearAllHistory = () => {
    setRecentProperties([]);
    setClearAllDialogOpen(false);
    toast({
      title: "기록이 삭제되었습니다",
      description: "모든 최근 본 매물 기록이 삭제되었습니다.",
    });
  };

  const clearAllFavorites = () => {
    setFavoriteProperties([]);
    setClearAllDialogOpen(false);
    toast({
      title: "관심 매물이 삭제되었습니다",
      description: "모든 관심 매물이 삭제되었습니다.",
    });
  };

  const openClearAllDialog = (type: 'favorites' | 'recent') => {
    setClearAllType(type);
    setClearAllDialogOpen(true);
  };

  const handleClearAllConfirm = () => {
    if (clearAllType === 'favorites') {
      clearAllFavorites();
    } else {
      clearAllHistory();
    }
  };

  // Pagination logic
  const getFavoritesPaginated = () => {
    const startIndex = (favoritesPage - 1) * ITEMS_PER_PAGE;
    return favoriteProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const getRecentPaginated = () => {
    const startIndex = (recentPage - 1) * ITEMS_PER_PAGE;
    return recentProperties.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const favoritesTotalPages = Math.ceil(favoriteProperties.length / ITEMS_PER_PAGE);
  const recentTotalPages = Math.ceil(recentProperties.length / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-3 sm:px-4 py-4 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Link to="/mypage">
              <Button variant="ghost" size="icon" className="mr-2 h-8 w-8 sm:h-10 sm:w-10">
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <h1 className="text-base sm:text-lg font-semibold">관심 • 최근 본 매물</h1>
          </div>
        </div>

        {/* 삭제 확인 다이얼로그 */}
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogContent
            className="
              w-[90vw]            /* 모바일 폭 */
              max-w-xs
              sm:max-w-md
              !mx-0               /* ← mx-4를 강제로 0으로 덮어씀 */
            "
          >
            <AlertDialogHeader>
              <AlertDialogTitle className="text-base sm:text-lg">관심 매물을 취소하시겠습니까?</AlertDialogTitle>
              <AlertDialogDescription className="text-sm">
                관심 목록에서 정말로 이 매물을 제거하시겠습니까?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
              <AlertDialogCancel onClick={handleRemoveCancel} className="w-full sm:w-auto">
                취소
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleRemoveConfirm} className="w-full sm:w-auto">
                확인
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* 최근 본 매물 개별 삭제 확인 다이얼로그 */}
        <AlertDialog open={recentDeleteDialogOpen} onOpenChange={setRecentDeleteDialogOpen}>
          <AlertDialogContent
            className="
              w-[90vw]            /* 모바일 폭 */
              max-w-xs
              sm:max-w-md
              !mx-0               /* ← mx-4를 강제로 0으로 덮어씀 */
            "
          >
            <AlertDialogHeader>
              <AlertDialogTitle className="text-base sm:text-lg">최근 본 매물을 삭제하시겠습니까?</AlertDialogTitle>
              <AlertDialogDescription className="text-sm">
                최근 본 목록에서 정말로 이 매물을 제거하시겠습니까?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
              <AlertDialogCancel onClick={handleRecentRemoveCancel} className="w-full sm:w-auto">
                취소
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleRecentRemoveConfirm} className="w-full sm:w-auto">
                확인
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* 전체 삭제 확인 다이얼로그 */}
        <AlertDialog open={clearAllDialogOpen} onOpenChange={() => setClearAllDialogOpen(false)}>
          <AlertDialogContent
            className="
              w-[90vw]            /* 모바일 폭 */
              max-w-xs
              sm:max-w-md
              !mx-0               /* ← mx-4를 강제로 0으로 덮어씀 */
            "
          >
            <AlertDialogHeader>
              <AlertDialogTitle className="text-base sm:text-lg">
                {clearAllType === 'favorites' ? '모든 관심 매물을 삭제하시겠습니까?' : '모든 최근 본 매물을 삭제하시겠습니까?'}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm">
                {clearAllType === 'favorites' 
                  ? '모든 관심 매물이 삭제됩니다. 이 작업은 되돌릴 수 없습니다.' 
                  : '모든 최근 본 매물 기록이 삭제됩니다. 이 작업은 되돌릴 수 없습니다.'
                }
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
              <AlertDialogCancel onClick={() => setClearAllDialogOpen(false)} className="w-full sm:w-auto">
                취소
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleClearAllConfirm} className="w-full sm:w-auto">
                확인
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Card className="h-full overflow-hidden">
          <CardContent className="p-0 h-full">
            <Tabs defaultValue="favorites" className="w-full h-full flex flex-col">
              <div className="px-3 sm:px-4 pt-3 sm:pt-4">
                <TabsList className="grid w-full grid-cols-2 flex-shrink-0">
                  <TabsTrigger value="favorites" className="text-xs sm:text-sm">관심 매물 ({favoriteProperties.length})</TabsTrigger>
                  <TabsTrigger value="recent" className="text-xs sm:text-sm">최근 본 매물 ({recentProperties.length})</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="favorites" className="mt-0 flex-1 overflow-hidden">
                <div className="p-2 sm:p-4">
                  {/* Header with delete all button */}
                  {favoriteProperties.length > 0 && (
                    <div className="flex justify-end mb-3">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => openClearAllDialog('favorites')}
                        className="text-red-500 hover:text-red-600 text-xs px-2 h-8"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        전체 삭제
                      </Button>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="bg-white rounded-lg p-3 mb-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 text-red-500 mr-2" />
                        <span className="text-sm text-gray-600">총 관심 매물</span>
                      </div>
                      <span className="text-lg font-semibold text-real-blue">{favoriteProperties.length}개</span>
                    </div>
                  </div>

                  {/* Property List */}
                  {favoriteProperties.length > 0 ? (
                    <>
                      <div className={isMobile ? "space-y-3" : "grid grid-cols-1 gap-4"}>
                        {getFavoritesPaginated().map(property => (
                          <div key={property.id} className="w-full">
                            <FavoritePropertyCard 
                              {...property} 
                              isFavoriteDefault
                              onRemove={() => handleHeartClick(property.id)}
                              sold={property.sold}
                              cardHeight="default"
                              vertical={isMobile}
                              priceChange={property.priceChange}
                              showPriceChangeInBadge={true}
                            />
                          </div>
                        ))}
                      </div>
                      
                      {/* Pagination */}
                      {favoritesTotalPages > 1 && (
                        <div className="mt-4">
                          <Pagination>
                            <PaginationContent className="flex-wrap gap-1">
                              <PaginationItem>
                                <PaginationPrevious 
                                  onClick={() => setFavoritesPage(Math.max(1, favoritesPage - 1))}
                                  className={`${favoritesPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} text-xs px-2 h-8`}
                                />
                              </PaginationItem>
                              {Array.from({ length: Math.min(5, favoritesTotalPages) }, (_, i) => (
                                <PaginationItem key={i + 1}>
                                  <PaginationLink
                                    onClick={() => setFavoritesPage(i + 1)}
                                    isActive={favoritesPage === i + 1}
                                    className="cursor-pointer text-xs h-8 w-8"
                                  >
                                    {i + 1}
                                  </PaginationLink>
                                </PaginationItem>
                              ))}
                              <PaginationItem>
                                <PaginationNext 
                                  onClick={() => setFavoritesPage(Math.min(favoritesTotalPages, favoritesPage + 1))}
                                  className={`${favoritesPage === favoritesTotalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} text-xs px-2 h-8`}
                                />
                              </PaginationItem>
                            </PaginationContent>
                          </Pagination>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                      <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-base font-medium text-gray-900 mb-2">관심 매물이 없습니다</h3>
                      <p className="text-sm text-gray-500 mb-4">마음에 드는 매물을 찾아 관심 목록에 추가해보세요!</p>
                      <Link to="/">
                        <Button className="w-full sm:w-auto">매물 둘러보기</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="recent" className="mt-0 flex-1 overflow-hidden">
                <div className="p-2 sm:p-4">
                  {/* Header with delete all button */}
                  {recentProperties.length > 0 && (
                    <div className="flex justify-end mb-3">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => openClearAllDialog('recent')}
                        className="text-red-500 hover:text-red-600 text-xs px-2 h-8"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        전체 삭제
                      </Button>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="bg-white rounded-lg p-3 mb-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm text-gray-600">총 조회 매물</span>
                      </div>
                      <span className="text-lg font-semibold text-real-blue">{recentProperties.length}개</span>
                    </div>
                  </div>

                  {/* Property List */}
                  {recentProperties.length > 0 ? (
                    <>
                      <div className={isMobile ? "space-y-3" : "grid grid-cols-1 gap-4"}>
                        {getRecentPaginated().map(property => {
                          const isFavorite = favoriteProperties.some(fp => fp.id === property.id);
                          return (
                            <div key={property.id} className="relative w-full">
                              <FavoritePropertyCard 
                                {...property} 
                                cardHeight="default"
                                vertical={isMobile}
                                isFavoriteDefault={isFavorite}
                                onRemove={() => handleRecentHeartClick(property.id)}
                                suppressHeart={true}
                              />
                              <div className="absolute bottom-3 right-3 flex gap-2">
                                <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                                  {property.viewedAt}
                                </span>
                              </div>
                              <div className="absolute top-3 right-3 flex gap-1">
                                <button
                                  className="p-1.5 z-20 bg-white/90 rounded-full hover:bg-white transition-colors shadow-sm"
                                  onClick={() => handleRecentHeartClick(property.id)}
                                  aria-label={isFavorite ? "관심 매물 해제" : "관심 매물 추가"}
                                >
                                  <Heart
                                    className={`h-4 w-4 ${
                                      isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                                    }`}
                                  />
                                </button>
                                <button
                                  className="p-1.5 z-20 bg-white/90 rounded-full hover:bg-white transition-colors shadow-sm"
                                  onClick={() => handleRecentRemove(property.id)}
                                  aria-label="최근 본 매물에서 삭제"
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Pagination */}
                      {recentTotalPages > 1 && (
                        <div className="mt-4">
                          <Pagination>
                            <PaginationContent className="flex-wrap gap-1">
                              <PaginationItem>
                                <PaginationPrevious 
                                  onClick={() => setRecentPage(Math.max(1, recentPage - 1))}
                                  className={`${recentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} text-xs px-2 h-8`}
                                />
                              </PaginationItem>
                              {Array.from({ length: Math.min(5, recentTotalPages) }, (_, i) => (
                                <PaginationItem key={i + 1}>
                                  <PaginationLink
                                    onClick={() => setRecentPage(i + 1)}
                                    isActive={recentPage === i + 1}
                                    className="cursor-pointer text-xs h-8 w-8"
                                  >
                                    {i + 1}
                                  </PaginationLink>
                                </PaginationItem>
                              ))}
                              <PaginationItem>
                                <PaginationNext 
                                  onClick={() => setRecentPage(Math.min(recentTotalPages, recentPage + 1))}
                                  className={`${recentPage === recentTotalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} text-xs px-2 h-8`}
                                />
                              </PaginationItem>
                            </PaginationContent>
                          </Pagination>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                      <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-base font-medium text-gray-900 mb-2">최근 본 매물이 없습니다</h3>
                      <p className="text-sm text-gray-500 mb-4">매물을 둘러보시면 여기에 기록이 남습니다!</p>
                      <Link to="/">
                        <Button className="w-full sm:w-auto">매물 둘러보기</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Favorites;