'use client';

import { motion } from 'framer-motion';
import { Nav } from '../../components/Layout';
import { useState } from 'react';

export default function SignupPage() {
  const [role, setRole] = useState(null);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Nav />
      
      <main className="flex-1 flex items-center justify-center pt-32 pb-12 px-6">
        <div className="w-full max-w-xl glass p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <span className="text-9xl font-heading">JOIN</span>
            </div>

            {!role ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <span className="text-acid font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block text-center">Step 1: Identity</span>
                    <h2 className="text-4xl font-heading text-center mb-12 uppercase">Choose your <span className="text-acid">Path</span></h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button 
                            onClick={() => setRole('artist')}
                            className="glass p-10 hover:border-acid group transition-all"
                        >
                            <span className="text-4xl mb-6 block group-hover:scale-110 transition-transform">🎨</span>
                            <span className="block font-heading text-xl mb-2">ARTIST</span>
                            <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest leading-relaxed">Showcase your portfolio and find opportunities.</p>
                        </button>
                        <button 
                            onClick={() => setRole('client')}
                            className="glass p-10 hover:border-violet group transition-all"
                        >
                            <span className="text-4xl mb-6 block group-hover:scale-110 transition-transform">💼</span>
                            <span className="block font-heading text-xl mb-2">CLIENT</span>
                            <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest leading-relaxed">Source the world's best creative talent.</p>
                        </button>
                    </div>
                </motion.div>
            ) : (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <button onClick={() => setRole(null)} className="text-white/20 hover:text-white font-mono text-[10px] uppercase tracking-widest mb-12">← Back to selection</button>
                    <span className="text-acid font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block">Step 2: Credentials</span>
                    <h2 className="text-4xl font-heading mb-12 uppercase">Secure your <span className="text-acid">Access</span></h2>
                    
                    <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); /* Redirect to onboarding */ window.location.href = '/onboarding'; }}>
                        <div className="space-y-6">
                            <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 px-8 py-5 rounded-full font-mono text-xs uppercase tracking-widest focus:border-acid outline-none" required />
                            <input type="password" placeholder="Create Password" className="w-full bg-white/5 border border-white/10 px-8 py-5 rounded-full font-mono text-xs uppercase tracking-widest focus:border-acid outline-none" required />
                        </div>
                        <button className="btn-primary w-full">Initialize Account</button>
                        
                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
                            <div className="relative flex justify-center text-[10px] font-mono uppercase tracking-widest"><span className="bg-background px-4 text-white/20">or connect with</span></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="glass py-4 font-mono text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all">Google</button>
                            <button className="glass py-4 font-mono text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all">Apple</button>
                        </div>
                    </form>
                </motion.div>
            )}
        </div>
      </main>
    </div>
  );
}
