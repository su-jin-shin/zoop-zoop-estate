package com.zoop.chat.service;

import com.zoop.chat.entity.ChatRoom;
import com.zoop.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRoomRepository chatRoomRepository;

    // 채팅방 생성
    public Long createChatRoom(Long userId) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setUserId(userId);
        ChatRoom saved =  chatRoomRepository.save(chatRoom);
        return saved.getChatRoomId();
    }

}
