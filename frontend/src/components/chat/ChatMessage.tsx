
import { User, Bot } from "lucide-react";
import { Message } from "./types/chatTypes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useMemo } from "react";

type ChatMessageProps = {
  message: Message;
  onButtonClick?: () => void;
};

const ChatMessage = ({ message, onButtonClick }: ChatMessageProps) => {
  const navigate = useNavigate();
  const messageRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Memoize the message content to prevent unnecessary re-parsing
  const messageContent = useMemo(() => message.text, [message.text]);
  
  // Memoize whether this message contains property items
  const hasPropertyItems = useMemo(() => 
    messageContent.includes('property-item'), 
    [messageContent]
  );

  // Handle visibility animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  // Add click event listener for property items
  useEffect(() => {
    const messageElement = messageRef.current;
    if (!messageElement || !hasPropertyItems) return;

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
    
    return () => {
      propertyItems.forEach(item => {
        item.removeEventListener('click', handlePropertyClick);
      });
    };
  }, [hasPropertyItems, navigate, messageContent]);

  return (
    <div
      className={cn(
        "flex items-start gap-2.5 max-w-[80%] transition-all duration-300",
        message.isUser ? "ml-auto flex-row-reverse" : "mr-auto",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
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
          "p-3 rounded-lg",
          message.isUser
            ? "bg-real-blue text-white rounded-tr-none"
            : "bg-gray-100 rounded-tl-none"
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
