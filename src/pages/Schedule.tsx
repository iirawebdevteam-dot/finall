import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { getSiteData } from "@/lib/siteData";
import { useSiteData } from "@/hooks/useSiteData";
import { campusImg } from "@/lib/images";

export default function SchedulePage() {
  const data = useSiteData();
  return (
    <div>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0"><img src={campusImg} alt="" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-black/70" /></div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <p className="text-white/40 font-body text-sm mb-2"><Link to="/" className="hover:text-primary">Home</Link> / Schedule</p>
            <h1 className="heading-hero-white text-4xl md:text-6xl">CLASS SCHEDULE</h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-dark-1 py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="liquid-glass overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-white/40 font-medium">Sport</th>
                    <th className="text-left p-4 text-white/40 font-medium">Morning Batch</th>
                    <th className="text-left p-4 text-white/40 font-medium">Evening Batch</th>
                    <th className="text-left p-4 text-white/40 font-medium">Days</th>
                  </tr>
                </thead>
                <tbody>
                  {data.schedule.map((s, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-white font-medium flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]" style={{ background: s.color }} />
                        {s.sport}
                      </td>
                      <td className="p-4 text-white/50">{s.morning}</td>
                      <td className="p-4 text-white/50">{s.evening}</td>
                      <td className="p-4 text-white/50">{s.days}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="liquid-glass p-8 mt-8">
              <h3 className="heading-hero text-xl mb-4">HOLIDAY & CAMP SCHEDULE</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm font-body text-white/50">
                <div>
                  <p className="text-white font-medium mb-1">Summer Camp 2025</p>
                  <p>April 1 – May 15 | All Sports | Ages 5-16</p>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Diwali Camp 2025</p>
                  <p>October 20-31 | Cricket & Football Focus</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="text-center mt-10">
            <a href="https://wa.me/917211131112?text=Hi%2C%20I%20want%20batch%20timing%20details" target="_blank" rel="noreferrer" className="btn-primary-cta text-sm inline-block">
              ENQUIRE ABOUT TIMINGS
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
