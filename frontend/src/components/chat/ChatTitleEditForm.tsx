import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatTitleEditFormProps = {
  currentTitle: string;
  onSave: (newTitle: string) => void;
  onCancel: () => void;
};

const ChatTitleEditForm = ({ currentTitle, onSave, onCancel }: ChatTitleEditFormProps) => {
  const [title, setTitle] = useState(currentTitle);

  const handleSave = () => {
    if (title.trim()) {
      onSave(title.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md border">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        className="h-8 text-sm flex-1 bg-white"
        placeholder="채팅 제목을 입력하세요"
        autoFocus
        maxLength={50}
      />
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-green-600 hover:text-green-800 hover:bg-green-50"
        onClick={handleSave}
        disabled={!title.trim()}
      >
        <Check className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        onClick={onCancel}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChatTitleEditForm;