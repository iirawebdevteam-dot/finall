import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { useSiteData } from "@/hooks/useSiteData";
import { campusImg } from "@/lib/images";
import { MapPin, Phone, Mail, Clock, CheckCircle, Youtube, Instagram, Facebook } from "lucide-react";

export default function ContactPage() {
  const data = useSiteData();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  const socialLinks = [
    {
      label: "YouTube",
      href: "https://www.youtube.com/channel/UC3qerydw3i6xTlm9BxLPrZA",
      icon: <Youtube size={16} />,
      color: "hover:text-red-500",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/iira_international_school",
      icon: <Instagram size={16} />,
      color: "hover:text-pink-400",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/iirainternationalschool",
      icon: <Facebook size={16} />,
      color: "hover:text-blue-400",
    },
  ];

  return (
    <div>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0"><img src={campusImg} alt="" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-black/70" /></div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <p className="text-white/40 font-body text-sm mb-2"><Link to="/" className="hover:text-primary">Home</Link> / Contact</p>
            <h1 className="heading-hero-white text-4xl md:text-6xl">CONTACT US</h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-dark-1 py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {[
              { icon: <MapPin size={20} />, title: "Address", text: data.contact.address },
              { icon: <Phone size={20} />, title: "Phone", text: data.contact.phone },
              { icon: <Mail size={20} />, title: "Email", text: data.contact.email },
              { icon: <Clock size={20} />, title: "Hours", text: data.contact.hours },
            ].map((c, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="liquid-glass card-hover-lift p-6 flex items-start gap-4">
                  <div className="text-primary shrink-0">{c.icon}</div>
                  <div>
                    <h4 className="font-body font-semibold text-white text-sm">{c.title}</h4>
                    <p className="text-white/50 font-body text-sm">{c.text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
            <ScrollReveal delay={0.3}>
              <div className="liquid-glass overflow-hidden h-64 rounded-2xl">
                {/* Correct Google Maps embed for IIRA location — Vasna-Bhayli, Vadodara */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.418069126!2d73.09769!3d22.34123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5e8b67e55eb%3A0x8d4b0f12e4c2a5c0!2sIIRA%20International%20School!5e0!3m2!1sen!2sin!4v1711233600000"
                  width="100%" height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                  allowFullScreen loading="lazy" title="IIRA Location"
                />
              </div>
              <p className="text-center mt-2">
                <a
                  href="https://maps.app.goo.gl/J9MWwcoULw7qfxBFA"
                  target="_blank" rel="noreferrer"
                  className="text-primary text-xs font-body hover:underline"
                >
                  📍 Open in Google Maps →
                </a>
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.1}>
            <div className="white-card p-8">
              <h3 className="heading-formal text-2xl text-secondary mb-6">Send Us a Message</h3>
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle size={48} className="text-primary mx-auto mb-4" />
                  <p className="font-body font-semibold text-foreground">Message sent!</p>
                  <p className="text-muted-foreground font-body text-sm mt-1">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: "name", label: "Your Name", type: "text" },
                    { key: "email", label: "Email", type: "email" },
                    { key: "phone", label: "Phone", type: "tel" },
                    { key: "subject", label: "Subject", type: "text" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-sm font-body font-medium text-foreground mb-1">{f.label}</label>
                      <input type={f.type} required value={(form as Record<string, string>)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-border font-body text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1">Message</label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required rows={4}
                      className="w-full px-4 py-2.5 rounded-xl border border-border font-body text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none" />
                  </div>
                  <button type="submit" className="btn-primary-cta w-full text-center">SEND MESSAGE</button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-dark-2 py-12">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h3 className="heading-hero text-xl mb-6">FOLLOW US</h3>
            <div className="flex gap-4 justify-center flex-wrap">
              {socialLinks.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`liquid-glass px-6 py-3 text-white/50 text-sm font-body flex items-center gap-2 transition-colors ${s.color}`}
                >
                  {s.icon} {s.label}
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
