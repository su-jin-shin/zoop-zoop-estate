export interface SendMessageRequest {
  userId: number;
  content: string;
  chatRoomId?: number;
}

export interface SendMessageResponse {
  chatRoomId: number;
  messageId: number;
  createdAt: string;
}

export async function sendMessageToServer(
  content: string,
  userId: number,
  isUser: boolean,
  chatRoomId?: number,
): Promise<SendMessageResponse> {
  const senderType = isUser ? "USER" : "CHATBOT";

  const res = await fetch("http://localhost:8080/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userId, content, chatRoomId, senderType })
  });

  if (!res.ok) {
    throw new Error("Failed to send message to server");
  }

  return await res.json(); // { chatRoomId, messageId, createdAt }
}