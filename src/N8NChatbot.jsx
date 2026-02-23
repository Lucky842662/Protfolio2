import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaPaperPlane, FaTimes } from "react-icons/fa";
import "./N8NChatbot.css";

const Chatbot = ({
  // Optional: override backend URL from parent
  webhookUrl,
  title = "Sophia",
  primaryColor = "#6366f1",
  welcomeMessage = "Hi! I'm Sophia, Lucky's AI assistant. How can I help you today?"
}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: welcomeMessage }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [sessionId] = useState(() => "session_" + Date.now());
  const [errorMessage, setErrorMessage] = useState("");

  // Prefer prop → env var → localhost fallback
  const resolvedWebhookUrl =
    webhookUrl ||
    import.meta.env?.VITE_CHAT_WEBHOOK_URL ||
    "http://localhost:5000/chat";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Clear previous errors when sending a new message
    if (errorMessage) setErrorMessage("");

    const userMessage = inputValue.trim();

    const updatedMessages = [
      ...messages,
      { role: "user", content: userMessage }
    ];

    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch(resolvedWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          sessionId: sessionId
        })
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();

      if (!data || typeof data.reply !== "string") {
        throw new Error("Invalid response from server");
      }

      setMessages(prev => [
        ...prev,
        { role: "assistant", content: data.reply }
      ]);

    } catch (error) {
      console.error("Chat error:", error);
      setErrorMessage("Server error. Please try again.");
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ I’m having trouble reaching the server. Please try again."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
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
            <div
              className="chat-header"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, #8b5cf6)`
              }}
            >
              <h3>{title}</h3>
              <button onClick={() => setIsOpen(false)}>×</button>
            </div>

            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`message ${msg.role}`}>
                  {msg.content}
                </div>
              ))}
              {isLoading && <div className="typing">...</div>}
              {errorMessage && (
                <div className="error-message">
                  {errorMessage}
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

export default Chatbot;
