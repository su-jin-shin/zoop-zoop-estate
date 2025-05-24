
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight } from "lucide-react";

type RadioInputProps = {
  options: string[];
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  handleSubmit: () => void;
};

const RadioInput = ({ options, selectedOption, setSelectedOption, handleSubmit }: RadioInputProps) => {
  // Handle double click on radio option - include entire div area
  const handleDoubleClick = (option: string) => {
    setSelectedOption(option);
    handleSubmit();
  };
  
  return (
    <div className="flex flex-col gap-3">
      <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="gap-2">
        {options.map((option) => (
          <div 
            key={option} 
            className="flex items-center space-x-2 border p-2 rounded-md cursor-pointer"
            onDoubleClick={() => handleDoubleClick(option)}
            onClick={() => setSelectedOption(option)}
          >
            <RadioGroupItem value={option} id={option} />
            <label htmlFor={option} className="flex-1 cursor-pointer">
              {option}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default RadioInput;
