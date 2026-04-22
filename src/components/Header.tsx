export default function Header() {
  return (
    <header className="relative bg-surface-base bg-gradient-mesh overflow-hidden">
      <div className="hero-vignette" />
      <div className="relative z-10 flex flex-col items-center py-16 px-4 text-center">
        <div className="animate-gold-shimmer mb-4" style={{ fontSize: 'clamp(2rem, 7vw, 3.5rem)' }}>⚓</div>
        <h1 className="font-display font-bold text-gold-glow uppercase mb-2" style={{ fontSize: 'clamp(1.5rem, 7vw, 3.75rem)', letterSpacing: 'clamp(0.05em, 0.8vw, 0.2em)' }}>
          Brigantina
        </h1>
        <p className="text-text-secondary tracking-[0.25em] uppercase mb-6" style={{ fontSize: 'clamp(0.6rem, 2vw, 0.875rem)' }}>
          Snack Bar • Sunny Beach • Bulgaria
        </p>
        <div className="w-28 h-px bg-text-accent mb-6 opacity-70" />
        <p className="text-text-secondary text-xs tracking-[0.25em] uppercase opacity-70">— Menu —</p>
      </div>
    </header>
  );
}