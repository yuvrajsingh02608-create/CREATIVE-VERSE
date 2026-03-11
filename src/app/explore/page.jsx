'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Nav, Footer } from '../../components/Layout';
import { SectionHeader, AvatarWithSpinRing } from '../../components/V2Components';
import { Tilt, Magnetic } from '../../components/Interactive';
import { calculateMatchScore } from '../../lib/match_engine';

const CATEGORIES = ["ALL", "3D & MOTION", "BRAND DESIGN", "UI/UX ART", "PHOTO/FILM", "CREATIVE CODE", "ARCHITECTURE", "MUSIC PRODUCTION", "PERFORMANCE"];

const TEST_GIG = {
    category: "3D & MOTION",
    requiredSkills: ["BLENDER", "HOUDINI", "OCTANE"],
    numericBudget: 5000
};

const TEST_CLIENT_PREFS = {
    styles: ["Experimental", "Bold", "Luxury"]
};

const MOCK_ARTISTS_V2 = [
  { id: 1, name: "SORA KIM", role: "LEAD 3D DIRECTOR", rating: 4.9, hired: 48, followers: "12k", skills: ["BLENDER", "OCTANE"], category: "3D & MOTION", color: "violet", price: 120, available: true, styleTags: ["Experimental", "Bold"], responseTimeHrs: 1, completionRate: 98 },
  { id: 2, name: "ZANE GREY", role: "BRAND ARCHITECT", rating: 4.8, hired: 32, followers: "8k", skills: ["IDENTITY", "FIGMA"], category: "BRAND DESIGN", color: "orange", price: 95, available: false, styleTags: ["Minimalist", "Editorial"], responseTimeHrs: 5, completionRate: 95 },
  { id: 3, name: "MARA JADE", role: "TECH ARTIST", rating: 5.0, hired: 12, followers: "5k", skills: ["GLSL", "REACT"], category: "CREATIVE CODE", color: "acid", price: 150, available: true, styleTags: ["Experimental", "Luxury"], responseTimeHrs: 0.5, completionRate: 100 },
  { id: 4, name: "LEO VANCE", role: "UI/UX VISIONARY", rating: 4.7, hired: 55, followers: "15k", skills: ["SYSTEMS", "APPS"], category: "UI/UX ART", color: "cyan", price: 80, available: true, styleTags: ["Commercial", "Playful"], responseTimeHrs: 12, completionRate: 92 },
  { id: 5, name: "O. VORTEX", role: "ANIMATOR", rating: 4.9, hired: 22, followers: "9k", skills: ["HOUDINI", "MAYA"], category: "3D & MOTION", color: "rose", price: 110, available: true, styleTags: ["Bold", "Experimental"], responseTimeHrs: 2, completionRate: 99 },
  { id: 6, name: "KAI ZEN", role: "CREATIVE TECH", rating: 4.6, hired: 18, followers: "4k", skills: ["OPENRNDR", "P5JS"], category: "CREATIVE CODE", color: "violet", price: 70, available: false, styleTags: ["Street", "Fine Art"], responseTimeHrs: 48, completionRate: 85 },
];

import { useSearchParams } from 'next/navigation';

export default function ExplorePageV2() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('category')?.toUpperCase().replace(/-/g, ' ') || "ALL";
  
  const [selectedCat, setSelectedCat] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [sortBy, setSortBy] = useState("TOP RATED");
  const [priceRange, setPriceRange] = useState(200);
  const [minRating, setMinRating] = useState(0);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (initialCat && CATEGORIES.includes(initialCat)) {
        setSelectedCat(initialCat);
    }
  }, [initialCat]);

  const placeHolders = ["SEARCH ELITE 3D ARTISTS...", "FIND BRAND ARCHITECTS...", "DISCOVER CREATIVE CODERS...", "SOURCING UI VISIONARIES..."];

  useEffect(() => {
    const interval = setInterval(() => {
        setPlaceholderIdx(prev => (prev + 1) % placeHolders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredArtists = MOCK_ARTISTS_V2.filter(artist => {
    const matchesCat = selectedCat === "ALL" || 
                     artist.category.toUpperCase() === selectedCat;
    
    const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         artist.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artist.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesPrice = artist.price <= priceRange;
    const matchesRating = artist.rating >= minRating;
    const matchesAvailability = !availableOnly || artist.available;
    
    return matchesCat && matchesSearch && matchesPrice && matchesRating && matchesAvailability;
  }).map(artist => ({
    ...artist,
    matchData: calculateMatchScore(artist, TEST_GIG, TEST_CLIENT_PREFS)
  })).sort((a, b) => {
    if (sortBy === "BEST MATCH") return b.matchData.total - a.matchData.total;
    if (sortBy === "TOP RATED") return b.rating - a.rating;
    if (sortBy === "MOST HIRED") return b.hired - a.hired;
    if (sortBy === "PRICE: LOW TO HIGH") return a.price - b.price;
    return 0;
  });

  return (
    <div className="bg-[#05050a] text-white">
      <Nav />
      {/* Background Glow */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-violet/5 blur-[120px] rounded-full pointer-events-none" />

      <main className="pt-40 pb-32 px-8 md:px-12 max-w-7xl mx-auto min-h-screen">
        <header className="mb-24">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <SectionHeader eyebrow="VERSE DISCOVERY" title="DISCOVER ELITE TALENT" align="left" outline />
            </motion.div>

            <div className="flex flex-col md:flex-row gap-8 items-end justify-between mt-12">
                {/* Search Bar */}
                <div className="relative group w-full max-w-2xl">
                    <div className="absolute inset-0 bg-violet/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setShowHistory(true)}
                        onBlur={() => setTimeout(() => setShowHistory(false), 200)}
                        placeholder={placeHolders[placeholderIdx]}
                        className="w-full bg-white/[0.03] border border-white/10 px-12 py-6 rounded-2xl font-bebas text-2xl tracking-[4px] focus:outline-none focus:border-acid transition-all duration-500 relative z-10 uppercase text-white"
                    />
                    <AnimatePresence>
                        {showHistory && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 right-0 mt-4 glass border-white/10 p-6 z-50 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-3xl -z-10" />
                                <span className="font-mono text-[8px] text-white/20 uppercase tracking-[0.4em] mb-6 block px-4">Recent Node Inquiries</span>
                                {["3D BRUTALISM", "NEON BRANDING", "GLSL_SHADERS", "HOUDINI_FX"].map(h => (
                                    <button 
                                        key={h}
                                        onClick={() => setSearchQuery(h)}
                                        className="w-full text-left px-4 py-4 hover:bg-white/5 rounded-xl font-mono text-[10px] text-white/40 hover:text-acid transition-all flex items-center justify-between group/h"
                                    >
                                        <span>✦ {h}</span>
                                        <span className="opacity-0 group-hover/h:opacity-100 transition-opacity text-[8px]">PROCEED</span>
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 z-10 group-hover:text-acid transition-colors">🔍</div>
                </div>

                {/* Sort Toggle */}
                <div className="flex gap-4 p-1 glass border border-white/5 rounded-2xl">
                    {["BEST MATCH", "TOP RATED", "MOST HIRED", "PRICE: LOW TO HIGH"].map(s => (
                        <button 
                            key={s}
                            onClick={() => setSortBy(s)}
                            className={`px-6 py-3 rounded-xl font-mono text-[8px] uppercase tracking-widest transition-all ${sortBy === s ? 'bg-white text-black font-bold' : 'text-white/20 hover:text-white'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Sticky Filters Sidebar */}
            <aside className="lg:col-span-3">
                <div className="sticky top-32 space-y-12">
                    <section>
                        <h3 className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em] mb-8">Specialization</h3>
                        <div className="flex flex-col gap-4 max-h-60 overflow-y-auto no-scrollbar">
                            {CATEGORIES.map(cat => (
                                <button 
                                    key={cat}
                                    onClick={() => setSelectedCat(cat)}
                                    className={`text-left font-bebas text-xl tracking-widest transition-all ${selectedCat === cat ? 'text-acid underline underline-offset-8 decoration-acid/30' : 'text-white/30 hover:text-white'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em]">Node Availability</h3>
                            <button 
                                onClick={() => setAvailableOnly(!availableOnly)}
                                className={`w-10 h-5 rounded-full p-1 transition-colors ${availableOnly ? 'bg-acid' : 'bg-white/10'}`}
                            >
                                <motion.div animate={{ x: availableOnly ? 20 : 0 }} className="w-3 h-3 bg-black rounded-full" />
                            </button>
                        </div>
                    </section>

                    <section>
                        <h3 className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em] mb-8">Node Rating</h3>
                        <div className="space-y-4">
                            {[0, 4.5, 4.8].map(rate => (
                                <label key={rate} className="flex items-center gap-4 cursor-pointer group">
                                    <input 
                                        type="radio" 
                                        name="rating" 
                                        checked={minRating === rate}
                                        onChange={() => setMinRating(rate)}
                                        className="hidden" 
                                    />
                                    <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${minRating === rate ? 'border-acid bg-acid' : 'border-white/10 group-hover:border-acid'}`}>
                                       {minRating === rate && <div className="text-black text-[8px]">✓</div>}
                                    </div>
                                    <span className={`text-[10px] font-mono uppercase tracking-widest transition-colors ${minRating === rate ? 'text-white' : 'text-white/40'}`}>
                                        {rate === 0 ? 'ALL NODES' : `${rate}+ STAR NODES`}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </section>

                    <section>
                         <h3 className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em] mb-8">Max Hourly Stake: <span className="text-acid">${priceRange}</span></h3>
                         <input 
                            type="range" 
                            min="50" 
                            max="300" 
                            step="10" 
                            value={priceRange}
                            onChange={(e) => setPriceRange(parseInt(e.target.value))}
                            className="w-full accent-acid h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                         />
                         <div className="flex justify-between mt-4 font-mono text-[8px] text-white/20">
                             <span>$50</span>
                             <span>$300+</span>
                         </div>
                    </section>
                </div>
            </aside>

            {/* Artist Grid */}
            <div className="lg:col-span-9">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredArtists.map((artist, i) => (
                            <motion.div 
                                key={artist.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                            >
                                <Tilt>
                                    <div className="glass p-1 group cursor-pointer h-full border-white/5 hover:border-violet/20 transition-all">
                                        <div className="bg-ink2 p-8 h-full flex flex-col items-center text-center">
                                            <div className="mb-6 relative">
                                                <AvatarWithSpinRing src={`https://i.pravatar.cc/150?u=${artist.id}`} size="md" />
                                                <div className={`absolute top-0 right-0 w-3 h-3 ${artist.available ? 'bg-acid shadow-[0_0_10px_#b8ff00]' : 'bg-white/10'} border-2 border-ink2 rounded-full animate-pulse`} />
                                            </div>
                                            <h4 className="font-clash font-bold text-lg mb-2 group-hover:text-acid transition-colors tracking-widest uppercase">{artist.name}</h4>
                                            
                                            {/* AI Match Badge */}
                                            <div className="mb-4 relative group/match">
                                                <div className={`px-4 py-1.5 rounded-full font-mono text-[9px] font-black tracking-widest flex items-center gap-2 border ${
                                                    artist.matchData.total >= 90 ? 'bg-acid/10 border-acid/30 text-acid' :
                                                    artist.matchData.total >= 70 ? 'bg-violet/10 border-violet/30 text-violet' :
                                                    'bg-white/5 border-white/10 text-white/40'
                                                }`}>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                                                    MATCH: {artist.matchData.total}%
                                                </div>

                                                {/* Match Breakdown Tooltip */}
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 glass p-6 opacity-0 group-hover/match:opacity-100 pointer-events-none transition-all z-[100] border-white/10">
                                                    <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl -z-10" />
                                                    <span className="font-mono text-[7px] text-white/20 uppercase tracking-widest block mb-4">Core Alignment</span>
                                                    <div className="space-y-3">
                                                        {Object.entries(artist.matchData.breakdown).map(([key, data]) => (
                                                            <div key={key} className="flex justify-between items-center">
                                                                <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest">{key}</span>
                                                                <div className="flex-1 mx-3 h-[1px] bg-white/5" />
                                                                <span className="font-mono text-[8px] text-white font-bold">{data.score}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="font-mono text-[9px] text-white/30 tracking-[0.2em] mb-6">{artist.role} • ${artist.price}/HR</p>
                                            
                                            <div className="flex items-center gap-2 mb-8 glass px-3 py-1 scale-90">
                                                <span className="text-acid text-[10px]">★</span>
                                                <span className="font-bebas text-sm tracking-widest">{artist.rating}</span>
                                                <span className="text-white/10 mx-1">/</span>
                                                <span className="font-mono text-[8px] text-white/30 uppercase">{artist.hired} HIRES</span>
                                            </div>

                                            <div className="flex flex-wrap gap-1.5 justify-center mb-10">
                                                {artist.skills.map(s => (
                                                    <span key={s} className="text-[8px] font-mono text-white/20 border border-white/5 px-2 py-0.5 rounded-full group-hover:border-acid/30 group-hover:text-acid transition-all">{s}</span>
                                                ))}
                                            </div>

                                            <a 
                                                href={`/artist/${artist.id}`}
                                                className="mt-auto w-full py-4 bg-white/5 border border-white/10 rounded-xl font-clash font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all text-center"
                                            >
                                                View Node Base
                                            </a>
                                        </div>
                                    </div>
                                </Tilt>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
