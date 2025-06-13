package com.zoop.chat.dto;

import com.zoop.chat.type.SenderType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {

    private Long userId;
    @Setter
    private Long chatRoomId;
    private Long messageId;
    private String content;
    private SenderType senderType;
    private LocalDateTime createdAt;

    public MessageDto(Long chatRoomId) {
        this.chatRoomId = chatRoomId;
    }

}
