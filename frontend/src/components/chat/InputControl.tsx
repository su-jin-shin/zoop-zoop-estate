
import { Message } from "./types/chatTypes";
import DefaultInput from "./inputs/DefaultInput";
import LocationSearchInput from "./inputs/LocationSearchInput";
import RadioInput from "./inputs/RadioInput";
import TextInput from "./inputs/TextInput";
import { Button } from "../ui/button";

type InputControlProps = {
  messages: Message[];
  input: string;
  setInput: (value: string) => void;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleSendMessage: () => void;
  handleLocationSelect: (location: string) => void;
  transactionType?: string;
  handleBackButton?: () => void;
};

const InputControl = ({
  messages,
  input,
  setInput,
  selectedOption,
  setSelectedOption,
  handleKeyDown,
  handleSendMessage,
  handleLocationSelect,
  transactionType,
  handleBackButton,
}: InputControlProps) => {
  const lastMessage = messages[messages.length - 1];

  // Always show default input when there's no specific input type required
  // or if the last message is the filter button message (which has inputType 'button')
  if (!lastMessage || !lastMessage.inputType || lastMessage.inputType === 'button') {
    return (
      <DefaultInput 
        input={input}
        setInput={setInput}
        handleKeyDown={handleKeyDown}
        handleSubmit={handleSendMessage}
      />
    );
  }

  if (lastMessage.inputType === 'search') {
    return (
      <LocationSearchInput
        input={input}
        setInput={setInput}
        handleLocationSelect={(location) => {
          handleLocationSelect(location);
          handleSendMessage();
        }}
      />
    );
  }

  if (lastMessage.inputType === 'radio' && lastMessage.options) {
    return (
      <div className="space-y-3">
        <RadioInput
          options={lastMessage.options}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          handleSubmit={handleSendMessage}
        />
        
        {/* Show back button for transaction question (id 3) and property question (id 4) */}
        {(lastMessage.id === 3 || lastMessage.id === 4) && handleBackButton && (
          <div className="flex justify-between gap-2 mt-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleBackButton}
              className="flex-1 text-xs"
            >
              이전
            </Button>
            <Button
              className="flex-1 bg-real-blue hover:bg-real-blue/90 text-xs"
              onClick={handleSendMessage}
              disabled={selectedOption.trim() === ''}
            >
              다음
            </Button>
          </div>
        )}
      </div>
    );
  }

  if (lastMessage.inputType === 'input') {
    // Determine placeholder text based on the message ID
    let placeholder = "금액을 입력하세요 (예: 5000)";
    
    // We no longer show skip button for the deposit question (id 6)
    const showSkip = false;
    
    if (lastMessage.id === 5) { // Price question ID
      if (transactionType === "월세") {
        placeholder = "월세를 입력하세요 (예: 50)";
      } else if (transactionType === "전세") {
        placeholder = "전세금을 입력하세요 (예: 15000)";
      } else {
        placeholder = "매매가를 입력하세요 (예: 50000)";
      }
    } else if (lastMessage.id === 6) { // Deposit question ID
      placeholder = "보증금을 입력하세요 (예: 1000)";
    }
    
    return (
      <TextInput
        input={input}
        setInput={setInput}
        handleKeyDown={handleKeyDown}
        handleSubmit={handleSendMessage}
        placeholder={placeholder}
        showSkip={showSkip}
        questionId={lastMessage.id} // Pass the question ID to the TextInput
        handleBackButton={handleBackButton} // Pass the back button handler to TextInput
      />
    );
  }

  // Default case
  return null;
};

export default InputControl;
