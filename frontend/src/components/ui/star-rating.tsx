
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showRating?: boolean;
  className?: string;
}

const StarRating = ({ 
  rating, 
  maxRating = 5, 
  size = "md", 
  showRating = false,
  className = "" 
}: StarRatingProps) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4", 
    lg: "h-5 w-5"
  };

  const starSize = sizeClasses[size];

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex space-x-1">
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1;
          const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;
          
          return (
            <div key={index} className="relative">
              {/* Background star (unfilled) */}
              <Star className={`${starSize} text-gray-300`} />
              
              {/* Filled portion */}
              {fillPercentage > 0 && (
                <div 
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{ width: `${fillPercentage}%` }}
                >
                  <Star className={`${starSize} text-yellow-400 fill-yellow-400`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showRating && (
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
      )}
    </div>
  );
};

export default StarRating;
