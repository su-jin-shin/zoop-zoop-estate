
import { User, Bot } from "lucide-react";
import { Message } from "./types/chatTypes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

type ChatMessageProps = {
  message: Message;
  onButtonClick?: () => void;
};

const ChatMessage = ({ message, onButtonClick }: ChatMessageProps) => {
  const navigate = useNavigate();
  const messageRef = useRef<HTMLDivElement>(null);

  // Add click event listener for property items
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
    
    return () => {
      propertyItems.forEach(item => {
        item.removeEventListener('click', handlePropertyClick);
      });
    };
  }, [message.text, navigate]);

  return (
    <div
      className={cn(
        "flex items-start gap-2.5 max-w-[80%]",
        message.isUser ? "ml-auto flex-row-reverse" : "mr-auto"
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
          dangerouslySetInnerHTML={{ __html: message.text }}
        ></div>
        
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
