
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

type DefaultInputProps = {
  input: string;
  setInput: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleSubmit: () => void;
};

const DefaultInput = ({ input, setInput, handleKeyDown, handleSubmit }: DefaultInputProps) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요..."
        className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-real-blue"
      />
      <Button
        onClick={handleSubmit}
        className="bg-real-blue hover:bg-real-blue/90"
        size="sm"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default DefaultInput;
