'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * SectionHeader
 * with eyebrow + outline title variant
 */
export const SectionHeader = ({ eyebrow, title, subtitle, align = 'center', outline = false }) => {
    return (
        <div className={`mb-16 md:mb-24 ${align === 'center' ? 'text-center' : 'text-left'}`}>
            <motion.span 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="font-mono text-[10px] text-acid uppercase tracking-[0.4em] mb-4 block"
            >
                {eyebrow}
            </motion.span>
            <h2 className={`text-5xl md:text-8xl mb-8 ${outline ? 'text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] hover:[-webkit-text-stroke:1px_var(--acid)] transition-all' : ''}`}>
                {title}
            </h2>
            {subtitle && (
                <p className={`text-white/40 font-body text-lg max-w-xl ${align === 'center' ? 'mx-auto' : ''} leading-relaxed`}>
                    {subtitle}
                </p>
            )}
        </div>
    );
};

/**
 * AvatarWithSpinRing
 * conic-gradient spinning ring (violet→rose→sky→acid)
 */
export const AvatarWithSpinRing = ({ src, size = 'md' }) => {
    const dimensions = { sm: 'w-16 h-16', md: 'w-24 h-24', lg: 'w-32 h-32' }[size];
    return (
        <div className={`relative ${dimensions} p-[3px] group`}>
            {/* Spinning Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet via-rose to-cyan animate-spin duration-[3000ms]" />
            <div className="absolute inset-[2px] rounded-full bg-[#05050a] z-10" />
            <div className="relative z-20 w-full h-full rounded-full overflow-hidden bg-white/5 flex items-center justify-center">
                {src ? <img src={src} alt="Avatar" className="w-full h-full object-cover" /> : <span className="text-2xl">✨</span>}
            </div>
        </div>
    );
};

/**
 * AnimatedCounter
 * Counts up from 0 on first viewport entry
 */
export const AnimatedCounter = ({ end, label, prefix = "", suffix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const duration = 2000;
            const increment = end / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.ceil(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [isInView, end]);

    return (
        <div ref={ref} className="flex flex-col border-r border-white/10 last:border-0 pr-8 md:pr-12 last:pr-0">
             <span className="font-bebas text-3xl md:text-5xl text-white mb-2">
                <span className="text-acid">{prefix}</span>{count}<span className="text-rose">{suffix}</span>
             </span>
             <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.3em]">{label}</span>
        </div>
    );
};

/**
 * MarqueeTicker
 */
export const MarqueeTicker = ({ items, speed = 22 }) => {
    return (
        <div className="w-full bg-acid py-3 overflow-hidden whitespace-nowrap">
            <motion.div 
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
                className="inline-block"
            >
                {[...items, ...items].map((item, i) => (
                    <span key={i} className="font-bebas text-[14px] md:text-[18px] text-black tracking-[4px] px-8">
                        {item} <span className="text-black/30">✦</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

/**
 * Toast
 * green (success), red (error), violet (info)
 */
export const Toast = ({ message, type = 'info', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const colors = {
        success: 'border-acid/50 bg-acid/10 text-acid',
        error: 'border-rose/50 bg-rose/10 text-rose',
        info: 'border-violet/50 bg-violet/10 text-violet'
    };

    return (
        <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`fixed bottom-8 right-8 z-[1000] px-6 py-4 glass border ${colors[type]} rounded-2xl flex items-center gap-4`}
        >
            <span className="font-mono text-[10px] uppercase tracking-widest">{message}</span>
            <button onClick={onClose} className="opacity-40 hover:opacity-100 text-xs translate-y-[1px]">✕</button>
        </motion.div>
    );
};
