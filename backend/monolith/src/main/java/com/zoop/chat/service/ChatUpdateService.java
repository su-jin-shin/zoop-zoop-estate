package com.zoop.chat.service;

import com.zoop.chat.dto.MessageDto;
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

    private final Map<Long, List<DeferredResult<MessageDto>>> chatListeners = new ConcurrentHashMap<>();

    public void register(Long chatRoomId, DeferredResult<MessageDto> result) {
        chatListeners.computeIfAbsent(chatRoomId, k -> new ArrayList<>()).add(result);

        result.onCompletion(() -> {
            // 완료되면 리스트에서 제거
            chatListeners.get(chatRoomId).remove(result);
        });
    }

    public void notifyNewMessage(MessageDto message) {
        List<DeferredResult<MessageDto>> listeners = chatListeners.get(message.getChatRoomId());
        if (listeners != null) {
            for (DeferredResult<MessageDto> listener : listeners) {
                listener.setResult(message); // 메시지 전달
            }
            listeners.clear(); // 한 번 전달한 후 비워줘야 함
        }
    }
}

