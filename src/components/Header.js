// src/components/Header.js
import React from 'react';
import './Header.css'; // Add your styles

const Header = () => {
  return (
    <header className="header">
      <img src="/logo.png" alt="Agri Chatbot" className="logo" />
      <h1>Agricultural Chatbot</h1>
    </header>
  );
};

export default Header;
