"use client";

export default function ImpressiveBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(12,58,31,0.08),_transparent_60%),radial-gradient(circle_at_80%_20%,_rgba(13,59,102,0.12),_transparent_50%),linear-gradient(180deg,_rgba(249,252,255,0.85),_rgba(233,243,238,0.95))]" />

      {/* Soft grain for depth */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-multiply"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/foggy-birds.png')"
        }}
      />

      {/* Glass gradients */}
      <div className="absolute inset-0 [background:radial-gradient(600px_400px_at_20%_25%,rgba(142,232,154,0.22),transparent),radial-gradient(800px_520px_at_80%_10%,rgba(121,181,255,0.18),transparent),radial-gradient(560px_420px_at_65%_75%,rgba(34,70,33,0.15),transparent)]" />

      {/* Floating blobs */}
      <div className="absolute left-[12%] top-[22%] size-48 rounded-[36%] bg-[#8ee89a]/35 blur-3xl" />
      <div className="absolute right-[15%] top-[15%] size-56 rounded-[36%] bg-[#7fb7ff]/25 blur-3xl" />
      <div className="absolute left-[55%] bottom-[20%] size-44 rounded-[36%] bg-[#224621]/20 blur-2xl" />
      <div className="absolute left-[8%] bottom-[18%] size-40 rounded-[36%] bg-[#b3cfb1]/25 blur-3xl" />

      {/* Outline rings */}
      <div className="absolute -left-10 top-32 h-72 w-72 rounded-full border border-white/30 opacity-40 blur-sm" />
      <div className="absolute right-10 top-1/3 h-96 w-96 rounded-full border border-white/20 opacity-30 blur-sm" />
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-[40%] border border-white/15 opacity-40 blur-sm" />

      {/* Accent beams */}
      <div className="absolute left-[18%] top-[12%] h-px w-52 bg-linear-to-r from-transparent via-white/80 to-transparent opacity-40" />
      <div className="absolute right-[18%] top-[46%] h-px w-52 rotate-12 bg-linear-to-r from-transparent via-white/80 to-transparent opacity-30" />
      <div className="absolute left-[30%] bottom-[28%] h-px w-40 -rotate-6 bg-linear-to-r from-transparent via-white/60 to-transparent opacity-30" />

      {/* Accent dots */}
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="absolute h-1.5 w-1.5 rounded-full bg-white/70"
          style={{
            top: `${15 + index * 10}%`,
            left: index % 2 === 0 ? `${20 + index * 5}%` : undefined,
            right: index % 2 !== 0 ? `${15 + index * 4}%` : undefined,
            opacity: 0.35 + (index % 3) * 0.15
          }}
        />
      ))}
    </div>
  );
}
