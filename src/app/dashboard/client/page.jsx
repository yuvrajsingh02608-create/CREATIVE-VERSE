'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Nav, Footer } from '../../../components/Layout';
import { AvatarWithSpinRing, SectionHeader, Toast } from '../../../components/V2Components';
import { Tilt, Magnetic } from '../../../components/Interactive';
import { AnimatePresence } from 'framer-motion';

const BUDGET_DATA = [
  { name: 'Motion', budget: 12000 },
  { name: 'Branding', budget: 8500 },
  { name: 'Art Dir', budget: 4200 },
  { name: '3D Mod', budget: 15600 },
  { name: 'Sound', budget: 3000 },
];

export default function ClientDashboardPageV2() {
  const [activeView, setActiveView] = React.useState("Alliance");
  const [toast, setToast] = React.useState(null);
  const [showPostModal, setShowPostModal] = React.useState(false);
  const [bids, setBids] = React.useState([
    { id: 101, artist: "MIRA K.", role: "3D ARTIST", bid: "$2,400", gig: "Digital Showroom", text: "I can deliver high-fidelity Unreal Engine assets within 3 weeks.", avatar: "https://i.pravatar.cc/100?u=mira" },
    { id: 102, artist: "ZANE G.", role: "BRAND ARCH", bid: "$5,000", gig: "Volt Branding", text: "Expertise in minimalist tech branding. Let's build the identity.", avatar: "https://i.pravatar.cc/100?u=zane" },
  ]);

  const handleHire = (bidId) => {
    setBids(prev => prev.filter(b => b.id !== bidId));
    setToast({ message: "NODE ENGAGED: PROJECT INITIATED", type: "success" });
  };

  const handlePostGig = (e) => {
    e.preventDefault();
    setToast({ message: "BROADCASTING TO THE VERSE...", type: "info" });
    setTimeout(() => {
        setShowPostModal(false);
        setToast({ message: "GIG LIVE: NODES NOTIFIED", type: "success" });
    }, 2000);
  };
  return (
    <div className="bg-[#05050a] text-white min-h-screen">
      <Nav />
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,229,255,0.03)_0%,transparent_50%)] pointer-events-none" />

      <main className="pt-32 pb-32 px-8 md:px-12 max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-end mb-16 gap-12">
            <div className="flex items-center gap-8">
                <div className="w-16 h-16 rounded-2xl bg-cyan/20 flex items-center justify-center text-3xl">💎</div>
                <div>
                   <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} className="font-mono text-[9px] uppercase tracking-[0.4em] block mb-2">AUTH_TOKEN: STUDIO ENTITY</motion.span>
                   <h1 className="text-5xl font-bebas tracking-widest uppercase">LVMH GROUP / HQ</h1>
                </div>
            </div>
            <div className="flex gap-4 p-1 glass border border-white/5 rounded-2xl">
                 {["Alliance", "Incoming Bids", "Financials"].map(v => (
                     <button 
                        key={v}
                        onClick={() => setActiveView(v)}
                        className={`px-8 py-3 rounded-xl font-mono text-[9px] uppercase tracking-widest transition-all ${activeView === v ? 'bg-cyan text-black font-bold' : 'text-white/20 hover:text-white'}`}
                    >
                        {v}
                    </button>
                 ))}
                 <button onClick={() => setShowPostModal(true)} className="px-8 py-3 bg-white/5 text-acid font-mono text-[9px] uppercase tracking-widest hover:bg-white/10 rounded-xl transition-all">Broadcast Gig +</button>
            </div>
        </header>

        <div className="min-h-[50vh]">
            <AnimatePresence mode="wait">
                {activeView === "Alliance" ? (
                    <motion.div 
                        key="alliance"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                    >
                        <div className="lg:col-span-8 space-y-8">
                             <section className="glass p-12">
                                <h3 className="font-bebas text-3xl tracking-widest mb-12 uppercase">NODE ALLIANCE</h3>
                                <div className="space-y-4">
                                    {[
                                        { n: "SORA KIM", r: "3D LEAD", p: "Digital Showroom", s: "75% DONE" },
                                        { n: "ZANE GREY", r: "BRAND ARCH", p: "Volt Identity", s: "20% DONE" },
                                    ].map((node, i) => (
                                        <div key={i} className="flex flex-col md:flex-row items-center gap-8 p-8 bg-white/[0.02] border border-white/5 rounded-3xl group">
                                            <AvatarWithSpinRing src={`https://i.pravatar.cc/100?u=node${i}`} size="sm" />
                                            <div className="flex-1">
                                                <h4 className="font-clash font-bold text-sm tracking-widest uppercase mb-1">{node.n}</h4>
                                                <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">{node.r} @ {node.p}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="block font-bebas text-xl text-cyan">{node.s}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                             </section>

                             <section className="glass p-12">
                                <h3 className="font-bebas text-3xl tracking-widest mb-12 uppercase">BUDGET ALLOCATION</h3>
                                <div className="h-[200px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={BUDGET_DATA}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                            <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} fontFamily="Space Mono" axisLine={false} tickLine={false} />
                                            <Bar dataKey="budget" fill="#00e5ff" radius={[8, 8, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                             </section>
                        </div>

                        <aside className="lg:col-span-4 space-y-8">
                             <div className="glass p-12 bg-gradient-to-br from-cyan/10 to-transparent">
                                <span className="block font-mono text-[8px] text-white/20 mb-10 tracking-[0.4em]">WALLET_ENGINE</span>
                                <span className="block text-5xl font-bebas text-white mb-10">$42.8K</span>
                                <button className="w-full py-5 bg-cyan text-black font-black text-[10px] tracking-widest rounded-xl">REPLENISH FUNDS</button>
                             </div>
                             <div className="glass p-12">
                                <span className="block font-mono text-[8px] text-white/20 mb-8 tracking-[0.4em]">VERSE_ALERTS</span>
                                <div className="space-y-4">
                                    {["Sora Kim uploaded assets.", "Budget alert: Motion Squad."].map((a,i)=>(
                                        <div key={i} className="p-4 border-l-2 border-cyan bg-cyan/[0.02] text-[10px] text-white/40 uppercase font-mono tracking-widest">{a}</div>
                                    ))}
                                </div>
                             </div>
                        </aside>
                    </motion.div>
                ) : activeView === "Milestones" ? (
                    <motion.div 
                        key="milestones"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        className="space-y-12"
                    >
                        {[
                            { name: "DIGITAL SHOWROOM V1", artist: "SORA KIM", funded: true, total: "$12,000", milestones: [
                                { id: 1, name: "3D Asset Modeling (Phase 1)", amount: "$4,000", status: "PAID", date: "MAR 02" },
                                { id: 2, name: "Unreal Engine Scene Setup", amount: "$4,000", status: "IN_REVIEW", date: "MAR 20" },
                                { id: 3, name: "Lighting & Cinematic Render", amount: "$4,000", status: "FUNDED", date: "APR 05" },
                            ]},
                            { name: "VOLT IDENTITY SYSTEM", artist: "ZANE GREY", funded: false, total: "$8,500", milestones: [
                                { id: 4, name: "Logo & Identity System", amount: "$5,000", status: "PENDING_FUNDING", date: "MAR 10" },
                                { id: 5, name: "Brand Guidelines (Web/Print)", amount: "$3,500", status: "PENDING_FUNDING", date: "MAR 25" },
                            ]}
                        ].map((proj, i) => (
                            <div key={i} className="glass p-12 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
                                    <div>
                                        <h3 className="text-3xl font-bebas tracking-widest text-white mb-2">{proj.name}</h3>
                                        <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.4em]">ARTIST: {proj.artist} • PROJECT TOTAL: {proj.total}</span>
                                    </div>
                                    {!proj.funded && (
                                        <button 
                                            onClick={() => setToast({ message: "INITIALIZING STRIPE ESCROW FUNDING...", type: "info" })}
                                            className="px-8 py-3 bg-cyan text-black rounded-xl font-mono text-[9px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_20px_rgba(0,229,255,0.2)]"
                                        >
                                            FUND TOTAL ESCROW
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    {proj.milestones.map(m => (
                                        <div key={m.id} className="flex flex-col md:flex-row items-center gap-8 p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] transition-all">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-4 mb-2">
                                                    <span className={`w-2 h-2 rounded-full ${m.status === 'PAID' ? 'bg-cyan' : m.status === 'IN_REVIEW' ? 'bg-acid animate-pulse' : 'bg-white/20'}`} />
                                                    <h4 className="font-clash font-bold text-xs tracking-widest uppercase">{m.name}</h4>
                                                </div>
                                                <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest">DUE: {m.date} • ALLOCATION: {m.amount}</span>
                                            </div>
                                            
                                            <div className="flex items-center gap-6">
                                                <span className={`font-mono text-[9px] tracking-widest ${m.status === 'PAID' ? 'text-cyan' : m.status === 'IN_REVIEW' ? 'text-acid font-bold' : 'text-white/20'}`}>
                                                    {m.status.replace("_", " ")}
                                                </span>
                                                {m.status === 'IN_REVIEW' && (
                                                    <button 
                                                        onClick={() => setToast({ message: "RELEASING FUNDS (8% PLATFORM FEE DEDUCTED)...", type: "success" })}
                                                        className="px-6 py-2 bg-acid text-black font-mono text-[8px] font-bold uppercase rounded-lg hover:scale-105 transition-all"
                                                    >
                                                        APPROVE & RELEASE
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-8 pt-8 border-t border-white/5 text-center">
                                    <p className="font-mono text-[7px] text-white/10 uppercase tracking-[0.5em]">PLATFORM SERVICE PROTOCOL: 8.00% FEE APPLICABLE ON ALL RELEASED STAKES</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                ) : activeView === "Incoming Bids" ? (
                    <motion.div 
                        key="bids"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="space-y-8"
                    >
                        <SectionHeader eyebrow="VERSE DISCOVERY" title="PENDING PROPOSALS" align="left" outline />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {bids.map(bid => (
                                <motion.div key={bid.id} layoutId={`bid-${bid.id}`} className="glass p-10 space-y-8 border-white/5 hover:border-cyan/30 transition-all">
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-6">
                                            <AvatarWithSpinRing src={bid.avatar} size="sm" />
                                            <div>
                                                <h4 className="font-clash font-bold text-xs tracking-widest uppercase">{bid.artist}</h4>
                                                <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest">{bid.role}</span>
                                            </div>
                                        </div>
                                        <span className="font-bebas text-2xl text-cyan">{bid.bid}</span>
                                    </div>
                                    <div className="space-y-4">
                                        <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest block">GIG: {bid.gig}</span>
                                        <p className="font-body text-sm text-white/40 leading-relaxed">"{bid.text}"</p>
                                    </div>
                                    <div className="flex gap-4 pt-6 border-t border-white/5">
                                        <button onClick={() => handleHire(bid.id)} className="flex-1 py-4 bg-cyan text-black font-black text-[10px] tracking-widest rounded-xl hover:scale-[1.02] transition-transform">ACCEPT_NODE</button>
                                        <button className="flex-1 py-4 glass text-[10px] font-mono tracking-widest uppercase hover:text-white">Review Profile</button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="financials"
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                        className="glass p-12 overflow-x-auto"
                    >
                         <h3 className="font-bebas text-3xl tracking-widest mb-12 uppercase text-cyan">FINANCIAL ARCHIVE</h3>
                         <table className="w-full text-left font-mono text-[9px] uppercase tracking-widest">
                            <thead className="text-white/20 border-b border-white/5">
                                <tr>
                                    <th className="pb-8">BATCH_ID</th>
                                    <th className="pb-8">NODE_TARGET</th>
                                    <th className="pb-8">ALLOCATION</th>
                                    <th className="pb-8 text-right">PROTOCOL</th>
                                </tr>
                            </thead>
                            <tbody className="text-white/60">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.01] transition-all group">
                                        <td className="py-8">#BATCH_{i}902</td>
                                        <td className="py-8">ELITE_NODE_{i}</td>
                                        <td className="py-8">$4,200.00</td>
                                        <td className="py-8 text-right">
                                            <div className="flex items-center justify-end gap-8 text-cyan">
                                                <span>ESCROW_RELEASED</span>
                                                <button 
                                                   onClick={() => setToast({ message: "EXHUMING FINANCIAL RECORD...", type: "success" })}
                                                   className="opacity-0 group-hover:opacity-100 p-3 glass rounded-xl text-white hover:text-cyan transition-all"
                                                >
                                                   INVOICE
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                         </table>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
          {showPostModal && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[1000] flex items-center justify-center p-8 bg-black/95 backdrop-blur-3xl"
              >
                  <motion.div 
                    initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    className="glass w-full max-w-2xl p-16 relative overflow-hidden"
                  >
                      <button onClick={() => setShowPostModal(false)} className="absolute top-8 right-8 text-white/20 hover:text-white">✕</button>
                      <SectionHeader eyebrow="SQUAD RECRUITMENT" title="POST NEW GIG" align="left" outline />
                      
                      <form onSubmit={handlePostGig} className="space-y-8">
                          <div className="space-y-2">
                              <label className="font-mono text-[8px] text-white/20 uppercase pl-4">Position Designation</label>
                              <input required type="text" placeholder="E.G. LEAD 3D ARCHITECT" className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:border-cyan outline-none transition-all" />
                          </div>
                          <div className="space-y-2">
                              <label className="font-mono text-[8px] text-white/20 uppercase pl-4">Mission Brief</label>
                              <textarea required rows={4} placeholder="DESCRIBE THE OBJECTIVE..." className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:border-cyan outline-none transition-all resize-none" />
                          </div>
                          <div className="grid grid-cols-2 gap-8">
                               <div className="space-y-2">
                                  <label className="font-mono text-[8px] text-white/20 uppercase pl-4">Stake Allocation ($)</label>
                                  <input type="number" placeholder="2,500" className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:border-cyan outline-none transition-all" />
                               </div>
                               <div className="space-y-2">
                                  <label className="font-mono text-[8px] text-white/20 uppercase pl-4">Timeline (Weeks)</label>
                                  <input type="number" placeholder="4" className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:border-cyan outline-none transition-all" />
                               </div>
                          </div>
                          <button type="submit" className="btn-primary w-full py-5 bg-cyan text-black font-black tracking-widest text-[11px]">INITIALIZE BROADCAST</button>
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
