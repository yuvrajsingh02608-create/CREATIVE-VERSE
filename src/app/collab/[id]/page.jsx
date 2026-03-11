'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Nav, Footer } from '../../../components/Layout';
import { SectionHeader, Toast } from '../../../components/V2Components';
import { Tilt, Magnetic } from '../../../components/Interactive';

const MOCK_PROJECT = {
    id: "PRJ-992",
    title: "LVMH DIGITAL SHOWROOM",
    client: "LVMH GROUP",
    artist: "SORA KIM",
    status: "IN PROGRESS",
    milestones: [
        { id: 1, title: "CONCEPT_PHASE", progress: 100, status: "COMPLETE" },
        { id: 2, title: "3D_MODELLING", progress: 75, status: "ACTIVE" },
        { id: 3, title: "TEXTURING_LIGHTING", progress: 0, status: "PENDING" },
        { id: 4, title: "FINAL_RENDER", progress: 0, status: "PENDING" }
    ],
    moodboard: [
        { id: 1, url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe", x: 10, y: 15, rotate: -5 },
        { id: 2, url: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8", x: 40, y: 10, rotate: 3 },
        { id: 3, url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e", x: 20, y: 50, rotate: 2 }
    ],
    files: [
        { name: "SHOWROOM_V1.BLEND", type: "3D", size: "124MB", date: "2H AGO" },
        { name: "TEXTURE_PACK_LVMH", type: "ZIP", size: "2.1GB", date: "5H AGO" }
    ],
    messages: [
        { id: 1, sender: "LVMH", text: "The brutalist lighting looks perfect on the marble texture.", time: "10:24 AM" },
        { id: 2, sender: "SORA", text: "Working on the refractive glass materials now. Will update V2 tonight.", time: "11:15 AM" }
    ]
};

export default function CollabRoomPage() {
    const [activeView, setActiveView] = useState("MOODBOARD");
    const [messages, setMessages] = useState(MOCK_PROJECT.messages);
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        setMessages([...messages, { id: Date.now(), sender: "YOU", text: newMessage, time: "JUST NOW" }]);
        setNewMessage("");
    };

    return (
        <div className="bg-[#05050a] text-white min-h-screen flex flex-col">
            <Nav />
            
            <main className="flex-1 pt-32 pb-8 px-12 flex gap-12 h-[calc(100vh-80px)] overflow-hidden">
                {/* Left Panel: Milestones & Nav */}
                <aside className="w-80 flex flex-col gap-12 shrink-0">
                    <div className="glass p-8 border-acid/10 bg-acid/[0.02]">
                        <span className="font-mono text-[8px] text-acid uppercase tracking-[0.4em] block mb-4">PROJECT_ID: {MOCK_PROJECT.id}</span>
                        <h2 className="text-3xl font-bebas tracking-widest leading-none mb-4">{MOCK_PROJECT.title}</h2>
                        <div className="flex gap-4 items-center mb-8">
                            <span className="w-2 h-2 rounded-full bg-acid animate-pulse" />
                            <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">{MOCK_PROJECT.status}</span>
                        </div>
                    </div>

                    <div className="flex-1 space-y-12 overflow-y-auto no-scrollbar pb-12">
                        <section>
                            <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/20 mb-8 px-4">Milestones</h3>
                            <div className="space-y-6">
                                {MOCK_PROJECT.milestones.map(m => (
                                    <div key={m.id} className="glass p-6 border-white/5 group hover:border-white/10 transition-all">
                                        <div className="flex justify-between items-end mb-4">
                                            <span className={`font-mono text-[8px] uppercase tracking-widest ${m.status === 'COMPLETE' ? 'text-acid' : m.status === 'ACTIVE' ? 'text-white' : 'text-white/20'}`}>{m.title}</span>
                                            <span className="font-bebas text-lg text-white/40">{m.progress}%</span>
                                        </div>
                                        <div className="h-[2px] w-full bg-white/5">
                                            <motion.div initial={{ width: 0 }} animate={{ width: `${m.progress}%` }} className={`h-full ${m.status === 'COMPLETE' ? 'bg-acid' : 'bg-white/40'}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/20 mb-8 px-4">Artifacts</h3>
                            <div className="space-y-4">
                                {MOCK_PROJECT.files.map((file, i) => (
                                    <div key={i} className="flex items-center gap-6 p-4 glass border-white/5 hover:border-white/10 cursor-pointer transition-all">
                                        <div className="w-10 h-10 glass border-white/10 flex items-center justify-center font-mono text-[8px] uppercase shrink-0">{file.type}</div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-mono text-[10px] truncate uppercase tracking-widest">{file.name}</p>
                                            <span className="text-[8px] text-white/20 font-mono">{file.size} • {file.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </aside>

                {/* Center Panel: Moodboard / Workspace */}
                <div className="flex-1 relative glass border-white/5 overflow-hidden bg-white/[0.01]">
                    <div className="absolute top-8 left-8 z-50 flex gap-4 p-1 glass border-white/10">
                        {["MOODBOARD", "DRAFTS", "FINAL"].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveView(tab)}
                                className={`px-6 py-2 font-mono text-[9px] uppercase tracking-widest transition-all ${activeView === tab ? 'bg-white text-black font-black' : 'text-white/30 hover:text-white'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="absolute inset-0 p-32">
                        {activeView === "MOODBOARD" && (
                            <div className="relative w-full h-full border border-dashed border-white/10 rounded-[4rem]">
                                {MOCK_PROJECT.moodboard.map(img => (
                                    <motion.div 
                                        key={img.id}
                                        drag
                                        dragMomentum={false}
                                        style={{ left: `${img.x}%`, top: `${img.y}%`, rotate: img.rotate }}
                                        className="absolute w-64 glass p-1 cursor-move group"
                                    >
                                        <img src={img.url} className="w-full h-auto rounded-lg grayscale group-hover:grayscale-0 transition-all duration-700" alt="Ref" />
                                        <div className="absolute inset-0 bg-acid/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                    </motion.div>
                                ))}
                                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                                    <span className="font-bebas text-[10vw] uppercase tracking-[2rem]">VERSE_CANVAS</span>
                                </div>
                            </div>
                        )}
                        {activeView !== "MOODBOARD" && (
                            <div className="h-full flex items-center justify-center opacity-20">
                                <span className="font-mono text-xs uppercase tracking-[1em]">{activeView}_PHASE_READYING</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel: Chat */}
                <aside className="w-96 flex flex-col gap-12 shrink-0 glass border-white/5 bg-black/20">
                    <header className="p-10 border-b border-white/5">
                        <SectionHeader eyebrow="COMM_ARRAY" title="COLLAB_STREAM" align="left" outline />
                    </header>
                    
                    <div className="flex-1 overflow-y-auto p-10 space-y-12 no-scrollbar">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex flex-col ${msg.sender === 'YOU' ? 'items-end' : 'items-start'}`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest">{msg.sender}</span>
                                    <span className="font-mono text-[8px] text-white/10">{msg.time}</span>
                                </div>
                                <div className={`p-6 max-w-[85%] font-body text-xs leading-relaxed ${msg.sender === 'YOU' ? 'glass border-violet/20 bg-violet/5 rounded-2xl rounded-tr-none' : 'glass border-white/10 rounded-2xl rounded-tl-none'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSendMessage} className="p-8 border-t border-white/5">
                        <div className="relative">
                            <input 
                                type="text" 
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="SEND TRANSMISSION..."
                                className="w-full bg-white/[0.03] border border-white/10 px-8 py-6 rounded-2xl font-mono text-[10px] tracking-widest focus:border-acid outline-none transition-all pr-24"
                            />
                            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-acid font-black font-mono text-[10px]">SEND</button>
                        </div>
                    </form>
                </aside>
            </main>
        </div>
    );
}
