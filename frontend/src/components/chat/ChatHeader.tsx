
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
import { useMediaQuery } from "@/hooks/use-media-query";
import ChatTitleEditForm from "./ChatTitleEditForm";

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
  newChatLabelMap: Record<number, string>;
};

const groupChatsByDate = (chats: ChatHistory[]) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const groups: { [key: string]: ChatHistory[] } = {};
  
  chats.forEach(chat => {
    const chatDate = new Date(chat.timestamp);
    const chatDateString = chatDate.toDateString();
    const todayString = today.toDateString();
    const yesterdayString = yesterday.toDateString();
    
    let groupKey: string;
    if (chatDateString === todayString) {
      groupKey = '오늘';
    } else if (chatDateString === yesterdayString) {
      groupKey = '어제';
    } else {
      groupKey = chatDate.toLocaleDateString('ko-KR', {
        month: 'long',
        day: 'numeric'
      });
    }
    
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(chat);
  });
  
  // Sort chats within each group by timestamp (latest first)
  Object.keys(groups).forEach(key => {
    groups[key].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  });
  
  return groups;
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
  onBackToChat,
  newChatLabelMap,
}: ChatHeaderProps) => {
  const [editingChatId, setEditingChatId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  const getDropdownDisplayTitle = (chat: ChatHistory) => {
    // title이 "줍줍"이면 labelMap 사용 (유저 메시지 유무 상관 없음)
    if (chat.title === "줍줍") {
      return newChatLabelMap[chat.id] || "새 대화";
    }

    return chat.title;
  };
  
  const currentChat = chatHistories.find(chat => chat.id === currentChatId);
   
  // Check if any chat in the history has user messages
  const hasAnyUserMessages = chatHistories.some(chat => 
    chat.messages.some(message => message.isUser)
  );

  // Get chats that have user messages for the dropdown
  const chatsWithUserMessages = chatHistories.filter(chat => 
    chat.messages.some(message => message.isUser)
  );

  // Group chats by date
  const groupedChats = groupChatsByDate(chatsWithUserMessages);
  
  // Define the order of groups (today, yesterday, then chronological)
  const groupOrder = ['오늘', '어제'];
  const otherGroups = Object.keys(groupedChats)
    .filter(key => !groupOrder.includes(key))
    .sort((a, b) => {
      // Sort other groups by date (most recent first)
      const dateA = new Date(a + ', ' + new Date().getFullYear());
      const dateB = new Date(b + ', ' + new Date().getFullYear());
      return dateB.getTime() - dateA.getTime();
    });
  
  const finalGroupOrder = [...groupOrder.filter(key => groupedChats[key]), ...otherGroups];

  const handleEditStart = (chatId: number, currentTitle: string) => {
    setEditingChatId(chatId);
    setEditTitle(currentTitle);
  };

  const handleEditSave = (newTitle: string) => {
    if (editingChatId && newTitle.trim()) {
      editChatTitle(editingChatId, newTitle.trim());
    }
    setEditingChatId(null);
    setEditTitle("");
  };

  const handleEditCancel = () => {
    setEditingChatId(null);
    setEditTitle("");
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

  // Check if the title is in property recommendation format (contains " / ")
  const isPropertyRecommendationTitle = displayTitle.includes(" / ") && displayTitle !== "줍줍";

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
                <div className="p-2">
                  {finalGroupOrder.map((groupKey) => (
                    <div key={groupKey} className="mb-4 last:mb-0">
                      <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100 mb-2">
                        {groupKey}
                      </div>
                      <div className="space-y-2">
                        {groupedChats[groupKey].map((chat) => (
                          <div key={chat.id} className="group">
                            {editingChatId === chat.id ? (
                              <ChatTitleEditForm
                                currentTitle={getDropdownDisplayTitle(chat)}
                                onSave={(newTitle) => handleEditSave(newTitle)}
                                onCancel={handleEditCancel}
                              />
                            ) : (
                              <div
                                className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors ${
                                  chat.id === currentChatId 
                                    ? 'bg-blue-50 border border-blue-200' 
                                    : 'hover:bg-gray-50 border border-transparent'
                                }`}
                                onClick={() => switchToChat(chat.id)}
                              >
                                <div className="flex-1 min-w-0">
                                  <span className="text-sm font-medium truncate block text-gray-900 select-none">
                                    {getDropdownDisplayTitle(chat)}
                                  </span>
                                  <span className="text-xs text-gray-500 mt-1 select-none">
                                    {new Date(chat.timestamp).toLocaleTimeString('ko-KR', {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditStart(chat.id, chat.title);
                                    }}
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteChat(chat.id);
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">
                  대화를 시작해보세요!
                </div>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* 개선된 제목 표시 - 긴 제목 처리 */}
        {/* Updated title display with conditional mobile font size */}
        <h2 className={`font-semibold truncate min-w-0 flex-1 mr-2 ${
          isPropertyRecommendationTitle && isMobile 
            ? 'text-sm' 
            : 'text-base sm:text-lg'
        }`}>
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
