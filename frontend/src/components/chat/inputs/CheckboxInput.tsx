
import { Checkbox } from "@/components/ui/checkbox";

type CheckboxInputProps = {
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: (values: string[]) => void;
  handleSubmit: () => void;
};

const CheckboxInput = ({ options, selectedOptions, setSelectedOptions, handleSubmit }: CheckboxInputProps) => {
  const handleOptionChange = (option: string, checked: boolean) => {
    if (checked) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="space-y-2">
        {options.map((option) => (
          <label 
            key={option} 
            htmlFor={option}
            className="flex items-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <Checkbox 
              id={option}
              checked={selectedOptions.includes(option)}
              onCheckedChange={(checked) => handleOptionChange(option, checked as boolean)}
            />
            <span className="flex-1 text-sm select-none">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxInput;
