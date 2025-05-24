
import { ArrowRight } from "lucide-react";
import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";

// Mock featured data (would come from API in real app)
const featuredProperties = [
  {
    id: 1,
    title: "모던한 신축 아파트, 역세권 위치",
    address: "서울시 강남구 역삼동 123-45",
    price: "80만원",
    deposit: "1억",
    rentalType: "전세",
    propertyType: "아파트",
    size: "24평",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
    featured: true
  },
  {
    id: 5,
    title: "한강뷰 럭셔리 아파트, 고층",
    address: "서울시 성동구 성수동 654-32",
    price: "1억 8000만원",
    rentalType: "매매",
    propertyType: "아파트",
    size: "42평",
    imageUrl: "https://images.unsplash.com/photo-1486304873000-235643847519?ixlib=rb-4.0.3",
    featured: true
  },
  {
    id: 3,
    title: "넓은 테라스가 있는 복층 빌라",
    address: "서울시 용산구 한남동 789-10",
    price: "1억 2000만원",
    rentalType: "매매",
    propertyType: "빌라",
    size: "32평",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3",
    featured: true
  }
];

const FeaturedProperties = () => {
  return (
    <section className="bg-real-lightBlue rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-real-black">프리미엄 매물</h2>
        <Button variant="ghost" className="text-real-blue hover:text-real-blue/80">
          더보기 <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProperties.map(property => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProperties;
