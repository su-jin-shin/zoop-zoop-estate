
import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { Message } from "./types/chatTypes";
import { initialMessage } from "./utils/messageUtils";

type ChatMessagesListProps = {
  messages: Message[];
  handleStartFilter: () => void;
};

const ChatMessagesList = ({ messages, handleStartFilter }: ChatMessagesListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <ChatMessage 
          key={message.id} 
          message={message} 
          onButtonClick={message.id === initialMessage.id ? handleStartFilter : undefined} 
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessagesList;
