// src/hooks/useMessagesListener.js
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../Firebase/Firebase";


 
export default function useMessagesListener(currentUserId) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    if (!currentUserId) return;

    const q = query(
      collection(db, "messages"),
      where("receiverID", "==", currentUserId),
      where("isRead", "==", false)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

      setUnreadCount(docs.length);

      // نحدد أحدث رسالة بحسب timestamp (لو موجود)
      if (docs.length > 0) {
        const latest = docs.reduce((a, b) => {
          const ta = a.timestamp?.seconds || 0;
          const tb = b.timestamp?.seconds || 0;
          return ta > tb ? a : b;
        }, docs[0]);
        setLatestMessage(latest);
      } else {
        setLatestMessage(null);
      }
    });

    return () => unsubscribe();
  }, [currentUserId]);

  return { unreadCount, latestMessage };
}
