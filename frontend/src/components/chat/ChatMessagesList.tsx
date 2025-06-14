
import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import ChatMessage from "./ChatMessage";
import { Message } from "./types/chatTypes";
import { initialMessage } from "./utils/messageUtils";

type ChatMessagesListProps = {
  messages: Message[];
  handleStartFilter: () => void;
  onShowMoreProperties?: () => void;
};

export interface ChatMessagesListRef {
  scrollToPosition: (position: number) => void;
  getCurrentScrollPosition: () => number;
  saveScrollPositionBeforeMapView: () => void;
  restoreScrollPositionAfterMapView: () => void;
}

const ChatMessagesList = forwardRef<ChatMessagesListRef, ChatMessagesListProps>(
  ({ messages, handleStartFilter, onShowMoreProperties }, ref) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const savedScrollPosition = useRef<number>(0);

    useImperativeHandle(ref, () => ({
      scrollToPosition: (position: number) => {
        if (containerRef.current) {
          containerRef.current.scrollTop = position;
        }
      },
      getCurrentScrollPosition: () => {
        return containerRef.current?.scrollTop || 0;
      },
      saveScrollPositionBeforeMapView: () => {
        if (containerRef.current) {
          savedScrollPosition.current = containerRef.current.scrollTop;
          console.log('스크롤 위치 저장:', savedScrollPosition.current);
        }
      },
      restoreScrollPositionAfterMapView: () => {
        if (containerRef.current) {
          console.log('스크롤 위치 복원:', savedScrollPosition.current);
          containerRef.current.scrollTop = savedScrollPosition.current;
        }
      }
    }));

    // 부드러운 스크롤을 위한 개선된 로직
    useEffect(() => {
      const scrollToBottom = () => {
        if (messagesEndRef.current && containerRef.current) {
          const container = containerRef.current;
          const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
          
          // 사용자가 맨 아래에 있을 때만 자동 스크롤
          if (isAtBottom) {
            messagesEndRef.current.scrollIntoView({ 
              behavior: "smooth", 
              block: "end" 
            });
          }
        }
      };

      // 약간의 지연을 두고 스크롤하여 렌더링 완료 후 실행
      const timer = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timer);
    }, [messages]);

    // Handle "더 많은 매물 보기" button clicks
    useEffect(() => {
      const handleMorePropertiesClick = (event: Event) => {
        const target = event.target as HTMLElement;
        if (target.textContent?.includes('더 많은 매물 보기')) {
          event.preventDefault();
          // "더 많은 매물 보기" 버튼을 클릭한 시점의 스크롤 위치를 저장
          if (containerRef.current) {
            savedScrollPosition.current = containerRef.current.scrollTop;
            console.log('더 많은 매물 보기 클릭 시 스크롤 위치 저장:', savedScrollPosition.current);
          }
          onShowMoreProperties?.();
        }
      };

      const container = containerRef.current;
      if (container) {
        container.addEventListener('click', handleMorePropertiesClick);
        return () => {
          container.removeEventListener('click', handleMorePropertiesClick);
        };
      }
    }, [onShowMoreProperties]);

    return (
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        {messages.map((message) => (
          <ChatMessage 
            key={`${message.id}-${message.timestamp.getTime()}`}
            message={message} 
            onButtonClick={message.id === initialMessage.id ? handleStartFilter : undefined} 
          />
        ))}
        <div ref={messagesEndRef} className="h-1" />
      </div>
    );
  }
);

ChatMessagesList.displayName = "ChatMessagesList";

export default ChatMessagesList;
