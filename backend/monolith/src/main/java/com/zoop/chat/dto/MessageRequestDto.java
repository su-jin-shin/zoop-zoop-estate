package com.zoop.chat.dto;

import com.zoop.chat.type.SenderType;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MessageRequestDto {

    @Setter
    private Long chatRoomId;
    private String content;
    private SenderType senderType;

}
