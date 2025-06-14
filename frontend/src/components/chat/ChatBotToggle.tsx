
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * ChatBotToggle component that navigates to the chat page when clicked
 * or goes back when on the chat page
 */
const ChatBotToggle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isOnChatPage = location.pathname === '/chat';

  const handleButtonClick = () => {
    if (isOnChatPage) {
      navigate(-1); // Go back to previous page
    } else {
      navigate('/chat'); // Go to chat page
    }
  };

  return (
    <div className="fixed bottom-6 right-4 z-50">
      <Button
        className="rounded-full w-14 h-14 shadow-lg bg-real-blue hover:bg-real-blue/90"
        onClick={handleButtonClick}
      >
        {isOnChatPage ? (
          <ArrowLeft className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default ChatBotToggle;
