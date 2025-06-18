package com.zoop.chat.service;

import com.zoop.chat.dto.MessageRequestDto;
import com.zoop.chat.dto.MessageResponseDto;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ChatUpdateService {

    private final Map<Long, List<DeferredResult<MessageResponseDto>>> chatListeners = new ConcurrentHashMap<>();

    public void register(Long chatRoomId, DeferredResult<MessageResponseDto> result) {
        chatListeners.computeIfAbsent(chatRoomId, k -> new ArrayList<>()).add(result);

        result.onCompletion(() -> {
            // 완료되면 리스트에서 제거
            chatListeners.get(chatRoomId).remove(result);
        });
    }

    public void notifyNewMessage(MessageResponseDto messageResponseDto) {
        List<DeferredResult<MessageResponseDto>> listeners = chatListeners.get(messageResponseDto.getChatRoomId());
        if (listeners != null) {
            for (DeferredResult<MessageResponseDto> listener : listeners) {
                listener.setResult(messageResponseDto); // 메시지 전달
            }
            listeners.clear(); // 한 번 전달한 후 비워줘야 함
        }
    }
}

