import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import iiraLogo from "@/assets/iira-logo.jfif";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/sports", label: "Programs" },
  { to: "/achievements", label: "Achievements" },
  { to: "/gallery", label: "Gallery" },
  { to: "/schedule", label: "Schedule" },
  { to: "/admissions", label: "Admissions" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "top-4 px-4" : "top-0 px-0"}`}>
      <div className={`max-w-7xl mx-auto flex items-center justify-between px-4 transition-all duration-500 ${
        scrolled
          ? "liquid-glass py-2"
          : "bg-transparent py-3"
      }`}>
        <Link to="/" className="flex items-center gap-3">
          <img src={iiraLogo} alt="IIRA Sports Academy" className="h-11 w-auto object-contain rounded-lg" />
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-body text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
                location.pathname === l.to
                  ? "text-primary bg-primary/10"
                  : scrolled
                    ? "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                    : "text-[#ffffff]/70 hover:text-[#ffffff] hover:bg-[#ffffff]/5"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admissions" className="btn-primary-cta text-xs hidden md:inline-block !py-2.5 !px-6">
            ENROLL NOW
          </Link>
          <button onClick={() => setOpen(!open)} className={`lg:hidden p-2 rounded-xl transition-colors ${scrolled ? 'text-foreground hover:bg-foreground/10' : 'text-[#ffffff] hover:bg-[#ffffff]/10'}`} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-5 lg:hidden"
          >
            <button onClick={() => setOpen(false)} className="absolute top-5 right-5 text-foreground/60 hover:text-foreground">
              <X size={28} />
            </button>
            {links.map((l, i) => (
              <motion.div key={l.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Link to={l.to} className={`font-hero text-2xl tracking-wider ${location.pathname === l.to ? "text-primary" : "text-foreground/70 hover:text-foreground"}`}>
                  {l.label.toUpperCase()}
                </Link>
              </motion.div>
            ))}
            <Link to="/admissions" className="btn-primary-cta mt-4">ENROLL NOW</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
