'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Nav, Footer } from '../../components/Layout';
import { AvatarWithSpinRing } from '../../components/V2Components';

const MOCK_CHATS = [
  { id: 1, name: "SORA KIM", role: "3D ARTIST", msg: "LVMH assets uploaded to node.", time: "2m", active: true, unread: 2, status: 'delivered', archived: false },
  { id: 2, name: "VOLT MOTORS", role: "CLIENT", msg: "Reviewing the hypercar brand docs.", time: "1h", active: false, unread: 0, status: 'read', archived: false },
  { id: 3, name: "MARA JADE", role: "SQUAD LEAD", msg: "Code squad invitation pending.", time: "4h", active: false, unread: 0, status: 'read', archived: true },
  { id: 4, name: "ZANE GREY", role: "CREATOR", msg: "Where is the brutalist font file?", time: "1d", active: false, unread: 0, status: 'read', archived: false },
];

const MOCK_MESSAGES = [
  { id: 1, from: "SORA KIM", text: "Initializing the AW26 Room assets now. Expecting 4GB payload.", type: "node", time: "10:24 AM", date: "TODAY", seen: true, reactions: [] },
  { id: 2, from: "ME", text: "Received. The Verse engine is ready for ingestion.", type: "me", time: "10:26 AM", date: "TODAY", seen: true, reactions: ['⚡'] },
  { id: 3, from: "SORA KIM", text: "Payload transmission complete. Check the escrow release.", type: "node", time: "10:30 AM", date: "TODAY", seen: true, reactions: [] },
  { id: 4, from: "ME", text: "Reviewing metrics. Standby.", type: "me", time: "10:31 AM", date: "TODAY", seen: false, reactions: [] },
];

export default function MessageCenterPageV2() {
  const [selectedChat, setSelectedChat] = useState(MOCK_CHATS[0]);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isTyping, setIsTyping] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [MOCK_MESSAGES]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [inputText]);

  const filteredChats = MOCK_CHATS.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          chat.msg.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === "Unread") return matchesSearch && chat.unread > 0;
    if (activeFilter === "Archived") return matchesSearch && chat.archived;
    return matchesSearch && !chat.archived;
  });

  return (
    <div className="bg-[#05050a] text-white min-h-screen">
      <Nav />
      {/* Background Pulse */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-violet/5 blur-[120px] rounded-full pointer-events-none" />

      <main className="pt-[72px] h-screen flex border-t border-white/5 relative z-10">
        {/* Sidebar - Chat List */}
        <aside className="w-[450px] border-r border-white/5 bg-[#08080c] flex flex-col hidden lg:flex">
            <div className="p-10 space-y-8">
                <div className="flex justify-between items-center">
                    <h2 className="font-bebas text-3xl tracking-widest uppercase text-acid">INBOX</h2>
                    <button className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center hover:bg-acid hover:text-black transition-all">＋</button>
                </div>
                
                {/* Search & Filters */}
                <div className="space-y-6">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="SEARCH NODES..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/5 px-6 py-4 rounded-xl font-mono text-[10px] tracking-widest outline-none focus:border-acid transition-all"
                        />
                    </div>
                    <div className="flex gap-4 p-1 glass border border-white/5 rounded-xl">
                        {["All", "Unread", "Archived"].map(f => (
                            <button 
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`flex-1 py-2 rounded-lg font-mono text-[8px] uppercase tracking-widest transition-all ${activeFilter === f ? 'bg-white/10 text-white' : 'text-white/20 hover:text-white'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar py-6">
                {filteredChats.map(chat => (
                    <motion.div 
                        key={chat.id}
                        onClick={() => setSelectedChat(chat)}
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                        className={`px-10 py-8 cursor-pointer transition-all border-l-2 relative ${selectedChat.id === chat.id ? 'border-acid bg-white/[0.03]' : 'border-transparent'}`}
                    >
                        <div className="flex gap-6 items-center">
                            <div className="relative shrink-0">
                                <AvatarWithSpinRing src={`https://i.pravatar.cc/100?u=chat${chat.id}`} size="sm" />
                                {chat.active && <div className="absolute -top-1 -right-1 w-3 h-3 bg-acid rounded-full border-4 border-[#08080c]" />}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-clash font-bold text-[10px] tracking-widest uppercase">{chat.name}</span>
                                    <span className="font-mono text-[7px] text-white/20 uppercase tracking-widest">{chat.time}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className={`font-body text-xs truncate tracking-wide ${chat.unread > 0 ? 'text-white font-medium' : 'text-white/30'}`}>{chat.msg}</p>
                                    {chat.unread > 0 && <span className="ml-4 w-4 h-4 bg-acid text-black rounded-full flex items-center justify-center font-mono text-[7px] font-bold">{chat.unread}</span>}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </aside>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-ink/50 backdrop-blur-3xl">
            {/* Thread Header */}
            <header className="p-8 border-b border-white/5 flex justify-between items-center glass rounded-none border-x-0">
                 <div className="flex items-center gap-6">
                    <AvatarWithSpinRing src={`https://i.pravatar.cc/100?u=chat${selectedChat.id}`} size="sm" />
                    <div>
                        <h3 className="font-bebas text-2xl tracking-widest uppercase">{selectedChat.name}</h3>
                        <span className="font-mono text-[8px] text-white/20 uppercase tracking-[0.3em]">{selectedChat.role} // ONLINE_READY</span>
                    </div>
                 </div>
                 <div className="flex gap-3">
                    <button className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/40 hover:text-acid transition-colors">🎞️</button>
                    <button className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/40 hover:text-violet transition-colors">🧬</button>
                    <button className="px-6 h-10 glass rounded-full font-mono text-[8px] text-white/40 uppercase tracking-widest hover:text-white transition-all">Node Info</button>
                 </div>
            </header>

            {/* Messages Scroll */}
            <div className="flex-1 overflow-y-auto p-12 space-y-12 no-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                {MOCK_MESSAGES.map((msg, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex flex-col ${msg.type === 'me' ? 'items-end' : 'items-start'} group`}
                    >
                         <div className="flex items-baseline gap-4 mb-3 px-4">
                            <span className="font-mono text-[8px] text-white/10 uppercase tracking-widest">{msg.from}</span>
                            <span className="font-mono text-[8px] text-white/10">{msg.time}</span>
                         </div>
                         
                         <div className="relative max-w-[70%]">
                            {/* Message Bubble */}
                            <div 
                                className={`p-8 rounded-[32px] font-body text-sm leading-relaxed tracking-wide transition-all ${
                                    msg.type === 'me' 
                                    ? 'bg-gradient-to-br from-violet to-violet/60 text-white rounded-tr-none' 
                                    : 'bg-white/[0.03] border border-white/5 text-white/80 rounded-tl-none'
                                }`}
                            >
                                {msg.text}

                                {/* Reactions Container */}
                                {msg.reactions.length > 0 && (
                                    <div className={`absolute -bottom-4 ${msg.type === 'me' ? 'right-4' : 'left-4'} flex gap-1`}>
                                        {msg.reactions.map((r, ri) => (
                                            <span key={ri} className="px-2 py-1 glass rounded-full text-[10px] border border-white/5">{r}</span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Message Actions (Shown on Hover) */}
                            <div className={`absolute top-0 ${msg.type === 'me' ? '-left-12' : '-right-12'} opacity-0 group-hover:opacity-100 transition-all flex flex-col gap-2`}>
                                <button onClick={() => setReplyTo(msg)} className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-[10px] hover:text-acid">↩</button>
                                <button className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-[10px] hover:text-acid">☺</button>
                            </div>
                         </div>
                         
                         {/* Status Indicator */}
                         {msg.type === 'me' && (
                            <div className="mt-2 px-4 flex items-center gap-1">
                                <span className={`font-mono text-[7px] tracking-widest ${msg.seen ? 'text-acid' : 'text-white/20'}`}>
                                    {msg.seen ? '✓✓ SEEN' : '✓ DELIVERED'}
                                </span>
                            </div>
                         )}
                    </motion.div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 items-center px-4">
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 bg-acid rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <div className="w-1.5 h-1.5 bg-acid rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <div className="w-1.5 h-1.5 bg-acid rounded-full animate-bounce" />
                        </div>
                        <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest">Sora is typing...</span>
                    </motion.div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <footer className="p-12 space-y-6">
                <AnimatePresence>
                    {replyTo && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                            className="glass p-6 rounded-2xl flex justify-between items-center border-l-4 border-violet"
                        >
                            <div>
                                <span className="block font-mono text-[8px] text-violet uppercase tracking-widest mb-1">Replying to {replyTo.from}</span>
                                <p className="text-xs text-white/40 truncate max-w-md">{replyTo.text}</p>
                            </div>
                            <button onClick={() => setReplyTo(null)} className="text-white/20 hover:text-white">✕</button>
                        </motion.div>
                    )}
                </AnimatePresence>

                 <div className="glass p-1 rounded-[32px] flex items-end relative group min-h-[64px]">
                    <div className="absolute inset-0 bg-violet/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[32px] blur-xl" />
                    
                    <button className="p-6 text-white/20 hover:text-white transition-colors shrink-0">📎</button>
                    
                    <textarea 
                        ref={textareaRef}
                        rows={1}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="TRANSMIT MESSAGE TO NODE..."
                        className="flex-1 bg-transparent border-none px-4 py-6 font-mono text-[10px] tracking-[0.2em] focus:ring-0 placeholder:text-white/10 resize-none max-h-48 scrollbar-hide"
                    />
                    
                    <div className="p-4 flex gap-4 shrink-0">
                        <button className="text-white/20 hover:text-white transition-colors">☺</button>
                        <button className="w-12 h-12 bg-acid text-black rounded-full flex items-center justify-center font-bold font-mono text-xl hover:scale-110 transition-transform">↗</button>
                    </div>
                 </div>
            </footer>
        </div>
      </main>
    </div>
  );
}
