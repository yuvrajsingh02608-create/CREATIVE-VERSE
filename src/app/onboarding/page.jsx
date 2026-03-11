'use client';

import { Nav, Footer } from '../../components/Layout';
import { SectionHeader, Toast, AvatarWithSpinRing } from '../../components/V2Components';
import { Magnetic, Tilt } from '../../components/Interactive';
import { AnimatePresence } from 'framer-motion';

const STEPS = ["Initiation", "Role Alignment", "Specialization", "Digital Presence"];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState(null); // 'artist' | 'client'
  const [formData, setFormData] = useState({ name: '', location: '', skills: [] });
  const [toast, setToast] = useState(null);

  const toggleSkill = (skill) => {
    setFormData(prev => ({
        ...prev,
        skills: prev.skills.includes(skill) 
            ? prev.skills.filter(s => s !== skill) 
            : [...prev.skills, skill]
    }));
  };

  const nextStep = () => {
    if (step === 1 && !role) {
        setToast({ message: "SELECT YOUR ALIGNMENT TO PROCEED", type: "error" });
        return;
    }
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else {
        setToast({ message: "IDENTITY SYNCED. WELCOME TO THE VERSE.", type: "success" });
        setTimeout(() => {
            window.location.href = role === 'artist' ? '/dashboard/artist' : '/dashboard/client';
        }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#05050a] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,255,0.05)_0%,transparent_50%)]" />
      
      <div className="w-full max-w-3xl relative z-10">
        {/* Progress Bar */}
        <div className="flex gap-4 mb-20">
            {STEPS.map((s, i) => (
                <div key={i} className="flex-1 space-y-4">
                    <div className="h-[1px] bg-white/10 relative overflow-hidden">
                        {i <= step && (
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                className={`absolute inset-0 ${i === step ? 'bg-acid' : 'bg-violet'}`} 
                            />
                        )}
                    </div>
                    <span className={`block font-mono text-[7px] uppercase tracking-widest text-center transition-colors ${i <= step ? 'text-white' : 'text-white/10'}`}>{s}</span>
                </div>
            ))}
        </div>

        <AnimatePresence mode="wait">
            <motion.div 
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass p-12 md:p-20 relative overflow-hidden"
            >
                {/* Step Content */}
                {step === 0 && (
                    <div className="space-y-12">
                        <SectionHeader eyebrow="PHASE 01" title="IDENTITY_INIT" align="left" outline />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest pl-4">Display Name</label>
                                <input 
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    type="text" placeholder="SORA KIM / VOLT LABS" 
                                    className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:border-acid outline-none transition-all" 
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="font-mono text-[8px] text-white/20 uppercase tracking-widest pl-4">Primary Node Location</label>
                                <input 
                                    value={formData.location}
                                    onChange={e => setFormData({...formData, location: e.target.value})}
                                    type="text" placeholder="SEOUL, KR / REMOTE" 
                                    className="w-full bg-white/[0.03] border border-white/10 px-6 py-4 rounded-xl font-mono text-xs focus:border-acid outline-none transition-all" 
                                />
                            </div>
                        </div>
                    </div>
                )}

                {step === 1 && (
                    <div className="space-y-12">
                        <SectionHeader eyebrow="PHASE 02" title="ROLE_ALIGNMENT" align="left" outline />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div 
                                onClick={() => setRole('artist')}
                                className={`p-10 rounded-3xl border cursor-pointer transition-all flex flex-col items-center text-center gap-6 group ${role === 'artist' ? 'border-acid bg-acid/5' : 'border-white/10 hover:border-white/30'}`}
                             >
                                 <div className="text-4xl group-hover:scale-110 transition-transform">🎨</div>
                                 <div>
                                     <h3 className="font-bebas text-2xl tracking-widest mb-2">ARTIST_NODE</h3>
                                     <p className="text-[10px] font-body text-white/40 uppercase leading-relaxed">Broadcast your vision and engage with elite global brands.</p>
                                 </div>
                             </div>
                             <div 
                                onClick={() => setRole('client')}
                                className={`p-10 rounded-3xl border cursor-pointer transition-all flex flex-col items-center text-center gap-6 group ${role === 'client' ? 'border-cyan bg-cyan/5' : 'border-white/10 hover:border-white/30'}`}
                             >
                                 <div className="text-4xl group-hover:scale-110 transition-transform">💎</div>
                                 <div>
                                     <h3 className="font-bebas text-2xl tracking-widest mb-2">CLIENT_ENTITY</h3>
                                     <p className="text-[10px] font-body text-white/40 uppercase leading-relaxed">Source elite creative talent for transformative projects.</p>
                                 </div>
                             </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-12">
                        <SectionHeader eyebrow="PHASE 03" title="SPECIALIZATION" align="left" outline />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {(role === 'artist' ? ["3D MOTION", "GEN_AI", "UI_UX", "BRANDING", "MOTION", "FILM"] : ["E-COMMERCE", "LUXURY", "TECH", "FINTECH", "GAMING", "MEDIA"]).map(skill => (
                                <button 
                                    key={skill}
                                    onClick={() => toggleSkill(skill)}
                                    className={`py-4 rounded-xl border font-mono text-[9px] uppercase tracking-widest transition-all ${formData.skills.includes(skill) ? 'bg-white text-black border-white' : 'border-white/10 hover:border-white/30 text-white/40'}`}
                                >
                                    {skill}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-12 text-center">
                        <div className="flex justify-center mb-8">
                            <AvatarWithSpinRing src="https://i.pravatar.cc/150?u=new_user" size="md" />
                        </div>
                        <SectionHeader eyebrow="FINAL_SYNC" title="DIGITAL_PRESENCE" align="center" outline />
                        <p className="max-w-md mx-auto text-white/30 font-body text-sm leading-relaxed mb-12 italic">
                            "By entering the verse, you acknowledge that art and opportunity are intrinsically linked. Welcome to the elite."
                        </p>
                    </div>
                )}

                {/* Footer Controls */}
                <div className="flex justify-between items-center mt-20 pt-10 border-t border-white/5">
                    <button 
                        onClick={() => setStep(s => Math.max(0, s - 1))}
                        className={`text-[9px] font-mono uppercase tracking-[0.4em] transition-all ${step === 0 ? 'opacity-0' : 'text-white/20 hover:text-white'}`}
                    >
                        [ Back_Track ]
                    </button>
                    <Magnetic strength={0.3}>
                        <button 
                            onClick={nextStep}
                            className="btn-primary px-12 py-4"
                        >
                            {step === STEPS.length - 1 ? 'Enter The Verse ✦' : 'Continue Phase'}
                        </button>
                    </Magnetic>
                </div>
            </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
          {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
