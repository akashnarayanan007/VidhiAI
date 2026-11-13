import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Send, Mic,
  BookOpen, BookmarkPlus, Save, Search, Scale,
} from 'lucide-react';
import { sendMessage, SUGGESTED_QUESTIONS } from '../services/botService';
import { searchLaws } from '../services/lawService';
import { useNavigate } from 'react-router-dom';

function NyayaBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const inputRef = useRef(null);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev + ' ' + transcript);
    };

    recognition.start();
    recognitionRef.current = recognition;
  }, []);

  const handleInputChange = useCallback((e) => {
    const val = e.target.value;
    setInput(val);
    if (val.trim().length >= 2) {
      const results = searchLaws(val);
      setSuggestions(results.slice(0, 8));
      setShowAutocomplete(results.length > 0);
    } else {
      setShowAutocomplete(false);
    }
  }, []);

  const handleSend = useCallback(async (text) => {
    const msg = (text || input).trim();
    if (!msg) return;

    setShowAutocomplete(false);
    setShowSuggestions(false);
    setInput('');

    const userMsg = { role: 'user', content: msg };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const reply = await sendMessage(msg, history);
      setMessages(prev => [...prev, { role: 'assistant', content: reply, lawId: extractLawId(reply) }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I encountered an error connecting. Please make sure the Nyaya Bot server is running (`node server/server.js`) and try again.\n\n*Consult a lawyer for actual legal advice.*',
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, messages]);

  const handleSuggestedClick = (q) => {
    handleSend(q);
  };

  const handleAutocompleteClick = (law) => {
    const q = `Explain ${law.sectionNumber} ${law.title}`;
    setInput(q);
    setShowAutocomplete(false);
    handleSend(q);
  };

  const handleOpenLaw = (lawId) => {
    if (lawId) {
      setIsOpen(false);
      navigate(`/law/${lawId}`);
    }
  };

  const handleSaveAnswer = (content) => {
    const lines = content.split('\n');
    const title = lines[0]?.replace(/\*\*/g, '').trim() || 'Nyaya Bot Answer';
    const savedAnswers = JSON.parse(localStorage.getItem('nyaya-saved-answers') || '[]');
    savedAnswers.unshift({ title, content, date: new Date().toISOString() });
    localStorage.setItem('nyaya-saved-answers', JSON.stringify(savedAnswers.slice(0, 50)));
    alert('Answer saved! 📝');
  };

  const handleAddToStudyList = (content, lawId) => {
    if (lawId) {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      if (!bookmarks.includes(lawId)) {
        bookmarks.push(lawId);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      }
      alert('Added to study list! 🎯');
    } else {
      handleSaveAnswer(content);
    }
  };

  function extractLawId(text) {
    const match = text.match(/bns-sec-\d+|con-art-\d+|bnss-sec-\d+|bsa-sec-\d+|cpc-sec-\d+|contract-sec-\d+|tpa-sec-\d+|ipc-sec-\d+|itact-sec-\d+|mvact-sec-\d+|pocso-sec-\d+|rti-sec-\d+|cpa-sec-\d+|ni-sec-\d+|arb-sec-\d+|partnership-sec-\d+|succession-sec-\d+|limitation-sec-\d+|sra-sec-\d+|factories-sec-\d+|env-sec-\d+|companies-sec-\d+|cgst-sec-\d+|it-sec-\d+|idact-sec-\d+|mwact-sec-\d+|pwact-sec-\d+|dv-sec-\d+|hma-sec-\d+|sma-sec-\d+/g);
    if (match) return match[0];
    const fallback = text.match(/id['":]\s*['"](\w+-\w+-\d+)/);
    return fallback?.[1] || null;
  }

  function formatMessage(content) {
    return content
      .split(/\n{2,}/)
      .map(block => {
        if (block.startsWith('**') && block.includes('** —')) {
          return `<div class="bot-msg-heading">${block.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</div>`;
        }
        if (block.match(/^\d\.\s/)) {
          const lines = block.split('\n');
          return `<div class="bot-msg-list">${lines.map(l => {
            const m = l.match(/^(\d+\.\s\*\*.*?\*\*)(.*)/);
            if (m) return `<p class="bot-msg-list-item"><span>${m[1].replace(/\*\*/g, '')}</span>${m[2]}</p>`;
            return `<p>${l.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}</p>`;
          }).join('')}</div>`;
        }
        const lines = block.split('\n').filter(Boolean);
        const listItems = lines.filter(l => l.startsWith('- ') || l.startsWith('* '));
        if (listItems.length === lines.length && lines.length > 1) {
          return `<div class="bot-msg-bullets">${lines.map(l =>
            `<p>• ${l.replace(/^[-*]\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`
          ).join('')}</div>`;
        }
        return `<p>${block.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}</p>`;
      }).join('');
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="nyaya-fab"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Scale size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="nyaya-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="nyaya-container"
              initial={{ y: 60, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="nyaya-header">
                <div className="nyaya-header-info">
                  <div className="nyaya-avatar">
                    <Scale size={22} />
                  </div>
                  <div>
                    <div className="nyaya-title">Nyaya Bot</div>
                    <div className="nyaya-subtitle">Your AI Legal Assistant</div>
                  </div>
                </div>
                <button className="nyaya-close-btn" onClick={() => setIsOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <div className="nyaya-search-bar">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search by section, law name, or describe your situation..."
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !showAutocomplete) handleSend();
                  }}
                  ref={inputRef}
                />
              </div>

              <div className="nyaya-messages">
                {showAutocomplete && suggestions.length > 0 && (
                  <div className="nyaya-autocomplete">
                    {suggestions.map((law, i) => (
                      <button
                        key={law.id || i}
                        className="nyaya-autocomplete-item"
                        onClick={() => handleAutocompleteClick(law)}
                      >
                        <BookOpen size={14} />
                        <span><strong>{law.sectionNumber}</strong> — {law.title}</span>
                      </button>
                    ))}
                  </div>
                )}

                {messages.length === 0 && showSuggestions && !showAutocomplete && (
                  <div className="nyaya-welcome">
                    <div className="nyaya-welcome-icon">
                      <Scale size={48} />
                    </div>
                    <h3>How can I help you today?</h3>
                    <p>Ask me about Indian laws, legal scenarios, or UPSC preparation.</p>
                    <div className="nyaya-suggestions">
                      {SUGGESTED_QUESTIONS.slice(0, 8).map((q, i) => (
                        <button
                          key={i}
                          className="nyaya-suggestion-chip"
                          onClick={() => handleSuggestedClick(q)}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div key={i} className={`nyaya-msg ${msg.role === 'user' ? 'user' : 'bot'}`}>
                    {msg.role === 'assistant' && (
                      <div className="nyaya-msg-avatar">
                        <Scale size={14} />
                      </div>
                    )}
                    <div className="nyaya-msg-content">
                      {msg.role === 'assistant' ? (
                        <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
                      ) : (
                        <p>{msg.content}</p>
                      )}
                      {msg.role === 'assistant' && (
                        <div className="nyaya-msg-actions">
                          {msg.lawId && (
                            <button
                              className="nyaya-action-btn"
                              onClick={() => handleOpenLaw(msg.lawId)}
                              title="Open Full Law"
                            >
                              <BookOpen size={14} /> <span>Open Full Law</span>
                            </button>
                          )}
                          <button
                            className="nyaya-action-btn"
                            onClick={() => handleAddToStudyList(msg.content, msg.lawId)}
                            title="Add to Study List"
                          >
                            <BookmarkPlus size={14} /> <span>Study List</span>
                          </button>
                          <button
                            className="nyaya-action-btn"
                            onClick={() => handleSaveAnswer(msg.content)}
                            title="Save Answer"
                          >
                            <Save size={14} /> <span>Save</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="nyaya-msg bot">
                    <div className="nyaya-msg-avatar">
                      <Scale size={14} />
                    </div>
                    <div className="nyaya-msg-content">
                      <div className="nyaya-typing">
                        <span className="nyaya-typing-dot" />
                        <span className="nyaya-typing-dot" />
                        <span className="nyaya-typing-dot" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              <div className="nyaya-input-bar">
                <button className="nyaya-mic-btn" onClick={startListening} title="Voice input">
                  <Mic size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Type your legal question..."
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSend();
                  }}
                />
                <button
                  className="nyaya-send-btn"
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                >
                  <Send size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default NyayaBot;
