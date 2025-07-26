
import React, { useState } from 'react';
import axios from 'axios';

const models = ["openai", "gemini", "claude"];

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [model, setModel] = useState("openai");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    const res = await axios.post('http://localhost:5000/api/chat', { prompt: input, model });
    setMessages([...newMessages, { sender: 'bot', text: res.data.reply }]);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Multi-AI Chatbot</h1>
      <select value={model} onChange={(e) => setModel(e.target.value)} className="mb-4 p-2 border rounded">
        {models.map((m) => <option key={m} value={m}>{m.toUpperCase()}</option>)}
      </select>
      <div className="border rounded p-4 h-96 overflow-y-auto bg-gray-100 mb-4">
        {messages.map((m, idx) => (
          <div key={idx} className={`mb-2 ${m.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className="block px-3 py-2 bg-white rounded shadow">{m.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-grow px-3 py-2 border rounded"
          placeholder="Ask something..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
      </div>
    </div>
  );
}

export default App;
