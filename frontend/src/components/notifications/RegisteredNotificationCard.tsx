
import { Link } from "react-router-dom";
import { MapPin, Home, DollarSign, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RegisteredNotification {
  id: number;
  title: string;
  location: string;
  propertyTypes: string[];
  priceRange: string;
  isActive: boolean;
}

interface RegisteredNotificationCardProps {
  notification: RegisteredNotification;
  onToggleClick: (id: number, currentStatus: boolean) => void;
  onDeleteClick: (id: number) => void;
}

const RegisteredNotificationCard = ({ 
  notification, 
  onToggleClick, 
  onDeleteClick 
}: RegisteredNotificationCardProps) => {
  return (
    <Card className={!notification.isActive ? "bg-gray-100" : ""}>
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col gap-2 mb-3">
          <div className="flex items-start justify-between">
            <h4 className={`text-sm sm:text-base font-medium ${!notification.isActive ? "text-gray-500" : ""}`}>
              {notification.title}
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleClick(notification.id, notification.isActive)}
              className="p-0 h-auto flex-shrink-0"
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
        </div>

        <div className="flex flex-col gap-2">
          <Link to={`/notification-settings?edit=${notification.id}`} className="w-full">
            <Button variant="outline" size="sm" className="text-xs w-full">
              <Edit className="h-3 w-3 mr-1" />
              수정
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onDeleteClick(notification.id)}
            className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 w-full"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            삭제
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisteredNotificationCard;
