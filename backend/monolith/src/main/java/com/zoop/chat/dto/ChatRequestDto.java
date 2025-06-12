package com.zoop.chat.dto;

import com.zoop.chat.type.SenderType;
import lombok.Getter;

@Getter
public class ChatRequestDto {
    private Long userId;
    private Long chatRoomId;
    private String content;
    private SenderType senderType;
}
