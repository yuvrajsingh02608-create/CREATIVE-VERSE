'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Nav, Footer } from '../../components/Layout';
import { SectionHeader } from '../../components/V2Components';
import { Magnetic } from '../../components/Interactive';

const PLANS = [
    {
        id: 'free',
        name: 'FREE NODE',
        price: '0',
        desc: 'Begin your journey in the verse. Essential tools for individual creators.',
        features: ['10 Portfolio Items', 'Standard Discovery', '1% Referral Link', 'Direct Messaging'],
        color: 'white/10',
        accent: 'white',
        cta: 'CURRENT PLAN'
    },
    {
        id: 'pro',
        name: 'PRO ENTITY',
        price: '12',
        annualPrice: '8',
        desc: 'Accelerate your impact with advanced discovery and analytics.',
        features: ['Unlimited Portfolio', 'Priority Discovery', '5% Referral Nodes', 'Pro Identity Badge', 'Custom Profile URL'],
        color: 'violet/20',
        accent: 'violet',
        cta: 'UPGRADE TO PRO'
    },
    {
        id: 'studio',
        name: 'STUDIO COLLECTIVE',
        price: '29',
        annualPrice: '20',
        desc: 'The ultimate engine for high-performance creative groups.',
        features: ['Global Node Spotlight', 'Squad Analytics', '10% Referral Nodes', 'Studio Verification', 'Early Access To Alpha Gigs'],
        color: 'acid/20',
        accent: 'acid',
        cta: 'UPGRADE TO STUDIO'
    }
];

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState('monthly');
    const [loadingPlan, setLoadingPlan] = useState(null);

    const handleUpgrade = (planId) => {
        if (planId === 'free') return;
        setLoadingPlan(planId);
        // Simulate Stripe Checkout
        setTimeout(() => {
            setLoadingPlan(null);
            alert(`Initializing secure Stripe checkout for ${planId} plan...`);
        }, 1500);
    };

    return (
        <div className="bg-[#05050a] text-white min-h-screen">
            <Nav />
            
            <main className="pt-32 pb-48 px-8 md:px-12 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-violet/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-acid/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-24">
                        <SectionHeader eyebrow="MONETIZATION" title="UPGRADE YOUR NODE" outline />
                        
                        {/* Billing Toggle */}
                        <div className="flex items-center justify-center gap-6 mt-12">
                            <span className={`font-mono text-[9px] uppercase tracking-widest ${billingCycle === 'monthly' ? 'text-white' : 'text-white/20'}`}>Monthly</span>
                            <button 
                                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                                className="w-14 h-8 bg-white/5 rounded-full p-1 relative border border-white/10 transition-colors hover:border-white/30"
                            >
                                <motion.div 
                                    animate={{ x: billingCycle === 'monthly' ? 0 : 24 }}
                                    className="w-6 h-6 bg-acid rounded-full"
                                />
                            </button>
                            <span className={`font-mono text-[9px] uppercase tracking-widest ${billingCycle === 'annual' ? 'text-white' : 'text-white/20'}`}>
                                Annual <span className="text-acid ml-2">(-30%)</span>
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {PLANS.map((plan, i) => (
                            <motion.div 
                                key={plan.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`glass p-12 rounded-[40px] flex flex-col border-2 transition-all hover:scale-[1.02] ${plan.id === 'pro' ? 'border-violet/40 scale-105 bg-violet/[0.03]' : 'border-white/5'}`}
                            >
                                <div className="mb-12">
                                    <div className={`w-12 h-12 rounded-2xl bg-${plan.accent}/20 flex items-center justify-center mb-8`}>
                                        <div className={`w-3 h-3 rounded-full bg-${plan.accent}`} />
                                    </div>
                                    <h3 className="font-bebas text-3xl tracking-[0.2em] mb-4">{plan.name}</h3>
                                    <p className="font-body text-sm text-white/40 leading-relaxed min-h-[60px]">{plan.desc}</p>
                                </div>

                                <div className="mb-12">
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-5xl font-bebas tracking-tighter">${billingCycle === 'monthly' ? plan.price : plan.annualPrice}</span>
                                        <span className="font-mono text-[10px] text-white/20 uppercase">/ Month</span>
                                    </div>
                                    {billingCycle === 'annual' && plan.price !== '0' && (
                                        <span className="font-mono text-[9px] text-acid uppercase tracking-widest">Billed annually</span>
                                    )}
                                </div>

                                <div className="flex-1 space-y-6 mb-16">
                                    {plan.features.map(feat => (
                                        <div key={feat} className="flex items-center gap-4">
                                            <span className="text-acid text-xs">✓</span>
                                            <span className="font-mono text-[9px] text-white/60 uppercase tracking-widest">{feat}</span>
                                        </div>
                                    ))}
                                </div>

                                <button 
                                    onClick={() => handleUpgrade(plan.id)}
                                    disabled={loadingPlan === plan.id || plan.id === 'free'}
                                    className={`w-full py-6 rounded-full font-clash font-bold text-xs uppercase tracking-widest transition-all ${
                                        plan.id === 'free' 
                                        ? 'bg-white/5 text-white/40 cursor-not-allowed' 
                                        : plan.id === 'pro'
                                        ? 'bg-violet text-white hover:bg-violet/80 shadow-[0_10px_30px_rgba(109,40,255,0.3)]'
                                        : 'bg-acid text-black hover:bg-acid/80'
                                    }`}
                                >
                                    {loadingPlan === plan.id ? 'INITIALIZING...' : plan.cta}
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Trust Section */}
                    <div className="mt-32 pt-24 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-12 text-center opacity-40">
                        {['SECURE AUTO-PAY', 'CANCEL ANYTIME', 'MILITARY GRADE ENCRYPTION', '24/7 SUPPORT'].map(t => (
                            <span key={t} className="font-mono text-[8px] uppercase tracking-[0.5em]">{t}</span>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
