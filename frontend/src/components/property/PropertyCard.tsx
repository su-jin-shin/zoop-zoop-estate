
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface PriceChange {
  type: "increase" | "decrease";
  percentage: number;
}

interface PropertyCardProps {
  id: number;
  title: string;
  address: string;
  price: string;
  deposit?: string;
  rentalType: string;
  propertyType: string;
  size: string;
  imageUrl: string;
  isLowestPrice?: boolean;
  // Additional props used throughout the app
  cardHeight?: string;
  vertical?: boolean;
  isFavoriteDefault?: boolean;
  onRemove?: () => void;
  suppressHeart?: boolean;
  priceChange?: PriceChange;
  showPriceChangeInBadge?: boolean;
  sold?: boolean;
  featured?: boolean;
}

const PropertyCard = ({
  id,
  title,
  address,
  price,
  deposit,
  rentalType,
  propertyType,
  size,
  imageUrl,
  isLowestPrice = false,
  cardHeight = "default",
  vertical = false,
  isFavoriteDefault = false,
  onRemove,
  suppressHeart = false,
  priceChange,
  showPriceChangeInBadge = false,
  sold = false,
  featured = false
}: PropertyCardProps) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(isFavoriteDefault);

  const handleClick = () => {
    navigate(`/property/${id}`);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    } else {
      setIsFavorite(!isFavorite);
    }
  };

  const formatPrice = () => {
    if (rentalType === "전세") {
      return `전세 ${deposit || price}`;
    } else if (rentalType === "월세") {
      return `월세 ${deposit}/${price}`;
    } else {
      return `매매 ${price}`;
    }
  };

  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-shadow duration-200 overflow-hidden ${
        isLowestPrice ? "ring-1 ring-real-blue" : ""
      }`}
      onClick={handleClick}
    >
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover" 
          />
        </div>
        {isLowestPrice && (
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-real-blue text-white text-xs font-medium px-2 py-1">
              동일 면적 최저가
            </Badge>
          </div>
        )}
        {!suppressHeart && (
          <div className="absolute top-2 right-2">
            <button
              onClick={handleHeartClick}
              className="p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              aria-label={isFavorite ? "관심 매물 해제" : "관심 매물 추가"}
            >
              <Heart
                className={`h-4 w-4 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </button>
          </div>
        )}
      </div>
      
      <CardContent className="p-3 md:p-4">
        <h3 className="font-medium text-sm md:text-base mb-2 line-clamp-2 leading-tight">
          {title}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1 flex-shrink-0" />
          <span className="text-xs md:text-sm truncate">{address}</span>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1 md:space-x-2">
            <Badge variant="secondary" className="text-xs">
              {rentalType}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {propertyType}
            </Badge>
          </div>
          <span className="text-xs md:text-sm text-gray-600">{size}</span>
        </div>
        
        <p className="font-bold text-sm md:text-base text-gray-900">
          {formatPrice()}
        </p>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;