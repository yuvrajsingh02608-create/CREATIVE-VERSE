'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Nav, Footer } from '../components/Layout';
import BackgroundShader from '../components/BackgroundShader';
import LoadingScreen from '../components/LoadingScreen';
import { SectionHeader, AvatarWithSpinRing, AnimatedCounter, MarqueeTicker } from '../components/V2Components';
import { Magnetic, Tilt } from '../components/Interactive';

const FEATURE_CARDS_V2 = [
    { num: "01", title: "ELITE DISCOVERY", desc: "Access the world's most curated network of 3D, Motion, and Brand designers.", color: "violet" },
    { num: "02", title: "SMART MATCHING", desc: "Our algorithm connects talent to opportunities based on aesthetics and skill overlap.", color: "orange" },
    { num: "03", title: "ESCROW SECURE", desc: "Milestone-based payments ensure artists get paid and clients get world-class delivery.", color: "cyan" },
    { num: "04", title: "COLLECTIVE FLOW", desc: "Form squads, share portfolios, and take on legendary-scale studio projects.", color: "rose" },
    { num: "05", title: "CINEMATIC TOOLS", desc: "Manage projects with a visual dashboard designed for the modern creative workflow.", color: "acid" },
    { num: "06", title: "ANALYTICS ENGINE", desc: "Track your growth, profile impact, and revenue snapshots in real-time.", color: "gold" },
];

const CATEGORIES_V2 = [
    { name: "3D & MOTION", emoji: "🌪️", count: "1.2k Artists", color: "violet" },
    { name: "BRAND DESIGN", emoji: "📐", count: "840 Artists", color: "orange" },
    { name: "UI/UX ART", emoji: "🖥️", count: "650 Artists", color: "cyan" },
    { name: "PHOTO/FILM", emoji: "🎞️", count: "420 Artists", color: "rose" },
    { name: "CREATIVE CODE", emoji: "👾", count: "310 Artists", color: "acid" },
    { name: "ARCHITECTURE", emoji: "🏛️", count: "190 Artists", color: "gold" },
];

export default function LandingPageV2() {
  return (
    <div className="bg-[#05050a] text-white">
      <LoadingScreen />
      <Nav />
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-24 px-8 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
            {/* Left Content */}
            <div className="relative z-10">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="inline-flex items-center gap-3 px-4 py-2 border border-acid/20 bg-acid/[0.05] rounded-full mb-8"
                >
                    <span className="w-1.5 h-1.5 bg-acid rounded-full animate-pulse" />
                    <span className="font-mono text-[10px] text-acid uppercase tracking-[0.3em]">THE CREATIVE UNIVERSE IS LIVE</span>
                </motion.div>

                <h1 className="text-[clamp(64px,8vw,120px)] font-bebas leading-[0.9] mb-12">
                     <motion.span initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="block">WHERE</motion.span>
                     <motion.span initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="block mb-2 text-transparent bg-clip-text bg-[linear-gradient(90deg,#ff1a6e,#6d28ff,#00e5ff)] bg-[length:200%_auto] animate-[gradient-border_5s_linear_infinite] px-1">ART MEETS</motion.span>
                     <motion.span initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="block text-acid">OPPORTUNITY</motion.span>
                </h1>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1 }} className="text-lg md:text-xl font-body font-light max-w-[480px] mb-16 leading-relaxed">
                    A cinematic digital ecosystem for the next generation of creative pioneers. Settle into the verse and discover elite talent.
                </motion.p>

                <div className="flex flex-wrap gap-6 mb-24">
                    <Magnetic strength={0.3}>
                        <a href="/auth" className="btn-primary">Start Creating — It's Free</a>
                    </Magnetic>
                    <Magnetic strength={0.2}>
                        <a href="/explore" className="btn-secondary group">
                            Explore Artists 
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                    </Magnetic>
                </div>

                <div className="flex flex-wrap gap-12">
                   <AnimatedCounter end={28} label="ELITE ARTISTS" suffix="K+" />
                   <AnimatedCounter end={4} label="GLOBAL CLIENTS" suffix="K+" />
                   <AnimatedCounter end={92} label="SUCCESS RATE" suffix="%" />
                </div>
            </div>

            {/* Right Scene (Cards) */}
            <div className="relative h-[600px] hidden lg:flex items-center justify-center">
                 {/* Radial Glow Blob */}
                 <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="absolute w-[400px] h-[400px] bg-violet rounded-full blur-[80px]"
                 />

                 {/* Floating Cards */}
                 <div className="relative w-full h-full">
                    {/* Main Card */}
                    <div className="absolute top-[20%] left-[10%] z-30">
                        <Tilt>
                            <div className="w-[280px] glass p-1">
                                <div className="aspect-[4/5] bg-ink2 rounded-xl overflow-hidden relative">
                                    <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-80" />
                                    <div className="absolute top-4 right-4 bg-acid text-black font-mono text-[8px] font-black px-2 py-1 rounded-full animate-pulse">AVAILABLE</div>
                                    <div className="absolute bottom-4 left-4">
                                        <span className="block font-bebas text-2xl tracking-widest">SORA KIM</span>
                                        <span className="block font-mono text-[8px] text-white/40 uppercase tracking-widest">Lead 3D Director</span>
                                    </div>
                                </div>
                            </div>
                        </Tilt>
                    </div>

                    {/* Secondary Cards */}
                    <motion.div 
                        animate={{ y: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-[15%] left-0 z-20 grayscale hover:grayscale-0 transition-all duration-700"
                    >
                        <Tilt>
                            <div className="w-[200px] glass p-1">
                                <div className="aspect-[4/5] bg-ink2 rounded-xl overflow-hidden">
                                     <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover opacity-60" />
                                </div>
                            </div>
                        </Tilt>
                    </motion.div>

                    <motion.div 
                        animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 right-0 z-10 opacity-30 blur-[2px]"
                    >
                        <Tilt>
                            <div className="w-[220px] glass p-1">
                                <div className="aspect-[4/5] bg-ink2 rounded-xl overflow-hidden">
                                     <img src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover opacity-60" />
                                </div>
                            </div>
                        </Tilt>
                    </motion.div>
                 </div>
            </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <div className="w-[1px] h-20 bg-white/10 relative overflow-hidden">
                <motion.div animate={{ y: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute inset-x-0 h-full bg-acid" />
            </div>
            <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.4em]">SCROLL</span>
        </div>
      </section>

      {/* TICKER BAND */}
      <MarqueeTicker items={['ELITE CREATIVES', 'BLOCKCHAIN NODES', '3D CINEMATICS', 'BRAND REVOLUTIONS', 'MOTION ENGINE', 'UI/UX FRONTIER', 'EDITORIAL LUXURY']} />

      {/* FEATURES SECTION */}
      <section className="py-32 md:py-48 px-8 md:px-12 bg-[#05050a]">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-end">
                <div>
                    <SectionHeader eyebrow="VERSE ENGINE" title="FUTURE OF COLLABORATION" align="left" outline />
                </div>
                <div>
                     <p className="text-lg text-white/40 font-body leading-relaxed mb-8">
                        CREATIVEVERSE isn't a marketplace—it's a high-performance engine designed to propel the world's most ambitious creative projects toward reality.
                     </p>
                     <a href="#" className="font-mono text-acid text-xs uppercase tracking-[0.4em] hover:opacity-70 transition-opacity">Explore Ecosystem View →</a>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-white/10 border border-white/10 rounded-[28px] overflow-hidden">
                {FEATURE_CARDS_V2.map((feature, i) => (
                    <motion.div 
                        key={feature.num} 
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                        className="bg-[#05050a] p-12 relative group"
                    >
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-acid to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <span className="font-mono text-[10px] text-white/20 mb-8 block">{feature.num}</span>
                        <div className={`w-12 h-12 rounded-2xl bg-${feature.color}/20 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform`}>
                            <div className={`w-2 h-2 rounded-full bg-${feature.color} shadow-[0_0_15px_var(--${feature.color})]`} />
                        </div>
                        <h3 className="text-xl font-clash font-semibold tracking-widest mb-6">{feature.title}</h3>
                        <p className="text-sm font-body text-white/40 leading-relaxed mb-10 group-hover:text-white/60 transition-colors">{feature.desc}</p>
                        <span className="text-xl text-white/20 group-hover:text-acid group-hover:translate-x-2 transition-all block">↗</span>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* PORTFOLIO SHOWCASE (Masonry) */}
      <section className="py-32 md:py-48 px-8 md:px-12 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                <SectionHeader eyebrow="PORTFOLIO RADAR" title="CURATED SHOWCASE" align="left" outline />
                <Magnetic strength={0.2}><a href="/explore" className="btn-secondary">View Global Stream</a></Magnetic>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:grid-rows-2">
                {/* Item 1 - Large Spanning */}
                <div className="lg:col-span-2 lg:row-span-2 relative group cursor-pointer aspect-square md:aspect-auto">
                    <Tilt className="h-full">
                        <div className="glass h-full overflow-hidden relative">
                            <img src="/assets/neon_brutalism.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                            <div className="absolute inset-0 flex flex-col justify-end p-12 translate-y-4 group-hover:translate-y-0 transition-transform">
                                <span className="text-acid font-mono text-[10px] uppercase tracking-[0.4em] mb-4">#ARCHITECTURE #STUDIO_DROP</span>
                                <h4 className="text-4xl md:text-5xl font-clash font-bold uppercase mb-4 tracking-tighter">NEON BRUTALISM v2</h4>
                                <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest">BY ZANE GREY</span>
                            </div>
                        </div>
                    </Tilt>
                </div>

                {/* Sub Items */}
                {[
                    { title: "ZEN MOTION", artist: "M. JADE", img: "/assets/zen_motion.png" },
                    { title: "FLUID DYNAMICS", artist: "O. VORTEX", img: "/assets/fluid_dynamics.png" },
                ].map((item, i) => (
                    <Tilt key={i}>
                        <div className="glass overflow-hidden relative group cursor-pointer aspect-square">
                             <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.2s] opacity-80 group-hover:opacity-100" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                                <h4 className="text-xl font-clash font-bold uppercase mb-2 tracking-widest">{item.title}</h4>
                                <span className="text-[9px] font-mono text-acid uppercase tracking-widest">Artist: {item.artist}</span>
                             </div>
                        </div>
                    </Tilt>
                ))}

                {/* Wide Item */}
                <div className="lg:col-span-2 relative group cursor-pointer aspect-video md:aspect-auto">
                    <Tilt className="h-full">
                        <div className="glass h-full overflow-hidden relative">
                            <img src="/assets/sony_engine.png" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12 scale-90 group-hover:scale-100 transition-transform">
                                <span className="text-cyan font-mono text-[10px] text-cyan/60 uppercase tracking-[0.4em] mb-4">FEATURED CASE STUDY</span>
                                <h4 className="text-3xl md:text-5xl font-clash font-bold uppercase tracking-widest text-white shadow-2xl">SONY NEON ENGINE</h4>
                            </div>
                        </div>
                    </Tilt>
                </div>
            </div>
          </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-32 px-8 md:px-12 bg-ink2/30">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
               {CATEGORIES_V2.map((cat, i) => (
                   <a 
                        key={i} 
                        href={`/explore?category=${cat.name.toLowerCase().replace(/ & /g, '-').replace(/\//g, '-').replace(/ /g, '-')}`}
                        className="glass p-12 flex flex-col items-center text-center group cursor-pointer relative hover:scale-[1.02] transition-all"
                    >
                        <motion.div whileHover={{ y: -5 }} className="w-full h-full flex flex-col items-center">
                            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-${cat.color} blur-[20px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity`} />
                            <span className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500">{cat.emoji}</span>
                            <h5 className="font-clash font-bold text-xs tracking-widest group-hover:text-white transition-colors uppercase mb-2">{cat.name}</h5>
                            <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest">{cat.count}</span>
                        </motion.div>
                   </a>
               ))}
          </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-48 px-8 md:px-12 bg-ink2/10 relative">
          <SectionHeader eyebrow="VERSE FLOW" title="HOW TO INITIALIZE" outline />
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                {/* Connecting Line (Desktop) */}
                <div className="absolute top-10 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent hidden lg:block" />
                
                {[
                    { step: "01", title: "IDENTITY", desc: "Select your path as Artist or Client and secure your credentials." },
                    { step: "02", title: "SHOWCASE", desc: "Initialize your portfolio or broadcast your first project requirement." },
                    { step: "03", title: "MATCHING", desc: "Our engine pairs elite talent with world-class opportunities." },
                    { step: "04", title: "DELIVERY", desc: "Collaborate via real-time wire and execute milestone delivery." },
                ].map((item, i) => (
                    <motion.div key={i} whileHover={{ y: -10 }} className="relative z-10 glass p-10 group">
                        <div className="w-20 h-20 rounded-full bg-ink relative mx-auto mb-10 overflow-hidden p-[2px]">
                            <div className="absolute inset-0 bg-gradient-to-tr from-violet to-acid animate-spin group-hover:duration-[1s]" />
                            <div className="absolute inset-[2px] bg-ink rounded-full z-10 flex items-center justify-center">
                                <span className="font-bebas text-3xl text-acid">{item.step}</span>
                            </div>
                        </div>
                        <h4 className="text-xl font-clash font-bold tracking-widest text-center mb-4">{item.title}</h4>
                        <p className="text-sm font-body text-white/30 text-center leading-relaxed group-hover:text-white/60 transition-colors">{item.desc}</p>
                    </motion.div>
                ))}
          </div>
      </section>

      {/* ARTISTS CAROUSEL (Simulated Snap) */}
      <section className="py-48 bg-[#05050a] overflow-hidden">
           <div className="px-8 md:px-12 max-w-7xl mx-auto mb-24 flex justify-between items-end">
                <SectionHeader eyebrow="TOP NODES" title="ELITE CREATORS" align="left" outline />
                <div className="flex gap-4">
                    <button className="w-12 h-12 rounded-full glass flex items-center justify-center hover:border-acid transition-colors">←</button>
                    <button className="w-12 h-12 rounded-full glass flex items-center justify-center hover:border-acid transition-colors">→</button>
                </div>
           </div>
           
           <div className="flex gap-8 overflow-x-auto px-8 md:px-[calc(50vw-635px)] pb-12 no-scrollbar snap-x snap-mandatory">
                {[...Array(6)].map((_, i) => (
                    <motion.div key={i} className="min-w-[320px] snap-start glass p-1 transition-all group cursor-pointer hover:border-violet/30">
                        <div className="bg-ink p-10 rounded-2xl">
                             <div className="flex justify-center mb-8">
                                <AvatarWithSpinRing src={`https://i.pravatar.cc/150?u=${i}`} size="md" />
                             </div>
                             <div className="text-center mb-8">
                                <h4 className="font-clash font-bold text-xl uppercase tracking-widest mb-1 group-hover:text-acid transition-colors">SORA VANCE</h4>
                                <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">EXECUTIVE 3D ARTIST</span>
                             </div>
                             <div className="grid grid-cols-3 gap-2 py-6 border-y border-white/5 mb-8">
                                <div className="text-center">
                                    <span className="block font-bebas text-xl text-acid">124</span>
                                    <span className="block text-[8px] font-mono text-white/20 uppercase">PROJECTS</span>
                                </div>
                                <div className="text-center">
                                    <span className="block font-bebas text-xl text-acid">4.9</span>
                                    <span className="block text-[8px] font-mono text-white/20 uppercase">RATING</span>
                                </div>
                                <div className="text-center">
                                    <span className="block font-bebas text-xl text-acid">12k</span>
                                    <span className="block text-[8px] font-mono text-white/20 uppercase">FOLLOWERS</span>
                                </div>
                             </div>
                             <div className="flex flex-wrap gap-2 justify-center">
                                {['BLENDER', 'OCTANE', 'HOUDINI'].map(skill => (
                                    <span key={skill} className="text-[8px] font-mono text-white/30 px-2 py-1 border border-white/10 rounded-full group-hover:border-acid/30 group-hover:text-acid transition-all">{skill}</span>
                                ))}
                             </div>
                        </div>
                    </motion.div>
                ))}
           </div>
      </section>



      {/* CTA BANNER */}
      <section className="py-24 px-8 md:px-12">
            <motion.div 
                whileHover={{ scale: 0.99 }}
                className="max-w-7xl mx-auto rounded-[40px] p-16 md:p-32 bg-[linear-gradient(135deg,#6d28ff,#ff1a6e,#ff3d00)] relative overflow-hidden text-center"
            >
                {/* Patterns */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[140px] opacity-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-[140px] opacity-20 pointer-events-none" />

                <div className="relative z-10">
                    <h2 className="text-6xl md:text-[100px] font-bebas leading-none mb-12">ARE YOU READY FOR <br/> THE VERSE?</h2>
                    <p className="text-xl md:text-2xl font-body font-light mb-16 max-w-2xl mx-auto opacity-80">
                        Join the world's most innovative creative pioneers today.
                    </p>
                    <div className="flex flex-wrap gap-8 justify-center">
                        <Magnetic strength={0.4}><button className="px-16 py-6 bg-white text-black font-clash font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform">Initialize Free →</button></Magnetic>
                        <Magnetic strength={0.2}><button className="px-16 py-6 border border-white/40 hover:border-white text-white font-clash font-bold uppercase tracking-widest rounded-full transition-all">Manifesto</button></Magnetic>
                    </div>
                </div>
            </motion.div>
      </section>

      <Footer />
    </div>
  );
}
