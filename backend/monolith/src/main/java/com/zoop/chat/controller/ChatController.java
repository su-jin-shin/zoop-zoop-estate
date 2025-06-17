package com.zoop.chat.controller;

import com.zoop.chat.dto.ChatRoomDto;
import com.zoop.chat.dto.MessageDto;
import com.zoop.chat.service.ChatService;
import com.zoop.chat.service.ChatUpdateService;
import com.zoop.chat.type.SenderType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/chat")
@Slf4j
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final ChatUpdateService chatUpdateService;


    @PostMapping
    public ResponseEntity<Map<String, Object>> sendMessage(@RequestBody MessageDto requestMessageDto) {
        // TODO: 현재는 임시의 userId 값을 사용하지만, 추후 JWT에서 추출하도록 수정 예정
        Long userId = 123L;
        Long chatRoomId = requestMessageDto.getChatRoomId();
        SenderType senderType = requestMessageDto.getSenderType();
        String content = requestMessageDto.getContent();

        log.info("chatRoomId: {}, senderType: {}, content: {}", chatRoomId, senderType, content);

        // 1. 채팅방 생성
        if (chatRoomId == null) {
            chatRoomId = chatService.createChatRoom(userId);
            log.info("{}번 채팅방이 생성됨", chatRoomId);
            requestMessageDto.setChatRoomId(chatRoomId);
        }

        // 2. 메시지 저장
        MessageDto responseMessageDto = chatService.saveMessage(requestMessageDto);
        // 3. AI 답변 호출
        chatService.generateAndSaveAiResponse(chatRoomId, content);

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

    // 특정 채팅방 메시지 조회
    @GetMapping("/{chatRoomId}")
    public ResponseEntity<List<MessageDto>> getChatMessages(@PathVariable Long chatRoomId) {
        List<MessageDto> messages = chatService.getChatMessages(chatRoomId);
        return ResponseEntity.ok(messages);
    }

    // 특정 채팅방의 가장 최근 챗봇 메시지 조회
    @GetMapping("/{chatRoomId}/recent")
    public ResponseEntity<MessageDto> getRecentChatMessage(@PathVariable Long chatRoomId) {
        MessageDto message = chatService.getRecentMessage(chatRoomId);
        return ResponseEntity.ok(message);
    }

    // 사용자의 질문에 대한 챗봇의 응답 전송
    // 롱-폴링(long polling) 방식으로 새 메시지가 생길 때까지 최대 20초 동안 연결을 유지
    @GetMapping("/{chatRoomId}/updates")
    public DeferredResult<MessageDto> getChatUpdates(@PathVariable Long chatRoomId) {
        // 폴링 시작 로그
        log.info("[LongPoll] chatRoomId={} - 연결 시도", chatRoomId);
        DeferredResult<MessageDto> result = new DeferredResult<>(20000L); // 20초 동안 대기

        // 응답이 완료,타임아웃,에러일 때 로그
        result.onCompletion(() ->
                log.info("[LongPoll] chatRoomId={} - 응답 완료", chatRoomId)
        );
        result.onTimeout(() ->
                log.info("[LongPoll] chatRoomId={} - 타임아웃", chatRoomId)
        );
        result.onError((Throwable t) ->
                log.info("[LongPoll] chatRoomId={} - 에러: {}", chatRoomId, t.getMessage())
        );

        // 서비스에 등록
        chatUpdateService.register(chatRoomId, result);
        return result;
    }

}
