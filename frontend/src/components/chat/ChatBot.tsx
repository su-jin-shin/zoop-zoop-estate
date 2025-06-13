
import { Card } from "@/components/ui/card";
import ChatHeader from "./ChatHeader";
import InputControl from "./InputControl";
import ChatMessagesList from "./ChatMessagesList";
import { useChatState } from "./hooks/useChatState";

const ChatBot = () => {
  const {
    chatHistories,
    currentChatId,
    messages,
    input,
    setInput,
    preferences,
    selectedOption,
    setSelectedOption,
    handleSendMessage,
    handleKeyDown,
    handleLocationSelect,
    handleStartFilter,
    startNewChat,
    switchToChat,
    handleBackButton,
    editChatTitle,
    deleteChat,
  } = useChatState();

  return (
    <Card className="flex flex-col h-full w-full max-w-full mx-auto shadow-lg border rounded-lg overflow-hidden">
      <ChatHeader 
        chatHistories={chatHistories}
        currentChatId={currentChatId}
        switchToChat={switchToChat}
        startNewChat={startNewChat}
        editChatTitle={editChatTitle}
        deleteChat={deleteChat}
      />

      <ChatMessagesList
        messages={messages}
        handleStartFilter={handleStartFilter}
      />

      <div className="border-t p-3 bg-white">
        <InputControl 
          messages={messages}
          input={input}
          setInput={setInput}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          handleKeyDown={handleKeyDown}
          handleSendMessage={handleSendMessage}
          handleLocationSelect={handleLocationSelect}
          transactionType={preferences.transactionType}
          handleBackButton={handleBackButton}
        />
      </div>
    </Card>
  );
};

export default ChatBot;
