
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchFilters = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-5">
      <div className="grid grid-cols-1 gap-3">
        <div className="relative">
          <Input 
            type="text" 
            placeholder="지역, 지하철역, 학교 등"
            className="pl-10 pr-4 py-2 w-full text-sm h-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        
        <div className="flex gap-3">
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="w-full text-sm h-10">
              <SelectValue placeholder="매물 유형" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apt">아파트</SelectItem>
              <SelectItem value="villa">빌라</SelectItem>
              <SelectItem value="officetel">오피스텔</SelectItem>
              <SelectItem value="house">단독/다가구</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={bedrooms} onValueChange={setBedrooms}>
            <SelectTrigger className="w-full text-sm h-10">
              <SelectValue placeholder="방 개수" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">원룸</SelectItem>
              <SelectItem value="2">투룸</SelectItem>
              <SelectItem value="3">쓰리룸+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-real-darkGray">가격 범위</span>
            <span className="text-sm font-medium text-real-blue">
              {priceRange[0]}만원 - {priceRange[1] === 100 ? '무제한' : `${priceRange[1]}만원`}
            </span>
          </div>
          <Slider 
            defaultValue={[0, 100]} 
            max={100} 
            step={1} 
            value={priceRange}
            onValueChange={setPriceRange}
            className="my-3"
          />
        </div>
        
        <Button className="w-full bg-real-blue hover:bg-blue-700 h-10 text-sm">
          검색하기
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;
