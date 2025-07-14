
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

// 검색 데이터를 카테고리별로 분리
const locationData = {
  regions: [
    "강남구", "서초구", "송파구", "강동구", "마포구", "용산구", "성동구", "광진구",
    "동대문구", "중랑구", "성북구", "강북구", "도봉구", "노원구", "은평구", "서대문구",
    "종로구", "중구", "영등포구", "구로구", "관악구", "동작구", "금천구", "양천구", "강서구"
  ],
  stations: [
    "강남역", "역삼역", "선릉역", "삼성역", "종각역", "명동역", "홍대입구역", "신촌역",
    "이대역", "공덕역", "합정역", "상수역", "건대입구역", "구의역", "왕십리역"
  ],
  schools: [
    "서울대학교", "연세대학교", "고려대학교", "성균관대학교", "한양대학교", "중앙대학교",
    "경희대학교", "한국외국어대학교", "서강대학교", "이화여자대학교"
  ]
};

const complexData = [
  "강남래미안", "서초힐스테이트", "송파자이", "강동푸르지오", "마포아크로", "용산센트럴파크", "성동트리마제"
];

const SearchFilters = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLocationResults, setFilteredLocationResults] = useState<{
    regions: string[];
    stations: string[];
    schools: string[];
  }>({ regions: [], stations: [], schools: [] });
  const [filteredComplexResults, setFilteredComplexResults] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 검색어 변경시 필터링
  useEffect(() => {
    if (searchQuery.trim()) {
      // 지역, 지하철역, 학교 데이터 각각 필터링
      const filteredRegions = locationData.regions.filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const filteredStations = locationData.stations.filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const filteredSchools = locationData.schools.filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      // 단지명 데이터 필터링
      const filteredComplexes = complexData.filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setFilteredLocationResults({
        regions: filteredRegions.slice(0, 5),
        stations: filteredStations.slice(0, 5),
        schools: filteredSchools.slice(0, 5)
      });
      setFilteredComplexResults(filteredComplexes.slice(0, 5));
      
      const hasLocationResults = filteredRegions.length > 0 || filteredStations.length > 0 || filteredSchools.length > 0;
      setShowDropdown(hasLocationResults || filteredComplexes.length > 0);
    } else {
      setFilteredLocationResults({ regions: [], stations: [], schools: [] });
      setFilteredComplexResults([]);
      setShowDropdown(false);
    }
  }, [searchQuery]);

  // 외부 클릭시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (keyword: string, isComplexSearch: boolean) => {
    setSearchQuery(keyword);
    setShowDropdown(false);
    navigate(`/search?keyword=${encodeURIComponent(keyword)}&isComplexSearch=${isComplexSearch}`);
  };

  const renderLocationResults = () => {
    const { regions, stations, schools } = filteredLocationResults;
    const allResults = [...regions, ...stations, ...schools];
    
    if (allResults.length === 0) return null;

    // 결과가 한 개뿐이면 구분 없이 표시
    if (allResults.length === 1) {
      return (
        <div
          className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm border-b border-gray-50 last:border-b-0"
          onClick={() => handleResultClick(allResults[0], false)}
        >
          {allResults[0]}
        </div>
      );
    }

    // 여러 개면 카테고리별로 구분해서 표시
    return (
      <>
        {regions.map((result, index) => (
          <div
            key={`region-${index}`}
            className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm border-b border-gray-50"
            onClick={() => handleResultClick(result, false)}
          >
            {result}
          </div>
        ))}
        {regions.length > 0 && (stations.length > 0 || schools.length > 0) && (
          <div className="border-b border-gray-200 my-1"></div>
        )}
        {stations.map((result, index) => (
          <div
            key={`station-${index}`}
            className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm border-b border-gray-50"
            onClick={() => handleResultClick(result, false)}
          >
            {result}
          </div>
        ))}
        {stations.length > 0 && schools.length > 0 && (
          <div className="border-b border-gray-200 my-1"></div>
        )}
        {schools.map((result, index) => (
          <div
            key={`school-${index}`}
            className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm border-b border-gray-50 last:border-b-0"
            onClick={() => handleResultClick(result, false)}
          >
            {result}
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="grid grid-cols-1 gap-3">
        <div className="relative" ref={dropdownRef}>
          <Input 
            ref={inputRef}
            type="text" 
            placeholder="지역, 지하철역, 학교, 단지명"
            className="pl-10 pr-4 py-2 w-full text-sm h-12 border-4 border-real-blue/50 hover:border-real-blue/70 transition-colors rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-real-blue"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (searchQuery.trim()) {
                const hasLocationResults = filteredLocationResults.regions.length > 0 || 
                                         filteredLocationResults.stations.length > 0 || 
                                         filteredLocationResults.schools.length > 0;
                if (hasLocationResults || filteredComplexResults.length > 0) {
                  setShowDropdown(true);
                }
              }
            }}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-real-blue" />
          
          {/* 검색 결과 드롭다운 - 2컬럼 레이아웃 */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-hidden">
              <div className="grid grid-cols-2 min-h-0">
                {/* 왼쪽 컬럼: 지역, 지하철역, 학교 */}
                <div className="border-r border-gray-100">
                  <div className="px-3 py-2 bg-gray-50 text-xs font-medium text-gray-600 border-b border-gray-100">
                    지역 · 지하철역 · 학교
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {renderLocationResults()}
                  </div>
                </div>
                
                {/* 오른쪽 컬럼: 단지명 */}
                <div>
                  <div className="px-3 py-2 bg-gray-50 text-xs font-medium text-gray-600 border-b border-gray-100">
                    단지명
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {filteredComplexResults.map((result, index) => (
                      <div
                        key={`complex-${index}`}
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm border-b border-gray-50 last:border-b-0"
                        onClick={() => handleResultClick(result, true)}
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
