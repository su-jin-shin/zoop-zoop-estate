import { Button } from "@/components/ui/button";
import { Menu, PenSquare, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChatHistory } from "./types/chatTypes";
import { useState } from "react";

type ChatHeaderProps = {
  chatHistories: ChatHistory[];
  currentChatId: number;
  switchToChat: (chatId: number) => void;
  startNewChat: () => void;
  editChatTitle?: (chatId: number, newTitle: string) => void;
  deleteChat?: (chatId: number) => void;
  showMapView?: boolean;
  setShowMapView?: (value: boolean) => void;
};

const ChatHeader = ({ 
  chatHistories, 
  currentChatId, 
  switchToChat, 
  startNewChat,
  editChatTitle,
  deleteChat
}: ChatHeaderProps) => {
  const [editingChatId, setEditingChatId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Find the current chat from chat histories
  const currentChat = chatHistories.find(chat => chat.id === currentChatId);
  
  // Check if current chat only has the initial message
  const isInitialMessageOnly = currentChat && currentChat.messages.length === 1 && currentChat.messages[0].id === 1;

  // Filter out chats that only have the initial message for the history dropdown
  // 수정: 첫 메시지만 있는 모든 채팅을 완전히 제외
  const filteredChatHistories = chatHistories.filter(chat => {
    // 메시지가 1개뿐이고 그 메시지의 ID가 1인 경우 (초기 메시지) 제외
    if (chat.messages.length === 1 && chat.messages[0].id === 1) {
      return false;
    }
    // 사용자가 실제로 메시지를 보낸 경우만 포함 (isUser: true인 메시지가 있는 경우)
    return chat.messages.some(message => message.isUser === true);
  });

  // Generate display title for chat history list (not for main header)
  const generateChatHistoryTitle = (chat: ChatHistory) => {
    if (chat.title !== "줍줍") return chat.title;
    
    // For chats with default title "줍줍", use the chat ID to determine display name
    if (chat.id === 1) {
      return "새 대화";
    }
    
    // For subsequent chats, show "새 대화 (n)" where n is the chat ID
    return `새 대화 (${chat.id})`;
  };

  // Generate header title (for main header display)
  const generateHeaderTitle = () => {
    if (!currentChat) return "줍줍";
    
    // If the chat title is still the default "줍줍", show "줍줍"
    if (currentChat.title === "줍줍") {
      return "줍줍";
    }
    
    // Otherwise, show the actual title (which will be the filter conditions)
    return currentChat.title;
  };

  const handleStartEdit = (chatId: number, currentTitle: string) => {
    console.log('Starting edit for chat:', chatId, 'with title:', currentTitle);
    setEditingChatId(chatId);
    // Use the display title for editing, not the raw title
    const displayTitle = chatHistories.find(c => c.id === chatId)?.title === "줍줍" 
      ? generateChatHistoryTitle(chatHistories.find(c => c.id === chatId)!)
      : currentTitle;
    setEditingTitle(displayTitle);
  };

  const handleSaveEdit = (chatId: number) => {
    console.log('Saving edit for chat:', chatId, 'with new title:', editingTitle.trim());
    if (editingTitle.trim() !== "" && editChatTitle) {
      editChatTitle(chatId, editingTitle.trim());
      console.log('Edit saved successfully');
    }
    setEditingChatId(null);
    setEditingTitle("");
  };

  const handleCancelEdit = () => {
    console.log('Canceling edit');
    setEditingChatId(null);
    setEditingTitle("");
  };

  const handleKeyPress = (e: React.KeyboardEvent, chatId: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveEdit(chatId);
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  const handleDeleteClick = (chatId: number) => {
    setChatToDelete(chatId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (chatToDelete && deleteChat) {
      deleteChat(chatToDelete);
    }
    setDeleteDialogOpen(false);
    setChatToDelete(null);
    setDropdownOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setChatToDelete(null);
  };

  const handleNewChatClick = () => {
    // Prevent creating new chat if current chat only has initial message
    if (isInitialMessageOnly) {
      return;
    }
    startNewChat();
  };

  const handleChatSelect = (chatId: number) => {
    switchToChat(chatId);
    setDropdownOpen(false);
  };

  // Sort filtered chat histories by ID in descending order (newest first)
  const sortedChatHistories = [...filteredChatHistories].sort((a, b) => b.id - a.id);
  
  return (
    <div className="bg-real-blue text-white p-4 flex items-center relative">
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen} modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white hover:bg-real-blue/90">
            <Menu className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="start" 
          className="w-80 bg-white z-50"
          sideOffset={8}
          style={{
            maxHeight: '400px',
            overflowY: 'auto'
          }}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <div className="flex items-center justify-between px-3 py-2 border-b">
            <span className="font-medium">대화 기록</span>
          </div>
          {sortedChatHistories.length === 0 ? (
            <div className="px-3 py-4 text-center text-gray-500 text-sm">
              아직 대화 기록이 없습니다
            </div>
          ) : (
            sortedChatHistories.map((chat) => (
              <DropdownMenuItem 
                key={chat.id} 
                className={cn(
                  "flex items-center py-2 px-3", 
                  currentChatId === chat.id ? "bg-slate-100" : ""
                )}
                onSelect={(e) => e.preventDefault()}
              >
                <div className="flex-1 flex items-center">
                  {editingChatId === chat.id ? (
                    <div className="flex-1 flex items-center gap-2">
                      <Input
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onKeyDown={(e) => handleKeyPress(e, chat.id)}
                        className="flex-1 h-8 text-sm border-blue-500"
                      />
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 hover:bg-gray-200 text-green-600 hover:text-green-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveEdit(chat.id);
                          }}
                        >
                          ✓
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 hover:bg-gray-200 text-red-500 hover:text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancelEdit();
                          }}
                        >
                          ✕
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => handleChatSelect(chat.id)}
                      >
                        <span className="truncate block">
                          {generateChatHistoryTitle(chat)}
                        </span>
                        <span className="text-xs text-gray-400">
                          {chat.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 hover:bg-gray-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartEdit(chat.id, generateChatHistoryTitle(chat));
                          }}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 hover:bg-gray-200 text-red-500 hover:text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(chat.id);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <h2 className="font-bold flex-1 text-center">
        {generateHeaderTitle()}
      </h2>

      <div className="flex items-center gap-3 mr-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleNewChatClick}
          disabled={isInitialMessageOnly}
          className={cn(
            "text-white hover:bg-real-blue/70",
            isInitialMessageOnly && "opacity-50 cursor-not-allowed hover:bg-real-blue"
          )}
        >
          <PenSquare className="h-5 w-5" />
        </Button>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>대화 삭제</DialogTitle>
            <DialogDescription>
              정말로 이 대화를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleDeleteCancel}>
              취소
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteConfirm}
            >
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatHeader;
