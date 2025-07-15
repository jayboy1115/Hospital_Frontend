// src/pages/Chatbot.jsx
import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { sendChatMessage } from '../api/chatbot';

export default function Chatbot() {
  const { token } = useAuth();
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setLoading(true);
    try {
      const res = await sendChatMessage(token, input);
      setMessages(msgs => [...msgs, { sender: 'bot', text: res.reply || 'No response.' }]);
    } catch {
      setMessages(msgs => [...msgs, { sender: 'bot', text: 'Sorry, there was an error.' }]);
    }
    setLoading(false);
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
        {loading && <div><i>Bot is typing...</i></div>}
      </div>
      <form onSubmit={sendMessage}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type your message..." disabled={loading} />
        <button type="submit" disabled={loading}>Send</button>
      </form>
    </div>
  );
}
