import { getSiteData } from "@/lib/siteData";
import { useSiteData } from "@/hooks/useSiteData";
import { getSportImage, galleryImages, campusImg } from "@/lib/images";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, Star, ArrowRight, Clock } from "lucide-react";

export default function HomePage() {
  const data = useSiteData();

  return (
    <div>
      {/* HERO — full bleed image background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-[72px] pt-[72px]">
        <div className="absolute inset-0">
          <img src={campusImg} alt="IIRA Campus" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="heading-hero-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-6"
          >
            {data.hero.headline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[#ffffff]/70 font-body text-lg md:text-xl max-w-2xl mx-auto mb-10 text-shadow-sm"
          >
            {data.hero.subtext}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/sports" className="liquid-glass px-8 py-3.5 font-body font-bold text-sm uppercase tracking-wider text-[#ffffff] hover:bg-[#ffffff]/20 transition-colors">
              {data.hero.cta1Text}
            </Link>
            <Link to="/admissions" className="btn-primary-cta flex items-center gap-2">
              {data.hero.cta2Text} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#ffffff]/40"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* STATS */}
      <section className="bg-gradient-to-r from-[hsl(22,83%,45%)] to-[hsl(22,83%,55%)] py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.stats.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="liquid-glass text-center py-6 px-4">
                  <div className="font-hero text-3xl md:text-4xl text-white tracking-wider">
                    <CountUp end={parseInt(s.value)} suffix={s.suffix} />
                  </div>
                  <div className="text-white/70 font-body text-sm mt-1">{s.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SNAPSHOT */}
      <section className="section-dark-2 py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <h2 className="heading-hero text-3xl md:text-5xl mb-6">ABOUT IIRA</h2>
              <p className="text-white/60 font-body leading-relaxed mb-4 text-shadow-sm">
                In the premises spread over 2 acres in the midst of nature, where fresh air, greenery and clear sky is a complimentary essence, IIRA Sports & Performing Arts Academy nurtures champions of tomorrow.
              </p>
              <p className="text-white/40 font-body leading-relaxed mb-8">
                As an extension of IIRA International School, we bring the same commitment to excellence in sports and performing arts, fostering discipline, teamwork, and holistic development.
              </p>
              <Link to="/about" className="btn-primary-cta inline-block text-sm">READ MORE</Link>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(232,101,26,0.2)]">
                <img src={campusImg} alt="IIRA Campus" className="w-full h-full object-cover aspect-[4/3]" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SPORTS GRID */}
      <section className="section-dark-1 py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="heading-hero text-3xl md:text-5xl text-center mb-14">OUR PROGRAMS</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.sports.map((s, i) => (
              <ScrollReveal key={s.id} delay={i * 0.06}>
                <div className="liquid-glass card-hover-lift p-0 h-full flex flex-col overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={getSportImage(s.id, s.image)}
                      alt={s.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-hero text-xl tracking-wider text-primary mb-2 text-shadow-sm">{s.name.toUpperCase()}</h3>
                    <p className="text-white/40 text-sm font-body mb-1">{s.ageGroup}</p>
                    <p className="text-white/40 text-sm font-body mb-4 flex items-center gap-1">
                      <Clock size={12} /> {s.timings}
                    </p>
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

      {/* WHY CHOOSE US */}
      <section className="section-dark-2 py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="heading-hero text-3xl md:text-5xl text-center mb-14">WHY IIRA SPORTS?</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.whyChoose.map((w, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="liquid-glass card-hover-lift p-8 text-center h-full">
                  <div className="text-4xl mb-5">{w.icon}</div>
                  <h3 className="font-formal text-lg text-primary mb-3 text-shadow-sm">{w.title}</h3>
                  <p className="text-white/50 text-sm font-body leading-relaxed">{w.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="section-dark-1 py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="heading-hero text-3xl md:text-5xl text-center mb-14">PRIDE OF IIRA</h2>
          </ScrollReveal>
          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-none">
            {data.achievements.map((a, i) => (
              <ScrollReveal key={a.id} delay={i * 0.08}>
                <div className="liquid-glass card-hover-lift p-6 min-w-[280px] flex-shrink-0">
                  <div className="text-3xl mb-3">
                    {a.medal === "gold" ? "🥇" : a.medal === "silver" ? "🥈" : "🥉"}
                  </div>
                  <h4 className="font-body font-semibold text-white text-sm mb-1">{a.title}</h4>
                  <p className="text-primary text-sm font-body">{a.student}</p>
                  <p className="text-white/30 text-xs font-body mt-1">{a.sport} · {a.year}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/achievements" className="btn-primary-cta text-sm inline-block">VIEW ALL</Link>
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="section-dark-2 py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="heading-hero text-3xl md:text-5xl text-center mb-14">GALLERY</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.gallery.map((g, i) => (
              <ScrollReveal key={g.id} delay={i * 0.06}>
                <div className="group cursor-pointer relative overflow-hidden rounded-2xl aspect-square">
                  <img
                    src={galleryImages[g.category] || campusImg}
                    alt={g.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <span className="font-body text-sm text-white text-shadow-sm">{g.caption}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/gallery" className="btn-primary-cta text-sm inline-block">VIEW FULL GALLERY</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-dark-1 py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="heading-hero text-3xl md:text-5xl text-center mb-14">WHAT PARENTS SAY</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {data.testimonials.map((t, i) => (
              <ScrollReveal key={t.id} delay={i * 0.08}>
                <div className="liquid-glass card-hover-lift p-8 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={14} className="fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />
                    ))}
                  </div>
                  <p className="text-white/60 font-body text-sm leading-relaxed italic mb-6 flex-1">"{t.quote}"</p>
                  <div>
                    <p className="font-body font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-primary text-xs font-body">{t.sport}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE PREVIEW */}
      <section className="section-dark-2 py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="heading-hero text-3xl md:text-5xl text-center mb-14">WEEKLY SCHEDULE</h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="liquid-glass overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-white/40 font-medium">Sport</th>
                    <th className="text-left p-4 text-white/40 font-medium">Morning</th>
                    <th className="text-left p-4 text-white/40 font-medium">Evening</th>
                    <th className="text-left p-4 text-white/40 font-medium">Days</th>
                  </tr>
                </thead>
                <tbody>
                  {data.schedule.map((s, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-white font-medium flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
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
          <div className="text-center mt-10">
            <Link to="/schedule" className="btn-primary-cta text-sm inline-block">VIEW FULL SCHEDULE</Link>
          </div>
        </div>
      </section>

      {/* STAFF / COACHES */}
      {data.staff && data.staff.length > 0 && (
        <section className="section-dark-1 py-24">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="heading-hero text-3xl md:text-5xl text-center mb-14">MEET OUR STAFF</h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.staff.map((c, i) => (
                <ScrollReveal key={c.id} delay={i * 0.08}>
                  <div className="liquid-glass card-hover-lift h-full flex flex-col overflow-hidden">
                    {/* Photo */}
                    <div className="aspect-[4/3] overflow-hidden bg-foreground/5 relative">
                      {c.photo ? (
                        <img src={c.photo} alt={c.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-foreground/10 text-6xl">👤</div>
                      )}
                    </div>
                    {/* Info */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-hero text-xl tracking-wider text-foreground mb-1 text-shadow-sm">{c.name.toUpperCase()}</h3>
                      <p className="text-primary text-sm font-body font-semibold mb-3">{c.role}</p>
                      <p className="text-muted-foreground text-sm font-body leading-relaxed flex-1">{c.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA BANNER */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={campusImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(22,83%,45%)]/90 to-[hsl(22,83%,55%)]/90" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h2 className="heading-hero-white text-3xl md:text-5xl mb-4">START YOUR SPORTS JOURNEY</h2>
            <p className="font-body text-[#ffffff]/80 mb-10 text-shadow-sm">Limited seats available for {data.admissions.year} session</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/admissions" className="btn-primary-cta !bg-[#ffffff] !text-primary !shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:!bg-[#ffffff]/90">ENROLL NOW</Link>
              <a href="https://wa.me/917211131112" target="_blank" rel="noreferrer" className="btn-primary-cta !bg-[hsl(var(--whatsapp))] text-[#ffffff] !shadow-[0_10px_30px_rgba(37,211,102,0.3)]">
                WHATSAPP ENQUIRY
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
