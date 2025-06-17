package com.zoop.chat.dto;

import com.zoop.chat.type.SenderType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MessageDto {

    private int order;
    @Setter
    private Long chatRoomId;
    private Long messageId;
    private String content;
    private SenderType senderType;
    private LocalDateTime createdAt;

    public MessageDto(Long chatRoomId, SenderType senderType, String aiReply) {
        this.chatRoomId = chatRoomId;
        this.senderType = senderType;
        this.content = aiReply;
    }

    public void updateMessageInfo(Long messageId, LocalDateTime createdAt) {
        this.messageId = messageId;
        this.createdAt = createdAt;
    }

}
