import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Message from './components/Message';
import Loader from './components/Loader';
import './styles.css'; // Ensure you have your styles

function App() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input) return;

        // Add the user's message to the chat
        const userMessage = { sender: 'user', text: input };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setLoading(true); // Show loader

        try {
            // Send the user's message to the Flask backend
            const response = await axios.post('http://127.0.0.1:5000/chat', { message: input });
            console.log("Response from backend:", response.data); // Log the backend response

            // Add the bot's response to the chat
            const botMessage = { sender: 'bot', text: response.data.response };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error in sending message:', error);
        } finally {
            setLoading(false); // Hide loader
        }

        // Clear the input field
        setInput('');
    };

    return (
        <div className="App">
            <Header /> {/* Include your header component with logo */}
            <div className="chatbot">
                <div className="messages">
                    {messages.map((msg, index) => (
                        <Message key={index} message={msg} />
                    ))}
                    {loading && <Loader />} {/* Show loader if loading */}
                </div>

                <div className="input-section">
                    <input 
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message here"
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()} // Send on Enter key
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default App;
