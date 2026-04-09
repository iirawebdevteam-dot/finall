import { Link } from "react-router-dom";
import { useSiteData } from "@/hooks/useSiteData";
import { MapPin, Phone, Mail, MessageCircle, Youtube, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const data = useSiteData();

  const socialLinks = [
    { href: "https://www.youtube.com/channel/UC3qerydw3i6xTlm9BxLPrZA", icon: <Youtube size={18} />, label: "YouTube" },
    { href: "https://www.instagram.com/iira_international_school", icon: <Instagram size={18} />, label: "Instagram" },
    { href: "https://www.facebook.com/iirainternationalschool", icon: <Facebook size={18} />, label: "Facebook" },
  ];

  return (
    <footer className="section-dark-1 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/10 pb-12">
          <div>
            <h3 className="font-hero text-xl text-primary tracking-wider mb-4 text-shadow-sm">IIRA SPORTS</h3>
            <p className="text-white/50 text-sm leading-relaxed font-body mb-6">
              Train Hard. Perform Better. Live Fuller. A premier sports &amp; performing arts academy on a lush 2-acre campus in Vadodara.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  title={s.label}
                  className="liquid-glass w-9 h-9 flex items-center justify-center text-white/50 hover:text-primary transition-colors rounded-full"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-body font-semibold text-white mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[{ to: "/about", label: "About Us" }, { to: "/sports", label: "Programs" }, { to: "/admissions", label: "Admissions" }, { to: "/gallery", label: "Gallery" }, { to: "/schedule", label: "Schedule" }].map(l => (
                <Link key={l.to} to={l.to} className="text-white/50 text-sm hover:text-primary transition-colors font-body">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-body font-semibold text-white mb-4">Our Programs</h4>
            <div className="flex flex-col gap-2">
              {data.sports.slice(0, 6).map(s => (
                <span key={s.id} className="text-white/50 text-sm font-body">{s.name}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-body font-semibold text-white mb-4">Contact Us</h4>
            <div className="flex flex-col gap-3 text-sm text-white/50 font-body">
              <span className="flex items-start gap-2"><MapPin size={16} className="shrink-0 mt-0.5 text-primary" /> {data.contact.address}</span>
              <a href={`tel:${data.contact.phone}`} className="flex items-center gap-2 hover:text-primary transition-colors"><Phone size={14} className="text-primary" /> {data.contact.phone}</a>
              <a href="https://wa.me/917211131112" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[hsl(var(--whatsapp))] transition-colors"><MessageCircle size={14} className="text-[hsl(var(--whatsapp))]" /> {data.contact.whatsapp}</a>
              <a href={`mailto:${data.contact.email}`} className="flex items-center gap-2 hover:text-primary transition-colors"><Mail size={14} className="text-primary" /> {data.contact.email}</a>
            </div>
          </div>
        </div>
        <div className="pt-6 text-center text-white/30 text-xs font-body">
          © {new Date().getFullYear()} IIRA Sports &amp; Performing Arts Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
