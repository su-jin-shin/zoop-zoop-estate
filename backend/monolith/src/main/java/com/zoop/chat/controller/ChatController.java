package com.zoop.chat.controller;

import com.zoop.chat.dto.MessageDto;
import com.zoop.chat.service.ChatService;
import com.zoop.chat.type.SenderType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/chat")
@Slf4j
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> sendMessage(@RequestBody MessageDto requestMessageDto) {
        Long chatRoomId = requestMessageDto.getChatRoomId();
        SenderType senderType = requestMessageDto.getSenderType();
        String content = requestMessageDto.getContent();

        log.info("chatRoomId: {}, senderType: {}, content: {}", chatRoomId, senderType, content);

        // 1. 채팅방 생성
        if (chatRoomId == null) {
            chatRoomId = chatService.createChatRoom(requestMessageDto.getUserId());
            log.info("{}번 채팅방이 생성됨", chatRoomId);
            requestMessageDto.setChatRoomId(chatRoomId);
        }

        // 2. 메시지 저장
        MessageDto responseMessageDto = chatService.saveMessage(requestMessageDto);

        return ResponseEntity.ok(Map.of(
                "chatRoomId", chatRoomId,
                "messageId", responseMessageDto.getMessageId(),
                "createdAt", responseMessageDto.getCreatedAt()
        ));
    }

}
