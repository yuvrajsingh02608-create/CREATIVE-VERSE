'use client';

import { motion } from 'framer-motion';

export const SectionHeader = ({ title, subtitle, align = 'left' }) => (
  <div className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}>
    <motion.span 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="font-mono text-acid uppercase tracking-[0.3em] text-xs mb-4 block"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-6xl font-heading"
    >
      {title}
    </motion.h2>
  </div>
);

export const ArtistCard = ({ artist }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="glass p-1 group cursor-pointer"
  >
    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-ink">
      <img 
        src={artist.cover_url} 
        alt={artist.name}
        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
      />
      <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black to-transparent">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full border-2 border-acid p-0.5 overflow-hidden">
            <img src={artist.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
          </div>
          <div>
            <h3 className="text-lg font-heading tracking-tight">{artist.name}</h3>
            <p className="text-xs font-mono text-white/50">{artist.role}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {artist.skills.slice(0, 2).map(skill => (
            <span key={skill} className="text-[10px] uppercase font-mono px-2 py-0.5 border border-white/20 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

export const GigCard = ({ gig }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    className="glass p-6 hover:border-acid/30 transition-colors group cursor-pointer"
  >
    <div className="flex justify-between items-start mb-4">
      <span className={`text-[10px] font-mono px-2 py-1 rounded uppercase ${gig.urgent ? 'bg-orange text-white' : 'bg-white/10 text-white/60'}`}>
        {gig.urgent ? 'Urgent' : gig.category}
      </span>
      <span className="text-acid font-mono text-sm">{gig.budget}</span>
    </div>
    <h3 className="text-xl font-heading mb-3 line-clamp-2 group-hover:text-acid transition-colors">
      {gig.title}
    </h3>
    <p className="text-white/40 text-sm mb-6 line-clamp-3 font-body">
      {gig.description}
    </p>
    <div className="flex items-center justify-between border-t border-white/5 pt-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-white/10" />
        <span className="text-xs font-mono text-white/30 truncate max-w-[100px]">{gig.client_name}</span>
      </div>
      <button className="text-xs font-mono text-acid uppercase tracking-wider hover:underline">
        Apply Now
      </button>
    </div>
  </motion.div>
);

export const Tooltip = ({ children, text }) => (
  <div className="relative group">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-white text-black text-[10px] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
      {text}
    </div>
  </div>
);
