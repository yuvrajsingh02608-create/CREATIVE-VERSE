'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Nav, Footer } from '../../components/Layout';
import { SectionHeader, Toast } from '../../components/V2Components';
import { Tilt, Magnetic } from '../../components/Interactive';

const MOCK_GIGS_V2 = [
  { id: 1, title: "LVMH DIGITAL SHOWROOM", client: "LVMH GROUP", budget: "$12,000", numericBudget: 12000, category: "3D & MOTION", tags: ["3D", "WEBGL"], urgent: true, deadline: "7 DAYS", desc: "Design a high-fidelity 3D showroom for the AW26 collection. Next-gen optics required." },
  { id: 2, title: "CYBERPUNK BRANDING", client: "VOLT MOTORS", budget: "$8,500", numericBudget: 8500, category: "BRAND DESIGN", tags: ["IDENTITY", "MOTION"], urgent: false, deadline: "21 DAYS", desc: "Complete visual ecosystem for an electric hypercar startup. Bold, brutalist, and fast." },
  { id: 3, title: "AR FACE FILTERS", client: "VIBE INSTANT", budget: "$4,200", numericBudget: 4200, category: "3D & MOTION", tags: ["AR", "SPARK"], urgent: true, deadline: "4 DAYS", desc: "Create a series of 5 high-fashion AR filters for a global campaign. Urgent 7-day timeline." },
  { id: 4, title: "GEN-AI INTERFACE", client: "LOGIC LABS", budget: "$15,000", numericBudget: 15000, category: "UI/UX ART", tags: ["UI/UX", "TECH"], urgent: false, deadline: "30 DAYS", desc: "Redesign the core dashboard for a leading generative AI platform. Extreme logic mapping." },
  { id: 5, title: "NORDIC FILM SHOOT", client: "STARK FILM", budget: "$22,000", numericBudget: 22000, category: "PHOTO/FILM", tags: ["FILM", "COLOR"], urgent: false, deadline: "45 DAYS", desc: "Cinematography and grading for a 30s commercial shot on location in Norway." },
];

export default function GigBoardPageV2() {
  const [filterMode, setFilterMode] = useState("ALL"); // ALL, URGENT, HIGH
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [budgetRange, setBudgetRange] = useState(30000);
  const [sortBy, setSortBy] = useState("LATEST");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [showPostModal, setShowPostModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(null);
  const [postStep, setPostStep] = useState(1);
  const [toast, setToast] = useState(null);
  const [savedGigs, setSavedGigs] = useState([]);
  
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedDesc, setEnhancedDesc] = useState("");
  const [showDiff, setShowDiff] = useState(false);
  const [newGig, setNewGig] = useState({ title: '', desc: '', budgetMin: '', budgetMax: '', category: '3D & MOTION', deadline: '2 WEEKS', skills: '' });

  const categories = ["ALL", "3D & MOTION", "BRAND DESIGN", "UI/UX ART", "PHOTO/FILM", "CREATIVE CODE"];

  const filteredGigs = MOCK_GIGS_V2.filter(gig => {
    const matchesFilter = filterMode === "ALL" || 
                         (filterMode === "URGENT" && gig.urgent) || 
                         (filterMode === "HIGH" && gig.numericBudget > 10000);
    
    const matchesCategory = selectedCategory === "ALL" || gig.category === selectedCategory;
    const matchesBudget = gig.numericBudget <= budgetRange;
    const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         gig.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         gig.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesCategory && matchesBudget && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "BUDGET: HIGH TO LOW") return b.numericBudget - a.numericBudget;
    if (sortBy === "URGENT FIRST") return (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0);
    return 0;
  });

  const toggleSave = (id) => {
    if (savedGigs.includes(id)) {
        setSavedGigs(savedGigs.filter(g => g !== id));
        setToast({ message: "GIG REMOVED FROM VAULT", type: "info" });
    } else {
        setSavedGigs([...savedGigs, id]);
        setToast({ message: "GIG SECURED IN VAULT", type: "success" });
    }
  };

  const handlePostGig = (e) => {
    e.preventDefault();
    setToast({ message: "INITIALIZING GLOBAL BROADCAST...", type: "info" });
    setTimeout(() => {
        setShowPostModal(false);
        setPostStep(1);
        setToast({ message: "PROJECT BROADCASTED SUCCESSFULLY", type: "success" });
    }, 2000);
  };

  const handleApply = (e) => {
    e.preventDefault();
    setToast({ message: "TRANSMITTING BID TO CLIENT...", type: "info" });
    setTimeout(() => {
        setShowApplyModal(null);
        setToast({ message: "BID TRANSMITTED SUCCESSFULLY", type: "success" });
    }, 2000);
  };

  return (
    <div className="bg-[#05050a] text-white">
      <Nav />
      {/* Background Mesh */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(109,40,255,0.05)_0%,transparent_50%)] pointer-events-none" />

      <main className="pt-40 pb-32 px-8 md:px-12 max-w-7xl mx-auto min-h-screen">
        <header className="mb-24 space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-end gap-12">
                <SectionHeader eyebrow="VERSE OPPORTUNITIES" title="GIG BOARD" align="left" outline />
                
                <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
                    {/* Search Field */}
                    <div className="relative group">
                        <input 
                            type="text" 
                            placeholder="SEARCH TRANSMISSIONS..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-[10px] tracking-widest focus:border-acid outline-none transition-all w-full md:w-64"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20">🔍</span>
                    </div>

                    <div className="flex gap-4 p-1 rounded-2xl border border-white/5 glass">
                        {["ALL", "URGENT", "HIGH BUDGET"].map(f => (
                            <button 
                                key={f}
                                onClick={() => setFilterMode(f.split(" ")[0])}
                                className={`px-8 py-3 rounded-xl font-mono text-[9px] uppercase tracking-widest transition-all ${filterMode === f.split(" ")[0] ? 'bg-acid text-black font-bold' : 'text-white/30 hover:text-white'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Advanced Controls Area */}
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-12 p-10 glass border-white/5 items-center"
            >
                <div>
                     <label className="font-mono text-[8px] text-white/20 uppercase tracking-[0.4em] mb-4 block">Specialization</label>
                     <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 rounded-lg font-mono text-[9px] text-white/60 focus:border-acid outline-none"
                     >
                         {categories.map(c => <option key={c} value={c}>{c}</option>)}
                     </select>
                </div>

                <div className="md:col-span-2">
                     <div className="flex justify-between items-end mb-4">
                         <label className="font-mono text-[8px] text-white/20 uppercase tracking-[0.4em]">Max Stake Threshold</label>
                         <span className="font-bebas text-lg text-acid tracking-widest">${budgetRange}</span>
                     </div>
                     <input 
                        type="range" min="1000" max="50000" step="1000"
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(parseInt(e.target.value))}
                        className="w-full accent-acid h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                     />
                </div>

                <div>
                     <label className="font-mono text-[8px] text-white/20 uppercase tracking-[0.4em] mb-4 block">Ordering Protocol</label>
                     <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 rounded-lg font-mono text-[9px] text-white/60 focus:border-acid outline-none"
                     >
                         <option>LATEST</option>
                         <option>BUDGET: HIGH TO LOW</option>
                         <option>URGENT FIRST</option>
                     </select>
                </div>
            </motion.div>
        </header>

        <div className="space-y-6">
            <AnimatePresence mode="popLayout">
                {filteredGigs.map((gig, i) => (
                    <motion.div 
                        key={gig.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: i * 0.1 }}
                        className={`glass p-1 group relative overflow-hidden ${gig.urgent ? 'border-orange/20' : 'border-white/5'}`}
                    >
                        {/* Urgent Glow */}
                        {gig.urgent && (
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange/10 blur-[40px] pointer-events-none" />
                        )}

                        <div className="bg-ink2/50 p-10 md:p-12 flex flex-col md:flex-row items-center gap-12">
                            {/* Budget Ring */}
                            <div className="w-24 h-24 rounded-full border border-white/5 flex flex-col items-center justify-center relative bg-black/20 shrink-0">
                                <span className="font-bebas text-2xl text-white">{gig.budget.split(",")[0]}</span>
                                <span className="font-mono text-[7px] text-white/20 uppercase">{gig.deadline}</span>
                                {gig.urgent && (
                                    <div className="absolute -top-2 -right-2 bg-orange text-black font-black font-mono text-[7px] px-2 py-1 rounded-full animate-pulse shadow-[0_0_15px_#ff4d1c]">LIVE</div>
                                )}
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.3em] mb-3 block">{gig.client}</span>
                                <h3 className="text-3xl font-clash font-bold uppercase tracking-widest mb-4 group-hover:text-acid transition-colors">{gig.title}</h3>
                                <p className="text-sm font-body text-white/40 max-w-xl leading-relaxed">{gig.desc}</p>
                            </div>

                            <div className="flex flex-col items-center md:items-end gap-6 shrink-0">
                                <div className="flex gap-3">
                                    <button onClick={() => toggleSave(gig.id)} className={`p-2 glass rounded-lg ${savedGigs.includes(gig.id) ? 'text-acid border-acid/50' : 'text-white/20 border-white/5'} hover:border-acid transition-all`}>
                                        {savedGigs.includes(gig.id) ? '🔖' : '📁'}
                                    </button>
                                    {gig.tags.map(tag => (
                                        <span key={tag} className="px-5 py-2 glass text-[9px] font-mono text-white/30 uppercase tracking-widest">{tag}</span>
                                    ))}
                                </div>
                                <Magnetic strength={0.2}>
                                    <button onClick={() => setShowApplyModal(gig)} className={`btn-primary px-12 ${gig.urgent ? 'bg-orange text-white' : ''}`}>Initialize Bid</button>
                                </Magnetic>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>

        {/* Global Broadcast CTA */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-32 p-16 glass border-acid/10 text-center relative overflow-hidden"
        >
             <div className="absolute inset-0 bg-acid/[0.02] pointer-events-none" />
             <h3 className="text-4xl font-bebas uppercase tracking-[10px] mb-8">HAVE A WORLD-CLASS REQUIREMENT?</h3>
             <p className="text-white/40 font-body max-w-lg mx-auto mb-10">Broadcast your project to the universe's most elite creative nodes.</p>
             <Magnetic strength={0.4}><button onClick={() => setShowPostModal(true)} className="btn-primary">Post High-Fidelity Gig</button></Magnetic>
        </motion.div>
      </main>

      {/* Modals & Overlays */}
      <AnimatePresence>
           {showPostModal && (
               <motion.div 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                   className="fixed inset-0 z-[1000] flex items-center justify-center p-8 bg-black/95 backdrop-blur-3xl"
               >
                   <motion.div 
                       initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                       className="glass w-full max-w-2xl p-12 md:p-16 relative overflow-hidden"
                   >
                       <button onClick={() => setShowPostModal(false)} className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors">✕</button>
                       <div className="flex items-center gap-4 mb-4">
                           <span className="font-mono text-[8px] text-acid uppercase tracking-widest">Step {postStep} of 3</span>
                           <div className="flex-1 h-[1px] bg-white/5">
                               <motion.div animate={{ width: `${(postStep/3)*100}%` }} className="h-full bg-acid" />
                           </div>
                       </div>
                       <SectionHeader eyebrow="VERSE BROADCAST" title="POST NEW GIG" align="left" outline />

                       <form onSubmit={handlePostGig} className="space-y-8">
                           {postStep === 1 && (
                               <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                                   <div className="space-y-2">
                                       <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest pl-4">Project Designation</label>
                                       <input 
                                            required type="text" 
                                            value={newGig.title}
                                            onChange={(e) => setNewGig({...newGig, title: e.target.value})}
                                            placeholder="GALAXY REBRAND / 3D ENVIRONMENTS" 
                                            className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:outline-none focus:border-acid transition-all" 
                                        />
                                   </div>
                                   <div className="space-y-2">
                                       <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest pl-4">Category</label>
                                       <select 
                                            value={newGig.category}
                                            onChange={(e) => setNewGig({...newGig, category: e.target.value})}
                                            className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:outline-none focus:border-acid transition-all"
                                        >
                                           <option>3D & MOTION</option>
                                           <option>BRAND DESIGN</option>
                                           <option>UI/UX ART</option>
                                           <option>CREATIVE CODE</option>
                                       </select>
                                   </div>
                                    <div className="space-y-2 relative">
                                        <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest pl-4">Mission Brief</label>
                                        <textarea 
                                            rows={3}
                                            value={newGig.desc}
                                            onChange={(e) => setNewGig({...newGig, desc: e.target.value})}
                                            placeholder="DESCRIBE THE SCOPE AND AESTHETIC REQUIREMENTS..."
                                            className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:outline-none focus:border-acid transition-all resize-none"
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                setIsEnhancing(true);
                                                setTimeout(() => {
                                                    setEnhancedDesc(newGig.desc + "\n\nMISSION_PARAMS:\n- Required: High-Fidelity Octane Shaders\n- Suggested: 5-Day Sprints\n- Recommended Budget: +$2,000 for cinematic polish.");
                                                    setShowDiff(true);
                                                    setIsEnhancing(false);
                                                }, 1500);
                                            }}
                                            className="absolute bottom-4 right-4 px-4 py-2 glass border-acid/20 text-acid font-mono text-[8px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                                        >
                                            {isEnhancing ? 'ANALYZING...' : '✦ ENHANCE WITH AI'}
                                        </button>
                                    </div>

                                    <AnimatePresence>
                                        {showDiff && (
                                            <motion.div 
                                                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                                                className="p-6 glass border-acid/20 bg-acid/5 overflow-hidden"
                                            >
                                                <span className="font-mono text-[7px] text-acid uppercase tracking-widest block mb-4">AI_OPTIMIZED_DRAFT</span>
                                                <p className="text-[10px] font-mono text-white/40 leading-relaxed mb-6 whitespace-pre-line">{enhancedDesc}</p>
                                                <div className="flex gap-4">
                                                    <button 
                                                        onClick={() => {
                                                            setNewGig({...newGig, desc: enhancedDesc});
                                                            setShowDiff(false);
                                                        }}
                                                        className="px-6 py-2 bg-acid text-black font-mono text-[8px] font-black uppercase tracking-widest"
                                                    >
                                                        ACCEPT
                                                    </button>
                                                    <button onClick={() => setShowDiff(false)} className="px-6 py-2 glass text-white/20 font-mono text-[8px] uppercase tracking-widest">DISCARD</button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                   <button type="button" onClick={() => setPostStep(2)} className="btn-primary w-full py-5 bg-acid text-black font-black tracking-widest uppercase">Proceed ⮕</button>
                               </motion.div>
                           )}
                           {postStep === 2 && (
                               <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                                   <div className="grid grid-cols-2 gap-6">
                                       <div className="space-y-2">
                                           <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest pl-4">Min Budget ($)</label>
                                           <input 
                                                required type="number" 
                                                value={newGig.budgetMin}
                                                onChange={(e) => setNewGig({...newGig, budgetMin: e.target.value})}
                                                placeholder="2000" 
                                                className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:outline-none focus:border-acid transition-all" 
                                            />
                                       </div>
                                       <div className="space-y-2">
                                           <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest pl-4">Max Budget ($)</label>
                                           <input 
                                                required type="number" 
                                                value={newGig.budgetMax}
                                                onChange={(e) => setNewGig({...newGig, budgetMax: e.target.value})}
                                                placeholder="5000" 
                                                className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:outline-none focus:border-acid transition-all" 
                                            />
                                       </div>
                                   </div>
                                   <div className="space-y-2">
                                       <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest pl-4">Skills Required</label>
                                       <input 
                                            value={newGig.skills}
                                            onChange={(e) => setNewGig({...newGig, skills: e.target.value})}
                                            placeholder="OCTANE, REACT, TYPOGRAPHY..." 
                                            className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:outline-none focus:border-acid transition-all" 
                                        />
                                   </div>
                                   <div className="flex gap-4">
                                       <button type="button" onClick={() => setPostStep(1)} className="btn-secondary flex-1 py-5 uppercase font-mono text-[10px]">Back</button>
                                       <button type="button" onClick={() => setPostStep(3)} className="btn-primary flex-1 py-5 uppercase font-mono text-[10px]">Proceed ⮕</button>
                                   </div>
                               </motion.div>
                           )}
                           {postStep === 3 && (
                               <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                                   <div className="space-y-2">
                                       <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest pl-4">Final Brief Wrap-up</label>
                                       <textarea 
                                            required rows={5} 
                                            placeholder="ANY FINAL VISIONARY DETAILS?" 
                                            className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:outline-none focus:border-acid transition-all resize-none" 
                                        />
                                   </div>
                                   <div className="flex gap-4">
                                       <button type="button" onClick={() => setPostStep(2)} className="btn-secondary flex-1 py-5 uppercase font-mono text-[10px]">Back</button>
                                       <button type="submit" className="btn-primary flex-1 py-5 bg-acid text-black font-black tracking-widest uppercase">Publish to Verse ✦</button>
                                   </div>
                               </motion.div>
                           )}
                       </form>
                   </motion.div>
               </motion.div>
           )}

           {showApplyModal && (
               <motion.div 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                   className="fixed inset-0 z-[1000] flex items-center justify-center p-8 bg-black/95 backdrop-blur-3xl"
               >
                   <motion.div 
                       initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                       className="glass w-full max-w-2xl p-12 md:p-16 relative overflow-hidden"
                   >
                       <button onClick={() => setShowApplyModal(null)} className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors">✕</button>
                       <SectionHeader eyebrow="BID INITIALIZATION" title="APPLY FOR HI-FI" align="left" outline />
                       <div className="mb-10 text-white/40 font-mono text-[10px] space-y-1 uppercase tracking-widest">
                           <p>PROJECT: {showApplyModal.title}</p>
                           <p>TARGET: {showApplyModal.budget}</p>
                       </div>
                       
                       <form onSubmit={handleApply} className="space-y-8">
                           <div className="space-y-2">
                               <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest pl-4">Cover Protocol</label>
                               <textarea required rows={4} placeholder="HOW WILL YOU EXECUTE THIS VISION?" className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:outline-none focus:border-acid transition-all resize-none" />
                           </div>
                           <div className="grid grid-cols-2 gap-6">
                               <div className="space-y-2">
                                   <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest pl-4">Proposed Stake ($)</label>
                                   <input required type="number" placeholder="Budget" className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:outline-none focus:border-acid transition-all" />
                               </div>
                               <div className="space-y-2">
                                   <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest pl-4">Lead Time (Days)</label>
                                   <input required type="number" placeholder="14" className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:outline-none focus:border-acid transition-all" />
                               </div>
                           </div>
                           <button type="submit" className="btn-primary w-full py-5 bg-acid text-black font-black tracking-widest uppercase">Transmit Bid ⮕</button>
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
