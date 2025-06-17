package com.zoop.chat.controller;

import com.zoop.chat.dto.ChatRoomDto;
import com.zoop.chat.dto.MessageDto;
import com.zoop.chat.service.ChatService;
import com.zoop.chat.type.SenderType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    // 채팅방 제목 수정
    @PatchMapping("/{chatRoomId}")
    public ResponseEntity<Void> updateChatRoomTitle(@PathVariable Long chatRoomId, @RequestBody ChatRoomDto chatRoomDto) {
        String title = chatRoomDto.getTitle();
        chatService.updateChatRoomTitle(chatRoomId, chatRoomDto.getTitle());
        log.info("{}번 채팅방의 제목이 변경됨: {}", chatRoomId, title);
        return ResponseEntity.noContent().build();
    }

    // 채팅방 삭제
    @DeleteMapping("/{chatRoomId}")
    public ResponseEntity<Void> deleteChatRoom(@PathVariable Long chatRoomId) {
        chatService.deleteChatRoom(chatRoomId);
        log.info("{}번 채팅방이 삭제됨", chatRoomId);
        return ResponseEntity.noContent().build();
    }

    // 채팅방 목록 조회
    @GetMapping
    public ResponseEntity<List<ChatRoomDto>> getUserChatRooms(@RequestParam Long userId) {
        // TODO: 현재는 임시로 userId를 쿼리 파라미터로 받지만, 추후 JWT에서 추출하도록 수정 예정
        List<ChatRoomDto> chatRooms = chatService.getUserChatRooms(userId);
        log.info("[userId: {}]의 채팅방 목록 조회 - {}개", userId, chatRooms.size());
        log.info("목록: {}", chatRooms);
        return ResponseEntity.ok(chatRooms);
    }

}
