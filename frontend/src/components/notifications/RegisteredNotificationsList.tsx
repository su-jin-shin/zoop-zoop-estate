
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import RegisteredNotificationCard from "./RegisteredNotificationCard";

interface RegisteredNotification {
  id: number;
  title: string;
  location: string;
  propertyTypes: string[];
  priceRange: string;
  isActive: boolean;
}

interface RegisteredNotificationsListProps {
  notifications: RegisteredNotification[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onToggleClick: (id: number, currentStatus: boolean) => void;
  onDeleteClick: (id: number) => void;
}

const RegisteredNotificationsList = ({
  notifications,
  currentPage,
  totalPages,
  onPageChange,
  onToggleClick,
  onDeleteClick
}: RegisteredNotificationsListProps) => {
  const getPaginatedNotifications = () => {
    const ITEMS_PER_PAGE = 5;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return notifications.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  return (
    <Card className="h-[calc(100vh-200px)] sm:h-[calc(100vh-220px)]">
      <CardContent className="p-4 h-full">
        <div className="h-full flex flex-col">
          <ScrollArea className="flex-1">
            {notifications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getPaginatedNotifications().map((notification) => (
                  <RegisteredNotificationCard
                    key={notification.id}
                    notification={notification}
                    onToggleClick={onToggleClick}
                    onDeleteClick={onDeleteClick}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 px-4 h-full flex items-center justify-center">
                <div>
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">등록된 알림이 없습니다</h3>
                  <p className="text-sm sm:text-base text-gray-500 mb-4">원하는 조건의 매물 알림을 등록해보세요</p>
                  <Link to="/notification-settings">
                    <Button className="bg-real-blue hover:bg-real-blue/90 text-white">
                      알림 등록하기
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </ScrollArea>
          
          <div className="pt-4 border-t bg-white flex-shrink-0">
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
            <div className="text-center mt-2">
              <span className="text-xs text-gray-500">
                페이지 {currentPage} / {totalPages} (총 {notifications.length}개)
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisteredNotificationsList;
