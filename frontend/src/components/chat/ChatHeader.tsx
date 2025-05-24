import { Button } from "@/components/ui/button";
import { Menu, PenSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChatHistory } from "./types/chatTypes";

type ChatHeaderProps = {
  chatHistories: ChatHistory[];
  currentChatId: number;
  switchToChat: (chatId: number) => void;
  startNewChat: () => void;
};

const ChatHeader = ({ chatHistories, currentChatId, switchToChat, startNewChat }: ChatHeaderProps) => {
  // Find the current chat from chat histories
  const currentChat = chatHistories.find(chat => chat.id === currentChatId);
  
  // Count default titled chats to generate numbered versions
  const generateChatTitle = (chat: ChatHistory) => {
    if (chat.title !== "줍줍") return chat.title;
    
    // Count how many "줍줍" titled chats exist before this one's id
    const defaultTitledChats = chatHistories
      .filter(c => c.title === "줍줍" && c.id <= chat.id)
      .length;
    
    // If this is the only one or the first one, just show "새 대화"
    if (defaultTitledChats === 1) {
      return "새 대화";
    }
    
    // Otherwise, show "새 대화 (n)"
    return `새 대화 (${defaultTitledChats})`;
  };
  
  return (
    <div className="bg-real-blue text-white p-4 flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white hover:bg-real-blue/90">
            <Menu className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          <div className="flex items-center justify-between px-3 py-2 border-b">
            <span className="font-medium">대화 기록</span>
          </div>
          {chatHistories.map((chat) => (
            <DropdownMenuItem 
              key={chat.id} 
              onClick={() => switchToChat(chat.id)}
              className={cn(
                "flex items-center py-2", 
                currentChatId === chat.id ? "bg-slate-100" : ""
              )}
            >
              <span className="flex-1 truncate">
                {generateChatTitle(chat)}
              </span>
              <span className="text-xs text-gray-400">
                {chat.timestamp.toLocaleDateString()}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <h2 className="font-bold flex-1 text-center">
        {currentChat?.title || "줍줍"}
      </h2>

      <div className="flex items-center gap-3 mr-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={startNewChat} 
          className="text-white hover:bg-real-blue/70"
        >
          <PenSquare className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
