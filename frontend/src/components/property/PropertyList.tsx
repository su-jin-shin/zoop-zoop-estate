
import PropertyCard from "./PropertyCard";

// Mock data - would come from API in real app
const properties = [
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
    id: 2,
    title: "햇살 가득한 오피스텔, 풀옵션",
    address: "서울시 마포구 서교동 456-78",
    price: "65만원",
    deposit: "5000만원",
    rentalType: "월세",
    propertyType: "오피스텔",
    size: "16평",
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3"
  },
  {
    id: 3,
    title: "넓은 테라스가 있는 복층 빌라",
    address: "서울시 용산구 한남동 789-10",
    price: "1억 2000만원",
    rentalType: "매매",
    propertyType: "빌라",
    size: "32평",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3"
  },
  {
    id: 4,
    title: "신축 투룸, 역 5분거리, 주차가능",
    address: "서울시 서대문구 연희동 321-54",
    price: "55만원",
    deposit: "3000만원",
    rentalType: "월세",
    propertyType: "빌라",
    size: "18평",
    imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3"
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
    id: 6,
    title: "대학가 인근 원룸, 풀옵션",
    address: "서울시 관악구 신림동 987-65",
    price: "45만원",
    deposit: "1000만원",
    rentalType: "월세",
    propertyType: "원룸",
    size: "9평",
    imageUrl: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?ixlib=rb-4.0.3"
  }
];

const PropertyList = () => {
  return (
    <div className="space-y-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} {...property} cardHeight="tall" />
      ))}
    </div>
  );
};

export default PropertyList;
