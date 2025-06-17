import { useState, useEffect } from "react";
import { ChatHistory, Message, PropertyPreferences } from "../types/chatTypes";
import { 
  initialMessage, 
  locationQuestion, 
  transactionQuestion,
  propertyQuestion, 
  priceQuestion,
  depositQuestion,
  chatResponses
} from "../utils/messageUtils";
import { toast } from "@/hooks/use-toast";
import { sendMessageToServer } from "../ChatAPI";
import { nanoid } from "nanoid";

// Mock property data for recommendations - would come from API in real app
const recommendedProperties = [
  {
    id: 1,
    title: "햇살 가득한 오피스텔, 풀옵션",
    address: "서울시 마포구 서교동 456-78",
    price: "5000만원",
    deposit: "65만원",
    rentalType: "전세",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3"
  },
  {
    id: 2,
    title: "넓은 테라스가 있는 복층 빌라",
    address: "서울시 용산구 한남동 789-10",
    price: "1억 2000만원",
    rentalType: "매매",
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3"
  },
  {
    id: 3,
    title: "신축 투룸, 역 5분거리, 주차가능",
    address: "서울시 서대문구 연희동 321-54",
    price: "3000만원",
    deposit: "55만원",
    rentalType: "전세",
    imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3"
  }
];

export const useChatState = () => {
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([
    {
      id: 1,
      title: "줍줍",
      messages: [initialMessage], // Modified: Now only includes the combined initialMessage
      timestamp: new Date(),
    }
  ]);
  const [currentChatId, setCurrentChatId] = useState(1);
  const [input, setInput] = useState("");
  const [preferences, setPreferences] = useState<PropertyPreferences>({ step: -1 });
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [recommendationShown, setRecommendationShown] = useState(false);
  const [propertiesShown, setPropertiesShown] = useState(false);
  const [showMapView, setShowMapView] = useState(false);

  const currentChat = chatHistories.find(chat => chat.id === currentChatId) || chatHistories[0];
  const messages = currentChat.messages;


  const [selectedChatRoomId, setSelectedChatRoomId] = useState<number | null>(null);
  useEffect(() => {
    if (!selectedChatRoomId) return;
  }, [selectedChatRoomId]);

  const appendMessageToCurrentChat = (chatRoomId: number, message: Message) => {
    setChatHistories(prev =>
      prev.map(chat =>
        chat.chatRoomId === chatRoomId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );
  };

  // Progress through the guided questions
  useEffect(() => {
    const currentMessages = currentChat.messages;
    const lastMessage = currentMessages[currentMessages.length - 1];

    // Don't add a new question if the last message is already a question waiting for answer
    if (lastMessage.inputType) return;
    
    // Add the next question based on the current step
    if (preferences.step === 0 && !lastMessage.inputType) {
      addBotMessage(locationQuestion);
    } else if (preferences.step === 1 && preferences.location && !lastMessage.inputType) {
      addBotMessage(transactionQuestion);
    } else if (preferences.step === 2 && preferences.transactionType && !lastMessage.inputType) {
      addBotMessage(propertyQuestion);
    } else if (preferences.step === 3 && preferences.propertyType && !lastMessage.inputType) {
      // For all transaction types, ask for price first
      addBotMessage(priceQuestion);
    } else if (preferences.step === 4 && preferences.priceRange && !lastMessage.inputType) {
      // After price, only ask for deposit amount for 월세
      if (preferences.transactionType === '월세') {
        addBotMessage(depositQuestion);
      } else {
        // For 전세 and 매매, skip deposit question and show recommendation summary
        showRecommendationSummary();
      }
    } else if (preferences.step === 5 && !recommendationShown) {
      // For 월세 with deposit set or skipped, show recommendation summary
      if (preferences.transactionType === '월세' && !lastMessage.inputType) {
        showRecommendationSummary();
      }
    }
  }, [preferences, currentChat.messages, recommendationShown]);
  

  // Handle back button to go to previous step
  const handleBackButton = () => {
    const lastMessage = messages[messages.length - 1];
    let updatedMessagesWithoutLast;
    
    // Handle different back button cases based on the current step
    switch (preferences.step) {
      case 1: // If we're on transaction type question, go back to location question
        updatedMessagesWithoutLast = currentChat.messages.slice(0, -2);
        setChatHistories(prev => 
          prev.map(chat => {
            if (chat.id === currentChatId) {
              return {
                ...chat,
                messages: updatedMessagesWithoutLast,
              };
            }
            return chat;
          })
        );
        setPreferences(prev => ({ ...prev, location: undefined, step: 0 }));
        setSelectedOption("");
        break;
        
      case 2: // If we're on property type question, go back to transaction type question
        updatedMessagesWithoutLast = currentChat.messages.slice(0, -2);
        setChatHistories(prev => 
          prev.map(chat => {
            if (chat.id === currentChatId) {
              return {
                ...chat,
                messages: updatedMessagesWithoutLast,
              };
            }
            return chat;
          })
        );
        setPreferences(prev => ({ ...prev, transactionType: undefined, step: 1 }));
        setSelectedOption("");
        break;
        
      case 3: // If we're on price question, go back to property type question
        updatedMessagesWithoutLast = currentChat.messages.slice(0, -2);
        setChatHistories(prev => 
          prev.map(chat => {
            if (chat.id === currentChatId) {
              return {
                ...chat,
                messages: updatedMessagesWithoutLast,
              };
            }
            return chat;
          })
        );
        setPreferences(prev => ({ ...prev, propertyType: undefined, step: 2 }));
        setSelectedOption("");
        setInput("");
        break;
        
      case 4: // If we're on deposit question, go back to price question
        updatedMessagesWithoutLast = currentChat.messages.slice(0, -2);
        setChatHistories(prev => 
          prev.map(chat => {
            if (chat.id === currentChatId) {
              return {
                ...chat,
                messages: updatedMessagesWithoutLast,
              };
            }
            return chat;
          })
        );
        setPreferences(prev => ({ ...prev, priceRange: undefined, step: 3 }));
        setInput("");
        break;
    }
  };

  // Show recommended properties after searching message has been displayed
  useEffect(() => {
    if (recommendationShown && !propertiesShown) {
      // Wait 2 seconds to simulate "searching" before showing properties
      const timer = setTimeout(() => {
        // Create the property recommendations HTML
        const mapHTML = `
          <div class="mb-3 rounded overflow-hidden border border-gray-200">
            <div class="relative w-full h-32 bg-gray-100 flex items-center justify-center">
              <div class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto mb-2 text-real-blue"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <p class="text-xs text-gray-500">지도를 사용하려면 API 키가 필요합니다</p>
              </div>
            </div>
          </div>
        `;
        
        let propertiesHTML = '';
        recommendedProperties.forEach(property => {
          propertiesHTML += `
            <div class="property-item mb-2 border rounded-md overflow-hidden cursor-pointer hover:shadow-md transition-all" data-property-id="${property.id}">
              <div class="flex">
                <div class="w-1/3">
                  <img src="${property.imageUrl}" alt="${property.title}" class="w-full h-20 object-cover">
                </div>
                <div class="p-2 flex-1">
                  <h3 class="text-sm font-medium">${property.title}</h3>
                  <p class="text-xs text-gray-500">${property.address}</p>
                  <div class="flex justify-between items-center mt-1">
                    <span class="text-xs font-bold">${property.price}</span>
                    <span class="text-xs bg-gray-100 px-1 rounded">${property.rentalType}</span>
                  </div>
                </div>
              </div>
            </div>
          `;
        });
        
        const recommendationsHTML = `
          ${mapHTML}
          <div class="mb-2 font-medium">조건에 맞는 매물 ${recommendedProperties.length}개를 찾았습니다.</div>
          ${propertiesHTML}
          <div class="text-center mt-3">
            <button class="text-xs text-real-blue hover:underline">더 많은 매물 보기</button>
          </div>
        `;
        
        // Add the recommendations message
        addBotMessage({
          //id: messages.length + 3,
          id: Date.now(), // 고유한 ID 사용
          text: recommendationsHTML,
          isUser: false,
          timestamp: new Date()
        });
        
        setPropertiesShown(true);
        
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [recommendationShown, propertiesShown]);

  const showRecommendationSummary = async() => {
    // Prevent duplicate messages
    if (recommendationShown) return;
    setRecommendationShown(true);
    
    // Show recommendation summary with the new format
    let summary = `${preferences.location} 지역의 ${preferences.transactionType} ${preferences.propertyType}, <br>`;
    
    if (preferences.transactionType === '월세') {
      summary += `월세 ${preferences.priceRange}만원`;
      if (preferences.depositAmount) {
        summary += `, 보증금 ${preferences.depositAmount}만원`;
      }
      summary += ` 조건에 맞는 매물을 찾아볼게요.`;
    } else if (preferences.transactionType === '전세') {
      summary += `전세금 ${preferences.priceRange}만원 조건에 맞는 매물을 찾아볼게요.`;
    } else {
      summary += `매매가 ${preferences.priceRange}만원 조건에 맞는 매물을 찾아볼게요.`;
    }
    
    addBotMessage({
      id: messages.length + 1,
      text: summary,
      isUser: false,
      timestamp: new Date()
    });
    
    // Update chat title based on user preferences using the requested format without colon
    let deposit = preferences.depositAmount && preferences.transactionType === '월세' ? ` (보증금 ${preferences.depositAmount})` : '';
    const chatTitle = `${preferences.location} / ${preferences.transactionType} / ${preferences.propertyType} / ${preferences.priceRange}${deposit}`;
    
    const chatRoomId = currentChat.chatRoomId;
    if (chatRoomId) {
      try {
        await fetch(`http://localhost:8080/chat/${chatRoomId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: chatTitle }),
        });
      } catch (error) {
        console.error("채팅방 제목 변경 실패:", error);
      }
    }
    
    setChatHistories(prev => 
      prev.map(chat => {
        if (chat.id === currentChatId) {
          return {
            ...chat,
            title: chatTitle,
          };
        }
        return chat;
      })
    );
    
    // Add recommendation results message with the new wording
    // setTimeout(() => {
    //   addBotMessage({
    //     id: messages.length + 2,
    //     text: "AI가 추천 매물을 검색 중입니다. 잠시만 기다려주세요!",
    //     isUser: false,
    //     timestamp: new Date()
    //   });
      
    //   // Show a toast notification
    //   toast({
    //     title: "매물 검색",
    //     description: "조건에 맞는 매물을 찾고 있습니다.",
    //   });
    // }, 1000);

    // 추천 끝났으니 step을 -1로 전환
    setPreferences(prev => ({ ...prev, step: -1 }));
  };

  const addBotMessage = (message: Message) => {
    setChatHistories(prev => 
      prev.map(chat => {
        if (chat.id === currentChatId) {
          return {
            ...chat,
            messages: [...chat.messages, message],
          };
        }
        return chat;
      })
    );
  };

  const addBotMessageWithServerSync = async (text: string, chatRoomId: number) => {
    const botMessage: Message = {
      id: messages.length + 1,
      text,
      isUser: false,
      timestamp: new Date(),
      uniqueKey: nanoid(),
    };
  
    addBotMessage(botMessage);
  
    try {
      await sendMessageToServer(
        text,               // content
        0,                  // userId = 0 for chatbot
        false,              // isUser = false → senderType: "CHATBOT"
        chatRoomId          // 서버에서 받은 chatRoomId 사용
      );
    } catch (err) {
      console.error("챗봇 메시지 전송 실패:", err);
    }
  };
  
  const handleSendMessage = async () => {
    // For search input type, don't allow direct text submission
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.inputType === 'search' && !selectedOption) {
      return; // Don't proceed if no option is selected in search mode
    }
    
    // Get text to send (either from input or selected option)
    let messageText = selectedOption || input;
    
    // Check if this is the deposit question and the user is submitting it empty
    const isDepositEmpty = lastMessage.id === 6 && messageText === "";
    
    // If deposit is empty, set messageText to "건너뛰기"
    if (isDepositEmpty) {
      messageText = "건너뛰기";
    }

    // 서버에 메시지 보내기
    // 1. 메시지 전송
    const currentChat = chatHistories.find(chat => chat.id === currentChatId);
    const response = await sendMessageToServer(
      messageText,
      123, // 유저 ID (실제 로그인 유저 ID로 바꾸기)
      true, 
      currentChat?.chatRoomId,
    );

    // 2. 서버 응답에서 chatRoomId 받기
    const { chatRoomId } = response;
    console.log("서버 응답 chatRoomId:", chatRoomId);
    pollChatUpdates(chatRoomId);
    
    const res = await fetch(`http://localhost:8080/chat/${chatRoomId}/recent`); // 3. 최근 메시지 가져오기(가장 최근 챗봇 메시지)
    const recentAi = await res.json();
    console.log("AI 응답:", recentAi);

    // 4-1. 메시지 객체 만들어서 추가(AI 메시지)
    const aiMessage: Message = {
      id: recentAi.messageId,
      text: recentAi.content,
      isUser: false,
      timestamp: new Date(recentAi.createdAt),
      uniqueKey: nanoid(),
    };
    updateCurrentChatMessages(chatRoomId, aiMessage);
    
    // 4-2. 메시지 객체 만들어서 추가(User 메시지)
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      isUser: true,
      timestamp: new Date(),
      uniqueKey: nanoid(),
    };
    updateCurrentChatMessages(currentChatId, newUserMessage);


    // Update the current chat with the new message
    const updatedHistories = chatHistories.map(chat => {
      if (chat.id === currentChatId) {
        return {
          ...chat,
          messages: [...chat.messages, newUserMessage, aiMessage],
          // 제목은 이제 최종 검색 시점에만 변경됩니다
          title: chat.title,
          chatRoomId: response.chatRoomId,
        };
      }
      return chat;
    });

    setChatHistories(updatedHistories);
    setInput("");
    setSelectedOption("");


    // If we're in the filter flow, update preferences based on the current step
    if (preferences.step >= 0) {
      if (preferences.step === 0) {
        setPreferences(prev => ({ ...prev, location: messageText, step: 1 }));
      } else if (preferences.step === 1) {
        setPreferences(prev => ({ 
          ...prev, 
          transactionType: messageText as '월세' | '전세' | '매매', 
          step: 2 
        }));
      } else if (preferences.step === 2) {
        setPreferences(prev => ({ 
          ...prev, 
          propertyType: messageText as '원룸 ⦁ 투룸' | '빌라' | '오피스텔' | '아파트', 
          step: 3 
        }));
      } else if (preferences.step === 3) {
        // Set price range for all transaction types
        setPreferences(prev => ({ 
          ...prev, 
          priceRange: messageText, 
          step: 4 
        }));
      } else if (preferences.step === 4) {
        // For 월세, this is deposit amount
        // For 전세 and 매매, this step is skipped
        if (preferences.transactionType === '월세') {
          setPreferences(prev => ({ 
            ...prev, 
            depositAmount: isDepositEmpty ? undefined : messageText, 
            step: 5 
          }));
        }
      }
    } 
    // If we're not in the filter flow, generate a random response from the array
    // else if (preferences.step === -1) {
    //   setTimeout(() => {
    //     (async () => {
    //       // Get a random response from the chatResponses array
    //       const randomIndex = Math.floor(Math.random() * chatResponses.length);
    //       const randomResponse = chatResponses[randomIndex];   
    //       await addBotMessageWithServerSync(randomResponse, chatRoomId);
    //     })();
    //   }, 500);
    // }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLocationSelect = (location: string) => {
    // 유저 메시지 추가
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: location,
      isUser: true,
      timestamp: new Date(),
    };
  
    // 메시지 반영
    setChatHistories(prev =>
      prev.map(chat =>
        chat.id === currentChatId
          ? { ...chat, messages: [...chat.messages, newUserMessage] }
          : chat
      )
    );
  
    // 입력창 및 선택창 제거
    setSelectedOption("");
    setInput("");
  
    // 바로 다음 스텝으로 진행
    if (preferences.step === 0) {
      setPreferences(prev => ({ ...prev, location, step: 1 }));
    }
    //setSelectedOption(location);
  };

  const handleStartFilter = () => {
    setPreferences(prev => ({ ...prev, step: 0 }));
    setRecommendationShown(false);
    setPropertiesShown(false);
    addBotMessage(locationQuestion);
  };

  const startNewChat = () => {
    const newChatId = Math.max(...chatHistories.map(chat => chat.id)) + 1;
    const newChat: ChatHistory = {
      id: newChatId,
      title: "줍줍",
      messages: [initialMessage],
      timestamp: new Date(),
      chatRoomId: undefined
    };
    
    //setChatHistories([...chatHistories, newChat]);
    setChatHistories(prev => [...prev, newChat]);
    setCurrentChatId(newChatId);
    
    // 완전히 초기 상태로 리셋
    setPreferences({ step: -1 });
    setSelectedOption("");
    setInput("");
    setRecommendationShown(false);
    setPropertiesShown(false);
    setShowMapView(false);
  };

  const switchToChat = (chatId: number) => {
    setCurrentChatId(chatId);
    const selectedChat = chatHistories.find(chat => chat.id === chatId);
    if (selectedChat) {
      // Determine the current step of the selected chat based on its messages
      let step = -1;
      let newPreferences: PropertyPreferences = { step: -1 };
      
      // 선택된 채팅의 메시지들을 분석하여 현재 단계와 설정을 복원
      const userMessages = selectedChat.messages.filter(m => m.isUser);
      
      if (selectedChat.messages.some(m => m.id === locationQuestion.id)) {
        step = Math.max(step, 0);
        const locationMsg = userMessages.find(m => 
          selectedChat.messages.findIndex(msg => msg.id === locationQuestion.id) < 
          selectedChat.messages.findIndex(msg => msg.id === m.id)
        );
        if (locationMsg) {
          newPreferences.location = locationMsg.text;
          step = 1;
        }
      }
      
      if (selectedChat.messages.some(m => m.id === transactionQuestion.id)) {
        step = Math.max(step, 1);
        const transactionMsg = userMessages.find(m => 
          selectedChat.messages.findIndex(msg => msg.id === transactionQuestion.id) < 
          selectedChat.messages.findIndex(msg => msg.id === m.id)
        );
        if (transactionMsg) {
          newPreferences.transactionType = transactionMsg.text as '월세' | '전세' | '매매';
          step = 2;
        }
      }
      
      if (selectedChat.messages.some(m => m.id === propertyQuestion.id)) {
        step = Math.max(step, 2);
        const propertyMsg = userMessages.find(m => 
          selectedChat.messages.findIndex(msg => msg.id === propertyQuestion.id) < 
          selectedChat.messages.findIndex(msg => msg.id === m.id)
        );
        if (propertyMsg) {
          newPreferences.propertyType = propertyMsg.text as '원룸 ⦁ 투룸' | '빌라' | '오피스텔' | '아파트';
          step = 3;
        }
      }
      
      if (selectedChat.messages.some(m => m.id === priceQuestion.id)) {
        step = Math.max(step, 3);
        const priceMsg = userMessages.find(m => 
          selectedChat.messages.findIndex(msg => msg.id === priceQuestion.id) < 
          selectedChat.messages.findIndex(msg => msg.id === m.id)
        );
        if (priceMsg) {
          newPreferences.priceRange = priceMsg.text;
          step = 4;
        }
      }
      
      if (selectedChat.messages.some(m => m.text.includes("조건에 맞는 추천 매물") || m.text.includes("조건에 맞는 매물을 찾아볼게요"))) {
        step = 5;
        setRecommendationShown(true);
        setPropertiesShown(selectedChat.messages.some(m => m.text.includes("조건에 맞는 매물") && m.text.includes("개를 찾았습니다")));
      } else {
        setRecommendationShown(false);
        setPropertiesShown(false);
      }
      
      newPreferences.step = step;
      setPreferences(newPreferences);
      setInput("");
      setSelectedOption("");
      setShowMapView(false);
    }
  };

  const editChatTitle = async (chatId: number, newTitle: string) => {
    const chat = chatHistories.find(chat => chat.id === chatId);
    const chatRoomId = chat?.chatRoomId;

    // chatRoomId가 없거나 초기 상태라면 서버 통신 없이 로컬 상태만 변경   
    if (!chatRoomId || chat.title === "줍줍") {
      setChatHistories(prev => 
        prev.map(chat => {
          if (chat.id === chatId) {
            return {
              ...chat,
              title: newTitle,
            };
          }
          return chat;
        })
      );
    }

    try {
      const response = await fetch(`http://localhost:8080/chat/${chatRoomId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),     
      });

      if (!response.ok) throw new Error("채팅방 제목 변경 실패");
   
      // 성공 시 로컬 상태도 갱신
      setChatHistories(prev =>
        prev.map(chat =>
          chat.id === chatId ? { ...chat, title: newTitle } : chat
        )
      );
    } catch (error) {
      console.error("채팅방 제목 변경 실패:", error);
    }
  };

  const deleteChat = async (chatId: number) => {
    const chatToDelete = chatHistories.find(chat => chat.id === chatId);

    if (!chatToDelete?.chatRoomId) {
      console.warn("chatRoomId가 존재하지 않아 채팅방 삭제 실패");
      return;
    }

    try {
      
      // 백엔드에 삭제 요청
      await fetch(`http://localhost:8080/chat/${chatToDelete.chatRoomId}`, {
        method: "DELETE",
      });

      // 화면에서도 제거
      const updatedChats = chatHistories.filter(chat => chat.id !== chatId);
      setChatHistories(updatedChats);

      // 선택된 채팅방을 삭제한 경우 새로운 채팅 생성
      if (currentChatId === chatId) {
        startNewChat();
      }

    } catch (error) {
      console.error("채팅방 삭제 실패:", error);
    };

    // If deleting the current chat, always create a new one
    if (currentChatId === chatId) {
      const newChatId = Math.max(...chatHistories.map(chat => chat.id)) + 1;
      const newChat: ChatHistory = {
        id: newChatId,
        title: "줍줍",
        messages: [initialMessage],
        timestamp: new Date(),
      };
      
      // Remove the deleted chat and add the new chat
      setChatHistories(prev => [...prev.filter(chat => chat.id !== chatId), newChat]);
      setCurrentChatId(newChatId);
      setPreferences({ step: -1 });
      setSelectedOption("");
      setInput("");
      setRecommendationShown(false);
      setPropertiesShown(false);
      setShowMapView(false);
      return;
    }

    // If deleting a chat that's not current, just remove it
    setChatHistories(prev => prev.filter(chat => chat.id !== chatId));
    
    // If this was the last chat, create a new one
    const remainingChats = chatHistories.filter(chat => chat.id !== chatId);
    if (remainingChats.length === 0) {
      const newChatId = Math.max(...chatHistories.map(chat => chat.id)) + 1;
      const newChat: ChatHistory = {
        id: newChatId,
        title: "줍줍",
        messages: [initialMessage],
        timestamp: new Date(),
      };
      
      setChatHistories([newChat]);
      setCurrentChatId(newChatId);
      setPreferences({ step: -1 });
      setSelectedOption("");
      setInput("");
      setRecommendationShown(false);
      setPropertiesShown(false);
      setShowMapView(false);
    }
  };

  const updateCurrentChatMessages = (chatRoomId: number, message: Message) => {
    if (!message.text || message.text.trim() === "") return; // 빈 메시지 무시
    if (!message.timestamp || isNaN(new Date(message.timestamp).getTime())) return; // 유효하지 않은 시간 무시
    setChatHistories(prev =>
      prev.map(chat =>
        chat.chatRoomId === chatRoomId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );
  };

  const [activePollingRoomId, setActivePollingRoomId] = useState<number | null>(null);

  const pollChatUpdates = (chatRoomId: number) => {
    if (!chatRoomId || activePollingRoomId === chatRoomId) {
      return;
    }

    setActivePollingRoomId(chatRoomId); // 중복 방지용 상태 설정

    const doPoll = () => {
      fetch(`http://localhost:8080/chat/${chatRoomId}/updates`)
        .then(res => {
          if (!res.ok) throw new Error(`서버 오류: ${res.status}`);
          return res.json();
        })
        .then(newMessageDto => {
          const newMessage: Message = {
            id: newMessageDto.messageId,
            text: newMessageDto.content,
            isUser: newMessageDto.senderType === "USER",
            timestamp: new Date(newMessageDto.createdAt),
          };

          if (newMessage.text?.trim()) {
            updateCurrentChatMessages(chatRoomId, newMessage);
          }

          doPoll(); // 다음 요청(재귀 호출)
        })
        .catch(err => {
          console.warn(`chatRoomId ${chatRoomId} 폴링 실패`, err.message);
          setTimeout(() => doPoll(), 3000);
        });
    };

    doPoll(); // 최초 호출
  };

  useEffect(() => {
    const chat = chatHistories.find(c => c.id === currentChatId);
    const chatRoomId = chat?.chatRoomId;

    if (chatRoomId && activePollingRoomId !== chatRoomId) {
      pollChatUpdates(chatRoomId); // 오직 최초 시작에만 호출
    }
  }, [currentChatId, chatHistories]);

  return {
    appendMessageToCurrentChat,
    chatHistories,
    selectedChatRoomId,
    setSelectedChatRoomId,
    currentChatId,
    currentChat,
    messages,
    input,
    setInput,
    preferences,
    selectedOption,
    setSelectedOption,
    showMapView,
    setShowMapView,
    handleKeyDown,
    handleLocationSelect,
    handleStartFilter,
    startNewChat,
    switchToChat,
    handleBackButton,
    addBotMessageWithServerSync,
    editChatTitle,
    deleteChat,
    handleSendMessage,
  };
};
