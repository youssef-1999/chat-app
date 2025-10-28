// src/hooks/useMessagesListener.js
import { useEffect, useState } from "react";
import { db } from "../Firebase/Firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

/**
 * Hook: يعيد عدد الرسائل غير المقروءة وآخر رسالة وصلت للمستخدم الحالي
 * currentUserId: id المستخدم (مثال: "admin123" أو employeeId)
 */
export default function useMessagesListener(currentUserId) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    if (!currentUserId) return;

    // نجيب كل الرسائل الموجّهة للمستخدم واللي لسا مش مقروءة
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
