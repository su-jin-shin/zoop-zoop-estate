package com.zoop.chat.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zoop.chat.dto.MessageRequestDto;
import com.zoop.chat.dto.MessageResponseDto;
import com.zoop.chat.service.ChatService;
import com.zoop.chat.service.ChatUpdateService;
import com.zoop.chat.type.SenderType;
import com.zoop.constants.ErrorMessages;
import com.zoop.exception.chat.ChatRoomNotFoundException;
import com.zoop.exception.chat.ChatServiceException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ChatController.class)
@Import(ChatControllerTest.MockServiceConfig.class) // 직접 만든 테스트 설정 import
public class ChatControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ChatService chatService; // 등록한 mock

    @Autowired
    private ChatUpdateService chatUpdateService;

    @Autowired
    private ObjectMapper objectMapper;

    @TestConfiguration
    static class MockServiceConfig {
        @Bean
        public ChatService chatService() {
            return mock(ChatService.class); // Mockito mock 직접 주입
        }

        @Bean
        public ChatUpdateService chatUpdateService() {
            return mock(ChatUpdateService.class);
        }
    }

    // 9자리 나노초 > 7자리 나노초 출력으로 변환
    private String getExpectedTime(LocalDateTime createdAt) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSSSSS");
        return createdAt.format(formatter);
    }

    @Test
    void 채팅방_없으면_생성하고_메시지를_저장한다() throws Exception {
        // given
        long userId = 123L;
        long generatedChatRoomId = 1L;
        long messageId = 10L;
        LocalDateTime createdAt = LocalDateTime.now();
        String expectedTime = getExpectedTime(createdAt);

        MessageRequestDto request = MessageRequestDto.builder()
                .chatRoomId(null)
//                .userId(userId)
                .senderType(SenderType.USER)
                .content("안녕하세요")
                .build();

        MessageResponseDto response = MessageResponseDto.builder()
                .messageId(messageId)
                .chatRoomId(generatedChatRoomId)
//                .userId(userId)
                .createdAt(createdAt)
                .build();

        when(chatService.createChatRoom(userId)).thenReturn(generatedChatRoomId);
        when(chatService.saveMessage(any(MessageRequestDto.class))).thenReturn(response);

        // when & then
        mockMvc.perform(post("/chat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.chatRoomId").value(generatedChatRoomId))
                .andExpect(jsonPath("$.messageId").value(messageId))
                .andExpect(jsonPath("$.createdAt").value(expectedTime));

        verify(chatService).createChatRoom(userId);
        verify(chatService).saveMessage(any(MessageRequestDto.class));
    }

    @Test
    void 채팅방_이미_있으면_메시지만_저장한다() throws Exception {
        // given
        long existingChatRoomId = 99L;
        long userId = 123L;
        long messageId = 555L;
        LocalDateTime createdAt = LocalDateTime.now();
        String expectedTime = getExpectedTime(createdAt);

        MessageRequestDto request = MessageRequestDto.builder()
                .chatRoomId(existingChatRoomId)
//                .userId(userId)
                .senderType(SenderType.USER)
                .content("이미 있는 방에서 보낸 메시지")
                .build();

        MessageResponseDto response = MessageResponseDto.builder()
                .messageId(messageId)
                .chatRoomId(existingChatRoomId)
//                .userId(userId)
                .createdAt(createdAt)
                .build();

        when(chatService.saveMessage(any(MessageRequestDto.class))).thenReturn(response);

        // when & then
        mockMvc.perform(post("/chat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.chatRoomId").value(existingChatRoomId))
                .andExpect(jsonPath("$.messageId").value(messageId))
                .andExpect(jsonPath("$.createdAt").value(expectedTime));

        // createChatRoom은 호출되면 안 됨
        verify(chatService, never()).createChatRoom(anyLong());

        // 메시지 저장은 호출돼야 함
        verify(chatService).saveMessage(any(MessageRequestDto.class));
    }

    @Test
    void 채팅방_삭제_성공_시_204_No_Content를_반환한다() throws Exception {
        // given
        Long chatRoomId = 1L;

        // when & then
        mockMvc.perform(delete("/chat/{chatRoomId}", chatRoomId))
                .andExpect(status().isNoContent());

        verify(chatService).deleteChatRoom(chatRoomId);
    }

    @Test
    void 채팅방_삭제_실패_시_500_에러를_반환한다() throws Exception {
        // given
        Long chatRoomId = 99L;

        doThrow(new ChatServiceException("삭제 실패"))
                .when(chatService).deleteChatRoom(chatRoomId);

        // when & then
        mockMvc.perform(delete("/chat/{chatRoomId}", chatRoomId))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.message").value("삭제 실패"));
    }

    @Test
    void 채팅방_제목_변경_성공_시_204_No_Content를_반환한다() throws Exception {
        // given
        Long chatRoomId = 1L;
        String newTitle = "변경할 제목";

        // when & then
        mockMvc.perform(patch("/chat/{chatRoomId}", chatRoomId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"" + newTitle + "\"}"))
                .andExpect(status().isNoContent());

        verify(chatService).updateChatRoomTitle(chatRoomId, newTitle);
    }

    @Test
    void 채팅방_제목_변경_실패_시_500_Internal_Server_Error와_에러_메시지를_반환한다() throws Exception {
        // given
        Long chatRoomId = 1L;
        String newTitle = "변경할 제목";

        doThrow(new ChatServiceException("채팅방 제목 변경 실패", chatRoomId, new RuntimeException()))
                .when(chatService).updateChatRoomTitle(chatRoomId, newTitle);

        // when & then
        mockMvc.perform(patch("/chat/{chatRoomId}", chatRoomId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"" + newTitle + "\"}"))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.message").value("채팅방 제목 변경 실패. chatRoomId=" + chatRoomId));
    }

    @Test
    void 존재하지_않는_채팅방의_제목을_변경하려는_경우_404_Not_Found와_에러_메시지를_반환한다() throws Exception {
        // given
        Long chatRoomId = 999L;
        String newTitle = "변경할 제목";
        String context = ErrorMessages.CHAT_UPDATE_TITLE_FAILED;

        doThrow(new ChatRoomNotFoundException(chatRoomId, context))
                .when(chatService).updateChatRoomTitle(chatRoomId, newTitle);

        // when & then
        mockMvc.perform(patch("/chat/{chatRoomId}", chatRoomId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"" + newTitle + "\"}"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message")
                        .value("[" + context + "] 존재하지 않는 채팅방입니다. chatRoomId=" + chatRoomId));
    }

}
