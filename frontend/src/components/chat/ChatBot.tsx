
import { Card } from "@/components/ui/card";
import ChatHeader from "./ChatHeader";
import InputControl from "./InputControl";
import ChatMessagesList, { ChatMessagesListRef } from "./ChatMessagesList";
import MapViewInChat from "./MapViewInChat";
import { useChatState } from "./hooks/useChatState";
import { useRef } from "react";

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
    showMapView,
    setShowMapView,
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

  const messagesContainerRef = useRef<ChatMessagesListRef>(null);

  const handleShowMapView = () => {
    // "더 많은 매물 보기" 버튼 클릭은 이미 ChatMessagesList에서 처리됨
    setShowMapView(true);
  };

  const handleBackToChat = () => {
    setShowMapView(false);
    // 채팅으로 돌아온 후 저장된 스크롤 위치로 복원
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.restoreScrollPositionAfterMapView();
      }
    }, 100);
  };

  return (
    <Card className="flex flex-col h-full w-full max-w-full mx-auto shadow-lg border rounded-lg overflow-hidden">
      <ChatHeader 
        chatHistories={chatHistories}
        currentChatId={currentChatId}
        switchToChat={switchToChat}
        startNewChat={startNewChat}
        editChatTitle={editChatTitle}
        deleteChat={deleteChat}
        showMapView={showMapView}
        setShowMapView={setShowMapView}
      />

      {showMapView ? (
        <MapViewInChat 
          onBackToChat={handleBackToChat}
          preferences={preferences}
          messagesContainerRef={messagesContainerRef}
        />
      ) : (
        <>
          <ChatMessagesList
            ref={messagesContainerRef}
            messages={messages}
            handleStartFilter={handleStartFilter}
            onShowMoreProperties={handleShowMapView}
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
        </>
      )}
    </Card>
  );
};

export default ChatBot;
