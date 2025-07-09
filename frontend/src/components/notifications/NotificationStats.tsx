
import { Bell } from "lucide-react";

interface NotificationStatsProps {
  totalCount: number;
  unreadCount: number;
}

const NotificationStats = ({ totalCount, unreadCount }: NotificationStatsProps) => {
  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 mb-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-real-blue mr-2" />
          <span className="text-xs sm:text-sm text-gray-600">받은 알림</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <span className="text-base sm:text-lg font-semibold text-real-blue block">
              {totalCount}개
            </span>
            <span className="text-xs text-gray-500">전체</span>
          </div>
          {unreadCount > 0 && (
            <div className="text-center">
              <span className="text-base sm:text-lg font-semibold text-red-500 block">
                {unreadCount}개
              </span>
              <span className="text-xs text-gray-500">읽지않음</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationStats;
