import { useState } from 'react';
import {
  Wifi, BatteryFull, Signal, Search, Bell, Play, Bookmark, BookmarkCheck,
  Clock, ChevronRight, Sparkles, Home, Library, Hammer, CircleUser,
  Stamp, Camera, Scissors, PenTool, Layers, Flame, ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LESSONS = [
  {
    id: 1,
    craft: 'Print',
    title: 'Mixing Soy-Based Inks by Hand',
    instructor: 'Marguerite Olin',
    duration: '18 min',
    level: 'Beginner',
    img: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=300&h=300&fit=crop',
    new: true,
  },
  {
    id: 2,
    craft: 'Film',
    title: 'Reading Light Without a Meter',
    instructor: 'Tomas Reyes',
    duration: '24 min',
    level: 'Intermediate',
    img: 'https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=300&h=300&fit=crop',
    new: false,
  },
  {
    id: 3,
    craft: 'Bind',
    title: 'Coptic Stitch: The Open Spine',
    instructor: 'Hana Volk',
    duration: '41 min',
    level: 'Intermediate',
    img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop',
    new: true,
  },
  {
    id: 4,
    craft: 'Letter',
    title: 'Brush Scripts from Old Shop Signs',
    instructor: 'Dele Akande',
    duration: '32 min',
    level: 'Advanced',
    img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=300&fit=crop',
    new: false,
  },
  {
    id: 5,
    craft: 'Print',
    title: 'Registration Marks the Old Way',
    instructor: 'Marguerite Olin',
    duration: '15 min',
    level: 'Beginner',
    img: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=300&h=300&fit=crop',
    new: false,
  },
];

const ARCHIVE = [
  {
    id: 'a1',
    year: '1968',
    title: 'The Vandercook Proof Press',
    sub: 'How our founder restored No. 4',
    img: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&h=420&fit=crop',
  },
  {
    id: 'a2',
    year: '1974',
    title: 'Specimen Book, Second Drawer',
    sub: 'Wood type we still set today',
    img: 'https://images.unsplash.com/photo-1511108690759-009324a90311?w=600&h=420&fit=crop',
  },
  {
    id: 'a3',
    year: '1989',
    title: 'Darkroom Notes, Vol. III',
    sub: 'Dodging & burning by feel',
    img: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24?w=600&h=420&fit=crop',
  },
];

const CHIPS = [
  { label: 'All crafts', icon: Layers },
  { label: 'Print', icon: Stamp },
  { label: 'Film', icon: Camera },
  { label: 'Bind', icon: Scissors },
  { label: 'Letter', icon: PenTool },
];

export default function App() {
  const [chip, setChip] = useState('All crafts');
  const [saved, setSaved] = useState([3]);
  const [tab, setTab] = useState('Home');

  const toggleSave = (id) =>
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const filtered = chip === 'All crafts' ? LESSONS : LESSONS.filter((l) => l.craft === chip);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0c0907] py-8 nost-root">
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Karla:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
        rel="stylesheet"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .nost-root { font-family: 'Karla', sans-serif; }
        .serif { font-family: 'Fraunces', serif; }
        .phone {
          width: 396px;
          background: #1b140e;
          border-radius: 44px;
          box-shadow: 0 0 0 1px #3a2c1f, 0 0 0 10px #0f0b08, 0 40px 80px -20px rgba(0,0,0,0.8);
          overflow: hidden;
          position: relative;
        }
        .phone::after {
          content: '';
          position: absolute; inset: 0;
          pointer-events: none;
          opacity: 0.5;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.16'/%3E%3C/svg%3E");
          z-index: 50;
        }
        .scroll-area {
          height: 800px;
          overflow-y: auto;
          scrollbar-width: none;
        }
        .scroll-area::-webkit-scrollbar { display: none; }
        .hscroll { scrollbar-width: none; }
        .hscroll::-webkit-scrollbar { display: none; }
        .stitch {
          background-image: linear-gradient(to right, #4a3826 50%, transparent 50%);
          background-size: 12px 1px;
          background-repeat: repeat-x;
          height: 1px;
        }
        .glow-amber { box-shadow: 0 0 24px -4px rgba(255,176,74,0.45); }
        .ticket-notch {
          -webkit-mask: radial-gradient(circle 9px at 0% 50%, transparent 98%, black 100%),
                        radial-gradient(circle 9px at 100% 50%, transparent 98%, black 100%);
          -webkit-mask-composite: source-in;
          mask: radial-gradient(circle 9px at 0% 50%, transparent 98%, black 100%) intersect,
                radial-gradient(circle 9px at 100% 50%, transparent 98%, black 100%);
        }
        @keyframes ember {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; filter: brightness(1.2); }
        }
        .ember { animation: ember 3.2s ease-in-out infinite; }
      `,
        }}
      />

      <div className="phone">
        <div className="scroll-area relative bg-[#1b140e] text-[#ede1cf]">
          {/* ============ STATUS BAR ============ */}
          <div className="flex items-center justify-between px-7 pt-4 pb-1 text-[12px] font-semibold text-[#cdbda3]">
            <span className="tracking-wide">9:41</span>
            <div className="flex items-center gap-1.5">
              <Signal size={13} strokeWidth={2.5} />
              <Wifi size={13} strokeWidth={2.5} />
              <BatteryFull size={16} strokeWidth={2} />
            </div>
          </div>

          {/* ============ HEADER ============ */}
          <header className="px-6 pt-5 pb-4 flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#a8917a] font-semibold mb-1.5">
                Wickham &amp; Daughters Studio
              </p>
              <h1 className="serif text-[30px] leading-[1.05] font-medium text-[#f4e8d3]">
                Evening, June.
                <br />
                <span className="italic font-normal text-[#ffb45c]">The bench is warm.</span>
              </h1>
            </div>
            <div className="flex flex-col gap-2">
              <button className="w-10 h-10 rounded-full border border-[#46362a] flex items-center justify-center text-[#cdbda3] hover:border-[#ffb45c] hover:text-[#ffb45c] transition-colors">
                <Search size={17} />
              </button>
              <button className="w-10 h-10 rounded-full border border-[#46362a] flex items-center justify-center text-[#cdbda3] relative hover:border-[#ffb45c] hover:text-[#ffb45c] transition-colors">
                <Bell size={17} />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ff9d3d] ember" />
              </button>
            </div>
          </header>

          {/* ============ CONTINUE LEARNING — FULL BLEED ============ */}
          <section className="relative">
            <div className="relative h-[248px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1503694978374-8a2fa686963a?w=900&h=600&fit=crop"
                alt="Letterpress type"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b140e] via-[#1b140e]/55 to-[#1b140e]/10" />
              <div className="absolute inset-0 bg-[#2a160a]/30 mix-blend-multiply" />

              <div className="absolute top-4 left-6 flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-full bg-[#1b140e]/80 backdrop-blur-sm border border-[#5a4632] text-[10px] uppercase tracking-[0.18em] font-bold text-[#ffc474]">
                  Continue · Lesson 4 of 9
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 px-6 pb-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#d8b98c] font-semibold mb-1">
                  Letterpress Fundamentals
                </p>
                <h2 className="serif text-[24px] leading-tight font-medium text-[#fdf3df] mb-3">
                  Setting Lead Type by Hand
                </h2>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 bg-[#ffb45c] text-[#241405] pl-4 pr-5 py-2.5 rounded-full text-[13px] font-bold glow-amber hover:bg-[#ffc278] transition-colors">
                    <Play size={15} fill="#241405" /> Resume
                  </button>
                  <div className="flex-1">
                    <div className="flex justify-between text-[11px] text-[#cdbda3] mb-1.5 font-semibold">
                      <span>11 min left</span>
                      <span className="text-[#ffc474]">62%</span>
                    </div>
                    <div className="h-[5px] rounded-full bg-[#3c2e20] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '62%' }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-[#c97b3a] to-[#ffc474]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============ DAILY RITUAL TICKET ============ */}
          <section className="px-0 pt-5 pb-2">
            <div className="mx-6 ticket-notch bg-[#26342a] border border-[#3d5240] rounded-2xl px-5 py-4 flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[#1b251e] border border-[#4d6b50] flex items-center justify-center shrink-0">
                <Flame size={18} className="text-[#b9e08a] ember" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#9dc77f] font-bold mb-0.5">
                  Today's ritual · 12-day streak
                </p>
                <p className="text-[14px] font-semibold text-[#e9f2da] leading-snug">
                  Sharpen one pencil. Sketch the kerning of your street sign.
                </p>
              </div>
              <ChevronRight size={18} className="text-[#9dc77f] shrink-0" />
            </div>
          </section>

          {/* ============ CRAFT FILTER CHIPS ============ */}
          <section className="pt-4">
            <div className="hscroll flex gap-2 overflow-x-auto px-6 pb-1">
              {CHIPS.map(({ label, icon: Icon }) => {
                const active = chip === label;
                return (
                  <button
                    key={label}
                    onClick={() => setChip(label)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[12.5px] font-bold whitespace-nowrap transition-all duration-200 border ${
                      active
                        ? 'bg-[#ffb45c] text-[#241405] border-[#ffb45c] glow-amber'
                        : 'bg-transparent text-[#bba88c] border-[#46362a] hover:border-[#7a6248]'
                    }`}
                  >
                    <Icon size={14} strokeWidth={2.4} />
                    {label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* ============ LESSON LIST ============ */}
          <section className="pt-5">
            <div className="px-6 flex items-baseline justify-between mb-3">
              <h3 className="serif text-[20px] font-medium text-[#f4e8d3]">
                The how-to shelf
              </h3>
              <button className="text-[12px] font-bold text-[#ffc474] flex items-center gap-0.5">
                Browse all <ArrowUpRight size={13} />
              </button>
            </div>

            <AnimatePresence mode="popLayout">
              {filtered.map((l, i) => (
                <motion.div
                  key={l.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, delay: i * 0.03 }}
                >
                  {i > 0 && <div className="stitch mx-6" />}
                  <div className="flex items-center gap-4 px-6 py-4 hover:bg-[#221a12] transition-colors cursor-pointer group">
                    <div className="relative w-[64px] h-[64px] rounded-xl overflow-hidden shrink-0 border border-[#3a2c1f]">
                      <img src={l.img} alt={l.title} className="w-full h-full object-cover sepia-[0.25] group-hover:sepia-0 transition-all duration-300" />
                      {l.new && (
                        <span className="absolute top-1 left-1 px-1.5 py-[2px] rounded bg-[#ffb45c] text-[#241405] text-[8.5px] font-extrabold uppercase tracking-wider">
                          New
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#a8917a] font-bold mb-0.5">
                        {l.craft} · {l.level}
                      </p>
                      <h4 className="text-[15px] font-bold text-[#ede1cf] leading-snug mb-1 group-hover:text-[#ffc474] transition-colors">
                        {l.title}
                      </h4>
                      <div className="flex items-center gap-3 text-[11.5px] text-[#9d8a72]">
                        <span className="serif italic">{l.instructor}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} /> {l.duration}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleSave(l.id); }}
                      className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[#8a male7660] hover:bg-[#2c2218] transition-colors"
                    >
                      {saved.includes(l.id) ? (
                        <BookmarkCheck size={18} className="text-[#b9e08a]" />
                      ) : (
                        <Bookmark size={18} className="text-[#8a7660]" />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </section>

          {/* ============ FROM THE ARCHIVE — FULL BLEED DARKER BAND ============ */}
          <section className="bg-[#140e09] border-y border-[#33271b] mt-3 pt-6 pb-7">
            <div className="px-6 flex items-baseline justify-between mb-1">
              <h3 className="serif text-[20px] font-medium text-[#f4e8d3]">
                From the family archive
              </h3>
              <Sparkles size={16} className="text-[#e0915a]" />
            </div>
            <p className="px-6 text-[12.5px] text-[#9d8a72] mb-4 leading-relaxed">
              Three generations of shop notes, presses, and proofs — annotated for today's hands.
            </p>
            <div className="hscroll flex gap-3 overflow-x-auto px-6">
              {ARCHIVE.map((a) => (
                <div
                  key={a.id}
                  className="relative w-[218px] shrink-0 rounded-2xl overflow-hidden border border-[#3a2c1f] group cursor-pointer"
                >
                  <div className="h-[130px] overflow-hidden">
                    <img
                      src={a.img}
                      alt={a.title}
                      className="w-full h-full object-cover sepia-[0.4] group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="bg-[#211810] px-4 py-3.5">
                    <span className="serif italic text-[12px] text-[#e0915a]">{a.year}</span>
                    <h4 className="text-[14px] font-bold text-[#ede1cf] leading-snug mt-0.5">
                      {a.title}
                    </h4>
                    <p className="text-[11.5px] text-[#9d8a72] mt-1">{a.sub}</p>
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2 py-[3px] rounded bg-[#140e09]/85 border border-[#5a4632] text-[9px] uppercase tracking-[0.16em] font-bold text-[#d8b98c]">
                    Archive
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ============ WEEKLY WORKSHOP ============ */}
          <section className="px-6 pt-6 pb-9">
            <div className="rounded-2xl bg-gradient-to-br from-[#3a2415] to-[#241608] border border-[#5a3d22] p-5 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full border-[10px] border-[#ffb45c]/10" />
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#e0915a] font-bold mb-2">
                Live workshop · Saturday 10:00
              </p>
              <h3 className="serif text-[21px] leading-tight font-medium text-[#fdf3df] mb-2">
                Pulling your first proof, <span className="italic">together.</span>
              </h3>
              <p className="text-[12.5px] text-[#c4ab8d] leading-relaxed mb-4">
                Marguerite walks the studio's 1968 Vandercook live. Bring questions, leave with ink under your nails.
              </p>
              <div className="flex items-center justify-between">
                <button className="px-5 py-2.5 rounded-full bg-[#ffb45c] text-[#241405] text-[13px] font-bold glow-amber hover:bg-[#ffc278] transition-colors">
                  Save my seat
                </button>
                <span className="text-[11.5px] text-[#9d8a72] font-semibold">38 of 50 spots left</span>
              </div>
            </div>
          </section>

          <div className="h-[88px]" />
        </div>

        {/* ============ BOTTOM NAV ============ */}
        <nav className="absolute bottom-0 left-0 right-0 z-40 bg-[#140e09]/95 backdrop-blur-md border-t border-[#33271b] px-2 pt-2 pb-5">
          <div className="flex items-center justify-around">
            {[
              { label: 'Home', icon: Home },
              { label: 'Library', icon: Library },
              { label: 'Workshop', icon: Hammer },
              { label: 'You', icon: CircleUser },
            ].map(({ label, icon: Icon }) => {
              const active = tab === label;
              return (
                <button
                  key={label}
                  onClick={() => setTab(label)}
                  className="flex flex-col items-center gap-1 px-4 py-1.5 relative"
                >
                  <Icon
                    size={21}
                    strokeWidth={active ? 2.4 : 1.8}
                    className={active ? 'text-[#ffc474]' : 'text-[#7d6a55]'}
                  />
                  <span
                    className={`text-[10px] font-bold tracking-wide ${
                      active ? 'text-[#ffc474]' : 'text-[#7d6a55]'
                    }`}
                  >
                    {label}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="navdot"
                      className="absolute -top-[9px] w-8 h-[3px] rounded-full bg-[#ffb45c] glow-amber"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}