import { Phone, Mail, ExternalLink } from "lucide-react";

export default function Topbar() {
  return (
    <div className="section-dark-1 border-b border-white/10 text-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-2 gap-2">
        <div className="flex items-center gap-4 text-white/80">
          <a href="tel:+917600360036" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Phone size={13} /> +91 76003 60036
          </a>
          <a href="https://wa.me/917211131112" target="_blank" rel="noreferrer" className="hidden sm:flex items-center gap-1 hover:text-primary transition-colors">
            WhatsApp
          </a>
          <a href="mailto:admin@iira.co.in" className="hidden md:flex items-center gap-1 hover:text-primary transition-colors">
            <Mail size={13} /> admin@iira.co.in
          </a>
        </div>
        <div className="flex items-center gap-4 text-white/80">
          <a href="https://iira.co.in" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
            iira.co.in <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
