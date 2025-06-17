package com.zoop.chat.service;

import com.zoop.chat.dto.ChatRoomDto;
import com.zoop.chat.dto.MessageDto;
import com.zoop.chat.entity.ChatRoom;
import com.zoop.chat.entity.Message;
import com.zoop.chat.repository.ChatRoomRepository;
import com.zoop.chat.repository.MessageRepository;
import com.zoop.chat.type.SenderType;
import com.zoop.constants.ErrorMessages;
import com.zoop.exception.chat.ChatRoomNotFoundException;
import com.zoop.exception.chat.ChatServiceException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService {

    private final ChatRoomRepository chatRoomRepository;
    private final MessageRepository messageRepository;
    private final ChatUpdateService chatUpdateService;

    private int CHATBOT_MESSAGE_ORDER = 0;

    // 채팅방 생성
    @Transactional
    public Long createChatRoom(Long userId) {
        try {
            ChatRoom chatRoom = new ChatRoom();
            chatRoom.setUserId(userId);
            ChatRoom saved =  chatRoomRepository.save(chatRoom);
            return saved.getChatRoomId();
        } catch (Exception e) {
            throw new ChatServiceException(String.format("%s. userId=%d", ErrorMessages.CHAT_CREATE_FAILED, userId), e);
        }
    }

    private ChatRoom findByChatRoomId(Long chatRoomId, String context) {
        return chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new ChatRoomNotFoundException(chatRoomId, context));
    }

    // 메시지 저장
    @Transactional
    public MessageDto saveMessage(MessageDto messageDto) {
        try {
            ChatRoom chatRoom = findByChatRoomId(messageDto.getChatRoomId(), ErrorMessages.CHAT_SAVE_MESSAGE_FAILED); // 채팅방의 존재 여부를 확인하여, 없으면 예외 발생 (EntityNotFoundException)
            Message message = new Message(chatRoom, messageDto.getSenderType(), messageDto.getContent());
            Message saved =  messageRepository.save(message);
            chatRoom.updateLastMessageAt(saved.getCreatedAt()); // 채팅방의 마지막 메시지 발송 시각을 갱신
            messageDto.updateMessageInfo(saved.getMessageId(), saved.getCreatedAt());
            return messageDto;
        } catch (Exception e) {
            throw new ChatServiceException(ErrorMessages.CHAT_SAVE_MESSAGE_FAILED, messageDto.getChatRoomId(), e);
        }
    }

    // 채팅방 제목 변경
    @Transactional
    public void updateChatRoomTitle(Long chatRoomId, String title) {
        try {
            ChatRoom chatRoom = findByChatRoomId(chatRoomId, ErrorMessages.CHAT_UPDATE_TITLE_FAILED);
            chatRoom.updateTitle(title);
        } catch(Exception e) {
            throw new ChatServiceException(ErrorMessages.CHAT_UPDATE_TITLE_FAILED, chatRoomId, e);
        }
    }

    // 채팅방 삭제 (소프트 삭제)
    @Transactional
    public void deleteChatRoom(Long chatRoomId) {
        try {
            findByChatRoomId(chatRoomId, ErrorMessages.CHAT_DELETE_FAILED);
            chatRoomRepository.softDeleteChatRoom(chatRoomId, LocalDateTime.now());
            messageRepository.softDeleteMessages(chatRoomId, LocalDateTime.now()); // 메시지도 소프트 삭제
        } catch (Exception e) {
            throw new ChatServiceException(ErrorMessages.CHAT_DELETE_FAILED, chatRoomId, e);
        }
    }
    
    // 채팅방 목록 조회
    public List<ChatRoomDto> getUserChatRooms(Long userId) {
        List<ChatRoom> chatRooms = chatRoomRepository.findChatRoomsByUserId(userId);
        List<ChatRoomDto> result = new ArrayList<>();
        int order = 0;

        for (ChatRoom c : chatRooms) {
            result.add(
                ChatRoomDto.builder()
                        .order(++order)
                        .chatRoomId(c.getChatRoomId())
                        .title(c.getTitle())
                        .lastMessageAt(c.getLastMessageAt())
                        .build()
            );
        }
        return result;
    }

    // 특정 채팅방 메시지 조회
    public List<MessageDto> getChatMessages(Long chatRoomId) {
        List<Message> messages = messageRepository.getMessagesByChatRoomId(chatRoomId);
        List<MessageDto> result = new ArrayList<>();

        int order = 0;

        for (Message m : messages) {
            result.add(
                    MessageDto.builder()
                            .order(++order)
                            .chatRoomId(chatRoomId)
                            .messageId(m.getMessageId())
                            .senderType(m.getSenderType())
                            .content(m.getContent())
                            .createdAt(m.getCreatedAt())
                            .build()
            );
        }
        return result;
    }
    
    // 특정 채팅방의 가장 최근 메시지(가장 최근 챗봇 응답) 조회
    public MessageDto getRecentMessage(Long chatRoomId) {
        Message m = messageRepository.findTop1ByChatRoom_ChatRoomIdAndSenderTypeOrderByCreatedAtDesc(chatRoomId, SenderType.CHATBOT);
        return MessageDto.builder()
                .order(0)
                .chatRoomId(chatRoomId)
                .messageId(m.getMessageId())
                .senderType(m.getSenderType())
                .content(m.getContent())
                .createdAt(m.getCreatedAt())
                .build();
    }

    @Async
    public void generateAndSaveAiResponse(Long chatRoomId, String userMessageContent) {
        //String aiReply = customAI.generateReply(userMessageContent); // AI 호출
        String aiReply = ++CHATBOT_MESSAGE_ORDER + ". ai의 답변입니다.";
        MessageDto aiMessage = saveMessage(new MessageDto(chatRoomId, SenderType.CHATBOT, aiReply));
        log.info("ai의 답변 DB 저장 완료: {}", aiMessage);
        chatUpdateService.notifyNewMessage(aiMessage); // 롱폴링 응답 보내기
    }

}
