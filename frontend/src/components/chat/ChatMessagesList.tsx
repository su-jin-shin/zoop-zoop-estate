
import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import ChatMessage from "./ChatMessage";
import { Message } from "./types/chatTypes";
import { initialMessage } from "./utils/messageUtils";

type ChatMessagesListProps = {
  messages: Message[];
  handleStartFilter: () => void;
  onShowMoreProperties?: () => void;
  onShowMapView?: () => void;
  onDidRender?: () => void;
  scrollPositionToRestore?: number;
  preventAutoScroll?: boolean;
};

export interface ChatMessagesListRef {
  scrollToPosition: (position: number) => void;
  getCurrentScrollPosition: () => number;
  saveScrollPositionBeforeMapView: () => void;
  restoreScrollPositionAfterMapView: () => void;
}

const ChatMessagesList = forwardRef<ChatMessagesListRef, ChatMessagesListProps>(
  ({ messages, handleStartFilter, onShowMoreProperties, onShowMapView, onDidRender, scrollPositionToRestore, preventAutoScroll }, ref) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const savedScrollPosition = useRef<number>(0);
    const shouldScrollToBottom = useRef<boolean>(true);

    useImperativeHandle(ref, () => ({
      scrollToPosition: (position: number) => {
        if (containerRef.current) {
          containerRef.current.scrollTop = position;
          console.log('[ChatMessagesList] scrollToPosition called:', position);
        }
      },
      getCurrentScrollPosition: () => {
        return containerRef.current?.scrollTop || 0;
      },
      saveScrollPositionBeforeMapView: () => {
        if (containerRef.current) {
          savedScrollPosition.current = containerRef.current.scrollTop;
          shouldScrollToBottom.current = false;
          console.log('[ChatMessagesList] 스크롤 위치 저장:', savedScrollPosition.current);
        }
      },
      restoreScrollPositionAfterMapView: () => {
        if (containerRef.current) {
          const restore = () => {
            if (
              containerRef.current &&
              containerRef.current.scrollHeight > savedScrollPosition.current
            ) {
              containerRef.current.scrollTop = savedScrollPosition.current;
              console.log('[ChatMessagesList] 스크롤 위치 복원:', savedScrollPosition.current, 
                '실제 적용값:', containerRef.current.scrollTop, 
                '/ scrollHeight:', containerRef.current.scrollHeight
              );
            } else {
              setTimeout(() => {
                if (containerRef.current) {
                  containerRef.current.scrollTop = savedScrollPosition.current;
                  console.log('[ChatMessagesList] (재시도) 스크롤 위치 복원:', savedScrollPosition.current, 
                    '실제 적용값:', containerRef.current.scrollTop, 
                    '/ scrollHeight:', containerRef.current.scrollHeight
                  );
                }
              }, 70);
            }
          };
          requestAnimationFrame(restore);
        }
      }
    }));

    // mount/props로 restoration을 한다면(복귀 직후) 실행
    useEffect(() => {
      if (typeof scrollPositionToRestore === "number" && scrollPositionToRestore > 0 && containerRef.current) {
        containerRef.current.scrollTop = scrollPositionToRestore;
        shouldScrollToBottom.current = false;
        console.log("[ChatMessagesList] props 기반 복원: ", scrollPositionToRestore, containerRef.current.scrollTop);
      }
    }, [scrollPositionToRestore]);

    // 메시지가 변경될 때마다 맨 아래로 스크롤 (preventAutoScroll이 없을 때만)
    useEffect(() => {
      const scrollToBottom = () => {
        if (messagesEndRef.current && shouldScrollToBottom.current && !preventAutoScroll) {
          messagesEndRef.current.scrollIntoView({ 
            behavior: "smooth", 
            block: "end" 
          });
          console.log('[ChatMessagesList] 자동 스크롤 to bottom');
        }
      };

      if (messages.length > 0 && !preventAutoScroll) {
        shouldScrollToBottom.current = true;
        const timer = setTimeout(scrollToBottom, 100);
        
        if (onDidRender) {
          setTimeout(() => {
            console.log('[ChatMessagesList] onDidRender 콜백 호출 직전');
            onDidRender();
          }, 55);
        }
        
        return () => clearTimeout(timer);
      } else if (onDidRender) {
        setTimeout(() => {
          console.log('[ChatMessagesList] onDidRender 콜백 호출 직전 (preventAutoScroll)');
          onDidRender();
        }, 55);
      }
    }, [messages, onDidRender, preventAutoScroll]);

    const handleShowMorePropertiesWrapper = () => {
      console.log('[ChatMessagesList] handleShowMorePropertiesWrapper called');
      if (containerRef.current) {
        savedScrollPosition.current = containerRef.current.scrollTop;
        shouldScrollToBottom.current = false;
        console.log('[ChatMessagesList] 더 많은 매물 보기 클릭 시 스크롤 위치 저장:', savedScrollPosition.current);
      }
      onShowMoreProperties?.();
    };

    const handleShowMapViewWrapper = () => {
      console.log('[ChatMessagesList] handleShowMapViewWrapper called');
      if (containerRef.current) {
        savedScrollPosition.current = containerRef.current.scrollTop;
        shouldScrollToBottom.current = false;
        console.log('[ChatMessagesList] 지도로 보기 클릭 시 스크롤 위치 저장:', savedScrollPosition.current);
      }
      onShowMapView?.();
    };

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
            onShowMoreProperties={handleShowMorePropertiesWrapper}
            onShowMapView={handleShowMapViewWrapper}
          />
        ))}
        <div ref={messagesEndRef} className="h-1" />
      </div>
    );
  }
);

ChatMessagesList.displayName = "ChatMessagesList";

export default ChatMessagesList;
