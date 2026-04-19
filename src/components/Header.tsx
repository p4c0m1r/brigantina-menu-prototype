export default function Header() {
  return (
    <header className="relative bg-[#0a1628] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d2145] to-[#0a1628] opacity-90" />
      <div className="relative z-10 flex flex-col items-center py-14 px-4 text-center">
        <div className="gold-shimmer text-5xl mb-3">⚓</div>
        <h1 className="text-5xl font-bold tracking-widest text-[#c9a84c] uppercase mb-1">
          Brigantina
        </h1>
        <p className="text-[#8ab4d4] text-sm tracking-[0.3em] uppercase mb-6">
          Snack Bar • Sunny Beach • Bulgaria
        </p>
        <div className="w-24 h-px bg-[#c9a84c] mb-6" />
        <p className="text-[#8ab4d4] text-xs tracking-widest uppercase">Menu</p>
      </div>
    </header>
  );
}