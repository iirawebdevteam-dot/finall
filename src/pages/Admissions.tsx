import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { useSiteData } from "@/hooks/useSiteData";
import { campusImg } from "@/lib/images";
import { CheckCircle } from "lucide-react";

export default function AdmissionsPage() {
  const data = useSiteData();
  const [form, setForm] = useState({ name: "", phone: "", email: "", sport: "", age: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    { num: "01", title: "Enquiry", desc: "Fill the form below or contact us via WhatsApp" },
    { num: "02", title: "Free Trial", desc: "Book a complimentary trial session in your chosen sport" },
    { num: "03", title: "Assessment", desc: "Our coaches assess skill level and recommend the right batch" },
    { num: "04", title: "Registration", desc: "Complete registration with required documents" },
    { num: "05", title: "Begin Training", desc: "Start your journey with IIRA Sports Academy!" },
  ];

  // Use admin-editable documents list from siteData
  const docs = data.inquiryDocuments ?? [
    "Birth certificate or age proof",
    "2 passport-size photos",
    "Medical fitness certificate",
    "Previous sports certificates (if any)",
    "Aadhaar card copy",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save inquiry to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem("inquiries") || "[]");
      const newEntry = {
        id: `inq-${Date.now()}`,
        ...form,
        submittedAt: new Date().toISOString(),
      };
      localStorage.setItem("inquiries", JSON.stringify([...existing, newEntry]));
    } catch {}
    setSubmitted(true);
  };

  return (
    <div>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0"><img src={campusImg} alt="" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-black/70" /></div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <p className="text-white/40 font-body text-sm mb-2"><Link to="/" className="hover:text-primary">Home</Link> / Admissions</p>
            <h1 className="heading-hero-white text-4xl md:text-6xl">ADMISSIONS</h1>
            {data.admissions.open && (
              <div className="mt-4 inline-block liquid-glass !rounded-full px-6 py-2">
                <span className="text-primary font-body font-semibold text-sm">✨ Enrollments Open for {data.admissions.year}</span>
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>

      <section className="section-dark-2 py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal><h2 className="heading-hero text-3xl text-center mb-14">ENROLLMENT PROCESS</h2></ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="liquid-glass card-hover-lift p-6 text-center h-full">
                  <div className="font-hero text-3xl text-primary mb-2 text-shadow-sm">{s.num}</div>
                  <h4 className="font-body font-semibold text-white mb-2">{s.title}</h4>
                  <p className="text-white/40 text-xs font-body">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark-1 py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          <ScrollReveal>
            <div className="liquid-glass p-8 h-full">
              <h3 className="heading-hero text-xl mb-6">DOCUMENTS REQUIRED</h3>
              <ul className="space-y-3">
                {docs.map((d, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/60 font-body text-sm">
                    <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" /> {d}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="white-card p-8">
              <h3 className="heading-formal text-2xl text-secondary mb-6">Enquiry Form</h3>
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle size={48} className="text-primary mx-auto mb-4" />
                  <p className="font-body font-semibold text-foreground">Thank you for your enquiry!</p>
                  <p className="text-muted-foreground font-body text-sm mt-1">We'll contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: "name", label: "Student Name", type: "text" },
                    { key: "phone", label: "Phone Number", type: "tel" },
                    { key: "email", label: "Email", type: "email" },
                    { key: "age", label: "Student Age", type: "text" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-sm font-body font-medium text-foreground mb-1">{f.label}</label>
                      <input type={f.type} required value={(form as Record<string, string>)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-border font-body text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1">Preferred Sport</label>
                    <select value={form.sport} onChange={e => setForm({ ...form, sport: e.target.value })} required
                      className="w-full px-4 py-2.5 rounded-xl border border-border font-body text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                      <option value="">Select a sport</option>
                      {data.sports.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-foreground mb-1">Message (Optional)</label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-border font-body text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none" />
                  </div>
                  <button type="submit" className="btn-primary-cta w-full text-center">SUBMIT ENQUIRY</button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(22,83%,45%)] to-[hsl(22,83%,55%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h3 className="heading-hero-white text-2xl mb-4">PREFER WHATSAPP?</h3>
            <a href="https://wa.me/917211131112" target="_blank" rel="noreferrer"
              className="btn-primary-cta !bg-[hsl(var(--whatsapp))] text-white inline-block !shadow-[0_10px_30px_rgba(37,211,102,0.3)]">
              CHAT WITH US ON WHATSAPP
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
