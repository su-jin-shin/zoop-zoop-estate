
import { useState } from "react";
import { MessageSquare, Edit2, Trash2, ArrowLeft, PenSquare, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChatHistory } from "./types/chatTypes";
import { useNavigate } from "react-router-dom";

type ChatHeaderProps = {
  chatHistories: ChatHistory[];
  currentChatId: number;
  switchToChat: (chatId: number) => void;
  startNewChat: () => void;
  editChatTitle: (chatId: number, newTitle: string) => void;
  deleteChat: (chatId: number) => void;
  showMapView?: boolean;
  setShowMapView?: (show: boolean) => void;
  showPropertyList?: boolean;
  onBackToChat?: () => void;
};

const ChatHeader = ({ 
  chatHistories, 
  currentChatId, 
  switchToChat, 
  startNewChat, 
  editChatTitle, 
  deleteChat,
  showMapView,
  setShowMapView,
  showPropertyList,
  onBackToChat
}: ChatHeaderProps) => {
  const [editingChatId, setEditingChatId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const navigate = useNavigate();

  const currentChat = chatHistories.find(chat => chat.id === currentChatId);
  
  // Check if any chat in the history has user messages
  const hasAnyUserMessages = chatHistories.some(chat => 
    chat.messages.some(message => message.isUser)
  );

  // Get chats that have user messages for the dropdown
  const chatsWithUserMessages = chatHistories.filter(chat => 
    chat.messages.some(message => message.isUser)
  );

  // Sort chat histories by timestamp (latest first)
  const sortedChatHistories = [...chatsWithUserMessages].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const handleEditStart = (chatId: number, currentTitle: string) => {
    setEditingChatId(chatId);
    setEditTitle(currentTitle);
  };

  const handleEditSave = () => {
    if (editingChatId && editTitle.trim()) {
      editChatTitle(editingChatId, editTitle.trim());
    }
    setEditingChatId(null);
    setEditTitle("");
  };

  const handleEditCancel = () => {
    setEditingChatId(null);
    setEditTitle("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  const handleBackButton = () => {
    if (showPropertyList && onBackToChat) {
      onBackToChat();
    } else {
      navigate(-1);
    }
  };

  const handleDeleteChat = (chatId: number) => {
    deleteChat(chatId);
  };

  if (showMapView) {
    return (
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowMapView?.(false)}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="font-semibold text-lg">매물 지도</h2>
        </div>
      </div>
    );
  }

  // Display title as "줍줍" when current chat has no user messages
  const currentChatHasUserMessages = currentChat && currentChat.messages.some(message => message.isUser);
  const displayTitle = currentChatHasUserMessages ? (currentChat?.title || "줍줍") : "줍줍";

  return (
    <div className="flex items-center justify-between p-3 sm:p-4 border-b bg-white">
      <div className="flex items-center min-w-0 flex-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2 flex-shrink-0">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64 bg-white border shadow-lg z-50">
            <div className="max-h-64 overflow-y-auto">
              {hasAnyUserMessages ? (
                sortedChatHistories.map((chat) => (
                  <div key={chat.id} className="group">
                    <DropdownMenuItem
                      className={`flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 ${
                        chat.id === currentChatId ? 'bg-gray-100' : ''
                      }`}
                      onClick={() => editingChatId !== chat.id && switchToChat(chat.id)}
                      onSelect={(e) => {
                        if (editingChatId === chat.id) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <div className="flex-1 min-w-0">
                        {editingChatId === chat.id ? (
                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            <Input
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              onKeyDown={handleKeyDown}
                              className="h-6 text-xs flex-1"
                              autoFocus
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-green-600 hover:text-green-800"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditSave();
                              }}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-gray-500 hover:text-gray-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditCancel();
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <span className="text-xs truncate block">
                            {chat.title}
                          </span>
                        )}
                      </div>
                      {editingChatId !== chat.id && (
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditStart(chat.id, chat.title);
                            }}
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-red-500 hover:text-red-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteChat(chat.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </DropdownMenuItem>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">
                  대화를 시작해보세요!
                </div>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* 개선된 제목 표시 - 긴 제목 처리 */}
        <h2 className="font-semibold text-base sm:text-lg truncate min-w-0 flex-1 mr-2">
          {displayTitle}
        </h2>
      </div>
      
      {/* 오른쪽 버튼들 - 항상 보이도록 */}
      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
        <Button 
          onClick={startNewChat}
          variant="ghost"
          size="icon"
          disabled={!hasAnyUserMessages}
          className="h-8 w-8 sm:h-9 sm:w-9"
        >
          <PenSquare className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
        <Button 
          onClick={handleBackButton}
          variant="ghost"
          size="icon"
          className="h-8 w-8 sm:h-9 sm:w-9"
        >
          <X className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
