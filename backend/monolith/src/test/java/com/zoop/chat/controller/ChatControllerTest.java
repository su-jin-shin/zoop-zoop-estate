package com.zoop.chat.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zoop.chat.dto.MessageDto;
import com.zoop.chat.service.ChatService;
import com.zoop.chat.type.SenderType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ChatController.class)
@Import(ChatControllerTest.MockServiceConfig.class) // 직접 만든 테스트 설정 import
public class ChatControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ChatService chatService; // 등록한 mock

    @Autowired
    private ObjectMapper objectMapper;

    @TestConfiguration
    static class MockServiceConfig {
        @Bean
        public ChatService chatService() {
            return mock(ChatService.class); // Mockito mock 직접 주입
        }
    }

    @Test
    void 채팅방_없으면_생성후_아이디_반환() throws Exception {
        // given
        long userId = 123L;
        long generatedChatRoomId = 1L;

        MessageDto request = MessageDto.builder()
                .chatRoomId(null)
                .userId(userId)
                .senderType(SenderType.USER)
                .content("안녕하세요")
                .build();

        when(chatService.createChatRoom(userId)).thenReturn(generatedChatRoomId);

        // when & then
        mockMvc.perform(post("/chat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.chatRoomId").value(generatedChatRoomId))
                .andExpect(jsonPath("$.messageId").value(0))
                .andExpect(jsonPath("$.createdAt").exists());

        verify(chatService, times(1)).createChatRoom(userId); // chatService.createChatRoom(userId) 메서드가 정확히 1번 호출되었는지 검증
    }

    @Test
    void 채팅방_이미_있으면_생성_하지_않는다() throws Exception {
        // given
        long existingChatRoomId = 99L;
        long userId = 123L;

        MessageDto request = MessageDto.builder()
                .chatRoomId(existingChatRoomId)  // 이미 채팅방 ID가 존재함
                .userId(userId)
                .senderType(SenderType.USER)
                .content("이미 있는 방에서 보낸 메시지")
                .build();

        // when & then
        mockMvc.perform(post("/chat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.chatRoomId").value(existingChatRoomId))
                .andExpect(jsonPath("$.messageId").value(0))
                .andExpect(jsonPath("$.createdAt").exists());

        // createChatRoom은 호출되면 안 됨
        verify(chatService, never()).createChatRoom(anyLong());
    }

}
