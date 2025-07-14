import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import { useToast } from "@/hooks/use-toast";
import NotificationStats from "@/components/notifications/NotificationStats";
import RegisteredNotificationsList from "@/components/notifications/RegisteredNotificationsList";
import ReceivedNotificationsList from "@/components/notifications/ReceivedNotificationsList";
import NotificationDialogs from "@/components/notifications/NotificationDialogs";

const Notifications = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [toggleNotificationId, setToggleNotificationId] = useState<number | null>(null);
  const [deleteNotificationId, setDeleteNotificationId] = useState<number | null>(null);
  const [toggleAction, setToggleAction] = useState<'activate' | 'deactivate'>('activate');
  const [currentPage, setCurrentPage] = useState(1);
  const [receivedCurrentPage, setReceivedCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const [registeredNotifications, setRegisteredNotifications] = useState([
    {
      id: 1,
      title: "강남구 아파트 알림",
      location: "서울특별시 강남구",
      propertyTypes: ["아파트"],
      priceRange: "3억원 ~ 10억원",
      isActive: true,
    },
    {
      id: 2,
      title: "압구정동 오피스텔 알림",
      location: "서울특별시 강남구 압구정동",
      propertyTypes: ["오피스텔"],
      priceRange: "2억원 ~ 5억원",
      isActive: false,
    },
    {
      id: 3,
      title: "서초구 빌라 알림",
      location: "서울특별시 서초구",
      propertyTypes: ["빌라"],
      priceRange: "1억원 ~ 3억원",
      isActive: true,
    },
    {
      id: 4,
      title: "용산구 원룸 알림",
      location: "서울특별시 용산구",
      propertyTypes: ["원룸", "오피스텔"],
      priceRange: "5000만원 ~ 1억원",
      isActive: true,
    },
    {
      id: 5,
      title: "마포구 투룸 알림",
      location: "서울특별시 마포구",
      propertyTypes: ["아파트", "빌라"],
      priceRange: "2억원 ~ 4억원",
      isActive: false,
    },
    {
      id: 6,
      title: "송파구 아파트 알림",
      location: "서울특별시 송파구",
      propertyTypes: ["아파트"],
      priceRange: "4억원 ~ 8억원",
      isActive: true,
    },
    {
      id: 7,
      title: "홍대 원룸 알림",
      location: "서울특별시 마포구 홍대",
      propertyTypes: ["원룸"],
      priceRange: "3000만원 ~ 8000만원",
      isActive: true,
    },
    {
      id: 8,
      title: "잠실 오피스텔 알림",
      location: "서울특별시 송파구 잠실",
      propertyTypes: ["오피스텔"],
      priceRange: "1억원 ~ 3억원",
      isActive: false,
    },
  ]);

  const [receivedNotifications, setReceivedNotifications] = useState([
    {
      id: 1,
      type: 'price_change' as const,
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
      type: 'new_property' as const,
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
      notificationDescription: "설정한 조건에 맞는 새 매물이 등록되었습니다",
      receivedAt: "1일 전",
      isRead: true,
    },
    {
      id: 3,
      type: 'new_property' as const,
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
      notificationDescription: "설정한 조건에 맞는 새 매물이 등록되었습니다",
      receivedAt: "3일 전",
      isRead: true,
    },
    {
      id: 4,
      type: 'new_property' as const,
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
      notificationDescription: "설정한 조건에 맞는 새 매물이 등록되었습니다",
      receivedAt: "5일 전",
      isRead: false,
    },
    {
      id: 5,
      type: 'new_property' as const,
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
      notificationDescription: "설정한 조건에 맞는 새 매물이 등록되었습니다",
      receivedAt: "1주일 전",
      isRead: true,
    },
    {
      id: 6,
      type: 'new_property' as const,
      property: {
        id: 106,
        title: "송파구 신축 아파트",
        address: "서울특별시 송파구 잠실",
        price: "8억원",
        rentalType: "매매",
        propertyType: "아파트",
        size: "95㎡",
        imageUrl: "/placeholder.svg",
      },
      notificationTitle: "송파구 아파트 알림",
      notificationDescription: "설정한 조건에 맞는 새 매물이 등록되었습니다",
      receivedAt: "1주일 전",
      isRead: false,
    },
    {
      id: 7,
      type: 'new_property' as const,
      property: {
        id: 107,
        title: "마포구 투룸 오피스텔",
        address: "서울특별시 마포구 홍대",
        price: "3억원",
        rentalType: "매매",
        propertyType: "오피스텔",
        size: "45㎡",
        imageUrl: "/placeholder.svg",
      },
      notificationTitle: "마포구 오피스텔 알림",
      notificationDescription: "설정한 조건에 맞는 새 매물이 등록되었습니다",
      receivedAt: "2주일 전",
      isRead: true,
    },
    {
      id: 8,
      type: 'price_change' as const,
      property: {
        id: 108,
        title: "서초구 고급 아파트",
        address: "서울특별시 서초구 반포동",
        price: "15억원",
        rentalType: "매매",
        propertyType: "아파트",
        size: "130㎡",
        imageUrl: "/placeholder.svg",
        priceChange: {
          type: 'increase' as const,
          percentage: 3
        }
      },
      notificationTitle: "관심 매물 가격 변동",
      notificationDescription: "관심 매물의 가격이 5000만원 상승했습니다",
      receivedAt: "2주일 전",
      isRead: false,
    },
  ]);

  const handleToggleClick = (id: number, currentStatus: boolean) => {
    setToggleNotificationId(id);
    setToggleAction(currentStatus ? 'deactivate' : 'activate');
    setDialogOpen(true);
  };

  const handleToggleConfirm = () => {
    if (toggleNotificationId) {
      setRegisteredNotifications(prev => 
        prev.map(notification => 
          notification.id === toggleNotificationId 
            ? { ...notification, isActive: !notification.isActive }
            : notification
        )
      );
      
      toast({
        title: toggleAction === 'activate' ? "알림이 활성화되었습니다" : "알림이 비활성화되었습니다",
        description: toggleAction === 'activate' 
          ? "설정한 조건에 맞는 알림을 받으실 수 있습니다." 
          : "해당 알림이 비활성화되었습니다.",
      });
    }
    
    setDialogOpen(false);
    setToggleNotificationId(null);
  };

  const handleToggleCancel = () => {
    setDialogOpen(false);
    setToggleNotificationId(null);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteNotificationId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteNotificationId) {
      setRegisteredNotifications(prev => 
        prev.filter(notification => notification.id !== deleteNotificationId)
      );
      
      toast({
        title: "알림이 삭제되었습니다",
        description: "해당 알림이 목록에서 제거되었습니다.",
      });
    }
    
    setDeleteDialogOpen(false);
    setDeleteNotificationId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteNotificationId(null);
  };

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

  const getFilteredReceivedNotifications = (filter: string) => {
    switch (filter) {
      case 'unread':
        return receivedNotifications.filter(n => !n.isRead);
      case 'read':
        return receivedNotifications.filter(n => n.isRead);
      default:
        return receivedNotifications;
    }
  };

  const getPaginatedNotifications = (notifications: any[], currentPage: number) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return notifications.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const getTotalPages = (notifications: any[]) => {
    return Math.ceil(notifications.length / ITEMS_PER_PAGE);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-3 sm:px-4 py-4 max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Link to="/mypage">
              <Button variant="ghost" size="icon" className="mr-2 h-8 w-8 sm:h-10 sm:w-10">
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <h1 className="text-base sm:text-lg font-semibold">알림</h1>
          </div>
          <Link to="/notification-settings">
            <Button size="sm" className="bg-real-blue hover:bg-real-blue/90 text-white text-xs sm:text-sm px-2 sm:px-4">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              새 알림 등록
            </Button>
          </Link>
        </div>

        <NotificationStats 
          totalCount={receivedNotifications.length}
          unreadCount={receivedNotifications.filter(n => !n.isRead).length}
        />

        <Tabs defaultValue="received" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="received" className="text-xs sm:text-sm relative">
              받은 알림
              {receivedNotifications.filter(n => !n.isRead).length > 0 && (
                <Badge variant="destructive" className="ml-1 h-4 w-4 text-xs p-0 flex items-center justify-center">
                  {receivedNotifications.filter(n => !n.isRead).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="registered" className="text-xs sm:text-sm">
              등록된 알림 ({registeredNotifications.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="received">
            <Card className="h-[calc(100vh-200px)] sm:h-[calc(100vh-220px)]">
              <CardContent className="p-0 h-full">
                <Tabs defaultValue="all" className="w-full h-full flex flex-col" onValueChange={() => setReceivedCurrentPage(1)}>
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
                    <ReceivedNotificationsList 
                      notifications={getPaginatedNotifications(getFilteredReceivedNotifications('all'), receivedCurrentPage)}
                      totalPages={getTotalPages(getFilteredReceivedNotifications('all'))}
                      currentPage={receivedCurrentPage}
                      onPageChange={setReceivedCurrentPage}
                      onMarkAsRead={handleMarkAsRead}
                      onMarkAsUnread={handleMarkAsUnread}
                    />
                  </TabsContent>
                  
                  <TabsContent value="unread" className="mt-0 flex-1 overflow-hidden">
                    <ReceivedNotificationsList 
                      notifications={getPaginatedNotifications(getFilteredReceivedNotifications('unread'), receivedCurrentPage)}
                      totalPages={getTotalPages(getFilteredReceivedNotifications('unread'))}
                      currentPage={receivedCurrentPage}
                      onPageChange={setReceivedCurrentPage}
                      onMarkAsRead={handleMarkAsRead}
                      onMarkAsUnread={handleMarkAsUnread}
                    />
                  </TabsContent>
                  
                  <TabsContent value="read" className="mt-0 flex-1 overflow-hidden">
                    <ReceivedNotificationsList 
                      notifications={getPaginatedNotifications(getFilteredReceivedNotifications('read'), receivedCurrentPage)}
                      totalPages={getTotalPages(getFilteredReceivedNotifications('read'))}
                      currentPage={receivedCurrentPage}
                      onPageChange={setReceivedCurrentPage}
                      onMarkAsRead={handleMarkAsRead}
                      onMarkAsUnread={handleMarkAsUnread}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="registered">
            <RegisteredNotificationsList
              notifications={registeredNotifications}
              currentPage={currentPage}
              totalPages={getTotalPages(registeredNotifications)}
              onPageChange={setCurrentPage}
              onToggleClick={handleToggleClick}
              onDeleteClick={handleDeleteClick}
            />
          </TabsContent>
        </Tabs>

        <NotificationDialogs
          dialogOpen={dialogOpen}
          deleteDialogOpen={deleteDialogOpen}
          toggleAction={toggleAction}
          onToggleConfirm={handleToggleConfirm}
          onToggleCancel={handleToggleCancel}
          onDeleteConfirm={handleDeleteConfirm}
          onDeleteCancel={handleDeleteCancel}
          setDialogOpen={setDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
        />
      </div>
    </div>
  );
};

export default Notifications;
