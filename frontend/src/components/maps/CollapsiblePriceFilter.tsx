import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, X } from "lucide-react";

interface CollapsiblePriceFilterProps {
  transactionType: string;
  minPrice: string;
  maxPrice: string;
  minDeposit: string;
  maxDeposit: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onMinDepositChange: (value: string) => void;
  onMaxDepositChange: (value: string) => void;
  onApplyFilter: () => void;
  onResetFilter: () => void;
  formatInputDisplay: (value: string, isMonthly?: boolean) => string;
}

const CollapsiblePriceFilter = ({
  transactionType,
  minPrice,
  maxPrice,
  minDeposit,
  maxDeposit,
  onMinPriceChange,
  onMaxPriceChange,
  onMinDepositChange,
  onMaxDepositChange,
  onApplyFilter,
  onResetFilter,
  formatInputDisplay
}: CollapsiblePriceFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMonthlyRent = transactionType === "monthly";
  
  const pricePresets = {
    sale: [
      { label: "1억 이하", min: "", max: "10000" },
      { label: "1-3억", min: "10000", max: "30000" },
      { label: "3-5억", min: "30000", max: "50000" },
      { label: "5-10억", min: "50000", max: "100000" },
      { label: "10억 이상", min: "100000", max: "" }
    ],
    jeonse: [
      { label: "5000만원 이하", min: "", max: "5000" },
      { label: "5000만원-1억", min: "5000", max: "10000" },
      { label: "1-2억", min: "10000", max: "20000" },
      { label: "2-5억", min: "20000", max: "50000" },
      { label: "5억 이상", min: "50000", max: "" }
    ],
    monthly: [
      { label: "30만원 이하", min: "", max: "30" },
      { label: "30-50만원", min: "30", max: "50" },
      { label: "50-100만원", min: "50", max: "100" },
      { label: "100-200만원", min: "100", max: "200" },
      { label: "200만원 이상", min: "200", max: "" }
    ]
  };

  const depositPresets = [
    { label: "1000만원 이하", min: "", max: "1000" },
    { label: "1000만원-5000만원", min: "1000", max: "5000" },
    { label: "5000만원-1억", min: "5000", max: "10000" },
    { label: "1-3억", min: "10000", max: "30000" },
    { label: "3억 이상", min: "30000", max: "" }
  ];

  const handlePricePreset = (min: string, max: string) => {
    onMinPriceChange(min);
    onMaxPriceChange(max);
  };

  const handleDepositPreset = (min: string, max: string) => {
    onMinDepositChange(min);
    onMaxDepositChange(max);
  };

  const handleNumericInput = (value: string, onChange: (value: string) => void) => {
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, '');
    onChange(numericValue);
  };

  const isPriceFilterValid = () => {
    // At least one value must be present
    if (!minPrice && !maxPrice) return false;
    
    // If both values are present, max must be greater than min
    if (minPrice && maxPrice) {
      const minNum = parseInt(minPrice);
      const maxNum = parseInt(maxPrice);
      return maxNum > minNum;
    }
    
    // If only one value is present, it's valid
    return true;
  };

  const isDepositFilterValid = () => {
    if (!minDeposit && !maxDeposit) return false;
    
    if (minDeposit && maxDeposit) {
      const minNum = parseInt(minDeposit);
      const maxNum = parseInt(maxDeposit);
      return maxNum > minNum;
    }
    
    return true;
  };

  const canApplyFilter = () => {
    if (isMonthlyRent) {
      // For monthly rent, at least one filter (price or deposit) must be valid
      return isPriceFilterValid() || isDepositFilterValid();
    } else {
      // For other types, price filter must be valid
      return isPriceFilterValid();
    }
  };

  const getPriceLabel = () => {
    switch (transactionType) {
      case "sale": return "매매가";
      case "jeonse": return "전세금";
      case "monthly": return "월세";
      default: return "가격";
    }
  };

  const getCurrentFilterSummary = () => {
    const hasPrice = minPrice || maxPrice;
    const hasDeposit = minDeposit || maxDeposit;
    
    if (!hasPrice && !hasDeposit) return null;
    
    let summary = "";
    if (hasPrice) {
      summary += getPriceLabel() + ": ";
      if (minPrice && maxPrice) {
        summary += `${formatInputDisplay(minPrice, isMonthlyRent)} ~ ${formatInputDisplay(maxPrice, isMonthlyRent)}`;
      } else if (minPrice) {
        summary += `${formatInputDisplay(minPrice, isMonthlyRent)} 이상`;
      } else if (maxPrice) {
        summary += `${formatInputDisplay(maxPrice, isMonthlyRent)} 이하`;
      }
    }
    
    if (hasDeposit && isMonthlyRent) {
      if (summary) summary += ", ";
      summary += "보증금: ";
      if (minDeposit && maxDeposit) {
        summary += `${formatInputDisplay(minDeposit)} ~ ${formatInputDisplay(maxDeposit)}`;
      } else if (minDeposit) {
        summary += `${formatInputDisplay(minDeposit)} 이상`;
      } else if (maxDeposit) {
        summary += `${formatInputDisplay(maxDeposit)} 이하`;
      }
    }
    
    return summary;
  };

  const filterSummary = getCurrentFilterSummary();

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between h-auto py-2 px-3 bg-white text-real-blue border-real-blue hover:bg-blue-50 hover:text-real-blue"
        >
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">가격 설정</span>
            {filterSummary && (
              <span className="text-xs text-blue-600 truncate max-w-[200px]">
                {filterSummary}
              </span>
            )}
          </div>
          <ChevronDown className="h-4 w-4 shrink-0" />
        </Button>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="mt-2">
        <div className="p-4 bg-white rounded-lg border border-gray-100">
          {isMonthlyRent ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-real-darkGray">월세</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onResetFilter}
                    className="text-xs text-gray-500 h-6 px-2"
                  >
                    <X className="w-3 h-3 mr-1" />
                    초기화
                  </Button>
                </div>
                <div className="flex gap-2 mb-3">
                  <Input 
                    placeholder="최소 금액" 
                    value={minPrice}
                    onChange={(e) => handleNumericInput(e.target.value, onMinPriceChange)}
                    className="text-sm"
                  />
                  <span className="flex items-center text-gray-400">~</span>
                  <Input 
                    placeholder="최대 금액" 
                    value={maxPrice}
                    onChange={(e) => handleNumericInput(e.target.value, onMaxPriceChange)}
                    className="text-sm"
                  />
                  <span className="flex items-center text-sm text-gray-600 whitespace-nowrap">만원</span>
                  <Button 
                    onClick={onApplyFilter}
                    size="sm"
                    className="whitespace-nowrap"
                    disabled={!canApplyFilter()}
                  >
                    적용
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {pricePresets.monthly.map((preset, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handlePricePreset(preset.min, preset.max)}
                      className="text-xs h-7"
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-real-darkGray">보증금</span>
                </div>
                <div className="flex gap-2 mb-3">
                  <Input 
                    placeholder="최소 보증금" 
                    value={minDeposit}
                    onChange={(e) => handleNumericInput(e.target.value, onMinDepositChange)}
                    className="text-sm"
                  />
                  <span className="flex items-center text-gray-400">~</span>
                  <Input 
                    placeholder="최대 보증금" 
                    value={maxDeposit}
                    onChange={(e) => handleNumericInput(e.target.value, onMaxDepositChange)}
                    className="text-sm"
                  />
                  <span className="flex items-center text-sm text-gray-600 whitespace-nowrap">만원</span>
                  <Button 
                    onClick={onApplyFilter}
                    size="sm"
                    className="whitespace-nowrap"
                    disabled={!canApplyFilter()}
                  >
                    적용
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {depositPresets.map((preset, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleDepositPreset(preset.min, preset.max)}
                      className="text-xs h-7"
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-real-darkGray">{getPriceLabel()}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onResetFilter}
                  className="text-xs text-gray-500 h-6 px-2"
                >
                  <X className="w-3 h-3 mr-1" />
                  초기화
                </Button>
              </div>
              <div className="flex gap-2 mb-3">
                <Input 
                  placeholder="최소 금액" 
                  value={minPrice}
                  onChange={(e) => handleNumericInput(e.target.value, onMinPriceChange)}
                  className="text-sm"
                />
                <span className="flex items-center text-gray-400">~</span>
                <Input 
                  placeholder="최대 금액" 
                  value={maxPrice}
                  onChange={(e) => handleNumericInput(e.target.value, onMaxPriceChange)}
                  className="text-sm"
                />
                <span className="flex items-center text-sm text-gray-600 whitespace-nowrap">만원</span>
                <Button 
                  onClick={onApplyFilter}
                  size="sm"
                  className="whitespace-nowrap"
                  disabled={!canApplyFilter()}
                >
                  적용
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {pricePresets[transactionType as keyof typeof pricePresets]?.map((preset, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePricePreset(preset.min, preset.max)}
                    className="text-xs h-7"
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsiblePriceFilter;
