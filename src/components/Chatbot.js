// src/components/Chatbot.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Message from './Message';
import Loader from './Loader';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUserMessage = (message) => {
    // Add user message to state
    setMessages([...messages, { text: message, from: 'user' }]);
    setLoading(true);
    
    // Simulate a chatbot response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Here is the information you requested.', from: 'bot' }
      ]);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((msg, index) => (
          <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Message message={msg} />
          </motion.div>
        ))}
        {loading && <Loader />}
      </div>
      <input 
        type="text" 
        onKeyDown={(e) => e.key === 'Enter' && handleUserMessage(e.target.value)} 
        placeholder="Type a message..." 
      />
    </div>
  );
};

export default Chatbot;
