package com.zoop.chat.service;

import com.zoop.chat.dto.MessageDto;
import com.zoop.chat.entity.ChatRoom;
import com.zoop.chat.entity.Message;
import com.zoop.chat.repository.ChatRoomRepository;
import com.zoop.chat.repository.MessageRepository;
import com.zoop.exception.chat.ChatDeleteFailedException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService {

    private final ChatRoomRepository chatRoomRepository;
    private final MessageRepository messageRepository;

    // 채팅방 생성
    public Long createChatRoom(Long userId) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setUserId(userId);
        ChatRoom saved =  chatRoomRepository.save(chatRoom);
        return saved.getChatRoomId();
    }

    // 메시지 저장
    public MessageDto saveMessage(MessageDto messageDto) {
        ChatRoom chatRoom = chatRoomRepository.findById(messageDto.getChatRoomId())
                .orElseThrow(() -> new IllegalArgumentException("채팅방이 존재하지 않음"));

        Message message = new Message(chatRoom, messageDto.getSenderType(), messageDto.getContent());
        Message saved =  messageRepository.save(message);

        return new MessageDto(saved.getMessageId(), saved.getCreatedAt());
    }
    
    // 채팅방 삭제 (소프트 삭제)
    @Transactional
    public void deleteChatRoom(Long chatRoomId) {
        try {
            chatRoomRepository.softDeleteChatRoom(chatRoomId, LocalDateTime.now());
            messageRepository.softDeleteMessages(chatRoomId, LocalDateTime.now()); // 메시지도 소프트 삭제
        } catch (Exception e) {
            log.error("채팅방 삭제 중 오류 발생: {}", e.getMessage(), e);
            throw new ChatDeleteFailedException("채팅방 삭제에 실패했습니다.");
        }
    }

}
