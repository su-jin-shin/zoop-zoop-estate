package com.zoop.chat.controller;

import com.zoop.chat.dto.ChatRequestDto;
import com.zoop.chat.type.SenderType;
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
public class ChatController {

    @PostMapping
    public ResponseEntity<Map<String, Object>> sendMessage(@RequestBody ChatRequestDto chatRequestDto) {
        Long chatRoomId = chatRequestDto.getChatRoomId();
        SenderType senderType = chatRequestDto.getSenderType();
        String content = chatRequestDto.getContent();

        log.info("chatRoomId: {}, senderType: {}, content: {}", chatRoomId, senderType, content);

        return ResponseEntity.ok(Map.of( //임시의 값 return
                "chatRoomId", 0,
                "messageId", 0,
                "createdAt", LocalDateTime.now().toString()
        ));
    }

}
