import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { getSiteData } from "@/lib/siteData";
import { useSiteData } from "@/hooks/useSiteData";
import { campusImg } from "@/lib/images";

export default function AboutPage() {
  const data = useSiteData();
  return (
    <div>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={campusImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <p className="text-white/40 font-body text-sm mb-2"><Link to="/" className="hover:text-primary">Home</Link> / About</p>
            <h1 className="heading-hero-white text-4xl md:text-6xl">ABOUT IIRA</h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-dark-2 py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <img src={campusImg} alt="IIRA Campus" className="w-full aspect-[4/3] object-cover" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="liquid-glass p-8">
              <h2 className="heading-formal text-2xl mb-4">Our Story</h2>
              <p className="text-white/60 font-body leading-relaxed mb-4">
                Born from the vision of IIRA International School, our Sports & Performing Arts Academy was established to provide world-class training on a lush 2-acre campus surrounded by natural greenery.
              </p>
              <p className="text-white/40 font-body leading-relaxed">
                We believe that sports and arts are not extracurricular — they are essential to developing confident, disciplined, and well-rounded individuals ready to take on the world.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-dark-1 py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-6">
          <ScrollReveal>
            <div className="liquid-glass card-hover-lift p-8 h-full">
              <h3 className="heading-hero text-2xl mb-4">OUR VISION</h3>
              <p className="text-white/60 font-body leading-relaxed">To become Gujarat's premier sports and performing arts academy that produces national-level athletes and artists while nurturing character, discipline, and sportsmanship.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="liquid-glass card-hover-lift p-8 h-full">
              <h3 className="heading-hero text-2xl mb-4">OUR MISSION</h3>
              <p className="text-white/60 font-body leading-relaxed">To provide accessible, high-quality sports and performing arts education integrated with academics, fostering holistic development in a natural, inspiring campus environment.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-dark-2 py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal><h2 className="heading-hero text-3xl md:text-5xl text-center mb-14">OUR PHILOSOPHY</h2></ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "💪", title: "Body", desc: "Physical excellence through expert coaching, progressive training, and world-class facilities on our natural campus." },
              { icon: "🧠", title: "Mind", desc: "Mental toughness, strategic thinking, and emotional intelligence developed through competitive sports and stage performance." },
              { icon: "✨", title: "Soul", desc: "Character building, sportsmanship, teamwork, and a lifelong love for sport and art that transcends competition." },
            ].map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="liquid-glass card-hover-lift p-8 text-center h-full">
                  <div className="text-5xl mb-5">{p.icon}</div>
                  <h3 className="font-formal text-xl text-primary mb-3">{p.title}</h3>
                  <p className="text-white/50 font-body text-sm leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark-1 py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal><h2 className="heading-hero text-3xl md:text-5xl text-center mb-14">OUR COACHES</h2></ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.faculty.map((f, i) => (
              <ScrollReveal key={f.id} delay={i * 0.1}>
                <div className="liquid-glass card-hover-lift p-6 text-center h-full">
                  <div className="w-20 h-20 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center font-hero text-2xl text-primary">
                    {f.name.charAt(0)}
                  </div>
                  <h4 className="font-body font-semibold text-white">{f.name}</h4>
                  <p className="text-primary text-sm font-body mb-3">{f.sport}</p>
                  <p className="text-white/50 text-sm font-body mb-3">{f.bio}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {f.certifications.map(c => (
                      <span key={c} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-body">{c}</span>
                    ))}
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
