export default function Header() {
  return (
    <header className="relative bg-surface-base bg-gradient-mesh overflow-hidden">
      <div className="hero-vignette" />
      <div className="relative z-10 flex flex-col items-center py-14 px-4 text-center">
        <h1 className="mb-5">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="Villa Brigantina"
            className="animate-gold-shimmer hero-logo"
          />
          <span className="sr-only">Villa Brigantina</span>
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
