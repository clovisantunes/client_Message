import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';

const myId = uuidv4();
const socket = io("http://localhost:8080");
socket.on("connect", () =>
  console.log("[io] Connect => A new connection established")
);

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chat.message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => {
      socket.off("chat.message");
    };
  }, [messages]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: myId,
        message: message.trim(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit("chat.message", newMessage);
      setMessage("");
    }
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <main className="container">
      <ul className="list">
        {messages.map((m, index) => (
          <li className={`list__item list__item--${m.id ===myId ? 'mine' : 'other' }`} key={index}>
            <span className={`message message--${m.id === myId ? 'mine' : 'other'}`}>{m.message}</span>
          </li>
        ))}
      </ul>
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          className="form__field"
          placeholder="Type a new message here"
          type="text"
          onChange={handleInputChange}
          value={message}
        />
      </form>
    </main>
  );
};

export default Chat;
