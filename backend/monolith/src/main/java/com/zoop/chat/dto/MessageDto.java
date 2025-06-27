package com.zoop.chat.dto;

import com.zoop.chat.type.SenderType;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class MessageDto {

    private int order;
    private Long chatRoomId;
    private Long messageId;
    private String content;
    private SenderType senderType;
    private List<PropertyDto> properties;
    private LocalDateTime createdAt;

}
