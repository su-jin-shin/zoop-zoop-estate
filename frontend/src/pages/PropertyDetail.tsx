
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft, Heart, Share, MapPin, Home, Ruler, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Mock property data for the detail page
const propertyData = {
  id: 1,
  title: "모던한 신축 아파트, 역세권 위치",
  address: "서울시 강남구 역삼동 123-45",
  price: "80만원",
  deposit: "1억",
  rentalType: "전세",
  propertyType: "아파트",
  size: "24평",
  rooms: 3,
  baths: 2,
  floor: "8층",
  builtIn: "2022년",
  features: ["주차가능", "엘리베이터", "신축", "풀옵션", "즉시입주"],
  description: "역삼역 도보 5분 거리에 위치한 신축 아파트입니다. 햇살이 잘 들어오는 거실과 3개의 방, 2개의 화장실을 갖추고 있으며, 모던한 인테리어가 특징입니다. 주변에 편의시설이 잘 갖춰져 있고, 교통이 편리합니다. 연락주시면 언제든지 방문가능합니다.",
  images: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3"
  ],
  agent: {
    name: "김부동",
    company: "한국부동산",
    phone: "010-1234-5678",
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  createdAt: "2025-05-15"
};

const PropertyDetail = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [mainImage, setMainImage] = useState(propertyData.images[0]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      
      <div className="container mx-auto px-6 py-6 max-w-3xl">
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Link to="/" className="flex items-center text-real-darkGray hover:text-real-blue mr-4">
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span className="text-sm">돌아가기</span>
            </Link>
            <Badge variant="outline" className="mr-2">{propertyData.rentalType}</Badge>
            <Badge variant="outline">{propertyData.propertyType}</Badge>
            <div className="ml-auto flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex items-center ${isFavorite ? 'text-red-500' : 'text-real-darkGray'}`}
              >
                <Heart className={`h-4 w-4 mr-1 ${isFavorite ? 'fill-red-500' : ''}`} />
                <span>관심</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center text-real-darkGray">
                <Share className="h-4 w-4 mr-1" />
                <span>공유</span>
              </Button>
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-real-black mb-2">
            {propertyData.title}
          </h1>
          <div className="flex items-center text-real-darkGray mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{propertyData.address}</span>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative aspect-video">
              <img 
                src={mainImage} 
                alt={propertyData.title}
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="p-1 overflow-x-auto whitespace-nowrap">
              {propertyData.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setMainImage(image)}
                  className={`inline-block w-20 h-20 m-1 rounded overflow-hidden ${mainImage === image ? 'ring-2 ring-real-blue' : ''}`}
                >
                  <img 
                    src={image} 
                    alt={`${propertyData.title} ${index + 1}`}
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <p className="text-sm text-real-darkGray mb-1">가격</p>
              <div className="flex items-baseline">
                {propertyData.deposit && (
                  <span className="font-bold text-2xl text-real-black mr-1">
                    {propertyData.deposit} /
                  </span>
                )}
                <span className="font-bold text-2xl text-real-black">
                  {propertyData.price}
                </span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Home className="h-4 w-4 text-real-darkGray mr-2" />
                <span className="text-real-black">{propertyData.propertyType}</span>
              </div>
              <div className="flex items-center">
                <Ruler className="h-4 w-4 text-real-darkGray mr-2" />
                <span className="text-real-black">{propertyData.size}</span>
              </div>
              <div className="flex items-center">
                <span className="text-real-black">{propertyData.rooms}개 방 / {propertyData.baths}개 화장실</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-real-darkGray mr-2" />
                <span className="text-real-black">{propertyData.builtIn}</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <img 
                  src={propertyData.agent.image} 
                  alt={propertyData.agent.name} 
                  className="w-12 h-12 rounded-full mr-3" 
                />
                <div>
                  <p className="font-medium">{propertyData.agent.name}</p>
                  <p className="text-sm text-real-darkGray">{propertyData.agent.company}</p>
                </div>
              </div>
              <p className="text-sm text-real-darkGray">
                등록일: {propertyData.createdAt}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Tabs defaultValue="details">
              <TabsList className="bg-real-lightBlue border-b w-full justify-start rounded-none p-0">
                <TabsTrigger value="details" className="py-3 px-6 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-real-blue">상세정보</TabsTrigger>
                <TabsTrigger value="features" className="py-3 px-6 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-real-blue">특징</TabsTrigger>
                <TabsTrigger value="location" className="py-3 px-6 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-real-blue">위치</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-real-darkGray text-sm">매물 종류</p>
                    <p className="font-medium text-real-black">{propertyData.propertyType}</p>
                  </div>
                  <div>
                    <p className="text-real-darkGray text-sm">평수</p>
                    <p className="font-medium text-real-black">{propertyData.size}</p>
                  </div>
                  <div>
                    <p className="text-real-darkGray text-sm">방 / 화장실</p>
                    <p className="font-medium text-real-black">{propertyData.rooms}개 / {propertyData.baths}개</p>
                  </div>
                  <div>
                    <p className="text-real-darkGray text-sm">층수</p>
                    <p className="font-medium text-real-black">{propertyData.floor}</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="font-medium text-lg mb-3">상세 설명</h3>
                <p className="text-real-darkGray whitespace-pre-line">
                  {propertyData.description}
                </p>
              </TabsContent>
              
              <TabsContent value="features" className="p-6">
                <h3 className="font-medium text-lg mb-3">매물 특징</h3>
                <div className="grid grid-cols-2 gap-4">
                  {propertyData.features.map((feature, index) => (
                    <div key={index} className="flex items-center bg-real-lightBlue rounded-lg p-3">
                      <div className="bg-real-blue/10 rounded-full p-2 mr-2">
                        <Home className="h-5 w-5 text-real-blue" />
                      </div>
                      <span className="text-real-black">{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="p-6">
                <h3 className="font-medium text-lg mb-3">위치 정보</h3>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-real-darkGray">지도 영역 (실제 앱에서는 지도 API 통합)</p>
                </div>
                <div className="mt-4">
                  <p className="text-real-darkGray">
                    <MapPin className="h-4 w-4 mr-1 inline-block" />
                    {propertyData.address}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="container mx-auto px-6 py-4 max-w-3xl">
          <div className="flex space-x-3">
            <Button className="flex-1" size="lg">
              연락하기
            </Button>
            <Button variant="outline" className="flex-1" size="lg">
              문의하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
