import { useState } from "react";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

type TransactionType = "sale" | "jeonse" | "monthly";

type PriceInfoItem = {
  area: string;
  count: number;
  minPrice?: string;
  avgPrice?: string;
  deposit?: string;
  minRent?: string;
  avgRent?: string;
  sampleProperty: {
    id: number;
    description: string;
  };
};

type ComplexPriceInfo = {
  sale: PriceInfoItem[];
  jeonse: PriceInfoItem[];
  monthly: PriceInfoItem[];
};

interface AreaPriceInfoProps {
  complexPriceInfo: ComplexPriceInfo;
  onPropertyClick: (id: number) => void;
  defaultOpen?: boolean;
  className?: string;
}

const AreaPriceInfo = ({
  complexPriceInfo,
  onPropertyClick,
  defaultOpen = true,
  className = "",
}: AreaPriceInfoProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [showAll, setShowAll] = useState<{ [key in TransactionType]: boolean }>({
    sale: false,
    jeonse: false,
    monthly: false
  });

  // 더보기 상태에 따라 표시할 데이터 결정
  const getVisibleItems = (items: PriceInfoItem[], showAll: boolean) => {
    return showAll ? items : items.slice(0, 4);
  };

  return (
    <div className={className}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-between p-0 h-auto font-normal hover:bg-transparent"
          >
            <p className="text-xs text-real-darkGray">면적별 시세</p>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-3">
          <Tabs defaultValue="sale" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="sale" className="text-xs">매매</TabsTrigger>
              <TabsTrigger value="jeonse" className="text-xs">전세</TabsTrigger>
              <TabsTrigger value="monthly" className="text-xs">월세</TabsTrigger>
            </TabsList>

            {(["sale", "jeonse", "monthly"] as TransactionType[]).map((type) => (
              <TabsContent key={type} value={type} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                  {getVisibleItems(complexPriceInfo[type], showAll[type]).map((info, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm text-gray-900">{info.area}</span>
                          <span className="text-xs text-gray-500">({info.count}세대)</span>
                        </div>
                      </div>
                      <div className="text-xs space-y-1">
                        {type === "monthly" ? (
                          <>
                            <div>
                              <p className="text-gray-600">보증금</p>
                              <p className="font-medium text-gray-900">{info.deposit}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <p className="text-gray-600">최저</p>
                                <button
                                  onClick={() => onPropertyClick(info.sampleProperty.id)}
                                  className="font-medium text-real-blue hover:text-real-blue/80 transition-colors text-left"
                                >
                                  {info.minRent}
                                </button>
                              </div>
                              <div>
                                <p className="text-gray-600">평균</p>
                                <p className="font-medium text-gray-900">{info.avgRent}</p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-gray-600">최저가</p>
                              <button
                                onClick={() => onPropertyClick(info.sampleProperty.id)}
                                className="font-medium text-real-blue hover:text-real-blue/80 transition-colors text-left"
                              >
                                {info.minPrice}
                              </button>
                            </div>
                            <div>
                              <p className="text-gray-600">평균가</p>
                              <p className="font-medium text-gray-900">{info.avgPrice}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {complexPriceInfo[type].length > 4 && (
                  <div className="mt-3 text-center">
                    <button
                      onClick={() =>
                        setShowAll((prev) => ({ ...prev, [type]: !prev[type] }))
                      }
                      className="text-xs text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      {showAll[type]
                        ? "접기"
                        : `더보기 (+${complexPriceInfo[type].length - 4}개)`}
                    </button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AreaPriceInfo;
