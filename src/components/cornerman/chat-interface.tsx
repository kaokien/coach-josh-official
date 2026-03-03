'use client';

import { useChat, type UIMessage } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Helper function - placed outside the component
function getMessageContent(message: UIMessage): string {
  if (message.parts && message.parts.length > 0) {
    return message.parts
      .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
      .map(part => part.text)
      .join('');
  }
  return (message as unknown as { content?: string }).content ?? '';
}

export default function ChatInterface() {
  const [input, setInput] = useState('');

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  const isLoading = status === 'streaming' || status === 'submitted';
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput('');
  };

  // Quick prompt suggestions
  const QUICK_PROMPTS = [
    { label: 'Critique my jab', prompt: 'What are the most common mistakes people make with their jab and how do I fix them?' },
    { label: 'Pre-fight routine', prompt: 'Give me a pre-fight mental preparation routine I can do before sparring or competition.' },
    { label: 'Defense drills', prompt: 'What are the best drills I can do at home to improve my head movement and slipping?' },
    { label: 'Combination ideas', prompt: 'Give me 5 effective punch combinations for boxing that flow well together.' },
    { label: 'Breathing technique', prompt: 'How should I breathe properly during boxing? When to exhale and inhale?' },
    { label: 'Southpaw tips', prompt: 'How do I fight against a southpaw opponent? What adjustments should I make?' },
  ];

  const handleQuickPrompt = (prompt: string) => {
    sendMessage({ text: prompt });
  };

  return (
    <div className="flex flex-col h-full w-full bg-white relative">
      {/* Header removed to avoid duplication with parent container */}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FFFFFF]/20">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Bot className="w-16 h-16 mb-4 text-[#0F172A] opacity-50" />
            <p className="font-display text-2xl uppercase text-[#0F172A] mb-2">Corner Man Ready</p>
            <p className="font-body text-sm max-w-xs text-[#0F172A]/60 mb-6">Ask me about combinations, defense, or fight strategy.</p>

            {/* Quick Prompts */}
            <div className="w-full max-w-md">
              <p className="font-display text-xs uppercase tracking-widest text-[#0F172A]/40 mb-3">Quick Questions</p>
              <div className="grid grid-cols-2 gap-2">
                {QUICK_PROMPTS.map((qp, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickPrompt(qp.prompt)}
                    className="p-3 text-left bg-white border-2 border-[#0F172A]/20 hover:border-[#2563EB] hover:bg-[#2563EB]/5 transition-all text-sm font-body"
                  >
                    <span className="text-[#2563EB]">→</span> {qp.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-100 border-2 border-red-500 text-red-700 font-body text-sm">
            {error.message?.includes('rate limit') || error.message?.includes('429')
              ? "You've reached your monthly question limit. Resets on the 1st."
              : "Something went wrong. Please try again."}
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "flex gap-4 max-w-[85%]",
                m.role === 'user' ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-8 h-8 flex-shrink-0 flex items-center justify-center border-2 border-[#0F172A]",
                m.role === 'user' ? "bg-white" : "bg-[#0F172A]"
              )}>
                {m.role === 'user' ? (
                  <User size={16} className="text-[#0F172A]" />
                ) : (
                  <Bot size={16} className="text-white" />
                )}
              </div>

              <div className={cn(
                "p-4 border-2 border-[#0F172A] text-sm font-body leading-relaxed shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]",
                m.role === 'user'
                  ? "bg-[#2563EB] text-white"
                  : "bg-white text-[#0F172A]"
              )}>
                {/* Using the helper function here */}
                <p className="whitespace-pre-wrap">{getMessageContent(m)}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4 max-w-[85%]"
          >
            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center border-2 border-[#0F172A] bg-[#0F172A]">
              <Bot size={16} className="text-white" />
            </div>
            <div className="p-4 border-2 border-[#0F172A] bg-white flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#2563EB]" />
              <span className="font-display text-xs uppercase tracking-widest text-[#0F172A]/60">Coach is thinking...</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t-2 border-[#0F172A]">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            aria-label="Chat message input"
            className="flex-1 bg-[#FFFFFF]/30 border-2 border-[#0F172A] p-4 font-body text-sm focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-[#0F172A]/30"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input?.trim()}
            aria-label="Send message"
            className="bg-[#0F172A] text-white border-2 border-[#0F172A] px-6 hover:bg-[#2563EB] disabled:opacity-50 disabled:hover:bg-[#0F172A] transition-colors flex items-center justify-center min-w-[60px]"
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
