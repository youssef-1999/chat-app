import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  writeBatch,
  doc,
} from "firebase/firestore";
import { db } from "../../Firebase/Firebase";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const employeeId = localStorage.getItem("employeeId");
  const employeeName = localStorage.getItem("employeeName");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const currentUserId = isAdmin ? "admin123" : employeeId;
  const selectedUserId = isAdmin ? employeeId : "admin123";

  useEffect(() => {
    if (!currentUserId || !selectedUserId) return;

    const q = query(collection(db, "messages"), orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

      const msgs = docs.filter(
        (m) =>
          (m.senderID === currentUserId && m.receiverID === selectedUserId) ||
          (m.senderID === selectedUserId && m.receiverID === currentUserId)
      );

      setMessages(msgs);

      const unreadToMark = msgs.filter(
        (m) => m.receiverID === currentUserId && !m.isRead
      );

      if (unreadToMark.length > 0) {
        const batch = writeBatch(db);
        unreadToMark.forEach((m) => {
          const ref = doc(db, "messages", m.id);
          batch.update(ref, { isRead: true });
        });

        try {
          await batch.commit();
        } catch (err) {
          console.error("Failed to mark messages as read:", err);
        }
      }
    });

    return () => unsubscribe();
  }, [currentUserId, selectedUserId]);

  const handleSend = async () => {
    if (!message.trim() || !currentUserId || !selectedUserId) return;

    try {
      await addDoc(collection(db, "messages"), {
        senderID: currentUserId,
        receiverID: selectedUserId,
        message,
        timestamp: serverTimestamp(),
        isRead: false, 
      });
      setMessage("");
    } catch (err) {
      console.error("send message error:", err);
    }
  };

  // If IDs missing, show friendly text
  if (!currentUserId || !selectedUserId) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        {isAdmin
          ? "Please select an employee to start chatting."
          : "Waiting for admin to start the chat..."}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-2xl">
        <div className="p-4 border-b text-center font-semibold text-xl text-gray-800">
          {isAdmin ? `Chat with ${employeeName}` : "Chat with Admin"}
        </div>

        <div className="p-4 h-[500px] overflow-y-auto bg-gray-50">
          {messages.length === 0 ? (
            <p className="text-center text-gray-400 mt-20">No messages yet...</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.senderID === currentUserId ? "justify-end" : "justify-start"
                } mb-3`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[75%] ${
                    msg.senderID === currentUserId ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {msg.message}
                  <div className="text-[10px] text-gray-400 text-right mt-1">
                    {msg.timestamp?.seconds ? new Date(msg.timestamp.seconds * 1000).toLocaleString() : ""}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t flex gap-2">
          <input
            className="flex-1 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
