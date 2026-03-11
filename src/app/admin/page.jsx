'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Nav, Footer } from '../components/Layout';
import { SectionHeader } from '../components/V2Components';

export default function AdminCommandPage() {
  const [uptime, setUptime] = useState("99.98%");
  const [activeNodes, setActiveNodes] = useState(12402);
  const [systemLoad, setSystemLoad] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
        setSystemLoad(prev => Math.min(100, Math.max(10, prev + (Math.random() * 10 - 5))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "GLOBAL_TRANSACTIONS", value: "$1.4M", trend: "+12%", color: "text-acid" },
    { label: "ACTIVE_NODES", value: activeNodes.toLocaleString(), trend: "+5.2%", color: "text-violet" },
    { label: "SYSTEM_UPTIME", value: uptime, trend: "STABLE", color: "text-cyan" },
    { label: "AI_RECO_ACCURACY", value: "94.2%", trend: "+1.5%", color: "text-rose" },
  ];

  return (
    <div className="bg-[#05050a] text-white min-h-screen">
      <Nav />
      {/* Admin Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(184,255,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(184,255,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <main className="pt-40 pb-32 px-8 md:px-12 max-w-7xl mx-auto relative z-10">
        <header className="mb-24 flex justify-between items-end border-b border-white/5 pb-12">
             <SectionHeader eyebrow="CENTRAL COMMAND" title="ADMIN PANEL" align="left" outline />
             <div className="flex gap-4">
                <span className="px-5 py-2 glass border-acid/20 text-acid font-mono text-[9px] uppercase tracking-widest animate-pulse">SYSTEM_LIVE</span>
                <span className="px-5 py-2 glass border-white/10 text-white/20 font-mono text-[9px] uppercase tracking-widest">v2.4.0-STABLE</span>
             </div>
        </header>

        {/* Global HUD */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24">
            {stats.map((s, i) => (
                <motion.div 
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass p-10 border-white/5 bg-white/[0.01]"
                >
                    <span className="font-mono text-[8px] text-white/20 uppercase tracking-[0.4em] mb-4 block">{s.label}</span>
                    <h3 className={`text-4xl font-bebas ${s.color} mb-2 tracking-widest`}>{s.value}</h3>
                    <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">{s.trend} SINCE LAST_EPOCH</span>
                </motion.div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* System Health Monitor */}
            <div className="lg:col-span-8 glass p-12 border-white/5">
                <div className="flex justify-between items-end mb-12">
                    <h3 className="text-xl font-clash font-bold uppercase tracking-widest text-white/60">System Load Monitor</h3>
                    <span className="font-mono text-[10px] text-acid uppercase">{systemLoad.toFixed(1)}% PROCESSING</span>
                </div>
                
                <div className="h-64 flex items-end gap-1">
                    {[...Array(40)].map((_, i) => (
                        <motion.div 
                            key={i}
                            animate={{ height: `${Math.random() * 80 + 20}%` }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                            className="flex-1 bg-acid/20 border-t border-acid/40"
                        />
                    ))}
                </div>
            </div>

            {/* Quick Actions Sidebar */}
            <div className="lg:col-span-4 space-y-8">
                <h3 className="text-sm font-mono text-white/20 uppercase tracking-[0.5em] mb-8">Priority Protocols</h3>
                <button className="w-full btn-secondary py-5 text-[10px] uppercase tracking-widest text-left px-8 flex justify-between group">
                    <span>Audit Global Ledger</span>
                    <span className="group-hover:translate-x-2 transition-transform">⮕</span>
                </button>
                <button className="w-full btn-secondary py-5 text-[10px] uppercase tracking-widest text-left px-8 flex justify-between group">
                    <span>Manage Conflict Nodes</span>
                    <span className="group-hover:translate-x-2 transition-transform">⮕</span>
                </button>
                <button className="w-full btn-secondary py-5 text-[10px] uppercase tracking-widest text-left px-8 flex justify-between group">
                    <span>Platform-Wide Broadcast</span>
                    <span className="group-hover:translate-x-2 transition-transform">⮕</span>
                </button>
                <button className="w-full bg-rose/10 border border-rose/30 text-rose py-5 text-[10px] uppercase tracking-widest font-black rounded-lg">
                    Emergency Shutdown (VETO)
                </button>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
