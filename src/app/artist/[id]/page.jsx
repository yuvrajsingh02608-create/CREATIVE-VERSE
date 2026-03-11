'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Nav, Footer } from '../../../components/Layout';
import { SectionHeader, AvatarWithSpinRing, Toast } from '../../../components/V2Components';
import { Tilt, Magnetic } from '../../../components/Interactive';
import { WaveformPlayer, CinematicVideoPlayer } from '../../../components/MediaPlayers';
import { calculateMatchScore, generateMatchInsight } from '../../../lib/match_engine';

const TEST_GIG = {
    category: "3D & MOTION",
    requiredSkills: ["BLENDER", "HOUDINI", "OCTANE"],
    numericBudget: 5000
};

const TEST_CLIENT_PREFS = {
    styles: ["Experimental", "Bold", "Luxury"]
};

const MOCK_PROFILE_V2 = {
  name: "Sora Kim",
  role: "Lead 3D Artist & Director",
  location: "Seoul / Tokyo",
  availability: "Ready for High-End Gigs",
  category: "3D & MOTION",
  styleTags: ["Experimental", "Bold"],
  price: 120,
  responseTimeHrs: 1,
  completionRate: 98,
  bio: "Transcending boundaries between digital and physical realms. Specialized in brutalist aesthetic and cinematic motion design. Previously collaborated with Nike, Sony, and Apple.",
  stats: { projects: 124, followers: "12.5k", hired: 48, rating: 4.9 },
  skills: ["Blender", "Octane Render", "Houdini", "Realflow", "Art Direction", "Motion Capture"],
  audioMasters: [
      { id: 1, title: "VOID_RESONANCE.WAV", artist: "SORA_NODE", duration: "2:45", color: "#6d28ff" },
      { id: 2, title: "GLITCH_DYNAMICS_V2", artist: "SORA_NODE", duration: "1:12", color: "#b8ff00" }
  ],
  videoMasters: [
      { id: 1, title: "CYBER_SHRINE_2026", src: "https://vidalumiere.com/stock/abstract-motion.mp4", poster: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe" }
  ],
  portfolio: [
    { title: "Digital Brutalism", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800", size: "tall", type: "IMAGE" },
    { title: "Neon Zen", url: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&q=80&w=800", size: "wide", type: "VIDEO" },
    { title: "Fluid Dynamics", url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800", size: "normal", type: "IMAGE" },
    { title: "Cyber Landscape", url: "https://images.unsplash.com/photo-1614850715649-1d0106293bd1?auto=format&fit=crop&q=80&w=800", size: "tall", type: "3D" },
    { title: "Abstract Motion", url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800", size: "normal", type: "VIDEO" },
    { title: "Light & Gravity", url: "https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=80&w=800", size: "wide", type: "IMAGE" },
  ],
  reviews: [
    { id: 1, client: "Neon Labs", role: "CEO", rating: 5, text: "Exceptional execution on our cinematic brand reveal. Sora is a visionary developer who understands both art and technical constraints deeply.", date: "Feb 2026", verified: true },
    { id: 2, client: "Stark Film", role: "Producer", rating: 5, text: "The motion dynamics Sora delivered for our AW26 campaign were beyond expectations. A true professional.", date: "Jan 2026", verified: true },
    { id: 3, client: "Vibe Instant", role: "Creative Lead", rating: 4, text: "Great work on the AR filters. Very responsive and collaborative. Looking forward to Phase 2.", date: "Dec 2025", verified: true },
  ]
};

export default function ArtistProfilePageV2() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Portfolio");
  const [isFollowing, setIsFollowing] = useState(false);
  const [showHireModal, setShowHireModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedWork, setSelectedWork] = useState(null);

  const matchData = calculateMatchScore(MOCK_PROFILE_V2, TEST_GIG, TEST_CLIENT_PREFS);
  const matchInsight = generateMatchInsight(matchData.breakdown, MOCK_PROFILE_V2.name);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setToast({ message: !isFollowing ? "LINK ESTABLISHED: FOLLOWING" : "LINK SEVERED: UNFOLLOWED", type: !isFollowing ? "success" : "info" });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setToast({ message: "NODE URL COPIED TO CLIPBOARD", type: "success" });
  };

  const handleHire = (e) => {
    e.preventDefault();
    setToast({ message: "BROADCASTING PROPOSAL TO NODE...", type: "info" });
    setTimeout(() => {
        setShowHireModal(false);
        setToast({ message: "PROPOSAL TRANSMITTED SUCCESSFULLY", type: "success" });
    }, 2000);
  };

  const handleMessage = () => {
    router.push('/messages');
  };

  return (
    <div className="bg-[#05050a] text-white">
      <Nav />
      {/* Dynamic Cover with Blur */}
      <div className="h-[60vh] w-full relative overflow-hidden">
         <img 
            src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover opacity-30 blur-[10px] scale-110"
            alt="Banner" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-transparent to-transparent" />
      </div>

      <main className="max-w-7xl mx-auto px-8 md:px-12 -mt-40 relative z-20 pb-32">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-12 items-end mb-32">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-4">
                <AvatarWithSpinRing src="https://i.pravatar.cc/300?u=sora" size="lg" />
            </motion.div>
            
            <div className="flex-1">
                <div className="flex flex-wrap items-center gap-6 mb-6">
                    <span className="bg-acid text-black text-[10px] font-mono px-4 py-1.5 rounded-full font-black uppercase tracking-[0.2em] animate-pulse">
                        {MOCK_PROFILE_V2.availability}
                    </span>
                    <span className="text-white/20 font-mono text-[10px] uppercase tracking-[0.3em]">{MOCK_PROFILE_V2.location}</span>
                </div>
                <h1 className="text-7xl md:text-9xl font-bebas leading-[0.8] mb-6 uppercase tracking-wider">{MOCK_PROFILE_V2.name}</h1>
                <p className="text-2xl text-violet font-clash font-light uppercase tracking-[0.2em]">{MOCK_PROFILE_V2.role}</p>
            </div>

            <div className="flex gap-4">
                <Magnetic strength={0.3}><button onClick={() => setShowHireModal(true)} className="btn-primary">Hire Node</button></Magnetic>
                <Magnetic strength={0.2}>
                    <button 
                        onClick={handleFollow}
                        className={`btn-secondary ${isFollowing ? 'border-acid text-acid' : ''}`}
                    >
                        {isFollowing ? 'Following' : 'Follow'}
                    </button>
                </Magnetic>
                <Magnetic strength={0.2}><button onClick={handleMessage} className="px-4 py-4 glass rounded-full flex items-center justify-center hover:bg-white/5 transition-all">💬</button></Magnetic>
                <Magnetic strength={0.2}><button onClick={handleShare} className="px-4 py-4 glass rounded-full flex items-center justify-center hover:bg-white/5 transition-all">🔗</button></Magnetic>
            </div>
        </div>

        {/* Artist Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
            {/* Sidebar Details */}
            <div className="lg:col-span-4 space-y-24">
                {/* AI HUD */}
                <section>
                    <div className="glass p-10 border-acid/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-acid/5 blur-3xl -z-10" />
                        <div className="flex justify-between items-end mb-8">
                            <span className="font-mono text-[10px] text-acid uppercase tracking-[0.4em]">AI MISSION ALIGNMENT</span>
                            <span className="font-bebas text-5xl text-acid">{matchData.total}%</span>
                        </div>
                        <div className="space-y-4 mb-10">
                            {Object.entries(matchData.breakdown).map(([key, data]) => (
                                <div key={key} className="flex justify-between items-center text-[10px] font-mono">
                                    <span className="text-white/20 uppercase tracking-widest">{key}</span>
                                    <div className="flex-1 mx-4 h-[1px] bg-white/5" />
                                    <span className="text-white font-bold">{data.score}</span>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 bg-white/[0.03] border border-white/5 relative">
                             <span className="absolute -top-3 left-6 px-3 bg-[#0d0d18] font-mono text-[8px] text-white/20 uppercase tracking-widest">AI_INSIGHT</span>
                             <p className="text-[11px] font-mono text-white/50 leading-relaxed italic">
                                "{matchInsight}"
                             </p>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/20 mb-10">Creative Bio</h3>
                    <p className="text-white/40 font-body text-xl leading-relaxed">
                        {MOCK_PROFILE_V2.bio}
                    </p>
                </section>

                <section>
                    <h3 className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/20 mb-10">Digital Weaponry</h3>
                    <div className="flex flex-wrap gap-3">
                        {MOCK_PROFILE_V2.skills.map(skill => (
                            <span key={skill} className="px-5 py-2.5 glass text-[10px] font-mono uppercase tracking-[0.2em] hover:text-acid hover:border-acid/30 transition-all cursor-pointer">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>

                <section className="glass p-10 flex justify-between divide-x divide-white/5 bg-white/[0.01]">
                    {Object.entries(MOCK_PROFILE_V2.stats).map(([label, value]) => (
                        <div key={label} className="flex-1 px-4 text-center">
                            <span className="block text-3xl font-bebas text-white mb-2 uppercase tracking-widest">{value}</span>
                            <span className="block text-[8px] font-mono text-white/20 uppercase tracking-[0.3em]">{label}</span>
                        </div>
                    ))}
                </section>
            </div>

            {/* Main Portfolio Area */}
            <div className="lg:col-span-8">
                <div className="flex gap-16 border-b border-white/5 mb-16 overflow-x-auto no-scrollbar">
                    {["Portfolio", "Masters", "Reviews", "Lab"].map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-6 text-xs font-mono uppercase tracking-[0.4em] transition-all relative ${activeTab === tab ? 'text-white' : 'text-white/20 hover:text-white/50'}`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div layoutId="tabLine" className="absolute bottom-0 inset-x-0 h-[1px] bg-acid" />
                            )}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === "Portfolio" && (
                        <motion.div 
                            key="portfolio"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        >
                            {MOCK_PROFILE_V2.portfolio.map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`glass p-1 group cursor-pointer overflow-hidden ${item.size === 'wide' ? 'md:col-span-2' : ''}`}
                                >
                                        <div className="relative overflow-hidden rounded-xl aspect-square md:aspect-auto h-full group">
                                            <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                                            
                                            {/* Type Badge */}
                                            <div className="absolute top-6 left-6 flex gap-2">
                                                {item.type !== "IMAGE" && (
                                                    <span className={`px-4 py-1.5 rounded-full text-[8px] font-black font-mono tracking-widest uppercase ${item.type === 'VIDEO' ? 'bg-cyan text-black' : 'bg-violet text-white'}`}>
                                                        {item.type}
                                                    </span>
                                                )}
                                            </div>

                                            <div 
                                                onClick={() => setSelectedWork(item)}
                                                className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-12"
                                            >
                                                <h4 className="text-3xl font-clash font-bold mb-4 uppercase tracking-widest">{item.title}</h4>
                                                <div className="flex gap-4 items-center">
                                                    <span className="text-[10px] font-mono text-acid uppercase tracking-widest">Examine Project</span>
                                                    <div className="h-[1px] flex-1 bg-acid/30 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                                                </div>
                                            </div>
                                        </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {activeTab === "Masters" && (
                        <motion.div 
                            key="masters"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="space-y-16"
                        >
                            <SectionHeader eyebrow="CINEMATIC HUD" title="VIDEO_PLAYBACK" align="left" outline />
                            {MOCK_PROFILE_V2.videoMasters.map(video => (
                                <CinematicVideoPlayer key={video.id} {...video} />
                            ))}

                            <SectionHeader eyebrow="SONIC_RESONANCE" title="AUDIO_WAVEFORMS" align="left" outline />
                            <div className="grid grid-cols-1 gap-8">
                                {MOCK_PROFILE_V2.audioMasters.map(audio => (
                                    <WaveformPlayer key={audio.id} {...audio} />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "Reviews" && (
                        <motion.div 
                            key="reviews"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="space-y-8"
                        >
                            {MOCK_PROFILE_V2.reviews.map((rev, i) => (
                                <div key={rev.id} className="glass p-12 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                                        <span className="text-8xl font-bebas">"</span>
                                    </div>
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                                        <div>
                                            <div className="flex gap-1 mb-4">
                                                {[...Array(5)].map((_, j) => (
                                                    <span key={j} className={j < rev.rating ? "text-acid text-lg" : "text-white/10 text-lg"}>★</span>
                                                ))}
                                            </div>
                                            <h4 className="text-2xl font-clash font-bold uppercase tracking-widest text-white group-hover:text-acid transition-colors">{rev.client}</h4>
                                            <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest">{rev.role} • {rev.date}</p>
                                        </div>
                                        {rev.verified && (
                                            <div className="px-4 py-2 border border-acid/30 rounded-full flex items-center gap-3">
                                                <span className="text-acid text-xs">✓</span>
                                                <span className="font-mono text-[8px] text-acid uppercase tracking-widest font-black">VERIFIED MISSION</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xl font-body text-white/60 leading-relaxed italic max-w-3xl">
                                        "{rev.text}"
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {activeTab === "Lab" && (
                        <motion.div 
                            key="lab"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="h-96 flex flex-col items-center justify-center glass border-dashed border-white/10 opacity-20"
                        >
                             <span className="font-mono text-[10px] uppercase tracking-[1em]">EXPERIMENTAL_PHASE_LOCKED</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </main>


      {/* Modals & Overlays */}
      <AnimatePresence>
          {showHireModal && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[1000] flex items-center justify-center p-8 bg-black/90 backdrop-blur-xl"
              >
                  <motion.div 
                    initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    className="glass w-full max-w-2xl p-12 md:p-16 relative overflow-hidden"
                  >
                      <button onClick={() => setShowHireModal(false)} className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors">✕</button>
                      <SectionHeader eyebrow="PROPOSAL BROADCAST" title="HIRE THIS NODE" align="left" outline />
                      
                      <form onSubmit={handleHire} className="space-y-6">
                          <div className="space-y-2">
                              <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest pl-4">Project Designation</label>
                              <input required type="text" placeholder="ALBUM REVEAL / BRAND IDENTITY / ETC." className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:outline-none focus:border-acid transition-all" />
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-2">
                                  <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest pl-4">Budget Threshold ($)</label>
                                  <input required type="number" placeholder="5000" className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:outline-none focus:border-acid transition-all" />
                              </div>
                              <div className="space-y-2">
                                  <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest pl-4">Timeline (Weeks)</label>
                                  <input required type="number" placeholder="4" className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:outline-none focus:border-acid transition-all" />
                              </div>
                          </div>
                          <div className="space-y-2">
                              <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest pl-4">Mission Brief</label>
                              <textarea required rows={4} placeholder="DESCRIBE THE CORE OBJECTIVE..." className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:outline-none focus:border-acid transition-all resize-none" />
                          </div>
                          <button type="submit" className="btn-primary w-full py-5 bg-acid text-black font-black tracking-widest">TRANSMIT PROPOSAL</button>
                      </form>
                  </motion.div>
              </motion.div>
          )}

          {selectedWork && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedWork(null)}
                className="fixed inset-0 z-[2000] flex items-center justify-center p-12 bg-black/95 backdrop-blur-3xl cursor-zoom-out"
              >
                  <img src={selectedWork.url} alt={selectedWork.title} className="max-w-full max-h-full object-contain shadow-2xl" />
                  <div className="absolute bottom-12 left-12">
                      <h4 className="text-4xl font-bebas tracking-widest uppercase">{selectedWork.title}</h4>
                      <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.5em]">EXAMINING ASSET_NODE_04</p>
                  </div>
              </motion.div>
          )}

          {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
