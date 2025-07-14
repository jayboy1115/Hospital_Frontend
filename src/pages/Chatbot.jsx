// src/pages/Chatbot.jsx
import React, { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    // Here you would call your backend chatbot API and add the bot's response
    setTimeout(() => {
      setMessages(msgs => [...msgs, { sender: 'bot', text: 'This is a sample response.' }]);
    }, 500);
    setInput('');
  };

  return (
    <div>
      <h2>Chatbot</h2>
      <div style={{border:'1px solid #ccc', padding:10, height:200, overflowY:'auto', marginBottom:10}}>
        {messages.map((msg, i) => (
          <div key={i} style={{textAlign: msg.sender==='bot'?'left':'right'}}>
            <b>{msg.sender}:</b> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type your message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
