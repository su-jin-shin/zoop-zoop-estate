import { useEffect } from "react";
import { Clock } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import ReceivedNotificationCard from "./ReceivedNotificationCard";

interface Property {
  id: number;
  title: string;
  address: string;
  price: string;
  deposit?: string;
  rentalType: string;
  propertyType: string;
  size: string;
  imageUrl: string;
  priceChange?: {
    type: 'increase' | 'decrease';
    percentage: number;
  };
}

interface ReceivedNotification {
  id: number;
  type: 'price_change' | 'new_property';
  property: Property;
  notificationTitle: string;
  notificationDescription: string;
  receivedAt: string;
  isRead: boolean;
}

interface ReceivedNotificationsListProps {
  notifications: ReceivedNotification[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onMarkAsRead: (id: number) => void;
  onMarkAsUnread: (id: number) => void;
}

const ReceivedNotificationsList = ({ 
  notifications, 
  totalPages, 
  currentPage, 
  onPageChange,
  onMarkAsRead,
  onMarkAsUnread
}: ReceivedNotificationsListProps) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);
    
  if (notifications.length === 0) {
    return (
      <div className="p-4 sm:p-6 text-center">
        <div>
          <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-gray-300 mx-auto mb-2" />
          <p className="text-xs sm:text-sm text-gray-500">해당하는 알림이 없습니다</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-2 sm:p-4 space-y-2 sm:space-y-3">
        {notifications.map((notification) => (
          <ReceivedNotificationCard
            key={notification.id}
            notification={notification}
            onMarkAsRead={onMarkAsRead}
            onMarkAsUnread={onMarkAsUnread}
          />
        ))}
      </div>
      
      <div className="p-2 sm:p-4 border-t bg-white">
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
    </div>
  );
};

export default ReceivedNotificationsList;
