'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Nav } from '../../components/Layout';
import { Magnetic } from '../../components/Interactive';

export default function AuthPageV2() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('artist');

  return (
    <div className="bg-[#05050a] text-white min-h-screen overflow-hidden flex flex-col">
      <Nav />
      {/* Background Aurora */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(109,40,255,0.08)_0%,transparent_70%)] pointer-events-none" />

      <main className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-lg">
            <motion.div 
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-12 md:p-16 relative overflow-hidden"
            >
                {/* Patterns */}
                <div className="absolute top-0 right-0 p-10 opacity-5">
                    <span className="font-bebas text-9xl tracking-tighter">VERSE</span>
                </div>

                <div className="relative z-10 text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-bebas tracking-widest uppercase mb-4">
                        {isLogin ? 'INITIALIZE LOGIN' : 'CREATE IDENTITY'}
                    </h2>
                    <p className="font-mono text-[9px] text-white/20 uppercase tracking-[0.4em]">AUTHENTICATION_SERVICE: v2.0</p>
                </div>

                <form className="space-y-8 mb-16" onSubmit={(e) => e.preventDefault()}>
                    {!isLogin && (
                        <div className="space-y-6 mb-8">
                            <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest pl-4 block text-center">SELECT YOUR PATH</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    type="button"
                                    onClick={() => setRole('artist')}
                                    className={`py-4 rounded-2xl border font-mono text-[10px] tracking-widest transition-all ${role === 'artist' ? 'border-acid bg-acid/10 text-acid' : 'border-white/10 text-white/20 hover:border-white/30'}`}
                                >
                                    ARTIST
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setRole('client')}
                                    className={`py-4 rounded-2xl border font-mono text-[10px] tracking-widest transition-all ${role === 'client' ? 'border-violet bg-violet/10 text-violet' : 'border-white/10 text-white/20 hover:border-white/30'}`}
                                >
                                    CLIENT
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest pl-4">Digital Identifier (Email)</label>
                        <div className="relative group">
                            <input 
                                type="email" 
                                placeholder="NODE@VERSE.COM"
                                className="w-full bg-white/[0.03] border border-white/10 px-6 py-5 rounded-2xl font-mono text-[10px] tracking-widest focus:outline-none focus:border-acid transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center px-4">
                            <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest">Passkey</label>
                            {isLogin && (
                                <button type="button" className="font-mono text-[8px] text-acid/40 hover:text-acid uppercase tracking-widest transition-colors">Forgot?</button>
                            )}
                        </div>
                        <input 
                            type="password" 
                            placeholder="••••••••••••"
                            className="w-full bg-white/[0.03] border border-white/10 px-6 py-5 rounded-2xl font-mono text-[10px] tracking-widest focus:outline-none focus:border-acid transition-all"
                        />
                    </div>

                    {!isLogin && (
                        <div className="space-y-3">
                            <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest pl-4">Confirm Passkey</label>
                            <input 
                                type="password" 
                                placeholder="••••••••••••"
                                className="w-full bg-white/[0.03] border border-white/10 px-6 py-5 rounded-2xl font-mono text-[10px] tracking-widest focus:outline-none focus:border-acid transition-all"
                            />
                        </div>
                    )}

                    <button className="btn-primary w-full py-6 bg-acid text-black text-xs font-black tracking-widest">
                        {isLogin ? 'EXECUTE ACCESS' : 'INITIALIZE CREATE'}
                    </button>
                </form>

                <div className="text-center space-y-6">
                    <button 
                        onClick={() => setIsLogin(!isLogin)}
                        className="font-mono text-[9px] text-white/20 uppercase tracking-widest hover:text-white transition-colors underline underline-offset-8 decoration-white/5"
                    >
                        {isLogin ? "DON'T HAVE AN IDENTITY? REGISTER" : "ALREADY IDENTIFIED? LOGIN"}
                    </button>
                    
                    <div className="flex items-center gap-6 opacity-20">
                        <div className="h-[1px] flex-1 bg-white" />
                        <span className="font-mono text-[8px] uppercase tracking-widest">Global Auth</span>
                        <div className="h-[1px] flex-1 bg-white" />
                    </div>

                    <div className="flex gap-4 justify-center">
                        {['Google', 'GitHub', 'X'].map(p => (
                            <button key={p} className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/5 transition-all">
                                <span className="text-sm">🪪</span>
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Footer Tag */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 text-center"
            >
                <span className="font-mono text-[8px] text-white/[0.05] uppercase tracking-[1em]">PROTECTED BY CREATIVEVERSE ENCRYPTION</span>
            </motion.div>
        </div>
      </main>
    </div>
  );
}
