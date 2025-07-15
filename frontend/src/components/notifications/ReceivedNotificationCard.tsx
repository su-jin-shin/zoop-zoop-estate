
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Eye, EyeOff } from "lucide-react";
import NotificationPropertyCard from "@/components/property/NotificationPropertyCard";

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

interface ReceivedNotificationCardProps {
  notification: ReceivedNotification;
  onMarkAsRead: (id: number) => void;
  onMarkAsUnread: (id: number) => void;
}

const ReceivedNotificationCard = ({ 
  notification, 
  onMarkAsRead, 
  onMarkAsUnread 
}: ReceivedNotificationCardProps) => {
  return (
    <Card className={`${!notification.isRead ? 'bg-blue-50 border-real-blue/20' : ''}`}>
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
  );
};

export default ReceivedNotificationCard;
