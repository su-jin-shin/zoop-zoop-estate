
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bell, MapPin, Home, DollarSign, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import Navbar from "@/components/layout/Navbar";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const RegisteredNotifications = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [toggleNotificationId, setToggleNotificationId] = useState<number | null>(null);
  const [deleteNotificationId, setDeleteNotificationId] = useState<number | null>(null);
  const [toggleAction, setToggleAction] = useState<'activate' | 'deactivate'>('activate');
  const ITEMS_PER_PAGE = 10;

  // Mock data for registered notifications
  const [registeredNotifications, setRegisteredNotifications] = useState([
    {
      id: 1,
      title: "강남구 아파트 알림",
      location: "서울특별시 강남구",
      propertyTypes: ["아파트"],
      priceRange: "3억원 ~ 10억원",
      isActive: true,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      title: "압구정동 오피스텔 알림",
      location: "서울특별시 강남구 압구정동",
      propertyTypes: ["오피스텔"],
      priceRange: "2억원 ~ 5억원",
      isActive: false,
      createdAt: "2024-01-10",
    },
    {
      id: 3,
      title: "서초구 빌라 알림",
      location: "서울특별시 서초구",
      propertyTypes: ["빌라"],
      priceRange: "1억원 ~ 3억원",
      isActive: true,
      createdAt: "2024-01-08",
    },
    {
      id: 4,
      title: "용산구 원룸 알림",
      location: "서울특별시 용산구",
      propertyTypes: ["원룸", "오피스텔"],
      priceRange: "5000만원 ~ 1억원",
      isActive: true,
      createdAt: "2024-01-05",
    },
    {
      id: 5,
      title: "마포구 투룸 알림",
      location: "서울특별시 마포구",
      propertyTypes: ["아파트", "빌라"],
      priceRange: "2억원 ~ 4억원",
      isActive: false,
      createdAt: "2024-01-03",
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
      });
    }
    
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
      });
    }
    
    setDeleteDialogOpen(false);
    setDeleteNotificationId(null);
  };

  const getPaginatedNotifications = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return registeredNotifications.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const totalPages = Math.ceil(registeredNotifications.length / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-3 sm:px-4 py-4 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Link to="/notifications">
              <Button variant="ghost" size="icon" className="mr-2 h-8 w-8 sm:h-10 sm:w-10">
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <h1 className="text-base sm:text-lg font-semibold">등록된 알림</h1>
          </div>
          <Link to="/notification-settings">
            <Button size="sm" className="bg-real-blue hover:bg-real-blue/90 text-white text-xs sm:text-sm px-2 sm:px-4">
              새 알림 등록
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg p-3 sm:p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-real-blue mr-2" />
              <span className="text-xs sm:text-sm text-gray-600">총 등록된 알림</span>
            </div>
            <span className="text-base sm:text-lg font-semibold text-real-blue">
              {registeredNotifications.length}개
            </span>
          </div>
        </div>

        {/* Alert Dialogs */}
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {toggleAction === 'activate' ? '알림을 활성화하시겠습니까?' : '알림을 비활성화하시겠습니까?'}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {toggleAction === 'activate' 
                  ? '알림이 활성화되면 설정한 조건에 맞는 매물 정보를 받으실 수 있습니다.' 
                  : '알림이 비활성화되면 해당 조건의 매물 정보를 받지 않습니다.'
                }
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDialogOpen(false)}>
                취소
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleToggleConfirm}>
                확인
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>알림을 삭제하시겠습니까?</AlertDialogTitle>
              <AlertDialogDescription>
                이 알림을 삭제하면 다시 복구할 수 없습니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
                취소
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
                삭제
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Notifications List */}
        {registeredNotifications.length > 0 ? (
          <>
            <div className="space-y-3 mb-6">
              {getPaginatedNotifications().map((notification) => (
                <Card key={notification.id} className={!notification.isActive ? "bg-gray-100" : ""}>
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
                      <h4 className={`text-sm sm:text-base font-medium ${!notification.isActive ? "text-gray-500" : ""}`}>
                        {notification.title}
                      </h4>
                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleClick(notification.id, notification.isActive)}
                          className="p-0 h-auto"
                        >
                          <Badge variant={notification.isActive ? "default" : "secondary"}>
                            {notification.isActive ? "활성" : "비활성"}
                          </Badge>
                        </Button>
                      </div>
                    </div>
                    
                    <div className={`space-y-2 text-xs sm:text-sm mb-3 ${!notification.isActive ? "text-gray-400" : "text-gray-600"}`}>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                        <span className="break-words">{notification.location}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                        <span>{notification.propertyTypes.join(", ")}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                        <span>{notification.priceRange}</span>
                      </div>
                      
                      <div className="text-xs text-gray-400">
                        등록일: {notification.createdAt}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-2">
                      <Link to={`/notification-settings?edit=${notification.id}`} className="w-full sm:w-auto">
                        <Button variant="outline" size="sm" className="text-xs w-full sm:w-auto">
                          <Edit className="h-3 w-3 mr-1" />
                          수정
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteClick(notification.id)}
                        className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 w-full sm:w-auto"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        삭제
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent className="flex-wrap gap-1">
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        className={`${currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} text-xs sm:text-sm px-2 sm:px-3`}
                      />
                    </PaginationItem>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
                      <PaginationItem key={i + 1}>
                        <PaginationLink
                          onClick={() => setCurrentPage(i + 1)}
                          isActive={currentPage === i + 1}
                          className="cursor-pointer text-xs sm:text-sm h-8 w-8 sm:h-10 sm:w-10"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} text-xs sm:text-sm px-2 sm:px-3`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 px-4">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">등록된 알림이 없습니다</h3>
            <p className="text-sm sm:text-base text-gray-500 mb-4">원하는 조건의 매물 알림을 등록해보세요</p>
            <Link to="/notification-settings">
              <Button className="bg-real-blue hover:bg-real-blue/90 text-white">
                알림 등록하기
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisteredNotifications;
