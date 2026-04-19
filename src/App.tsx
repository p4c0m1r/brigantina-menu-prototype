import { useState, useEffect } from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';
import MenuSection from './components/MenuSection';
import { menuSections } from './data/menuData';

export default function App() {
  const [activeId, setActiveId] = useState(menuSections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    menuSections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#071020] text-white">
      <Header />
      <NavBar sections={menuSections} active={activeId} onSelect={scrollTo} />
      <main className="max-w-5xl mx-auto divide-y divide-[#c9a84c]/10">
        {menuSections.map((section) => (
          <MenuSection key={section.id} section={section} />
        ))}
      </main>
      <footer className="text-center py-8 text-[#4a6a8a] text-xs border-t border-[#c9a84c]/10">
        <p className="text-[#c9a84c] font-semibold mb-1">⚓ Villa Brigantina</p>
        <p>Fregata 13-14, Sunny Beach 8240, Bulgaria</p>
        <p className="mt-1">+359 (0) 554 230 10 • www.villabrigantina.com</p>
      </footer>
    </div>
  );
}