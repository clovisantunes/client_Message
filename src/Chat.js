import React, { useState } from "react";

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);


  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        message: message
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };


  const handleInputChange = (event) => setMessage(event.target.value);

  return (
    <main className="container">
      <ul className="list">
        {messages.map((m) => (
          <li className="list__item list__item--mine">
            <span className="message message--mine" key={m.id}>
              {m.message}
            </span>
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
