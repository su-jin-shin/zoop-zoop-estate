
import { Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

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
  featured
}: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className={`bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all ${featured ? 'ring-1 ring-real-blue' : ''} border border-gray-100`}>
      <div className="flex flex-row">
        <Link to={`/property/${id}`} className="w-1/3">
          <div className="relative h-full">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover aspect-square" 
            />
            {featured && (
              <div className="absolute top-0 left-0">
                <Badge className="rounded-none rounded-br-md bg-real-blue text-[10px]">신규</Badge>
              </div>
            )}
          </div>
        </Link>
        
        <div className="p-2 flex-1">
          <div className="flex items-center justify-between mb-1">
            <Badge variant="outline" className="text-[10px] font-normal h-5">
              {rentalType}
            </Badge>
            <button 
              className="p-1"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart 
                className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
              />
            </button>
          </div>
          
          <Link to={`/property/${id}`}>
            <h3 className="font-medium text-sm mb-0.5 line-clamp-1 hover:text-real-blue transition-colors">
              {title}
            </h3>
          </Link>
          
          <p className="text-xs text-real-darkGray mb-1 line-clamp-1">{address}</p>
          
          <div className="flex items-end justify-between">
            <span className="font-bold text-sm text-real-black">
              {deposit && <span>{deposit} / </span>}
              {price}
            </span>
            <span className="text-[10px] text-gray-500">{propertyType} · {size}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
