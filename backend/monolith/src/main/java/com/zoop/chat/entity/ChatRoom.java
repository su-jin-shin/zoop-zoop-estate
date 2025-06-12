package com.zoop.chat.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "chat_room")
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long chatRoomId;

    @Column
    private Long userId;

    @Column(columnDefinition = "TEXT")
    private String title = "new chat";

    @Column
    private LocalDateTime titleUpdatedAt;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime lastMessageAt;

    @Column(nullable = false)
    private boolean isDeleted;

    @Column
    private LocalDateTime deletedAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (lastMessageAt == null) lastMessageAt = LocalDateTime.now();
    }

}
