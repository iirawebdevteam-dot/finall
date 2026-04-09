import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { getSiteData } from "@/lib/siteData";
import { useSiteData } from "@/hooks/useSiteData";
import { getSportImage, campusImg } from "@/lib/images";
import { Clock } from "lucide-react";

export default function SportsPage() {
  const data = useSiteData();
  const [filter, setFilter] = useState<"all" | "sports" | "performing-arts">("all");
  const filtered = filter === "all" ? data.sports : data.sports.filter(s => s.category === filter);

  return (
    <div>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={campusImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <p className="text-white/40 font-body text-sm mb-2"><Link to="/" className="hover:text-primary">Home</Link> / Programs</p>
            <h1 className="heading-hero-white text-4xl md:text-6xl">SPORTS & COURSES</h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-dark-1 py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex gap-3 mb-12 justify-center flex-wrap">
              {(["all", "sports", "performing-arts"] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`font-body text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-300 ${
                    filter === f ? "bg-primary text-white shadow-[0_4px_20px_rgba(232,101,26,0.4)]" : "liquid-glass !py-2.5 !rounded-full text-white/60 hover:text-white"
                  }`}>
                  {f === "all" ? "All" : f === "sports" ? "Sports" : "Performing Arts"}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s, i) => (
              <ScrollReveal key={s.id} delay={i * 0.05}>
                <div className="liquid-glass card-hover-lift p-0 h-full flex flex-col overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img src={getSportImage(s.id, s.image)} alt={s.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-hero text-xl tracking-wider text-primary mb-2 text-shadow-sm">{s.name.toUpperCase()}</h3>
                    <p className="text-white/50 font-body text-sm mb-3">{s.description}</p>
                    <div className="space-y-1 text-sm text-white/40 font-body mb-3">
                      <p>👤 {s.ageGroup}</p>
                      <p className="flex items-center gap-1"><Clock size={12} /> {s.timings}</p>
                      <p>🎓 {s.coach}</p>
                      <p>💰 {s.fee}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {s.levels.map(l => (
                        <span key={l} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{l}</span>
                      ))}
                    </div>
                    <div className="mt-auto">
                      <Link to="/admissions" className="btn-primary-cta text-xs inline-block w-full text-center !py-2.5">ENROLL NOW</Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
