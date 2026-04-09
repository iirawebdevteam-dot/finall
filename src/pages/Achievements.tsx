import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { getSiteData } from "@/lib/siteData";
import { useSiteData } from "@/hooks/useSiteData";
import { campusImg } from "@/lib/images";

export default function AchievementsPage() {
  const data = useSiteData();
  const [filter, setFilter] = useState("all");
  const sports = ["all", ...new Set(data.achievements.map(a => a.sport))];
  const filtered = filter === "all" ? data.achievements : data.achievements.filter(a => a.sport === filter);

  return (
    <div>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0"><img src={campusImg} alt="" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-black/70" /></div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <p className="text-white/40 font-body text-sm mb-2"><Link to="/" className="hover:text-primary">Home</Link> / Achievements</p>
            <h1 className="heading-hero-white text-4xl md:text-6xl">PRIDE OF IIRA</h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-dark-1 py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex gap-3 mb-12 justify-center flex-wrap">
              {sports.map(s => (
                <button key={s} onClick={() => setFilter(s)}
                  className={`font-body text-sm px-5 py-2.5 rounded-full transition-all duration-300 ${filter === s ? "bg-primary text-white shadow-[0_4px_20px_rgba(232,101,26,0.4)]" : "liquid-glass !py-2.5 !rounded-full text-white/60 hover:text-white"}`}>
                  {s === "all" ? "All" : s}
                </button>
              ))}
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((a, i) => (
              <ScrollReveal key={a.id} delay={i * 0.06}>
                <div className="liquid-glass card-hover-lift p-8 h-full">
                  <div className="text-4xl mb-4">{a.medal === "gold" ? "🥇" : a.medal === "silver" ? "🥈" : "🥉"}</div>
                  <h3 className="font-body font-semibold text-white mb-1">{a.title}</h3>
                  <p className="text-primary font-body text-sm mb-1">{a.student}</p>
                  <p className="text-white/30 text-xs font-body mb-3">{a.sport} · {a.year}</p>
                  <p className="text-white/50 text-sm font-body">{a.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
