export interface SiteData {
  themeMode: "light" | "dark" | "system";
  colorMode: "orange" | "blue" | "green" | "purple" | "red";
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    dark1: string;
    dark2: string;
    fontHeading: string;
    fontFormal: string;
    fontBody: string;
  };
  hero: {
    headline: string;
    subtext: string;
    cta1Text: string;
    cta2Text: string;
  };
  sports: Array<{
    id: string;
    name: string;
    category: "sports" | "performing-arts";
    image: string;
    ageGroup: string;
    timings: string;
    coach: string;
    fee: string;
    levels: string[];
    description: string;
  }>;
  gallery: Array<{
    id: string;
    src: string;
    category: string;
    caption: string;
  }>;
  news: Array<{
    id: string;
    title: string;
    date: string;
    excerpt: string;
  }>;
  events: Array<{
    id: string;
    title: string;
    date: string;
    description: string;
  }>;
  faculty: Array<{
    id: string;
    name: string;
    sport: string;
    image: string;
    bio: string;
    certifications: string[];
  }>;
  contact: {
    address: string;
    phone: string;
    whatsapp: string;
    email: string;
    hours: string;
  };
  admissions: {
    open: boolean;
    year: string;
  };
  achievements: Array<{
    id: string;
    title: string;
    student: string;
    sport: string;
    medal: "gold" | "silver" | "bronze";
    year: string;
    description: string;
  }>;
  testimonials: Array<{
    id: string;
    name: string;
    sport: string;
    rating: number;
    quote: string;
    role: string;
  }>;
  schedule: Array<{
    sport: string;
    color: string;
    morning: string;
    evening: string;
    days: string;
  }>;
  stats: Array<{
    value: string;
    label: string;
    suffix: string;
  }>;
  whyChoose: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  coaches: Array<{
    id: string;
    name: string;
    photo: string;
    teaches: string;
    description: string;
    masteryLevel: string;
  }>;
  inquiryDocuments: string[];
  
  // New 15 Accordion Sections
  whyChooseUs: {
    description: string;
    features: Array<{ id: string; title: string }>;
  };
  specialties: Array<{ id: string; icon: string; title: string; description: string }>;
  leadership: Array<{ id: string; name: string; role: string; photo: string; description: string }>;
  educators: Array<{ id: string; name: string; subject: string; photo: string; description: string }>;
  staff: Array<{ id: string; name: string; role: string; photo: string; description: string }>;
  blogs: Array<{ id: string; type: "Mentor" | "Educator" | "Student" | "Management"; title: string; description: string; link: string }>;
  resources: Array<{ id: string; title: string; file: string; description: string }>;
  faqs: Array<{ id: string; question: string; answer: string }>;
  socialMedia: Array<{ id: string; platform: "Facebook" | "Instagram" | "Twitter" | "LinkedIn" | "YouTube"; url: string }>;
}

const defaultData: SiteData = {
  themeMode: "system",
  colorMode: "orange",
  theme: {
    primary: "#E8651A",
    secondary: "#7B2D00",
    accent: "#C9891A",
    dark1: "#111111",
    dark2: "#1a1a1a",
    fontHeading: "Anton",
    fontFormal: "Playfair Display",
    fontBody: "Inter",
  },
  hero: {
    headline: "WHERE CHAMPIONS ARE MADE",
    subtext: "2 acres of world-class sports & performing arts training in Vadodara",
    cta1Text: "EXPLORE COURSES",
    cta2Text: "ENROLL NOW",
  },
  stats: [
    { value: "2", label: "Acres Campus", suffix: "+" },
    { value: "10", label: "Sports Programs", suffix: "+" },
    { value: "500", label: "Active Students", suffix: "+" },
    { value: "15", label: "Years Legacy", suffix: "+" },
  ],
  sports: [
    { id: "cricket", name: "Cricket", category: "sports", image: "", ageGroup: "6-18 yrs", timings: "6:00-8:00 AM / 4:00-6:00 PM", coach: "Coach Rajesh Patel", fee: "₹3,000-5,000/mo", levels: ["Beginner", "Intermediate", "Advanced"], description: "Professional cricket coaching with nets, bowling machines, and match practice." },
    { id: "football", name: "Football", category: "sports", image: "", ageGroup: "5-16 yrs", timings: "6:00-8:00 AM / 4:00-6:00 PM", coach: "Coach Amir Khan", fee: "₹2,500-4,500/mo", levels: ["Beginner", "Intermediate", "Advanced"], description: "FIFA-standard training on natural turf with tactical coaching." },
    { id: "karate", name: "Karate", category: "sports", image: "", ageGroup: "5-18 yrs", timings: "6:30-8:00 AM / 5:00-6:30 PM", coach: "Sensei Vikram Singh", fee: "₹2,000-4,000/mo", levels: ["White Belt", "Color Belt", "Black Belt"], description: "Traditional Shotokan karate with grading and tournament preparation." },
    { id: "dance", name: "Dance", category: "performing-arts", image: "", ageGroup: "4-18 yrs", timings: "4:00-5:30 PM", coach: "Guru Meera Sharma", fee: "₹2,500-4,000/mo", levels: ["Foundation", "Intermediate", "Performance"], description: "Classical, contemporary, and Bollywood dance forms with stage performances." },
    { id: "music", name: "Music", category: "performing-arts", image: "", ageGroup: "5-18 yrs", timings: "3:00-5:00 PM", coach: "Pandit Suresh Joshi", fee: "₹3,000-5,000/mo", levels: ["Beginner", "Intermediate", "Advanced"], description: "Vocal and instrumental training in classical and contemporary music." },
    { id: "theatre", name: "Theatre", category: "performing-arts", image: "", ageGroup: "6-18 yrs", timings: "4:00-6:00 PM", coach: "Director Priya Mehta", fee: "₹2,500-4,000/mo", levels: ["Foundation", "Intermediate", "Production"], description: "Acting, stagecraft, and public speaking with regular productions." },
    { id: "yoga", name: "Yoga & Wellness", category: "sports", image: "", ageGroup: "All Ages", timings: "6:00-7:30 AM", coach: "Yogi Anand Desai", fee: "₹1,500-3,000/mo", levels: ["Beginner", "Intermediate", "Advanced"], description: "Holistic yoga practice combining asanas, pranayama, and meditation." },
    { id: "athletics", name: "Athletics", category: "sports", image: "", ageGroup: "6-18 yrs", timings: "6:00-8:00 AM", coach: "Coach Neha Rathod", fee: "₹2,000-3,500/mo", levels: ["Beginner", "Competitive", "Elite"], description: "Track & field events with professional timing systems and coaching." },
    { id: "gymnastics", name: "Gymnastics", category: "sports", image: "", ageGroup: "4-14 yrs", timings: "4:00-6:00 PM", coach: "Coach Divya Patel", fee: "₹3,000-5,000/mo", levels: ["Beginner", "Intermediate", "Advanced"], description: "Artistic and rhythmic gymnastics with professional equipment." },
  ],
  gallery: [
    { id: "g1", src: "", category: "Cricket", caption: "Inter-school cricket tournament 2024" },
    { id: "g2", src: "", category: "Dance", caption: "Annual dance recital" },
    { id: "g3", src: "", category: "Events", caption: "Sports day celebration" },
    { id: "g4", src: "", category: "Football", caption: "Football league finals" },
    { id: "g5", src: "", category: "Cricket", caption: "Coaching session on natural turf" },
    { id: "g6", src: "", category: "Events", caption: "Award ceremony 2024" },
  ],
  news: [
    { id: "n1", title: "IIRA Students Win State Championship", date: "2024-12-15", excerpt: "Our cricket team secured gold at the Gujarat State Under-16 Championship." },
    { id: "n2", title: "New Dance Studio Inaugurated", date: "2024-11-20", excerpt: "State-of-the-art dance studio with sprung flooring now open." },
  ],
  events: [
    { id: "e1", title: "Annual Sports Day 2025", date: "2025-02-15", description: "A day of inter-house competitions across all sports." },
    { id: "e2", title: "Summer Camp 2025", date: "2025-04-01", description: "6-week intensive multi-sport summer camp for ages 5-16." },
  ],
  faculty: [
    { id: "f1", name: "Rajesh Patel", sport: "Cricket", image: "", bio: "Former Ranji Trophy player with 15+ years of coaching experience.", certifications: ["BCCI Level 3", "NCA Certified"] },
    { id: "f2", name: "Meera Sharma", sport: "Dance", image: "", bio: "Acclaimed Kathak dancer and choreographer with national recognition.", certifications: ["Visharad in Kathak", "NSD Workshop"] },
    { id: "f3", name: "Vikram Singh", sport: "Karate", image: "", bio: "5th Dan Black Belt with international tournament experience.", certifications: ["WKF Certified", "National Coach"] },
  ],
  contact: {
    address: "Plot 436, Vasna-Bhayli Canal Road, Bhayli, Vadodara, Gujarat 391410",
    phone: "+91 76003 60036",
    whatsapp: "+91 72111 31112",
    email: "admin@iira.co.in",
    hours: "Mon-Sat: 6:00 AM - 8:00 PM | Sun: 7:00 AM - 12:00 PM",
  },
  admissions: {
    open: true,
    year: "2025-26",
  },
  achievements: [
    { id: "a1", title: "Gujarat State Cricket Championship", student: "Arjun Mehta", sport: "Cricket", medal: "gold", year: "2024", description: "Under-16 state level championship winner" },
    { id: "a2", title: "National Karate Championship", student: "Priya Desai", sport: "Karate", medal: "silver", year: "2024", description: "Silver medal in Kata at national level" },
    { id: "a3", title: "Zonal Dance Competition", student: "Ananya Shah", sport: "Dance", medal: "gold", year: "2023", description: "Classical dance first prize at zonal level" },
    { id: "a4", title: "District Athletics Meet", student: "Rohan Patel", sport: "Athletics", medal: "bronze", year: "2024", description: "100m sprint bronze at district level" },
    { id: "a5", title: "Inter-School Football Tournament", student: "Karthik Nair", sport: "Football", medal: "gold", year: "2024", description: "Best goalkeeper award and tournament winners" },
  ],
  testimonials: [
    { id: "t1", name: "Rakesh Sharma", sport: "Cricket Parent", rating: 5, quote: "My son's transformation in just 6 months has been incredible. The coaches genuinely care about each child's development.", role: "Parent" },
    { id: "t2", name: "Anita Desai", sport: "Dance Student", rating: 5, quote: "IIRA gave me the stage and confidence to pursue my passion. The natural campus makes every practice session refreshing.", role: "Student" },
    { id: "t3", name: "Vikram Joshi", sport: "Karate Parent", rating: 5, quote: "The discipline and respect our daughter has learned through karate at IIRA goes far beyond the sport itself.", role: "Parent" },
  ],
  schedule: [
    { sport: "Cricket", color: "#E8651A", morning: "6:00-8:00", evening: "4:00-6:00", days: "Mon-Sat" },
    { sport: "Football", color: "#4CAF50", morning: "6:00-8:00", evening: "4:00-6:00", days: "Mon-Fri" },
    { sport: "Karate", color: "#F44336", morning: "6:30-8:00", evening: "5:00-6:30", days: "Mon-Wed-Fri" },
    { sport: "Dance", color: "#9C27B0", morning: "—", evening: "4:00-5:30", days: "Tue-Thu-Sat" },
    { sport: "Music", color: "#2196F3", morning: "—", evening: "3:00-5:00", days: "Mon-Wed-Sat" },
    { sport: "Theatre", color: "#FF9800", morning: "—", evening: "4:00-6:00", days: "Tue-Thu" },
    { sport: "Yoga", color: "#00BCD4", morning: "6:00-7:30", evening: "—", days: "Mon-Sat" },
    { sport: "Athletics", color: "#795548", morning: "6:00-8:00", evening: "—", days: "Mon-Sat" },
    { sport: "Gymnastics", color: "#E91E63", morning: "—", evening: "4:00-6:00", days: "Mon-Wed-Fri" },
  ],
  whyChoose: [
    { icon: "🌿", title: "Natural 2-Acre Environment", description: "Train amidst lush greenery, fresh air, and open skies — far from concrete jungles." },
    { icon: "🏅", title: "Expert Certified Coaches", description: "National and international level coaches with proven track records." },
    { icon: "📚", title: "CBSE School Integration", description: "Seamlessly balanced with IIRA International School academics." },
    { icon: "🧠", title: "Holistic Development", description: "Body, mind, and soul — we develop the complete athlete and artist." },
    { icon: "⏰", title: "Flexible Batch Timings", description: "Morning and evening batches designed around school schedules." },
    { icon: "💰", title: "Affordable Fee Structure", description: "Quality training accessible to every aspiring champion." },
  ],
  coaches: [
    { id: "c1", name: "Rajesh Patel", photo: "", teaches: "Cricket", description: "Former Ranji Trophy player with 15+ years of coaching experience. Specializes in batting technique and match strategy.", masteryLevel: "National Level" },
    { id: "c2", name: "Meera Sharma", photo: "", teaches: "Dance", description: "Acclaimed Kathak dancer and choreographer with national recognition in classical and contemporary dance.", masteryLevel: "Visharad" },
    { id: "c3", name: "Vikram Singh", photo: "", teaches: "Karate", description: "5th Dan Black Belt with international tournament experience and WKF certification.", masteryLevel: "5th Dan Black Belt" },
  ],
  inquiryDocuments: [
    "Birth certificate or age proof",
    "2 passport-size photos",
    "Medical fitness certificate",
    "Previous sports certificates (if any)",
    "Aadhaar card copy",
  ],
  whyChooseUs: {
    description: "We provide holistic development for every student with top-tier facilities.",
    features: [{ id: "f1", title: "Expert Coaching" }, { id: "f2", title: "Natural Environment" }]
  },
  specialties: [],
  leadership: [],
  educators: [],
  staff: [
    { id: "s1", name: "Rajesh Patel", photo: "", role: "Head Coach - Cricket", description: "Former Ranji Trophy player with 15+ years of coaching experience. Specializes in batting technique and match strategy." },
    { id: "s2", name: "Meera Sharma", photo: "", role: "Chief Instructor - Dance", description: "Acclaimed Kathak dancer and choreographer with national recognition in classical and contemporary dance." },
    { id: "s3", name: "Vikram Singh", photo: "", role: "Senior Instructor - Karate", description: "5th Dan Black Belt with international tournament experience and WKF certification." },
  ],
  blogs: [],
  resources: [],
  faqs: [],
  socialMedia: [],
};

const STORAGE_KEY = "siteData";

export function getSiteData(): SiteData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultData, ...parsed };
    }
  } catch {}
  return defaultData;
}

export function updateSiteData(partial: Partial<SiteData>) {
  const current = getSiteData();
  const updated = { ...current, ...partial };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("siteDataChanged"));
    }
  } catch (e: any) {
    if (e.name === "QuotaExceededError" || e.code === 22) {
      alert("Storage limit reached (max 5MB browser limit). Please remove some images before adding new ones!");
    }
  }
  return updated;
}

export { defaultData };
