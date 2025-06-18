
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

type TextInputProps = {
  input: string;
  setInput: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleSubmit: () => void;
  placeholder?: string;
  showSkip?: boolean;
  questionId?: number;
  handleBackButton?: () => void;
  isLastQuestion?: boolean; // 추가: 마지막 질문 여부
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
  isLastQuestion = false // 기본값: false
}: TextInputProps) => {
  // Determine if the button should be disabled
  // Only disable for price question (5), always enable for deposit question (6)
  const isPriceQuestion = questionId === 5;
  const isDepositQuestion = questionId === 6;
  const isPriceOrDepositQuestion = isPriceQuestion || isDepositQuestion;
  
  // Only disable button for price question with empty input
  const isButtonDisabled = isPriceQuestion && input.trim() === '';

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

  return (
    <div className="flex flex-col gap-2">
      <Input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1"
      />
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