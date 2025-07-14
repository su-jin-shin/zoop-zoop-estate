
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { formatPriceInput } from "@/lib/priceUtils";

type TextInputProps = {
  input: string;
  setInput: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleSubmit: () => void;
  placeholder?: string;
  showSkip?: boolean;
  questionId?: number;
  handleBackButton?: () => void;
  isLastQuestion?: boolean;
  onInputFocus?: () => void;
  onInputBlur?: () => void;
};

const TextInput = ({ 
  input, 
  setInput, 
  handleKeyDown, 
  handleSubmit,
  placeholder = "금액을 입력하세요 (예: 5000)",
  showSkip = false,
  questionId,
  handleBackButton,
  isLastQuestion = false,
  onInputFocus,
  onInputBlur,
}: TextInputProps) => {
  // Determine if the button should be disabled
  const isPriceQuestion = questionId === 5;
  const isDepositQuestion = questionId === 6;
  const isPriceOrDepositQuestion = isPriceQuestion || isDepositQuestion;
  
  // Check if input is effectively zero (handles "0", "00", "000", etc.)
  const isEffectivelyZero = input.trim() !== '' && parseInt(input.trim()) === 0;
  
  // For price question (5): disable if empty or effectively zero
  // For deposit question (6): only disable if effectively zero (empty is allowed)
  const isButtonDisabled = isPriceQuestion 
    ? (input.trim() === '' || isEffectivelyZero)
    : isDepositQuestion 
    ? isEffectivelyZero
    : false;

  // Handle number-only input for price and deposit fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    if (isPriceOrDepositQuestion) {
      const value = e.target.value;
      // Only allow numeric input (empty or numbers only)
      if (value === '' || /^[0-9]+$/.test(value)) {
        setInput(value);
      }
    } else {
      setInput(e.target.value);
    }
  };

  // 버튼 텍스트 결정
  const getButtonText = () => {
    if (isLastQuestion) {
      return "결과 확인하기";
    }
    return "다음";
  };

  // Show price hint for price and deposit questions
  const showPriceHint = (questionId === 5 || questionId === 6) && input.trim() !== '';
  const priceHint = showPriceHint ? formatPriceInput(input) : '';

  return (
    <div className="flex flex-col gap-2">
      <Input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 text-base"
        onFocus={onInputFocus}
        onBlur={onInputBlur}
      />
      {showPriceHint && priceHint && (
        <div className="text-xs text-gray-500 px-1">
          입력하신 금액: {priceHint}
        </div>
      )}
      <div className="flex gap-2">
        {/* For price and deposit questions (5 and 6), show back button */}
        {(questionId === 5 || questionId === 6) && handleBackButton ? (
          <>
            <Button
              variant="outline"
              onClick={handleBackButton}
              className="flex-1 text-xs"
            >
              이전
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-real-blue hover:bg-real-blue/90 text-xs"
              disabled={isButtonDisabled}
            >
              {getButtonText()}
            </Button>
          </>
        ) : (
          <>
            {showSkip && (
              <Button
                variant="outline"
                onClick={handleSubmit}
                className="w-full"
              >
                건너뛰기
              </Button>
            )}
            <Button
              onClick={handleSubmit}
              className={`bg-real-blue hover:bg-real-blue/90 ${showSkip ? 'w-full' : 'w-full'}`}
              disabled={isButtonDisabled}
            >
              {getButtonText()} {!isLastQuestion && <ArrowRight className="h-4 w-4 ml-1" />}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default TextInput;
