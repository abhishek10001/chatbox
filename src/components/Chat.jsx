// import { useEffect, useState } from "react";
// import { addDoc, collection, onSnapshot, serverTimestamp, query, where, orderBy } from "firebase/firestore";
// import { auth, db } from "../firebase-config";
// import "../styles/chat.css";
// const Chat = ({ room }) => {
//   const [newMessage, setNewMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   const messageRef = collection(db, "messages");// refernce to the collection

//   useEffect(() => {
//     const queryMessages = query(messageRef, where("room", "==", room),orderBy("createdAt"));
//    const unsubscribe= onSnapshot(queryMessages, (snapshot) => {
//       let mssg = [];
//       snapshot.forEach((doc) => {
//         mssg.push({ ...doc.data(), id: doc.id });
//       });
//       setMessages(mssg);
//     });

//     return ()=>unsubscribe(); // for closing useEffects
//   }, []);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (newMessage === "") {
//       return;
//     }
//     else {
//       await addDoc(messageRef, {
//         // structure passing to the database
//         text: newMessage,
//         createdAt: serverTimestamp(),
//         userName: auth.currentUser.displayName,
//         room
//       });
//       setNewMessage("");
//     }
//   }

//   return (
//     <div className="chat-app">

//       <div className="header">

//         <h1>Welcome To: {room.toUpperCase()}</h1>

//       </div>

//       <div className="messages">{messages.map((message) => (
//         <div key={message.id} className="message">
//           <span className="user">{message.userName}:</span> {message.text}
//           <span className="timestamp">
//               {new Date(message.createdAt?.toDate()).toLocaleString()}
//             </span>
//         </div>
//       ))}</div>
//       <form onSubmit={handleSubmit}>
//         <input className="new-message-input"
//           placeholder="Type Your Message..."
//           onChange={(e) => setNewMessage(e.target.value)}
//           value={newMessage}
//         />
//         <button type="submit" className="send-button" >Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chat;



import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import "../styles/chat.css";

 const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
          <span className="user">{message.userName}:</span>{message.text}
          <span className="timestamp">
        {new Date(message.createdAt?.toDate()).toLocaleString()}
                  </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;