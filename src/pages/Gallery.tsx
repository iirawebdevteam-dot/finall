import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { getSiteData } from "@/lib/siteData";
import { useSiteData } from "@/hooks/useSiteData";
import { galleryImages, campusImg } from "@/lib/images";
import { X } from "lucide-react";

export default function GalleryPage() {
  const data = useSiteData();
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(data.gallery.map(g => g.category))];
  const filtered = filter === "All" ? data.gallery : data.gallery.filter(g => g.category === filter);
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0"><img src={campusImg} alt="" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-black/70" /></div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <p className="text-white/40 font-body text-sm mb-2"><Link to="/" className="hover:text-primary">Home</Link> / Gallery</p>
            <h1 className="heading-hero-white text-4xl md:text-6xl">GALLERY</h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-dark-1 py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex gap-3 mb-12 justify-center flex-wrap">
              {categories.map(c => (
                <button key={c} onClick={() => setFilter(c)}
                  className={`font-body text-sm px-5 py-2.5 rounded-full transition-all duration-300 ${filter === c ? "bg-primary text-white shadow-[0_4px_20px_rgba(232,101,26,0.4)]" : "liquid-glass !py-2.5 !rounded-full text-white/60 hover:text-white"}`}>
                  {c}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filtered.map((g, i) => (
              <ScrollReveal key={g.id} delay={i * 0.05}>
                <div onClick={() => setLightbox(g.id)} className="group cursor-pointer relative overflow-hidden rounded-2xl aspect-square">
                  <img src={galleryImages[g.category] || campusImg} alt={g.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <span className="font-body text-sm text-white text-shadow-sm">{g.caption}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-8" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors" onClick={() => setLightbox(null)}><X size={28} /></button>
          <div className="liquid-glass p-4 max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <img src={galleryImages[data.gallery.find(g => g.id === lightbox)?.category || ""] || campusImg} alt="" className="w-full rounded-xl aspect-video object-cover" />
            <p className="text-white/70 font-body text-center mt-4 pb-2">{data.gallery.find(g => g.id === lightbox)?.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}
