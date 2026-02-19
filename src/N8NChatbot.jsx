import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa';
import './N8NChatbot.css';

const N8NChatbot = ({ 
  webhookUrl,
  title = "Sophia",
  primaryColor = "#6366f1",
  welcomeMessage = "Hi! I'm Sophia, Lucky's AI assistant. How can I help you today?"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: welcomeMessage }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [sessionId] = useState(() => 'session_' + Date.now());

  // Fallback URL if none is provided from the parent.
  // Prefer passing `webhookUrl` from `App.jsx` so environments can differ.
  const defaultWebhookUrl =
    'https://webkikservices1.app.n8n.cloud/webhook/327ab0df-00f3-4d17-9181-61a81854b208/chat';

  const resolvedWebhookUrl = (webhookUrl || defaultWebhookUrl || '').trim();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    try {
      if (!/^https?:\/\//i.test(resolvedWebhookUrl)) {
        throw new Error('Invalid webhookUrl (must start with http:// or https://)');
      }

      console.log('Sending to:', resolvedWebhookUrl);

      const response = await fetch(resolvedWebhookUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatInput: userMessage,
          sessionId: sessionId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || '';
      const data = contentType.includes('application/json')
        ? await response.json()
        : await response.text();

      // Get response text from various possible formats
      const reply =
        (typeof data === 'string' && data) ||
        data?.output ||
        data?.response ||
        data?.message ||
        JSON.stringify(data);
      
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, connection issue. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <motion.div 
        className="chat-bubble"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{ backgroundColor: primaryColor }}
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chat-window"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="chat-header" style={{ background: `linear-gradient(135deg, ${primaryColor}, #8b5cf6)` }}>
              <h3>{title}</h3>
              <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
            </div>

            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`message ${msg.role}`}>
                  <div className="message-content">{msg.content}</div>
                </div>
              ))}
              {isLoading && (
                <div className="message assistant">
                  <div className="typing">...</div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-container">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                disabled={isLoading}
              />
              <button 
                onClick={sendMessage} 
                disabled={isLoading || !inputValue.trim()}
                style={{ backgroundColor: primaryColor }}
              >
                <FaPaperPlane />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default N8NChatbot;