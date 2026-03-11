'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Nav, Footer } from '../../components/Layout';
import { SectionHeader } from '../../components/V2Components';
import { Magnetic } from '../../components/Interactive';

const MOCK_NOTIFICATIONS = [
    { id: 1, type: 'message', text: 'SORA KIM SENT A TRANSMISSION: "LVMH ASSETS UPLOADED..."', time: '2 MINS AGO', date: 'TODAY', read: false, icon: '💬' },
    { id: 2, type: 'gig', text: 'STELLAR LABS APPLIED TO YOUR "HYPERCAR BRANDING" GIG', time: '1 HOUR AGO', date: 'TODAY', read: false, icon: '🚀' },
    { id: 3, type: 'payment', text: 'ESCROW RELEASED: $2,400.00 DEPOSITED TO VERSE WALLET', time: '4 HOURS AGO', date: 'TODAY', read: true, icon: '💎' },
    { id: 4, type: 'follower', text: 'ZANE GREY IS NOW FOLLOWING YOUR CREATIVE NODE', time: '6 HOURS AGO', date: 'TODAY', read: true, icon: '👤' },
    { id: 5, type: 'review', text: 'NEW 5-STAR REVIEW FROM VOLT MOTORS: "EXCEPTIONAL..."', time: '1 DAY AGO', date: 'YESTERDAY', read: true, icon: '⭐' },
    { id: 6, type: 'collab', text: 'INVITATION TO JOIN "NEON BRUTALISM" COLLECTIVE', time: '2 DAYS AGO', date: 'MARCH 09', read: true, icon: '🤝' },
];

export default function NotificationsPage() {
    const [filter, setFilter] = useState('All');
    const [notifs, setNotifs] = useState(MOCK_NOTIFICATIONS);

    const filteredNotifs = filter === 'All' 
        ? notifs 
        : notifs.filter(n => n.type === filter.toLowerCase());

    const markRead = (id) => {
        setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllRead = () => {
        setNotifs(prev => prev.map(n => ({ ...n, read: true })));
    };

    const deleteNotif = (id) => {
        setNotifs(prev => prev.filter(n => n.id !== id));
    };

    return (
        <div className="bg-[#05050a] text-white min-h-screen flex flex-col">
            <Nav />
            
            <main className="flex-1 pt-32 pb-24 px-8 md:px-12">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <SectionHeader eyebrow="CHRONICLE" title="EVENT CENTER" align="left" outline />
                        <div className="flex gap-4">
                            <button onClick={markAllRead} className="px-6 py-3 glass rounded-full font-mono text-[9px] uppercase tracking-widest text-white/40 hover:text-acid transition-colors">Mark all read</button>
                            <button className="px-6 py-3 glass rounded-full font-mono text-[9px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">Settings</button>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-4 mb-12 overflow-x-auto no-scrollbar pb-2">
                        {['All', 'Message', 'Gig', 'Payment', 'Follower'].map(t => (
                            <button 
                                key={t}
                                onClick={() => setFilter(t)}
                                className={`px-8 py-3 rounded-full font-mono text-[9px] uppercase tracking-widest transition-all whitespace-nowrap ${filter === t ? 'bg-acid text-black font-bold' : 'glass text-white/20 hover:text-white'}`}
                            >
                                {t}S
                            </button>
                        ))}
                    </div>

                    {/* Notifications List */}
                    <div className="space-y-4">
                        <AnimatePresence mode='popLayout'>
                            {filteredNotifs.map((n, i) => (
                                <motion.div 
                                    key={n.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`group relative glass p-8 rounded-2xl flex items-center gap-8 transition-all hover:translate-x-2 ${!n.read ? 'border-l-4 border-acid bg-acid/[0.02]' : 'border-l-4 border-transparent'}`}
                                >
                                    {/* Icon Node */}
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl shrink-0 ${!n.read ? 'bg-acid/10 text-acid' : 'bg-white/5 text-white/40'}`}>
                                        {n.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-mono text-[8px] text-white/20 uppercase tracking-[0.3em]">{n.type} • {n.time}</span>
                                            <span className="font-mono text-[8px] text-white/20 uppercase">{n.date}</span>
                                        </div>
                                        <p className={`text-sm md:text-base tracking-wide leading-relaxed ${!n.read ? 'text-white' : 'text-white/40'}`}>
                                            {n.text}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {!n.read && (
                                            <button 
                                                onClick={() => markRead(n.id)}
                                                className="w-10 h-10 rounded-full glass flex items-center justify-center text-acid hover:bg-acid hover:text-black transition-all"
                                                title="Mark as Read"
                                            >
                                                ✓
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => deleteNotif(n.id)}
                                            className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/20 hover:text-rose transition-all"
                                            title="Delete"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {filteredNotifs.length === 0 && (
                            <div className="py-32 text-center">
                                <span className="block text-4xl mb-6 opacity-20">📡</span>
                                <h3 className="font-bebas text-2xl tracking-[0.3em] text-white/20 mb-4">NO EVENTS DETECTED</h3>
                                <p className="font-mono text-[9px] text-white/10 uppercase tracking-widest cursor-pointer hover:text-acid" onClick={() => setFilter('All')}>CLEAR ALL FILTERS</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination Simulation */}
                    <div className="mt-20 flex justify-center items-center gap-12">
                        <button className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em] hover:text-white transition-colors cursor-not-allowed">← PREVIOUS</button>
                        <div className="flex gap-4">
                            <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-mono text-[10px] font-bold">01</span>
                            <span className="w-8 h-8 rounded-full glass flex items-center justify-center font-mono text-[10px] text-white/20">02</span>
                        </div>
                        <button className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em] hover:text-white transition-colors">NEXT →</button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
