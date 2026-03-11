'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnetic } from './Interactive';

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [lang, setLang] = useState('EN');
  
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'message', text: 'New message from Sora Kim', time: '2m ago', read: false },
    { id: 2, type: 'gig', text: 'Stellar labs applied to your gig', time: '1h ago', read: false },
    { id: 3, type: 'payment', text: 'Payment of $2,400 released', time: '4h ago', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Discover", href: "/explore" },
    { name: "Gig Board", href: "/gigs" },
    { name: "Collectives", href: "/collectives" },
    { name: "Creative Wire", href: "/feed" },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 inset-x-0 z-[1000] h-[72px] transition-all duration-500 flex items-center justify-between px-8 md:px-12 ${
          scrolled ? 'bg-[#05050a]/85 backdrop-blur-2xl border-b border-white/10' : 'bg-transparent'
        }`}
      >
        {/* Left: Logo + Global Toggles */}
        <div className="flex items-center gap-12">
            <a href="/" className="font-bebas text-2xl tracking-[4px] flex items-center group">
                <span className="text-white">CREATIVE</span>
                <span className="text-violet transition-colors group-hover:text-acid">VERSE</span>
            </a>

            <div className="hidden lg:flex items-center gap-4 p-1 rounded-full border border-white/5 glass bg-white/[0.02]">
                {['USD', 'ETH', 'BTC'].map(c => (
                    <button 
                        key={c}
                        onClick={() => setCurrency(c)}
                        className={`px-3 py-1 rounded-full font-mono text-[7px] tracking-widest transition-all ${currency === c ? 'bg-white text-black font-black' : 'text-white/20 hover:text-white'}`}
                    >
                        {c}
                    </button>
                ))}
            </div>

            <div className="hidden lg:flex items-center gap-4 p-1 rounded-full border border-white/5 glass bg-white/[0.02]">
                {['EN', 'JP'].map(l => (
                    <button 
                        key={l}
                        onClick={() => setLang(l)}
                        className={`px-3 py-1 rounded-full font-mono text-[7px] tracking-widest transition-all ${lang === l ? 'bg-acid text-black font-black' : 'text-white/20 hover:text-white'}`}
                    >
                        {l}
                    </button>
                ))}
            </div>
        </div>

        {/* Center: Desktop Menu */}
        <div className="hidden lg:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
            {navLinks.map(link => (
                <a 
                    key={link.name} 
                    href={link.href}
                    className="font-body text-[13px] text-white/40 hover:text-white transition-colors relative group"
                >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-acid scale-x-0 group-hover:scale-x-100 transition-transform origin-right group-hover:origin-left duration-500" />
                </a>
            ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-8">
                {/* Notification Bell */}
                <div className="relative">
                    <button 
                        onClick={() => setNotifOpen(!notifOpen)}
                        className="relative p-2 text-white/40 hover:text-white transition-colors"
                    >
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                        {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-acid rounded-full" />}
                    </button>

                    <AnimatePresence>
                        {notifOpen && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute top-14 right-0 w-[320px] glass border border-white/10 p-6 rounded-2xl shadow-2xl z-[1001]"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="font-bebas text-xl tracking-widest uppercase">NOTIFICATIONS</h4>
                                </div>
                                <div className="space-y-4 max-h-80 overflow-y-auto no-scrollbar">
                                    {notifications.map(n => (
                                        <div key={n.id} className={`p-4 rounded-xl border transition-all ${n.read ? 'border-transparent bg-white/[0.02]' : 'border-acid/20 bg-acid/[0.05]'}`}>
                                            <p className="text-[10px] text-white/80 leading-relaxed mb-1">{n.text}</p>
                                            <span className="font-mono text-[7px] text-white/20 uppercase tracking-widest">{n.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <Magnetic strength={0.4}>
                    <a href="/auth" className="btn-primary py-3 px-8 text-[11px]">Join Free</a>
                </Magnetic>
            </div>

            {/* Mobile Hamburger */}
            <button 
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden flex flex-col gap-1.5 p-2 group"
            >
                <span className="w-8 h-[2px] bg-white group-hover:bg-acid transition-colors" />
                <span className="w-8 h-[2px] bg-white group-hover:bg-acid transition-colors" />
                <span className="w-5 h-[2px] bg-white group-hover:bg-acid transition-colors ml-auto" />
            </button>
        </div>
      </nav>

      {/* Mobile Bottom Navigation (PWA Style) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 h-20 bg-[#05050a]/80 backdrop-blur-3xl border-t border-white/5 z-[1000] flex items-center justify-around px-8">
          {navLinks.map(link => (
              <a key={link.name} href={link.href} className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-center">{link.name.split(" ")[0]}</span>
              </a>
          ))}
          <a href="/messages" className="relative flex flex-col items-center gap-1 opacity-100">
              <span className="text-[10px] font-mono uppercase tracking-widest text-acid font-black">CHAT</span>
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-acid rounded-full" />
          </a>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[1001] bg-[#05050a]/98 backdrop-blur-[30px] flex flex-col items-center justify-center p-12"
            >
                <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="absolute top-8 right-8 w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white hover:border-white transition-colors"
                >
                    ✕
                </button>
                <div className="flex flex-col items-center gap-8">
                    {navLinks.map((link, i) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="font-bebas text-5xl md:text-6xl tracking-[4px] text-white hover:text-acid transition-colors"
                        >
                            {link.name}
                        </motion.a>
                    ))}
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col items-center gap-4 mt-8"
                    >
                         <a href="/auth/signup" className="btn-primary w-full px-12">Initialize Access</a>
                         <a href="/auth/login" className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-4">Already in the Verse? Log in</a>
                    </motion.div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const Footer = () => {
    return (
        <footer className="pt-24 pb-32 px-8 md:px-12 border-t border-white/5 bg-[#05050a]">
            {/* Footer content remains same but adds more spacing for bottom bar on mobile */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
                <div className="lg:col-span-2">
                     <a href="/" className="font-bebas text-3xl tracking-[4px] mb-8 block">
                        <span className="text-white">CREATIVE</span>
                        <span className="text-violet">VERSE</span>
                    </a>
                    <p className="text-white/40 font-body text-sm max-w-sm mb-12 leading-relaxed">
                        The world's most immersive ecosystem for creators and clients. Where elite talent meets transformative projects.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {['Twitter', 'Instagram', 'Behance', 'Dribbble'].map(social => (
                            <Magnetic key={social} strength={0.3}>
                                <a href="#" className="px-5 py-2.5 glass text-[10px] font-mono text-white/40 uppercase tracking-widest hover:text-acid border-white/5 hover:border-acid/30 transition-all">
                                    {social}
                                </a>
                            </Magnetic>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em] mb-8">Platform</h3>
                    <div className="flex flex-col gap-6">
                        {['Discovery', 'Gig Board', 'Hire Elite', 'Collectives'].map(link => (
                            <a key={link} href="#" className="text-sm font-body text-white/40 hover:text-acid transition-colors">{link}</a>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em] mb-8">Verse</h3>
                    <div className="flex flex-col gap-6">
                        {['Manifesto', 'Studio Engine', 'Security', 'Creators', 'Clients'].map(link => (
                            <a key={link} href="#" className="text-sm font-body text-white/40 hover:text-acid transition-colors">{link}</a>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em] mb-8">Legal</h3>
                    <div className="flex flex-col gap-6">
                        {['Privacy Pol', 'Terms', 'Escrow', 'Fees', 'Matching'].map(link => (
                            <a key={link} href="#" className="text-sm font-body text-white/40 hover:text-acid transition-colors">{link}</a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6">
                <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">© 2026 CREATIVEVERSE LTD. ALL RIGHTS RESERVED.</span>
                <span className="font-mono text-[10px] text-white/[0.03] uppercase tracking-[0.8em] hidden lg:block">WHERE ART MEETS OPPORTUNITY</span>
                <div className="flex gap-12 font-mono text-[10px] text-white/20 uppercase tracking-widest">
                    <span>STATUS: ALL SYSTEMS LIVE</span>
                    <span>VER: 2.0.4 - STABLE</span>
                </div>
            </div>
        </footer>
    );
};
