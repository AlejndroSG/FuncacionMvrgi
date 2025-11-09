"use client";

export default function ImpressiveBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-linear-to-b from-white via-indigo-50/40 to-white" />
      <div className="absolute inset-0 [background:radial-gradient(600px_300px_at_20%_10%,rgba(99,102,241,0.15),transparent),radial-gradient(800px_400px_at_80%_30%,rgba(236,72,153,0.12),transparent),radial-gradient(700px_350px_at_50%_90%,rgba(59,130,246,0.12),transparent)]" />
    </div>
  );
}
