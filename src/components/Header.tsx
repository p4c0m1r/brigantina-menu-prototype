export default function Header() {
  return (
    <header className="relative bg-ocean-900 bg-gradient-mesh overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-950 via-ocean-750 to-ocean-900 opacity-80" />
      <div className="relative z-10 flex flex-col items-center py-16 px-4 text-center">
        <div className="animate-gold-shimmer text-5xl mb-4">⚓</div>
        <h1 className="font-display text-5xl md:text-6xl font-bold tracking-[0.2em] text-gold-glow uppercase mb-2">
          Brigantina
        </h1>
        <p className="text-ocean-300 text-sm tracking-[0.3em] uppercase mb-6">
          Snack Bar • Sunny Beach • Bulgaria
        </p>
        <div className="w-28 h-px bg-gold-400 mb-6 opacity-70" />
        <p className="text-ocean-300 text-xs tracking-[0.25em] uppercase opacity-70">— Menu —</p>
      </div>
    </header>
  );
}