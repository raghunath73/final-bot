// src/components/Message.js
import React from 'react';

const Message = ({ message }) => {
  return (
    <div className={`message ${message.from}`}>
      {message.text}
    </div>
  );
};

export default Message;
