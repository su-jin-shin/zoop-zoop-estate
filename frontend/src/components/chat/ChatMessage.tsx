
import { User, Bot } from "lucide-react";
import { Message } from "./types/chatTypes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useMemo } from "react";

type ChatMessageProps = {
  message: Message;
  onButtonClick?: () => void;
  onShowMapView?: () => void;
  onShowMoreProperties?: () => void;
};

const ChatMessage = ({ message, onButtonClick, onShowMapView, onShowMoreProperties }: ChatMessageProps) => {
  const navigate = useNavigate();
  const messageRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Memoize the message content to prevent unnecessary re-parsing
  const messageContent = useMemo(() => message.text, [message.text]);
  
  // Memoize whether this message contains property items
  const hasPropertyItems = message.hasPropertyItems === true;

  // Handle visibility animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  // Add click event listener for property items and buttons
  useEffect(() => {
    const messageElement = messageRef.current;
    if (!messageElement) return;

    const propertyItems = messageElement.querySelectorAll('.property-item');
    
    const handlePropertyClick = (e: Event) => {
      const propertyItem = (e.currentTarget as HTMLElement);
      const propertyId = propertyItem.getAttribute('data-property-id');
      if (propertyId) {
        navigate(`/property/${propertyId}`);
      }
    };
    
    propertyItems.forEach(item => {
      item.addEventListener('click', handlePropertyClick);
    });

    // Handle map view button clicks
    const handleClick = (event: Event) => {
      const target = event.target as HTMLElement;
      
      console.log('[ChatMessage] Click detected:', target.textContent);
      
      // 더 많은 매물 보기 클릭 처리
      if (target.textContent?.includes('더 많은 매물 보기') || target.classList.contains('show-more-properties')) {
        event.preventDefault();
        console.log('[ChatMessage] 더 많은 매물 보기 clicked');
        onShowMoreProperties?.();
      }
      
      // 지도로 보기 버튼 클릭 처리
      if (target.closest('.map-view-button') || target.textContent?.includes('지도로 보기')) {
        event.preventDefault();
        console.log('[ChatMessage] 지도로 보기 clicked');
        onShowMapView?.();
      }
    };

    messageElement.addEventListener('click', handleClick);
    
    return () => {
      propertyItems.forEach(item => {
        item.removeEventListener('click', handlePropertyClick);
      });
      messageElement.removeEventListener('click', handleClick);
    };
  }, [hasPropertyItems, navigate, messageContent, onShowMapView, onShowMoreProperties]);

  return (
    <div
      className={cn(
        "flex items-start gap-2.5",
        message.isUser ? "ml-auto flex-row-reverse" : "mr-auto",
        // 매물 리스트가 있는 메시지는 더 넓은 너비 사용
        hasPropertyItems ? "max-w-[95%] min-w-[95%]" : "max-w-[80%]"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
          message.isUser ? "bg-real-blue text-white" : "bg-gray-200"
        )}
      >
        {message.isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div
        ref={messageRef}
        className={cn(
          "transition-opacity transition-transform duration-300",
          hasPropertyItems && "w-full",
          "p-3 rounded-lg",
          message.isUser
            ? "bg-real-blue text-white rounded-tr-none"
            : "bg-gray-100 rounded-tl-none",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}
      >
        <div 
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: messageContent }}
        />
        
        {message.buttonText && (
          <Button 
            onClick={onButtonClick} 
            className="mt-3 bg-real-blue hover:bg-real-blue/90"
          >
            {message.buttonText}
          </Button>
        )}
        
        <p className="text-[10px] mt-1 opacity-70">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
