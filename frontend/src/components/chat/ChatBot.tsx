
import { Card } from "@/components/ui/card";
import ChatHeader from "./ChatHeader";
import InputControl from "./InputControl";
import ChatMessagesList, { ChatMessagesListRef } from "./ChatMessagesList";
import MapViewInChat from "./MapViewInChat";
import PropertyListInChat from "./PropertyListInChat";
import { useChatState } from "./hooks/useChatState";
import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";

interface ChatBotProps {
  navbarVisible?: boolean;
}

const ChatBot = forwardRef<any, ChatBotProps>(({ navbarVisible }, ref) => {
  const {
    chatHistories,
    currentChatId,
    messages,
    input,
    setInput,
    preferences,
    selectedOption,
    setSelectedOption,
    selectedOptions,
    setSelectedOptions,
    showMapView,
    setShowMapView,
    showPropertyList,
    handleSendMessage,
    handleKeyDown,
    handleLocationSelect,
    handleStartFilter,
    startNewChat,
    switchToChat,
    handleBackButton,
    editChatTitle,
    deleteChat,
    handleShowPropertyList,
    handleBackToChat,
    handleCancelFilter,
  } = useChatState();

  const messagesContainerRef = useRef<ChatMessagesListRef>(null);
  const restoreOnNextRender = useRef(false);
  const navbarScrollPosition = useRef<number>(0);
  const [allowAutoScroll, setAllowAutoScroll] = useState(true);
  const [savedScrollPosition, setSavedScrollPosition] = useState<number>(0);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
    setAllowAutoScroll(false);  // 포커스 시 자동 스크롤 막기
  };
  
  const handleInputBlur = () => {
    setIsInputFocused(false);
    setAllowAutoScroll(true);  // 포커스 해제되면 다시 허용
  };

  // Debug current states
  console.log('[ChatBot] Current states - showPropertyList:', showPropertyList, 'showMapView:', showMapView);

  useImperativeHandle(ref, () => ({
    saveCurrentScrollPosition: () => {
      if (messagesContainerRef.current) {
        const pos = messagesContainerRef.current.getCurrentScrollPosition();
        navbarScrollPosition.current = pos;
        console.log("[ChatBot] navbar 변경 전 스크롤 위치 저장:", pos);
      }
    }
  }));

  useEffect(() => {
    if (navbarScrollPosition.current > 0 && messagesContainerRef.current) {
      const timer = setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollToPosition(navbarScrollPosition.current);
          console.log("[ChatBot] navbar 변경 후 스크롤 위치 복원:", navbarScrollPosition.current);
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [navbarVisible]);

  const wrappedHandleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      setAllowAutoScroll(true);
    }
    handleKeyDown(e);
  };
  
  const wrappedHandleSendMessage = () => {
    setAllowAutoScroll(true);
    handleSendMessage();
  };

  useEffect(() => {
    if (navbarVisible !== undefined) {
      setAllowAutoScroll(false);
    }
  }, [navbarVisible]);

  const handleShowMapView = () => {
    console.log('[ChatBot] handleShowMapView called');
    if (messagesContainerRef.current) {
      const pos = messagesContainerRef.current.getCurrentScrollPosition();
      setSavedScrollPosition(pos);
      messagesContainerRef.current.saveScrollPositionBeforeMapView();
      console.log("[ChatBot] 지도 진입 전 스크롤위치 저장!(state)", pos);
    }
    setShowMapView(true);
  };

  const handleShowMoreProperties = () => {     
    console.log('[ChatBot] handleShowMoreProperties called');
    if (messagesContainerRef.current) {
      const pos = messagesContainerRef.current.getCurrentScrollPosition();
      setSavedScrollPosition(pos);
      console.log("[ChatBot] 더 많은 매물 보기 진입 전 스크롤위치 저장!", pos);
    }
    console.log('[ChatBot] Calling handleShowPropertyList');
    handleShowPropertyList();
    console.log('[ChatBot] showPropertyList after call:', showPropertyList);
  };

  const prevShowMapView = useRef(showMapView);
  useEffect(() => {
    if (prevShowMapView.current === true && showMapView === false) {
      restoreOnNextRender.current = true;
      console.log("[ChatBot] useEffect: showMapView true→false 변화 감지, 복원 예약 restoreOnNextRender:true");
    }
    prevShowMapView.current = showMapView;
  }, [showMapView]);

  const handleDidRender = () => {
    console.log("[ChatBot] handleDidRender: restoreOnNextRender", restoreOnNextRender.current, messagesContainerRef.current, "with savedScrollPosition", savedScrollPosition);
    if (restoreOnNextRender.current && messagesContainerRef.current) {
      setTimeout(() => {
        if (restoreOnNextRender.current) {
          messagesContainerRef.current.scrollToPosition(savedScrollPosition);
          restoreOnNextRender.current = false;
          console.log("[ChatBot] 지도에서 돌아온 뒤 복원 수행, restoreOnNextRender:false, restored to:", savedScrollPosition);
        }
      }, 60);
    }
  };

  // Debug log for showPropertyList state changes
  useEffect(() => {
    console.log('[ChatBot] showPropertyList state changed to:', showPropertyList);
  }, [showPropertyList]);

  // Render the appropriate view
  const renderMainContent = () => {
    console.log('[ChatBot] renderMainContent - showPropertyList:', showPropertyList, 'showMapView:', showMapView);
    
    if (showPropertyList) {
      console.log('[ChatBot] Rendering PropertyListInChat');
      return <PropertyListInChat onBackToChat={handleBackToChat} />;
    }
    
    if (showMapView) {
      console.log('[ChatBot] Rendering MapViewInChat');
      return (
        <MapViewInChat 
          onBackToChat={handleBackToChat}
          preferences={preferences}
        />
      );
    }
    
    console.log('[ChatBot] Rendering default chat view');
    return (
      <>
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <ChatMessagesList
              ref={messagesContainerRef}
              messages={messages}
              handleStartFilter={handleStartFilter}
              onShowMoreProperties={handleShowMoreProperties}
              onShowMapView={handleShowMapView}
              onDidRender={handleDidRender}
              scrollPositionToRestore={savedScrollPosition}
              preventAutoScroll={!allowAutoScroll}
            />
          </div>
  
          <div className="sticky bottom-0 border-t p-3 bg-white">
            <InputControl 
              messages={messages}
              input={input}
              setInput={setInput}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              handleKeyDown={wrappedHandleKeyDown}
              handleSendMessage={wrappedHandleSendMessage}
              handleLocationSelect={handleLocationSelect}
              transactionType={preferences.transactionType}
              handleBackButton={handleBackButton}
              onInputFocus={handleInputFocus}
              onInputBlur={handleInputBlur}
              handleCancelFilter={handleCancelFilter}
            />
          </div>
        </div>  
      </>
    );
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
        showPropertyList={showPropertyList}
        onBackToChat={handleBackToChat}
      />

      {renderMainContent()}
    </Card>
  );
});

ChatBot.displayName = "ChatBot";

export default ChatBot;
