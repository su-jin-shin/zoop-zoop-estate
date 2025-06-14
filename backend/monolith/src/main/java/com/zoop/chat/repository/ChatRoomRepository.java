package com.zoop.chat.repository;

import com.zoop.chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    @Modifying
    @Query("UPDATE ChatRoom c SET c.isDeleted = true, c.deletedAt = :now WHERE c.chatRoomId = :chatRoomId")
    void softDeleteChatRoom(@Param("chatRoomId") Long chatRoomId, @Param("now")LocalDateTime now);

}
