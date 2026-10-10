/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Compass, ShieldCheck, Calendar } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

interface AssistantProps {
  onOpenBooking?: () => void;
}

export const Assistant: React.FC<AssistantProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Welcome to LevelUp Travel. I am your Advisory Concierge. How may I assist your upcoming international journey or visa preparation?',
      timestamp: Date.now(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    try {
      const history = messages.map((m) => ({ role: m.role, text: m.text }));
      const responseText = await sendMessageToGemini(history, userMsg.text);

      const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      // Handled
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="bg-[#FAF8F5] shadow-2xl w-[90vw] sm:w-[380px] h-[520px] mb-4 flex flex-col overflow-hidden border border-ivory-300 animate-slide-up-fade">
          {/* Header */}
          <div className="bg-navy-900 text-ivory-100 p-4 border-b border-gold-500/30 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
              <div>
                <span className="font-serif text-sm tracking-wide text-ivory-50 block leading-tight">
                  LevelUp Advisory Concierge
                </span>
                <span className="text-[10px] text-gold-300 font-mono tracking-wider block">
                  Visa & Travel Guidance
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-ivory-300 hover:text-white transition-colors p-1"
              aria-label="Close concierge"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages list */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-light">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-navy-900 text-ivory-100 rounded-none'
                      : 'bg-white text-navy-950 border border-ivory-200 shadow-sm rounded-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-white p-3 border border-ivory-200 shadow-sm flex items-center gap-1.5 text-charcoal/50 text-xs">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Quick Consultation Booking prompt */}
          {onOpenBooking && (
            <div className="px-4 py-2 bg-ivory-100 border-t border-ivory-200 flex items-center justify-between">
              <span className="text-[10px] font-mono text-charcoal/60">
                Ready to meet with an advisor?
              </span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking();
                }}
                className="text-[10px] font-mono uppercase text-gold-600 hover:text-navy-900 font-semibold flex items-center gap-1"
              >
                <Calendar className="w-3 h-3" />
                Book Now
              </button>
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-ivory-200 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about visas, checklists, appointments..."
              className="flex-1 bg-ivory-50 border border-ivory-200 px-3 py-2 text-xs text-navy-900 focus:outline-none focus:border-gold-500"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isThinking}
              className="bg-navy-900 hover:bg-gold-500 hover:text-navy-950 text-ivory-100 px-3 py-2 text-xs transition-colors disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Concierge Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 px-4 py-3 bg-navy-900 hover:bg-gold-500 hover:text-navy-950 text-ivory-100 shadow-xl border border-gold-500/40 flex items-center gap-2.5 transition-all duration-300 group"
        aria-label="Toggle concierge assistant"
      >
        <MessageSquare className="w-4 h-4 text-gold-400 group-hover:text-navy-950 transition-colors" />
        <span className="text-xs font-serif hidden sm:inline">Advisory Concierge</span>
      </button>
    </div>
  );
};
export default Assistant;
