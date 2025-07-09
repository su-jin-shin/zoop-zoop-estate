
import { Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

// Add priceChange property
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
  featured?: boolean;
  tall?: boolean;
  vertical?: boolean;
  isFavoriteDefault?: boolean;
  onRemove?: () => void;
  sold?: boolean;
  cardHeight?: "default" | "tall";
  suppressHeart?: boolean;
  priceChange?: {
    type: 'increase' | 'decrease';
    percentage: number;
  };
  showPriceChangeInBadge?: boolean;
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
  featured,
  tall,
  vertical,
  isFavoriteDefault = false,
  onRemove,
  sold = false,
  cardHeight = "default",
  suppressHeart = false,
  priceChange,
  showPriceChangeInBadge = false,
}: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteDefault);

  const soldClass = sold ? "opacity-60 grayscale pointer-events-auto relative" : "";

  const handleHeartClick = () => {
    if (onRemove) {
      onRemove();
    } else {
      setIsFavorite(!isFavorite);
    }
  };

  // Price change badge component
  const PriceChangeBadge = () => {
    if (!priceChange) return null;
    
    const isIncrease = priceChange.type === 'increase';
    const bgColor = isIncrease ? 'bg-red-500' : 'bg-blue-500';
    const arrow = isIncrease ? '↑' : '↓';
    
    return (
      <Badge className={`${bgColor} text-white text-xs font-medium`}>
        가격 {arrow} {priceChange.percentage}%
      </Badge>
    );
  };

  // 세로형 카드 (찜한매물 등)
  if (vertical) {
    return (
      <div
        className={`bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col h-full ${
          featured ? "ring-1 ring-real-blue" : ""
        } ${soldClass}`}
      >
        <Link to={`/property/${id}`} className={sold ? "pointer-events-none" : ""}>
          <div className="relative w-full aspect-[1.2/1] min-h-[220px] bg-[#F7F9FC]">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              style={{ minHeight: "100%", minWidth: "100%" }}
            />
            {featured && (
              <div className="absolute top-0 left-0">
                <Badge className="rounded-none rounded-br-md bg-real-blue text-[10px]">신규</Badge>
              </div>
            )}
            {priceChange && !showPriceChangeInBadge && (
              <div className="absolute top-0 right-0 m-2">
                <PriceChangeBadge />
              </div>
            )}
            {sold && (
              <div className="absolute inset-0 bg-gray-100 bg-opacity-60 z-10 flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-500 bg-white bg-opacity-80 rounded px-2 py-0.5 border border-gray-200">
                  팔린 매물
                </span>
              </div>
            )}
          </div>
        </Link>
        <div className="px-4 py-3 flex-1 flex flex-col justify-between relative">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center flex-wrap gap-1">
                <Badge variant="outline" className="text-[10px] font-normal h-5">
                  {rentalType}
                </Badge>
                {priceChange && showPriceChangeInBadge && <PriceChangeBadge />}
              </div>
              {!suppressHeart && (
                <button
                  className="p-1 z-10 flex-shrink-0"
                  type="button"
                  onClick={handleHeartClick}
                  aria-label={isFavorite ? "관심 매물 해제" : "관심 매물 추가"}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                    }`}
                  />
                </button>
              )}
            </div>
            <Link to={`/property/${id}`} className={sold ? "pointer-events-none" : ""}>
              <h3 className="font-medium text-base mb-1 line-clamp-1 hover:text-real-blue transition-colors">
                {title}
              </h3>
            </Link>
            <p className="text-xs text-real-darkGray mb-2 line-clamp-1">{address}</p>
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-base text-real-black">
                {deposit && <span>{deposit} / </span>}
                {price}
              </span>
              <span className="text-[11px] text-gray-500">
                {propertyType} · {size}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 가로형 카드 (메인 등)
  let imageBoxClass =
    cardHeight === "tall"
      ? "relative h-[180px] md:h-[210px] w-[180px] md:w-[210px] bg-[#F7F9FC]"
      : "relative h-[120px] md:h-[140px] w-[120px] md:w-[140px] bg-[#F7F9FC]";

  return (
    <div
      className={`bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all ${
        featured ? "ring-1 ring-real-blue" : ""
      } border border-gray-100 flex flex-row ${soldClass}`}
    >
      <Link to={`/property/${id}`} className={sold ? "pointer-events-none" : ""}>
        <div className={imageBoxClass}>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            style={{ minHeight: "100%", minWidth: "100%" }}
          />
          {featured && (
            <div className="absolute top-0 left-0">
              <Badge className="rounded-none rounded-br-md bg-real-blue text-[10px]">
                신규
              </Badge>
            </div>
          )}
          {priceChange && !showPriceChangeInBadge && (
            <div className="absolute top-0 right-0 m-2">
              <PriceChangeBadge />
            </div>
          )}
          {sold && (
            <div className="absolute inset-0 bg-gray-100 bg-opacity-60 z-10 flex items-center justify-center">
              <span className="text-xs font-semibold text-gray-500 bg-white bg-opacity-80 rounded px-2 py-0.5 border border-gray-200">
                팔린 매물
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-2 flex-1 flex flex-col justify-between relative">
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center flex-wrap gap-1">
              <Badge variant="outline" className="text-[10px] font-normal h-5">
                {rentalType}
              </Badge>
              {priceChange && showPriceChangeInBadge && <PriceChangeBadge />}
            </div>
            {!suppressHeart && (
              <button
                className="p-1 z-10 flex-shrink-0"
                onClick={handleHeartClick}
                aria-label={isFavorite ? "관심 매물 해제" : "관심 매물 추가"}
              >
                <Heart
                  className={`h-4 w-4 ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                  }`}
                />
              </button>
            )}
          </div>

          <Link to={`/property/${id}`} className={sold ? "pointer-events-none" : ""}>
            <h3 className="font-medium text-sm mb-0.5 line-clamp-1 hover:text-real-blue transition-colors">
              {title}
            </h3>
          </Link>

          <p className="text-xs text-real-darkGray mb-1 line-clamp-1">
            {address}
          </p>
        </div>
        <div className="mt-2 space-y-1">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-sm text-real-black">
              {deposit && <span>{deposit} / </span>}
              {price}
            </span>
            <span className="text-[10px] text-gray-500">
              {propertyType} · {size}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
