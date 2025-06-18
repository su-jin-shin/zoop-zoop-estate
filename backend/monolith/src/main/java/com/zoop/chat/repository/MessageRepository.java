package com.zoop.chat.repository;

import com.zoop.chat.entity.Message;
import com.zoop.chat.type.SenderType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    @Modifying
    @Query("UPDATE Message m SET m.deletedAt = :now WHERE m.chatRoom.chatRoomId = :chatRoomId")
    void softDeleteMessages(@Param("chatRoomId") Long chatRoomId, @Param("now") LocalDateTime now);

    @Query("SELECT m FROM Message m WHERE m.chatRoom.chatRoomId = :chatRoomId")
    List<Message> getMessagesByChatRoomId(@Param("chatRoomId") Long chatRoomId);

    Message findTop1ByChatRoom_ChatRoomIdAndSenderTypeOrderByCreatedAtDesc(Long chatRoomId, SenderType senderType);

}
