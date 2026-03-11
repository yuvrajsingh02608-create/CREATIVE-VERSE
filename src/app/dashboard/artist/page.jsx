'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Nav, Footer } from '../../../components/Layout';
import { AvatarWithSpinRing, SectionHeader, Toast } from '../../../components/V2Components';
import { Tilt, Magnetic } from '../../../components/Interactive';
import { AnimatePresence } from 'framer-motion';

const DATA = [
  { name: 'Jan', rev: 4000, gigs: 4 },
  { name: 'Feb', rev: 3000, gigs: 3 },
  { name: 'Mar', rev: 2000, gigs: 2 },
  { name: 'Apr', rev: 2780, gigs: 5 },
  { name: 'May', rev: 1890, gigs: 2 },
  { name: 'Jun', rev: 2390, gigs: 3 },
  { name: 'Jul', rev: 3490, gigs: 4 },
];

export default function ArtistDashboardPageV2() {
  const [activeView, setActiveView] = React.useState("Overview");
  const [toast, setToast] = React.useState(null);
  const [kanbanTasks, setKanbanTasks] = React.useState([
    { id: 1, title: "LVMH Asset Node 04", category: "3D", status: "TODO" },
    { id: 2, title: "Volt Identity System", category: "BRAND", status: "IN_PROGRESS" },
    { id: 3, title: "Neon Mint Comms", category: "UI/UX", status: "REVIEW" },
    { id: 4, title: "Cortex Mapping", category: "DESIGN", status: "DONE" },
  ]);

  const moveTask = (id, direction) => {
    const statuses = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"];
    setKanbanTasks(prev => prev.map(task => {
        if (task.id === id) {
            const currentIdx = statuses.indexOf(task.status);
            const nextIdx = Math.max(0, Math.min(statuses.length - 1, currentIdx + direction));
            return { ...task, status: statuses[nextIdx] };
        }
        return task;
    }));
    setToast({ message: "TASK STATE TRANSITIONED", type: "success" });
  };

  const handleWithdraw = () => {
    setToast({ message: "TRANSMITTING FUNDS TO ESCROW...", type: "info" });
    setTimeout(() => {
        setToast({ message: "TRANSFER SECURED: FUNDS DISPATCHED", type: "success" });
    }, 2000);
  };
  return (
    <div className="bg-[#05050a] text-white min-h-screen">
      <Nav />
      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(184,255,0,0.03)_0%,transparent_50%)] pointer-events-none" />

      <main className="pt-32 pb-32 px-8 md:px-12 max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-end mb-16 gap-12">
            <div className="flex items-center gap-8">
                <AvatarWithSpinRing src="https://i.pravatar.cc/150?u=sora" size="md" />
                <div>
                   <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} className="font-mono text-[9px] uppercase tracking-[0.4em] block mb-2">ACCESS_LEVEL: PRO NODE</motion.span>
                   <h1 className="text-5xl font-bebas tracking-widest uppercase">WELCOME BACK, SORA</h1>
                </div>
            </div>

            {/* Payout Onboarding Banner */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 glass border-l-4 border-violet bg-violet/[0.03] flex flex-col md:flex-row justify-between items-center gap-6"
            >
                <div className="flex items-center gap-6">
                    <span className="text-2xl">💳</span>
                    <div>
                        <h4 className="font-bebas text-lg tracking-widest uppercase">COMPLETE YOUR PAYOUT SETTINGS</h4>
                        <p className="font-mono text-[8px] text-white/40 uppercase tracking-widest">STRIKE NODE NOT ACCESSIBLE. CONNECT YOUR BANK VIA STRIPE TO RECEIVE TRANSFERS.</p>
                    </div>
                </div>
                <button 
                    onClick={() => setToast({ message: "REDIRECTING TO SECURE STRIPE ONBOARDING...", type: "info" })}
                    className="px-8 py-3 bg-violet text-white font-mono text-[9px] font-bold uppercase rounded-xl hover:scale-105 transition-all"
                >
                    FINISH SETUP
                </button>
            </motion.div>
            <div className="flex gap-4 p-1 glass border border-white/5 rounded-2xl">
                 {["Overview", "Kanban", "Milestones", "Financials"].map(v => (
                     <button 
                        key={v}
                        onClick={() => setActiveView(v)}
                        className={`px-8 py-3 rounded-xl font-mono text-[9px] uppercase tracking-widest transition-all ${activeView === v ? 'bg-acid text-black font-bold' : 'text-white/20 hover:text-white'}`}
                    >
                        {v}
                    </button>
                 ))}
            </div>
        </header>

        <div className="min-h-[60vh]">
            <AnimatePresence mode="wait">
                {activeView === "Overview" ? (
                    <motion.div 
                        key="overview"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                    >
                        {/* REUSE EXISTING GRID CONTENT HERE - I will condense it slightly */}
                        <div className="lg:col-span-8 flex flex-col gap-8">
                             {/* Chart Section */}
                             <div className="glass p-10 relative overflow-hidden">
                                <h3 className="font-bebas text-2xl tracking-widest mb-10">REVENUE ENGINE</h3>
                                <div className="h-[250px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={DATA}>
                                            <defs>
                                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6d28ff" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#6d28ff" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                            <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} fontFamily="Space Mono" tickLine={false} axisLine={false} />
                                            <Tooltip contentStyle={{ backgroundColor: '#0d0d18', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontFamily: 'Space Mono', fontSize: '10px' }} />
                                            <Area type="monotone" dataKey="rev" stroke="#6d28ff" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                 <div className="glass p-10">
                                     <h3 className="font-clash font-bold text-[10px] tracking-[0.4em] uppercase mb-8 text-white/20">Active Missions</h3>
                                     <div className="space-y-4">
                                         {[{t:"LVMH", p:75}, {t:"VOLT", p:20}].map(g => (
                                             <div key={g.t} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                                 <div className="flex justify-between mb-2"><span className="font-bebas">{g.t}</span><span className="font-mono text-[8px]">{g.p}%</span></div>
                                                 <div className="h-1 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-violet" style={{width: `${g.p}%`}} /></div>
                                             </div>
                                         ))}
                                     </div>
                                 </div>
                                 <div className="glass p-10">
                                     <h3 className="font-clash font-bold text-[10px] tracking-[0.4em] uppercase mb-8 text-white/20">Rapid Comms</h3>
                                     <div className="space-y-4">
                                         {[{f:"H. REID", m:"Assets ok."}, {f:"M. JADE", m:"Check Wire."}].map((m,i)=>(
                                             <div key={i} className="flex gap-4 p-4 hover:bg-white/[0.03] transition-all rounded-xl cursor-pointer">
                                                 <div className="w-8 h-8 rounded-full bg-violet/20" />
                                                 <div className="overflow-hidden"><span className="block font-bold text-[9px] uppercase">{m.f}</span><p className="text-[10px] text-white/40 truncate">{m.m}</p></div>
                                             </div>
                                         ))}
                                     </div>
                                 </div>
                             </div>
                        </div>

                        <aside className="lg:col-span-4 space-y-8">
                             <div className="glass p-10 text-center">
                                 <span className="block font-mono text-[8px] text-white/20 mb-8 tracking-[0.4em]">WALLET_NODE</span>
                                 <span className="block text-4xl font-bebas text-white mb-8">$4,850.22</span>
                                 <button onClick={handleWithdraw} className="w-full py-4 bg-acid text-black font-black text-[10px] rounded-xl tracking-widest">WITHDRAW NOW</button>
                             </div>
                             <div className="glass p-10">
                                 <span className="block font-mono text-[8px] text-white/20 mb-6 tracking-[0.4em]">NODE_STRENGTH</span>
                                 <div className="flex items-center gap-6">
                                     <span className="text-4xl font-bebas text-acid">85%</span>
                                     <p className="text-[9px] font-mono text-white/20 leading-relaxed uppercase">Identity matching at premium levels.</p>
                                 </div>
                             </div>
                        </aside>
                    </motion.div>
                ) : activeView === "Milestones" ? (
                    <motion.div 
                        key="milestones"
                        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                        className="space-y-12"
                    >
                        {[
                            { name: "LVMH DIGITAL SHOWROOM", client: "LVMH HQ", total: "$12,000", milestones: [
                                { id: 1, name: "3D Asset Modeling (Phase 1)", amount: "$4,000", status: "APPROVED", date: "MAR 02" },
                                { id: 2, name: "Unreal Engine Scene Setup", amount: "$4,000", status: "IN_PROGRESS", date: "MAR 20" },
                                { id: 3, name: "Lighting & Cinematic Render", amount: "$4,000", status: "PENDING", date: "APR 05" },
                            ]},
                            { name: "VOLT HYPERCAR BRANDING", client: "VOLT MOTORS", total: "$8,500", milestones: [
                                { id: 4, name: "Logo & Identity System", amount: "$5,000", status: "SUBMITTED", date: "MAR 10" },
                                { id: 5, name: "Brand Guidelines (Web/Print)", amount: "$3,500", status: "PENDING", date: "MAR 25" },
                            ]}
                        ].map((proj, i) => (
                            <div key={i} className="glass p-12 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-violet/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
                                    <div>
                                        <h3 className="text-3xl font-bebas tracking-widest text-white mb-2">{proj.name}</h3>
                                        <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.4em]">CLIENT: {proj.client} • PROJECT TOTAL: {proj.total}</span>
                                    </div>
                                    <button className="px-8 py-3 glass rounded-xl font-mono text-[9px] uppercase tracking-widest text-white/40 hover:text-white transition-all">View Project Node</button>
                                </div>

                                <div className="space-y-4">
                                    {proj.milestones.map(m => (
                                        <div key={m.id} className="flex flex-col md:flex-row items-center gap-8 p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] transition-all">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-4 mb-2">
                                                    <span className={`w-2 h-2 rounded-full ${m.status === 'APPROVED' ? 'bg-acid shadow-[0_0_10px_#b8ff00]' : m.status === 'SUBMITTED' ? 'bg-cyan shadow-[0_0_10px_#00e5ff]' : 'bg-white/20'}`} />
                                                    <h4 className="font-clash font-bold text-xs tracking-widest uppercase">{m.name}</h4>
                                                </div>
                                                <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest">DUE: {m.date} • STAKE: {m.amount}</span>
                                            </div>
                                            
                                            <div className="flex items-center gap-6">
                                                <span className={`font-mono text-[9px] tracking-widest ${m.status === 'APPROVED' ? 'text-acid' : m.status === 'SUBMITTED' ? 'text-cyan' : 'text-white/20'}`}>
                                                    {m.status}
                                                </span>
                                                {m.status === 'IN_PROGRESS' && (
                                                    <button 
                                                        onClick={() => setToast({ message: "SUBMITTING MILESTONE FOR REVIEW...", type: "info" })}
                                                        className="px-6 py-2 bg-white text-black font-mono text-[8px] font-bold uppercase rounded-lg hover:scale-105 transition-all"
                                                    >
                                                        SUBMIT NODE
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                ) : activeView === "Kanban" ? (
                    <motion.div 
                        key="kanban"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-1 md:grid-cols-4 gap-6"
                    >
                        {["TODO", "IN_PROGRESS", "REVIEW", "DONE"].map(status => (
                            <div key={status} className="flex flex-col gap-6">
                                <div className="flex items-center justify-between px-4">
                                    <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">{status.replace("_", " ")}</span>
                                    <span className="font-bebas text-white/20">{kanbanTasks.filter(t => t.status === status).length}</span>
                                </div>
                                <div className="space-y-4 p-2 min-h-[500px] rounded-3xl border border-dashed border-white/5">
                                    {kanbanTasks.filter(t => t.status === status).map(task => (
                                        <motion.div 
                                            key={task.id}
                                            layoutId={`task-${task.id}`}
                                            className="glass p-6 group cursor-pointer hover:border-acid/30 transition-all"
                                        >
                                            <span className="font-mono text-[7px] text-acid/40 uppercase mb-2 block tracking-widest">{task.category}</span>
                                            <h4 className="font-clash font-bold text-xs uppercase mb-6 tracking-wider">{task.title}</h4>
                                            <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => moveTask(task.id, -1)} className="text-[10px] text-white/20 hover:text-white">←</button>
                                                <button onClick={() => moveTask(task.id, 1)} className="text-[10px] text-white/20 hover:text-white">→</button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div 
                        key="financials"
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { l: "LIFETIME REVENUE", v: "$124,500", c: "text-white" },
                                { l: "PENDING ESCROW", v: "$12,200", c: "text-acid" },
                                { l: "AVG PROJECT VALUE", v: "$4,250", c: "text-violet" }
                            ].map(s => (
                                <div key={s.l} className="glass p-12 text-center">
                                    <span className="block font-mono text-[8px] text-white/20 mb-6 tracking-[0.4em]">{s.l}</span>
                                    <span className={`block text-5xl font-bebas tracking-widest ${s.c}`}>{s.v}</span>
                                </div>
                            ))}
                        </div>
                        <div className="glass p-12 overflow-x-auto">
                            <h3 className="font-bebas text-2xl tracking-widest mb-10 uppercase">TRANSACTION LOG</h3>
                            <table className="w-full text-left font-mono text-[9px] uppercase tracking-widest">
                                <thead className="text-white/20 border-b border-white/5">
                                    <tr>
                                        <th className="pb-6">PROJECT_ID</th>
                                        <th className="pb-6">CLIENT_NODE</th>
                                        <th className="pb-6">STAKE</th>
                                        <th className="pb-6 text-right">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="text-white/60">
                                    {[1, 2, 3, 4].map(i => (
                                        <tr key={i} className="border-b border-white/5 hover:bg-white/[0.01] transition-all group">
                                            <td className="py-6">#ASSET_NODE_{i}024</td>
                                            <td className="py-6">NEON_LABS_CORP</td>
                                            <td className="py-6">$2,500.00</td>
                                            <td className="py-6 text-right">
                                                <div className="flex items-center justify-end gap-6 text-acid">
                                                    <span>SETTLED</span>
                                                    <button 
                                                        onClick={() => setToast({ message: "GENERATING CRYPTO-SIGNED INVOICE...", type: "success" })}
                                                        className="opacity-0 group-hover:opacity-100 p-2 glass rounded-lg text-white hover:text-acid transition-all"
                                                        title="Download Invoice"
                                                    >
                                                        ⬇
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
          {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
