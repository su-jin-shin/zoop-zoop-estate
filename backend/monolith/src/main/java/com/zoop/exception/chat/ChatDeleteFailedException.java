package com.zoop.exception.chat;

public class ChatDeleteFailedException extends RuntimeException {
    public ChatDeleteFailedException(String message) {
        super(message);
    }
}
