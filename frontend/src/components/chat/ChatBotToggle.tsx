
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import ChatBot from "./ChatBot";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * ChatBotToggle component that shows either a Dialog (desktop) or Drawer (mobile)
 * with the ChatBot component based on screen size.
 */
const ChatBotToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const renderTriggerButton = () => (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        className="rounded-full w-14 h-14 shadow-lg bg-real-blue hover:bg-real-blue/90"
        onClick={() => setIsOpen(true)}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </div>
  );

  // Render different containers based on screen size
  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        {renderTriggerButton()}
        <DialogContent className="sm:max-w-2xl p-0 border-none h-[95vh] max-h-[95vh]">
          <ChatBot />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      {renderTriggerButton()}
      <DrawerContent className="p-0 h-[95vh] max-h-[95vh]">
        <ChatBot />
      </DrawerContent>
    </Drawer>
  );
};

export default ChatBotToggle;
