'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export const MessageInbox = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([
    { id: 0, user: "Leo Vance", avatar: "https://i.pravatar.cc/150?u=leo", lastMsg: "The branding looks incredible, Sora!", time: "2m ago", online: true, messages: [
        { sender: 'them', text: 'Hey Sora, have you seen the latest brief?' },
        { sender: 'me', text: 'Just looking at it now. The brutalist style fits perfectly.' },
        { sender: 'them', text: 'Agreed. The branding looks incredible, Sora!' },
    ]},
    { id: 1, user: "Neon Labs", avatar: "https://i.pravatar.cc/150?u=neon", lastMsg: "Can we start on the logos?", time: "1h ago", online: false, messages: [] },
    { id: 2, user: "Sora Kim", avatar: "https://i.pravatar.cc/150?u=sora", lastMsg: "Draft is ready", time: "3h ago", online: true, messages: [] },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    const newChats = [...chats];
    newChats[activeChat].messages.push({ sender: 'me', text: message });
    setChats(newChats);
    setMessage("");
  };

  return (
    <div className="glass h-[600px] flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 border-r border-white/5 flex flex-col">
        <div className="p-8 border-b border-white/5">
            <h3 className="font-heading uppercase tracking-widest text-sm">Messages</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
            {chats.map((chat, i) => (
                <div 
                    key={chat.id} 
                    onClick={() => setActiveChat(i)}
                    className={`p-6 cursor-pointer flex gap-4 transition-colors ${activeChat === i ? 'bg-white/5' : 'hover:bg-white/5'}`}
                >
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-white/5">
                            <img src={chat.avatar} alt="" />
                        </div>
                        {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-acid border-2 border-background rounded-full" />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-heading text-xs uppercase truncate">{chat.user}</span>
                            <span className="text-[8px] font-mono text-white/20 uppercase">{chat.time}</span>
                        </div>
                        <p className="text-[10px] font-mono text-white/40 truncate">{chat.lastMsg}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-ink/20">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <span className="font-heading uppercase tracking-widest text-sm">{chats[activeChat].user}</span>
                <span className="text-[8px] font-mono text-acid uppercase tracking-widest">Active Now</span>
            </div>
            <button className="text-[10px] font-mono text-white/20 uppercase tracking-widest hover:text-white transition-colors">Project Files</button>
        </div>

        <div className="flex-1 p-8 overflow-y-auto space-y-6">
            <AnimatePresence>
                {chats[activeChat].messages.map((msg, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[70%] p-4 rounded-2xl font-body text-sm ${msg.sender === 'me' ? 'bg-acid text-black rounded-tr-none' : 'glass rounded-tl-none'}`}>
                            {msg.text}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>

        <div className="p-8 border-t border-white/5">
            <div className="relative flex items-center">
                <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:border-acid outline-none"
                />
                <button 
                    onClick={handleSend}
                    className="absolute right-4 text-acid font-mono text-[10px] uppercase tracking-widest hover:scale-105 transition-transform"
                >
                    Send
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
