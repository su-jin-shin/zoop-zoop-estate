package com.zoop.chat.service;

import com.zoop.chat.dto.MessageDto;
import com.zoop.chat.entity.ChatRoom;
import com.zoop.chat.entity.Message;
import com.zoop.chat.repository.ChatRoomRepository;
import com.zoop.chat.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
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

}
