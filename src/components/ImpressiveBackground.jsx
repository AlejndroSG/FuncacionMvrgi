"use client";

export default function ImpressiveBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-[#f0f5f0]/40 via-white to-[#eff5fb]/40" />
      
      {/* Dense dot pattern */}
      <div className="absolute inset-0 opacity-40" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(34 70 33 / 0.2) 1px, transparent 0)', backgroundSize: '24px 24px'}} />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.15]" style={{backgroundImage: 'linear-gradient(rgba(34,70,33,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(33,85,151,0.1) 1px, transparent 1px)', backgroundSize: '48px 48px'}} />
      
      {/* Enhanced radial overlays */}
      <div className="absolute inset-0 [background:radial-gradient(600px_600px_at_20%_10%,rgba(34,70,33,0.15),transparent),radial-gradient(900px_500px_at_80%_30%,rgba(33,85,151,0.12),transparent),radial-gradient(700px_700px_at_50%_90%,rgba(34,70,33,0.10),transparent),radial-gradient(400px_400px_at_90%_80%,rgba(33,85,151,0.10),transparent),radial-gradient(500px_500px_at_10%_70%,rgba(34,70,33,0.08),transparent)]" />
      
      {/* Large floating decorative circles */}
      <div className="absolute left-[10%] top-[15%] h-40 w-40 rounded-full bg-[#b3cfb1]/25 blur-3xl" />
      <div className="absolute right-[15%] top-[25%] h-48 w-48 rounded-full bg-[#a9c9e9]/15 blur-3xl" />
      <div className="absolute left-[70%] top-[60%] h-32 w-32 rounded-full bg-[#224621]/20 blur-2xl" />
      <div className="absolute left-[20%] bottom-[20%] h-44 w-44 rounded-full bg-[#a9c9e9]/20 blur-3xl" />
      <div className="absolute right-[25%] bottom-[35%] h-28 w-28 rounded-full bg-[#b3cfb1]/20 blur-2xl" />
      
      {/* Geometric shapes */}
      <div className="absolute left-[5%] top-[40%] h-16 w-16 rotate-45 rounded-lg bg-[#b3cfb1]/10 blur-sm" />
      <div className="absolute right-[8%] top-[55%] h-20 w-20 rotate-12 rounded-lg bg-[#a9c9e9]/10 blur-sm" />
      <div className="absolute left-[85%] top-[35%] h-12 w-12 -rotate-12 rounded-full bg-[#b3cfb1]/10 blur-sm" />
      <div className="absolute left-[15%] bottom-[40%] h-14 w-14 rotate-45 rounded-lg bg-[#a9c9e9]/10 blur-sm" />
      <div className="absolute right-[8%] top-[55%] h-20 w-20 rotate-12 rounded-lg bg-[#215597]/10 blur-sm" />
      <div className="absolute left-[85%] top-[35%] h-12 w-12 -rotate-12 rounded-full bg-[#224621]/10 blur-sm" />
      <div className="absolute left-[15%] bottom-[40%] h-14 w-14 rotate-45 rounded-lg bg-[#215597]/10 blur-sm" />
      
      {/* Decorative lines */}
      <div className="absolute left-[30%] top-[10%] h-px w-32 bg-linear-to-r from-transparent via-[#224621]/30 to-transparent" />
      <div className="absolute right-[20%] top-[45%] h-px w-40 rotate-12 bg-linear-to-r from-transparent via-[#215597]/30 to-transparent" />
      <div className="absolute left-[60%] bottom-[30%] h-px w-36 -rotate-6 bg-linear-to-r from-transparent via-[#224621]/30 to-transparent" />
      
      {/* Small accent dots */}
      <div className="absolute left-[25%] top-[25%] h-1.5 w-1.5 rounded-full bg-[#224621]/50" />
      <div className="absolute left-[28%] top-[28%] h-1 w-1 rounded-full bg-[#224621]/40" />
      <div className="absolute right-[30%] top-[20%] h-1.5 w-1.5 rounded-full bg-[#215597]/50" />
      <div className="absolute right-[33%] top-[23%] h-1 w-1 rounded-full bg-[#215597]/40" />
      <div className="absolute left-[45%] top-[70%] h-1.5 w-1.5 rounded-full bg-[#224621]/50" />
      <div className="absolute left-[48%] top-[73%] h-1 w-1 rounded-full bg-[#215597]/40" />
      <div className="absolute right-[40%] bottom-[15%] h-1.5 w-1.5 rounded-full bg-[#224621]/50" />
      <div className="absolute right-[43%] bottom-[18%] h-1 w-1 rounded-full bg-[#215597]/40" />
    </div>
  );
}
