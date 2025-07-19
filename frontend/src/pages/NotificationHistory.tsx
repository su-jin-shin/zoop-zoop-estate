import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Eye, EyeOff, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import Navbar from "@/components/layout/Navbar";
import NotificationPropertyCard from "@/components/property/NotificationPropertyCard";
import { useToast } from "@/hooks/use-toast";

const NotificationHistory = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Mock data for received notifications with price change example
  const [receivedNotifications, setReceivedNotifications] = useState([
    {
      id: 1,
      type: 'price_change',
      property: {
        id: 101,
        title: "강남구 신축 아파트",
        address: "서울특별시 강남구 역삼동",
        price: "7억 5000만원",
        deposit: "2억원",
        rentalType: "매매",
        propertyType: "아파트",
        size: "84㎡",
        imageUrl: "/placeholder.svg",
        priceChange: {
          type: 'decrease' as const,
          percentage: 6
        }
      },
      notificationTitle: "관심 매물 가격 변동",
      notificationDescription: "관심 매물의 가격이 5000만원 하락했습니다",
      receivedAt: "1시간 전",
      isRead: false,
    },
    {
      id: 2,
      property: {
        id: 102,
        title: "압구정 프리미엄 오피스텔",
        address: "서울특별시 강남구 압구정동",
        price: "4억원",
        rentalType: "매매",
        propertyType: "오피스텔", 
        size: "59㎡",
        imageUrl: "/placeholder.svg",
      },
      notificationTitle: "압구정동 오피스텔 알림",
      receivedAt: "1일 전",
      isRead: true,
    },
    {
      id: 3,
      property: {
        id: 103,
        title: "강남 신규 아파트",
        address: "서울특별시 강남구 삼성동",
        price: "9억원",
        deposit: "3억원",
        rentalType: "매매",
        propertyType: "아파트",
        size: "102㎡",
        imageUrl: "/placeholder.svg",
      },
      notificationTitle: "강남구 아파트 알림",
      receivedAt: "3일 전",
      isRead: true,
    },
    {
      id: 4,
      property: {
        id: 104,
        title: "서초구 리모델링 아파트",
        address: "서울특별시 서초구 방배동",
        price: "7억원",
        deposit: "1억원",
        rentalType: "매매",
        propertyType: "아파트",
        size: "95㎡",
        imageUrl: "/placeholder.svg",
      },
      notificationTitle: "강남구 아파트 알림",
      receivedAt: "5일 전",
      isRead: false,
    },
    {
      id: 5,
      property: {
        id: 105,
        title: "용산구 한강뷰 아파트",
        address: "서울특별시 용산구 한남동",
        price: "12억원",
        rentalType: "매매",
        propertyType: "아파트",
        size: "120㎡",
        imageUrl: "/placeholder.svg",
      },
      notificationTitle: "한강뷰 아파트 알림",
      receivedAt: "1주일 전",
      isRead: true,
    },
  ]);

  const handleMarkAsRead = (id: number) => {
    setReceivedNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
    toast({
      title: "알림을 읽음으로 처리했습니다",
    });
  };

  const handleMarkAsUnread = (id: number) => {
    setReceivedNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: false }
          : notification
      )
    );
    toast({
      title: "알림을 읽지 않음으로 처리했습니다",
    });
  };

  const getFilteredNotifications = (filter: string) => {
    switch (filter) {
      case 'unread':
        return receivedNotifications.filter(n => !n.isRead);
      case 'read':
        return receivedNotifications.filter(n => n.isRead);
      default:
        return receivedNotifications;
    }
  };

  const getPaginatedNotifications = (notifications: typeof receivedNotifications) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return notifications.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const getTotalPages = (notifications: typeof receivedNotifications) => {
    return Math.ceil(notifications.length / ITEMS_PER_PAGE);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-4 max-w-3xl">
        {/* Header */}
        <div className="flex items-center mb-4">
          <Link to="/notifications">
            <Button variant="ghost" size="icon" className="mr-2 h-8 w-8 sm:h-10 sm:w-10">
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
          <h1 className="text-base sm:text-lg font-semibold">받은 알림 매물</h1>
        </div>

        <Card className="h-[calc(100vh-140px)] sm:h-[calc(100vh-160px)]">
          <CardContent className="p-0 h-full">
            <Tabs defaultValue="all" className="w-full h-full flex flex-col" onValueChange={() => setCurrentPage(1)}>
              <div className="p-4 pb-0">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all" className="text-xs sm:text-sm px-2">
                    전체 ({receivedNotifications.length})
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="text-xs sm:text-sm px-2">
                    읽지않음 ({receivedNotifications.filter(n => !n.isRead).length})
                  </TabsTrigger>
                  <TabsTrigger value="read" className="text-xs sm:text-sm px-2">
                    읽음 ({receivedNotifications.filter(n => n.isRead).length})
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0 flex-1 overflow-hidden">
                <NotificationList 
                  notifications={getPaginatedNotifications(getFilteredNotifications('all'))}
                  totalPages={getTotalPages(getFilteredNotifications('all'))}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAsUnread={handleMarkAsUnread}
                />
              </TabsContent>
              
              <TabsContent value="unread" className="mt-0 flex-1 overflow-hidden">
                <NotificationList 
                  notifications={getPaginatedNotifications(getFilteredNotifications('unread'))}
                  totalPages={getTotalPages(getFilteredNotifications('unread'))}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAsUnread={handleMarkAsUnread}
                />
              </TabsContent>
              
              <TabsContent value="read" className="mt-0 flex-1 overflow-hidden">
                <NotificationList 
                  notifications={getPaginatedNotifications(getFilteredNotifications('read'))}
                  totalPages={getTotalPages(getFilteredNotifications('read'))}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAsUnread={handleMarkAsUnread}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const NotificationList = ({ 
  notifications, 
  totalPages, 
  currentPage, 
  onPageChange,
  onMarkAsRead,
  onMarkAsUnread
}: {
  notifications: any[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onMarkAsRead: (id: number) => void;
  onMarkAsUnread: (id: number) => void;
}) => {
  if (notifications.length === 0) {
    return (
      <div className="p-4 sm:p-6 text-center h-full flex items-center justify-center">
        <div>
          <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-gray-300 mx-auto mb-2" />
          <p className="text-xs sm:text-sm text-gray-500">해당하는 알림이 없습니다</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1">
        <div className="p-2 sm:p-4 space-y-2 sm:space-y-3">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`${!notification.isRead ? 'bg-blue-50 border-real-blue/20' : ''}`}>
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="flex items-center gap-1 flex-1 min-w-0">
                      {notification.type === 'price_change' && (
                        <div className="flex items-center text-xs text-orange-600 flex-shrink-0">
                          {notification.property.priceChange?.type === 'decrease' ? (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          )}
                        </div>
                      )}
                      <h4 className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                        {notification.notificationTitle}
                      </h4>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
                    <span className="text-xs text-gray-400 whitespace-nowrap">{notification.receivedAt}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => notification.isRead ? onMarkAsUnread(notification.id) : onMarkAsRead(notification.id)}
                      className="h-6 w-6 p-0 flex-shrink-0"
                    >
                      {notification.isRead ? (
                        <EyeOff className="h-3 w-3" />
                      ) : (
                        <Eye className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
                {notification.notificationDescription && (
                  <p className="text-xs text-gray-500 mb-2">{notification.notificationDescription}</p>
                )}
                <div className="w-full">
                  <NotificationPropertyCard
                    {...notification.property}
                    cardHeight="default"
                    suppressHeart={true}
                    priceChange={notification.property.priceChange}
                    showPriceChangeInBadge={true}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-2 sm:p-4 border-t bg-white flex-shrink-0">
          <Pagination>
            <PaginationContent className="flex-wrap gap-1">
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                  className={`${currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} text-xs sm:text-sm px-2 sm:px-3`}
                />
              </PaginationItem>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => onPageChange(pageNum)}
                      isActive={currentPage === pageNum}
                      className="cursor-pointer text-xs sm:text-sm h-8 w-8 sm:h-10 sm:w-10"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                  className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} text-xs sm:text-sm px-2 sm:px-3`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default NotificationHistory;
