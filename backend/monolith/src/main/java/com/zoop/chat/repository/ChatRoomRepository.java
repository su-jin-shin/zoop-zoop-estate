package com.zoop.chat.repository;

import com.zoop.chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    // 채팅방 삭제
    @Modifying
    @Query("UPDATE ChatRoom c SET c.isDeleted = true, c.deletedAt = :now WHERE c.chatRoomId = :chatRoomId")
    void softDeleteChatRoom(@Param("chatRoomId") Long chatRoomId, @Param("now")LocalDateTime now);
    
    // 채팅방 목록 조회
    @Query("SELECT c FROM ChatRoom c WHERE c.userId = :userId AND c.isDeleted = false ORDER BY c.lastMessageAt DESC")
    List<ChatRoom> findChatRoomsByUserId(@Param("userId") Long userId);

}
