'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SOUNDWAVE AUDIO PLAYER
 * A cinematic, waveform-driven audio component.
 */
export function WaveformPlayer({ title, artist, duration = "3:45", color = "#b8ff00" }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const bars = 60; // Total bars in waveform

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(prev => (prev + 0.5) % 100);
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="glass p-8 border-white/5 group hover:border-white/10 transition-all">
            <div className="flex items-center gap-8 mb-8">
                {/* Play/Pause Button */}
                <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group/play"
                >
                    {isPlaying ? (
                        <div className="flex gap-1.5">
                            <div className="w-1 h-4 bg-current" />
                            <div className="w-1 h-4 bg-current" />
                        </div>
                    ) : (
                        <div className="ml-1 w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-current border-b-[8px] border-b-transparent" />
                    )}
                </button>

                <div className="flex-1">
                    <span className="font-mono text-[8px] text-white/20 uppercase tracking-[0.4em] block mb-2">{artist}</span>
                    <h4 className="font-bebas text-2xl tracking-widest uppercase">{title}</h4>
                </div>
                
                <span className="font-mono text-[10px] text-white/20">{duration}</span>
            </div>

            {/* Waveform Visualization */}
            <div className="h-24 flex items-end gap-[2px] cursor-pointer relative group/wave" onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                setProgress((x / rect.width) * 100);
            }}>
                {[...Array(bars)].map((_, i) => {
                    const barProgress = (i / bars) * 100;
                    const isActive = barProgress <= progress;
                    
                    // Generate pseudo-random heights for the waveform
                    const height = 20 + Math.sin(i * 0.2) * 30 + Math.random() * 20;

                    return (
                        <motion.div 
                            key={i}
                            initial={{ height: 10 }}
                            animate={{ 
                                height: isPlaying ? height : Math.max(10, height * 0.5),
                                opacity: isActive ? 1 : 0.2
                            }}
                            transition={{ 
                                height: { type: "spring", stiffness: 300, damping: 20 },
                                opacity: { duration: 0.2 }
                            }}
                            className="flex-1 rounded-full"
                            style={{ 
                                backgroundColor: isActive ? color : 'white',
                                height: `${height}%`
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

/**
 * CINEMATIC VIDEO PLAYER
 * High-fidelity video container with branded controls.
 */
export function CinematicVideoPlayer({ src, poster, title }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause();
            else videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="relative aspect-video glass overflow-hidden group/video border-white/5">
            <video 
                ref={videoRef}
                poster={poster}
                loop
                muted={isMuted}
                className="w-full h-full object-cover grayscale group-hover/video:grayscale-0 transition-all duration-1000 scale-105 group-hover/video:scale-100"
            >
                <source src={src} type="video/mp4" />
            </video>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/video:opacity-100 transition-opacity duration-500" />

            {/* Play/Pause HUD */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div 
                    animate={{ scale: isPlaying ? 0.8 : 1, opacity: isPlaying ? 0 : 1 }}
                    className="w-24 h-24 rounded-full glass border-white/20 flex items-center justify-center backdrop-blur-xl"
                >
                    <div className="ml-2 w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-acid border-b-[15px] border-b-transparent" />
                </motion.div>
            </div>

            {/* Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-8 flex items-center justify-between translate-y-4 opacity-0 group-hover/video:translate-y-0 group-hover/video:opacity-100 transition-all duration-500">
                <div className="flex items-center gap-6">
                    <button onClick={togglePlay} className="text-white hover:text-acid transition-colors">
                        {isPlaying ? 'PAUSE' : 'PLAY'}
                    </button>
                    <div className="h-4 w-[1px] bg-white/10" />
                    <button onClick={() => setIsMuted(!isMuted)} className="font-mono text-[10px] tracking-widest text-white/40 hover:text-white uppercase transition-colors">
                        {isMuted ? 'UNMUTE' : 'MUTE'}
                    </button>
                </div>
                
                <h5 className="font-mono text-[10px] text-white/20 uppercase tracking-[0.4em]">{title}</h5>
            </div>
            
            {/* Click Surface */}
            <div className="absolute inset-0 cursor-pointer" onClick={togglePlay} />
        </div>
    );
}
