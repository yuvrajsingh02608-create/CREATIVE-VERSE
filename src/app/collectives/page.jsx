'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Nav, Footer } from '../../components/Layout';
import { SectionHeader, AvatarWithSpinRing, Toast } from '../../components/V2Components';
import { Tilt, Magnetic } from '../../components/Interactive';
import { useRouter } from 'next/navigation';

const MOCK_COLLECTIVES_V2 = [
  { id: 1, name: "VORTEX LABS", members: 12, projects: 48, status: "RECRUITING", icon: "🌌", color: "violet", focus: "3D CINEMATICS" },
  { id: 2, name: "NEON MINT", members: 8, projects: 22, status: "BUSY", icon: "💎", color: "cyan", focus: "BRAND IDENTITY" },
  { id: 3, name: "CODE SQUAD", members: 5, projects: 31, status: "WIRE ACTIVE", icon: "👾", color: "acid", focus: "CREATIVE TECH" },
  { id: 4, name: "FILM CORE", members: 15, projects: 62, status: "VACANT", icon: "📽️", color: "rose", focus: "STORYTELLING" },
];

export default function CollectivesPageV2() {
  const router = useRouter();
  const [wireBoardView, setWireBoardView] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [joiningStatus, setJoiningStatus] = useState({}); // { id: 'Requested' | 'Member' }
  const [toast, setToast] = useState(null);

  const handleJoin = (id) => {
    if (joiningStatus[id]) return;
    setJoiningStatus(prev => ({ ...prev, [id]: 'Requested' }));
    setToast({ message: "JOIN REQUEST TRANSMITTED TO SQUAD", type: "info" });
    
    setTimeout(() => {
        setJoiningStatus(prev => ({ ...prev, [id]: 'Member' }));
        setToast({ message: "WELCOME TO THE ALLIANCE: ACCESS GRANTED", type: "success" });
    }, 3000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setToast({ message: "INITIALIZING SQUAD ARCHITECTURE...", type: "info" });
    setTimeout(() => {
        setShowFormModal(false);
        setToast({ message: "SQUAD FORMED SUCCESSFULLY", type: "success" });
    }, 2000);
  };

  const handleRespond = () => {
    router.push('/messages');
  };

  return (
    <div className="bg-[#05050a] text-white">
      <Nav />
      {/* Background Aurora */}
      <div className="fixed top-1/2 left-0 w-[500px] h-[500px] bg-violet/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />

      <main className="pt-40 pb-32 px-8 md:px-12 max-w-7xl mx-auto min-h-screen">
        <header className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12">
            <SectionHeader eyebrow="VERSE ALLIANCES" title="CREATIVE COLLECTIVES" align="left" outline />
            <div className="flex gap-4">
                 <button 
                    onClick={() => setWireBoardView(false)}
                    className={`px-8 py-3 rounded-2xl font-mono text-[10px] uppercase tracking-widest transition-all ${!wireBoardView ? 'bg-white/10 text-white' : 'text-white/20 hover:text-white'}`}
                >
                    Grid View
                </button>
                <button 
                    onClick={() => setWireBoardView(true)}
                    className={`px-8 py-3 rounded-2xl font-mono text-[10px] uppercase tracking-widest transition-all ${wireBoardView ? 'bg-acid text-black font-bold' : 'text-white/20 hover:text-white'}`}
                >
                    The Wire Board
                </button>
            </div>
        </header>

        <AnimatePresence mode="wait">
            {!wireBoardView ? (
                <motion.div 
                    key="grid"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {MOCK_COLLECTIVES_V2.map((collective, i) => (
                        <Tilt key={collective.id}>
                            <div className="glass p-1 group cursor-pointer h-full">
                                <div className="bg-ink2 p-12 h-full flex flex-col text-center">
                                    <span className="text-5xl mb-8 block grayscale group-hover:grayscale-0 transition-all">{collective.icon}</span>
                                    <h3 className="text-3xl font-clash font-bold uppercase tracking-widest mb-4 group-hover:text-acid transition-colors">{collective.name}</h3>
                                    <span className={`text-[9px] font-mono mb-8 uppercase tracking-[0.3em] text-${collective.color}`}>{collective.focus}</span>
                                    
                                    <div className="flex justify-between border-y border-white/5 py-8 mb-10">
                                        <div className="text-center">
                                            <span className="block font-bebas text-2xl text-white">{collective.members}</span>
                                            <span className="block text-[8px] font-mono text-white/20 uppercase">NODES</span>
                                        </div>
                                        <div className="text-center">
                                            <span className="block font-bebas text-2xl text-white">{collective.projects}</span>
                                            <span className="block text-[8px] font-mono text-white/20 uppercase">DELIVERED</span>
                                        </div>
                                        <div className="text-center">
                                            <span className="block font-bebas text-2xl text-acid">{collective.status}</span>
                                            <span className="block text-[8px] font-mono text-white/20 uppercase">STATUS</span>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => handleJoin(collective.id)}
                                        className={`w-full py-4 border rounded-2xl font-clash font-bold text-[10px] uppercase tracking-widest transition-all ${joiningStatus[collective.id] === 'Member' ? 'bg-acid text-black border-acid' : joiningStatus[collective.id] === 'Requested' ? 'border-acid/30 text-acid bg-acid/5 animate-pulse' : 'border-white/10 hover:bg-white/5'}`}
                                    >
                                        {joiningStatus[collective.id] || 'Initialize Connect'}
                                    </button>
                                </div>
                            </div>
                        </Tilt>
                    ))}
                    
                    {/* Add Collective Placeholder */}
                    <div 
                        onClick={() => setShowFormModal(true)}
                        className="glass border-dashed border-white/10 p-12 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-acid/30 transition-all"
                    >
                         <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-8 group-hover:bg-acid group-hover:text-black transition-all">
                            <span className="text-3xl">+</span>
                         </div>
                         <h4 className="font-bebas text-2xl tracking-widest text-white/30 group-hover:text-white transition-colors">FORM SQUAD</h4>
                         <p className="text-[10px] font-mono text-white/10 uppercase tracking-widest mt-4">Requires Studio Tier</p>
                    </div>
                </motion.div>
            ) : (
                <motion.div 
                    key="wire"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass border-acid/20 p-12 md:p-24 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8">
                        <span className="font-mono text-[9px] text-acid/40 animate-pulse tracking-[0.5em] uppercase">SYSTEM.WIRE_ACTIVE: TRUE</span>
                    </div>

                    <SectionHeader eyebrow="WIRE COMMS" title="LOOKING FOR COLLABORATORS" align="left" outline />
                    
                    <div className="space-y-4">
                        {[
                            { from: "SORA KIM", text: "NEED MOTION DESIGNER FOR LVMH GIG. BLENDER EXP REQUIRED.", status: "URGENT", time: "2M AGO" },
                            { from: "VORTEX LABS", text: "RECRUITING 2D CONCEPT ARTISTS FOR SCI-FI FILM SQUAD.", status: "WIRE_OPEN", time: "14M AGO" },
                            { from: "ZANE GREY", text: "LOOKING TO FORM A SQUAD FOR GEN-AI INTERFACE GIG.", status: "WIRE_OPEN", time: "1H AGO" },
                            { from: "LOGIC LABS", text: "INTERNAL: NEED PYTHON DEV FOR SHADER BACKEND MAPPING.", status: "DIRECT_REQ", time: "3H AGO" },
                        ].map((msg, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col md:flex-row items-center gap-8 py-8 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-all px-4 group"
                            >
                                <div className="shrink-0">
                                    <AvatarWithSpinRing src={`https://i.pravatar.cc/100?u=wire${i}`} size="sm" />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex items-center gap-4 mb-3 justify-center md:justify-start">
                                        <span className="font-clash font-bold text-xs tracking-widest">{msg.from}</span>
                                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                                        <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest">{msg.time}</span>
                                    </div>
                                    <p className="font-mono text-sm leading-relaxed text-white/40 group-hover:text-white transition-colors">{msg.text}</p>
                                </div>
                                <div className="shrink-0 flex items-center gap-6">
                                     <span className={`font-mono text-[8px] px-3 py-1 border rounded-full uppercase tracking-widest ${msg.status === 'URGENT' ? 'border-orange text-orange' : 'border-white/10 text-white/20'}`}>
                                        {msg.status}
                                     </span>
                                     <button onClick={handleRespond} className="text-acid font-mono text-[10px] uppercase tracking-widest hover:translate-x-2 transition-transform">Respond ↗</button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </main>


       {/* Modals & Overlays */}
       <AnimatePresence>
            {showFormModal && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[1000] flex items-center justify-center p-8 bg-black/95 backdrop-blur-3xl"
                >
                    <motion.div 
                        initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                        className="glass w-full max-w-2xl p-12 md:p-16 relative overflow-hidden"
                    >
                        <button onClick={() => setShowFormModal(false)} className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors">✕</button>
                        <SectionHeader eyebrow="ALLIANCE FORMATION" title="CORE SQUAD BUILD" align="left" outline />
                        
                        <form onSubmit={handleFormSubmit} className="space-y-8">
                            <div className="space-y-2">
                                <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest pl-4">Squad Designation</label>
                                <input required type="text" placeholder="THE VOID / NEON SQUAD / ETC." className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:outline-none focus:border-acid transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest pl-4">Squad Mission</label>
                                <textarea required rows={3} placeholder="WHAT IS YOUR COLLECTIVE VISION?" className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:outline-none focus:border-acid transition-all resize-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest pl-4">Primary Specialization</label>
                                <select className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:outline-none focus:border-acid transition-all">
                                    <option>3D & MOTION</option>
                                    <option>BRAND IDENTITY</option>
                                    <option>CREATIVE TECH</option>
                                    <option>FILM & MEDIA</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest pl-4">Invite Initial Nodes</label>
                                <input placeholder="@MARA, @SORA, @ZANE..." className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:outline-none focus:border-acid transition-all" />
                            </div>
                            <button type="submit" className="btn-primary w-full py-5 bg-acid text-black font-black tracking-widest uppercase">INITIALIZE FORMATION ✦</button>
                        </form>
                    </motion.div>
                </motion.div>
            )}

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
       </AnimatePresence>

       <Footer />
    </div>
  );
}
