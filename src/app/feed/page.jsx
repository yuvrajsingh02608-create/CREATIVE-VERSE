'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Nav, Footer } from '../../components/Layout';
import { SectionHeader, AvatarWithSpinRing, Toast } from '../../components/V2Components';
import { Tilt, Magnetic } from '../../components/Interactive';

const MOCK_FEED = [
  { id: 1, type: "POST", author: "Sora Kim", avatar: "https://i.pravatar.cc/150?u=sora", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800", text: "New digital brutalism study. Exploring the tension between light and heavy geometry.", loves: 124, comments: 12, time: "2H AGO", followed: true },
  { id: 2, type: "DROP", author: "Vortex Labs", avatar: "https://i.pravatar.cc/150?u=vortex", image: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&q=80&w=800", text: "NEW ASSET NODE RELEASED: 'NEON_MINT_V1'. EXCLUSIVE FOR PRO MEMBERS.", loves: 89, comments: 5, time: "5H AGO", followed: true },
  { id: 3, type: "GIG", author: "Zane Grey", avatar: "https://i.pravatar.cc/150?u=zane", image: "https://images.unsplash.com/photo-1614850715649-1d0106293bd1?auto=format&fit=crop&q=80&w=800", text: "BROADCASTING NEW MISSION: UI mapping for the next-gen creative dashboard.", loves: 210, comments: 18, time: "8H AGO", followed: false },
  { id: 4, type: "POST", author: "Leo Vance", avatar: "https://i.pravatar.cc/150?u=leo", image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800", text: "Working on something big. The grid is alive.", loves: 45, comments: 2, time: "12H AGO", followed: false },
];

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState("GLOBAL"); // FOR YOU, GLOBAL
  const [posts, setPosts] = useState(MOCK_FEED);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [newPostText, setNewPostText] = useState("");
  const [loves, setLoves] = useState({});
  const [comments, setShowComments] = useState(null);

  const filteredPosts = posts.filter(post => 
    activeTab === "GLOBAL" || (activeTab === "FOR YOU" && post.followed)
  );

  const handleLove = (id) => {
    setLoves(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setToast({ message: "ENERGY TRANSMITTED: LOVE +1", type: "success" });
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    const newPost = {
        id: posts.length + 1,
        author: "You",
        avatar: "https://i.pravatar.cc/150?u=you",
        image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800",
        text: newPostText,
        loves: 0,
        comments: 0,
        time: "JUST NOW"
    };
    setPosts([newPost, ...posts]);
    setShowCreateModal(false);
    setNewPostText("");
    setToast({ message: "BROADCASTED TO THE WIRE", type: "success" });
  };

  return (
    <div className="bg-[#05050a] text-white min-h-screen">
      <Nav />
      
      <main className="pt-40 pb-32 px-8 md:px-12 max-w-3xl mx-auto">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-center gap-8">
             <SectionHeader eyebrow="VERSE SOCIAL" title="CREATIVE WIRE" align="left" outline />
             
             <div className="flex items-center gap-8">
                <div className="flex gap-4 p-1 rounded-2xl border border-white/5 glass">
                    {["GLOBAL", "FOR YOU"].map(t => (
                        <button 
                            key={t}
                            onClick={() => setActiveTab(t)}
                            className={`px-8 py-3 rounded-xl font-mono text-[9px] uppercase tracking-widest transition-all ${activeTab === t ? 'bg-white text-black font-bold' : 'text-white/30 hover:text-white'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
                <Magnetic strength={0.3}>
                    <button 
                        onClick={() => setShowCreateModal(true)}
                        className="btn-primary"
                    >
                        Broadcast Post
                    </button>
                </Magnetic>
             </div>
        </header>

        <div className="space-y-12">
            <AnimatePresence mode="popLayout">
                {filteredPosts.map(post => (
                    <motion.article 
                        key={post.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="glass border-white/5 overflow-hidden group"
                    >
                        {/* Author Header */}
                        <div className="p-6 flex items-center justify-between border-b border-white/5 bg-white/[0.01]">
                            <div className="flex items-center gap-4">
                                <AvatarWithSpinRing src={post.avatar} size="sm" />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-clash font-bold text-xs tracking-widest uppercase">{post.author}</h4>
                                        {post.type !== "POST" && (
                                            <span className={`px-2 py-0.5 rounded-full text-[7px] font-black font-mono tracking-widest uppercase ${post.type === 'DROP' ? 'bg-acid text-black' : 'bg-orange text-white'}`}>
                                                {post.type}
                                            </span>
                                        )}
                                    </div>
                                    <span className="font-mono text-[8px] text-white/20 uppercase tracking-[0.2em]">{post.time}</span>
                                </div>
                            </div>
                            <button className="text-white/20 hover:text-white transition-colors">•••</button>
                        </div>

                    {/* Image */}
                    <div className="aspect-square relative overflow-hidden group">
                        <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <button onClick={() => handleLove(post.id)} className="text-6xl text-rose animate-pulse">✦</button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-6">
                        <p className="font-body text-sm text-white/60 leading-relaxed italic">
                            "{post.text}"
                        </p>
                        
                        {/* Actions */}
                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                            <div className="flex gap-8">
                                <button 
                                    onClick={() => handleLove(post.id)}
                                    className="flex items-center gap-3 group"
                                >
                                    <span className="text-rose group-hover:scale-125 transition-transform">❤</span>
                                    <span className="font-mono text-[10px] text-white/30 group-hover:text-white uppercase tracking-widest">{post.loves + (loves[post.id] || 0)}</span>
                                </button>
                                <button 
                                    onClick={() => setShowComments(post.id)}
                                    className="flex items-center gap-3 group"
                                >
                                    <span className="text-cyan group-hover:scale-125 transition-transform">🗨</span>
                                    <span className="font-mono text-[10px] text-white/30 group-hover:text-white uppercase tracking-widest">{post.comments}</span>
                                </button>
                                <button className="flex items-center gap-3 group" onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    setToast({ message: "POST LINK SECURED", type: "success" });
                                }}>
                                    <span className="text-violet group-hover:scale-125 transition-transform">🚀</span>
                                    <span className="font-mono text-[10px] text-white/30 group-hover:text-white uppercase tracking-widest text-xs">Share</span>
                                </button>
                            </div>
                            <button className="text-[10px] font-mono text-acid/40 hover:text-acid transition-colors uppercase tracking-[0.3em]">Save Asset</button>
                        </div>
                    </div>
                </motion.article>
            ))}
            </AnimatePresence>
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
          {showCreateModal && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[1000] flex items-center justify-center p-8 bg-black/95 backdrop-blur-3xl"
              >
                  <motion.div 
                    initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    className="glass w-full max-w-xl p-12 relative overflow-hidden"
                  >
                      <button onClick={() => setShowCreateModal(false)} className="absolute top-8 right-8 text-white/20 hover:text-white">✕</button>
                      <SectionHeader eyebrow="WIRE BROADCAST" title="SHARE VISION" align="left" outline />
                      
                      <form onSubmit={handleCreatePost} className="space-y-8">
                          <textarea 
                            required
                            value={newPostText}
                            onChange={(e) => setNewPostText(e.target.value)}
                            rows={5} 
                            placeholder="WHAT ARE YOU TRANSCENDING TODAY?" 
                            className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:outline-none focus:border-acid transition-all resize-none"
                          />
                          <div className="flex items-center justify-between">
                               <button type="button" className="text-[10px] font-mono text-white/20 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-3">
                                   <span className="text-acid">✦</span> Attach Asset_Node
                               </button>
                               <button type="submit" className="btn-primary px-10">Broadcast</button>
                          </div>
                      </form>
                  </motion.div>
              </motion.div>
          )}

          {comments && (
              <motion.div 
                initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }}
                className="fixed inset-y-0 right-0 w-full max-w-md bg-black/95 backdrop-blur-3xl z-[2000] border-l border-white/10 p-12 overflow-y-auto"
              >
                  <button onClick={() => setShowComments(null)} className="absolute top-8 right-8 text-white/20 hover:text-white">✕</button>
                  <SectionHeader eyebrow="WIRE COMMS" title="COMMENTS" align="left" outline />
                  
                  <div className="space-y-8 mb-12">
                      {[1, 2, 3].map(i => (
                          <div key={i} className="flex gap-6 pb-8 border-b border-white/5">
                               <AvatarWithSpinRing src={`https://i.pravatar.cc/100?u=comm${i}`} size="sm" />
                               <div>
                                   <h5 className="font-clash font-bold text-[10px] uppercase tracking-widest mb-2 text-acid">ELITE_NODE_{i}</h5>
                                   <p className="text-xs text-white/40 leading-relaxed font-body">"The geometry on this is absolutely mental. Love the brutalist approach."</p>
                               </div>
                          </div>
                      ))}
                  </div>

                  <div className="mt-auto">
                      <textarea rows={3} placeholder="Add to the comms..." className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:outline-none focus:border-acid transition-all resize-none mb-4" />
                      <button className="btn-primary w-full py-4 text-[10px] uppercase tracking-[0.4em]">Transmit</button>
                  </div>
              </motion.div>
          )}

          {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
