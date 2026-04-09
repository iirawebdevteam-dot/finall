import { useState } from "react";
import { getSiteData, updateSiteData, SiteData } from "@/lib/siteData";
import { Save, Plus, Trash2, ArrowLeft, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTheme } from "@/components/ThemeProvider";

export default function AdminPage() {
  const [data, setData] = useState<SiteData>(getSiteData());
  const { theme, color, setTheme, setColor } = useTheme();

  const save = (partial: Partial<SiteData>) => {
    const updated = updateSiteData(partial);
    setData(updated);
    toast.success("Changes saved!");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-white/50 hover:text-primary transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2">
              <LayoutDashboard size={20} className="text-primary" />
              <h1 className="font-hero text-xl text-primary tracking-wider">ADMIN PANEL</h1>
            </div>
          </div>
          <Link to="/" className="text-white/40 text-sm font-body hover:text-white transition-colors">View Site →</Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Accordion type="single" collapsible className="space-y-4">
          
          {/* THEME & APPEARANCE */}
          <AccordionItem value="theme" className="liquid-glass border-none rounded-xl overflow-hidden px-2">
            <AccordionTrigger className="px-4 hover:no-underline hover:text-primary transition-colors">Theme & Appearance</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs text-white/50 mb-2 uppercase">Color Palette</label>
                  <div className="flex gap-3">
                    {["orange", "blue", "green", "purple", "red"].map(c => (
                      <button key={c} onClick={() => { setColor(c as any); updateSiteData({ colorMode: c as any }); }}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${color === c ? 'border-white scale-110' : 'border-transparent hover:scale-105'}`}
                        style={{ background: c === 'orange' ? '#e8651a' : c === 'blue' ? '#2563eb' : c === 'green' ? '#16a34a' : c === 'purple' ? '#9333ea' : '#e11d48' }} />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-2 uppercase">Interface Mode</label>
                  <div className="flex gap-2 bg-white/5 p-1 rounded-lg w-fit">
                    {["light", "dark", "system"].map(m => (
                      <button key={m} onClick={() => { setTheme(m as any); updateSiteData({ themeMode: m as any }); }}
                        className={`px-4 py-2 rounded-md text-sm capitalize transition-colors ${theme === m ? 'bg-primary text-white' : 'text-white/50 hover:text-white'}`}>
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 1. HOME */}
          <AccordionItem value="home" className="liquid-glass border-none rounded-xl overflow-hidden px-2">
            <AccordionTrigger className="px-4 hover:no-underline hover:text-primary">1. Home</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <HomeManager data={data} onSave={save} />
            </AccordionContent>
          </AccordionItem>

          {/* 2. WHY CHOOSE US */}
          <AccordionItem value="why-choose-us" className="liquid-glass border-none rounded-xl overflow-hidden px-2">
            <AccordionTrigger className="px-4 hover:no-underline hover:text-primary">2. Why Choose Us</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <WhyChooseUsManager data={data} onSave={save} />
            </AccordionContent>
          </AccordionItem>

          {/* 3. SPECIALTIES */}
          <AccordionItem value="specialties" className="liquid-glass border-none rounded-xl overflow-hidden px-2">
            <AccordionTrigger className="px-4 hover:no-underline hover:text-primary">3. Specialties</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SpecialtiesManager data={data} onSave={save} />
            </AccordionContent>
          </AccordionItem>

          {/* 4. ACHIEVEMENTS */}
          <AccordionItem value="achievements" className="liquid-glass border-none rounded-xl overflow-hidden px-2">
            <AccordionTrigger className="px-4 hover:no-underline hover:text-primary">4. Achievements</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <AchievementsManager data={data} onSave={save} />
            </AccordionContent>
          </AccordionItem>

          {/* 5. EVENTS */}
          <AccordionItem value="events" className="liquid-glass border-none rounded-xl overflow-hidden px-2">
            <AccordionTrigger className="px-4 hover:no-underline hover:text-primary">5. Events</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <EventsManager data={data} onSave={save} />
            </AccordionContent>
          </AccordionItem>

          {/* 6. LEADERSHIP */}
          <AccordionItem value="leadership" className="liquid-glass border-none rounded-xl overflow-hidden px-2">
            <AccordionTrigger className="px-4 hover:no-underline hover:text-primary">6. Leadership</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <LeadershipManager data={data} onSave={save} />
            </AccordionContent>
          </AccordionItem>

          {/* 7. EDUCATORS */}
          <AccordionItem value="educators" className="liquid-glass border-none rounded-xl overflow-hidden px-2">
            <AccordionTrigger className="px-4 hover:no-underline hover:text-primary">7. Educators</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <EducatorsManager data={data} onSave={save} />
            </AccordionContent>
          </AccordionItem>

          {/* 8. GALLERY */}
          <AccordionItem value="gallery" className="liquid-glass border-none rounded-xl overflow-hidden px-2">
            <AccordionTrigger className="px-4 hover:no-underline hover:text-primary">8. Gallery</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <GalleryManager data={data} onSave={save} />
            </AccordionContent>
          </AccordionItem>

          {/* 9. TESTIMONIALS */}
          <AccordionItem value="testimonials" className="liquid-glass border-none rounded-xl overflow-hidden px-2">
            <AccordionTrigger className="px-4 hover:no-underline hover:text-primary">9. Testimonials</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <TestimonialsManager data={data} onSave={save} />
            </AccordionContent>
          </AccordionItem>

          {/* 10. BLOGS */}
          <AccordionItem value="blogs" className="liquid-glass border-none rounded-xl overflow-hidden px-2">
            <AccordionTrigger className="px-4 hover:no-underline hover:text-primary">10. Blogs</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <BlogsManager data={data} onSave={save} />
            </AccordionContent>
          </AccordionItem>

          {/* 11. ADMISSIONS */}
          <AccordionItem value="admissions" className="liquid-glass border-none rounded-xl overflow-hidden px-2">
            <AccordionTrigger className="px-4 hover:no-underline hover:text-primary">11. Admissions</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <AdmissionsManager data={data} onSave={save} />
            </AccordionContent>
          </AccordionItem>

          {/* 12. RESOURCES */}
          <AccordionItem value="resources" className="liquid-glass border-none rounded-xl overflow-hidden px-2">
            <AccordionTrigger className="px-4 hover:no-underline hover:text-primary">12. Resources</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <ResourcesManager data={data} onSave={save} />
            </AccordionContent>
          </AccordionItem>

          {/* 13. FAQ */}
          <AccordionItem value="faq" className="liquid-glass border-none rounded-xl overflow-hidden px-2">
            <AccordionTrigger className="px-4 hover:no-underline hover:text-primary">13. FAQ</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <FaqsManager data={data} onSave={save} />
            </AccordionContent>
          </AccordionItem>

          {/* 14. CONTACT */}
          <AccordionItem value="contact" className="liquid-glass border-none rounded-xl overflow-hidden px-2">
            <AccordionTrigger className="px-4 hover:no-underline hover:text-primary">14. Contact</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <ContactManager data={data} onSave={save} />
            </AccordionContent>
          </AccordionItem>

          {/* 15. SOCIAL MEDIA */}
          <AccordionItem value="social-media" className="liquid-glass border-none rounded-xl overflow-hidden px-2">
            <AccordionTrigger className="px-4 hover:no-underline hover:text-primary">15. Social Media</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <SocialMediaManager data={data} onSave={save} />
            </AccordionContent>
          </AccordionItem>

          {/* 16. OUR STAFF */}
          <AccordionItem value="our-staff" className="liquid-glass border-none rounded-xl overflow-hidden px-2">
            <AccordionTrigger className="px-4 hover:no-underline hover:text-primary">16. Our Staff</AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <StaffManager data={data} onSave={save} />
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// REUSABLE COMPONENTS
// ─────────────────────────────────────────────────────────────

function AdminInput({ label, value, onChange, type = "text", placeholder = "" }: any) {
  return (
    <div>
      <label className="block text-xs font-body text-white/50 mb-1">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-body text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
    </div>
  );
}

function AdminTextarea({ label, value, onChange, placeholder = "" }: any) {
  return (
    <div>
      <label className="block text-xs font-body text-white/50 mb-1">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3}
        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-body text-sm focus:ring-1 focus:ring-primary outline-none resize-y" />
    </div>
  );
}

function AdminSelect({ label, value, onChange, options }: any) {
  return (
    <div>
      <label className="block text-xs font-body text-white/50 mb-1">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-body text-sm focus:ring-1 focus:ring-primary outline-none">
        {options.map((o: any) => <option key={o.value} value={o.value} className="bg-background text-foreground">{o.label}</option>)}
      </select>
    </div>
  );
}

function ImageUpload({ src, fieldLabel, onUpload, onRemove }: any) {
  return (
    <div>
      <label className="block text-xs font-body text-white/50 mb-1">{fieldLabel}</label>
      <div className="flex items-center gap-3">
        {src && (
          <div className="relative w-16 h-16 rounded overflow-hidden border border-white/10 shrink-0">
            <img src={src} alt="" className="w-full h-full object-cover" />
            <button onClick={onRemove} className="absolute top-0 right-0 bg-black/60 rounded-full p-0.5 text-red-400 hover:text-red-300"><Trash2 size={12} /></button>
          </div>
        )}
        <label className="flex-1 cursor-pointer">
          <div className="px-3 py-2 rounded bg-white/5 border border-dashed border-white/20 text-center hover:bg-white/10 text-xs text-white/50">
            {src ? "Change" : "Upload Image"}
          </div>
          <input type="file" accept="image/*" className="hidden" onChange={e => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => onUpload(reader.result as string);
            reader.readAsDataURL(file);
          }} />
        </label>
      </div>
    </div>
  );
}

function FileUpload({ fileUrl, fieldLabel, onUpload, onRemove }: any) {
  return (
    <div>
      <label className="block text-xs font-body text-white/50 mb-1">{fieldLabel}</label>
      <div className="flex items-center gap-3">
        {fileUrl && (
          <div className="px-3 py-2 rounded bg-primary/20 text-primary text-xs flex items-center gap-2">
            Uploaded <button onClick={onRemove}><Trash2 size={12} /></button>
          </div>
        )}
        <label className="flex-1 cursor-pointer">
          <div className="px-3 py-2 rounded bg-white/5 border border-dashed border-white/20 text-center hover:bg-white/10 text-xs text-white/50">
            {fileUrl ? "Change File (PDF/DOC)" : "Upload PDF/DOC"}
          </div>
          <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => {
            const file = e.target.files?.[0];
            if (!file) return;
            // Fake upload using DataURL for prototyping
            const reader = new FileReader();
            reader.onload = () => onUpload(reader.result as string);
            reader.readAsDataURL(file);
          }} />
        </label>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 1. HOME MANAGER
// ─────────────────────────────────────────────────────────────
function HomeManager({ data, onSave }: any) {
  const [hero, setHero] = useState(data.hero);
  const [stats, setStats] = useState(data.stats);

  const updateStat = (i: number, f: string, v: string) => {
    const nw = [...stats]; nw[i][f] = v; setStats(nw);
  };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <AdminInput label="Headline" value={hero.headline} onChange={(v: string) => setHero({ ...hero, headline: v })} />
        <AdminInput label="Tagline / Subtext" value={hero.subtext} onChange={(v: string) => setHero({ ...hero, subtext: v })} />
      </div>
      <div>
        <h3 className="text-sm border-b border-white/10 pb-2 mb-3">4 Stat Blocks</h3>
        <div className="grid sm:grid-cols-4 gap-4">
          {stats.slice(0, 4).map((s: any, i: number) => (
            <div key={i} className="p-3 bg-white/5 rounded space-y-2">
              <AdminInput label={`Stat ${i+1} Value`} value={s.value} onChange={(v: string) => updateStat(i, 'value', v)} />
              <AdminInput label="Label" value={s.label} onChange={(v: string) => updateStat(i, 'label', v)} />
              <AdminInput label="Suffix" value={s.suffix} onChange={(v: string) => updateStat(i, 'suffix', v)} />
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => onSave({ hero, stats })} className="btn-primary-cta !py-2 !px-4 text-xs">Save Home Section</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. WHY CHOOSE US
// ─────────────────────────────────────────────────────────────
function WhyChooseUsManager({ data, onSave }: any) {
  const [sec, setSec] = useState(data.whyChooseUs || { description: "", features: [] });

  const add = () => setSec({ ...sec, features: [...sec.features, { id: Date.now().toString(), title: "New Feature" }] });
  const updateF = (i: number, v: string) => { const f = [...sec.features]; f[i].title = v; setSec({ ...sec, features: f }); };
  const removeF = (i: number) => { setSec({ ...sec, features: sec.features.filter((_: any, idx: number) => idx !== i) }); };

  return (
    <div className="space-y-4">
      <AdminTextarea label="Description" value={sec.description} onChange={(v: string) => setSec({ ...sec, description: v })} />
      <div className="space-y-2">
        {sec.features.map((f: any, i: number) => (
          <div key={f.id} className="flex items-center gap-2">
            <AdminInput value={f.title} onChange={(v: string) => updateF(i, v)} />
            <button onClick={() => removeF(i)} className="text-red-400 mt-5 bg-white/5 p-2 rounded hover:bg-white/10"><Trash2 size={16}/></button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 pt-2">
        <button onClick={add} className="bg-white/5 px-4 py-2 rounded text-xs flex items-center gap-1"><Plus size={14}/> Add Feature</button>
        <button onClick={() => onSave({ whyChooseUs: sec })} className="btn-primary-cta !py-2 !px-4 text-xs">Save Why Choose Us</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. SPECIALTIES
// ─────────────────────────────────────────────────────────────
function SpecialtiesManager({ data, onSave }: any) {
  const [items, setItems] = useState(data.specialties || []);
  const add = () => setItems([...items, { id: Date.now().toString(), icon: "🌟", title: "New", description: "Desc" }]);
  const update = (i: number, f: string, v: string) => { const nw = [...items]; nw[i][f] = v; setItems(nw); };
  const remove = (i: number) => setItems(items.filter((_: any, idx: number) => idx !== i));

  return (
    <div className="space-y-4">
      {items.map((it: any, i: number) => (
        <div key={it.id} className="p-4 bg-white/5 rounded grid grid-cols-12 gap-3 relative pr-10">
          <div className="col-span-2"><AdminInput label="Emoji Icon" value={it.icon} onChange={(v: string) => update(i, 'icon', v)} /></div>
          <div className="col-span-4"><AdminInput label="Title" value={it.title} onChange={(v: string) => update(i, 'title', v)} /></div>
          <div className="col-span-6"><AdminInput label="Description" value={it.description} onChange={(v: string) => update(i, 'description', v)} /></div>
          <button onClick={() => remove(i)} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-300"><Trash2 size={16}/></button>
        </div>
      ))}
      <div className="flex gap-2">
        <button onClick={add} className="bg-white/5 px-4 py-2 rounded text-xs flex items-center gap-1"><Plus size={14}/> Add Specialty</button>
        <button onClick={() => onSave({ specialties: items })} className="btn-primary-cta !py-2 !px-4 text-xs">Save Specialties</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. ACHIEVEMENTS
// ─────────────────────────────────────────────────────────────
function AchievementsManager({ data, onSave }: any) {
  const [items, setItems] = useState(data.achievements || []);
  const add = () => setItems([...items, { id: Date.now().toString(), year: "2024", title: "New", description: "Desc", medal: "gold", student: "Name", sport: "Sport" }]);
  const update = (i: number, f: string, v: string) => { const nw = [...items]; nw[i][f] = v; setItems(nw); };
  const remove = (i: number) => setItems(items.filter((_: any, idx: number) => idx !== i));

  return (
    <div className="space-y-4">
      {items.map((it: any, i: number) => (
        <div key={it.id} className="p-4 bg-white/5 rounded grid grid-cols-12 gap-3 relative pr-10">
          <div className="col-span-2"><AdminInput label="Year" value={it.year} onChange={(v: string) => update(i, 'year', v)} /></div>
          <div className="col-span-2"><AdminSelect label="Icon" value={it.medal} onChange={(v: string) => update(i, 'medal', v)} options={[{value:'gold', label:'🥇 Gold'}, {value:'silver',label:'🥈 Silver'}, {value:'bronze',label:'🥉 Bronze'}]} /></div>
          <div className="col-span-4"><AdminInput label="Title" value={it.title} onChange={(v: string) => update(i, 'title', v)} /></div>
          <div className="col-span-4"><AdminInput label="Description" value={it.description} onChange={(v: string) => update(i, 'description', v)} /></div>
          <button onClick={() => remove(i)} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-300"><Trash2 size={16}/></button>
        </div>
      ))}
      <div className="flex gap-2">
        <button onClick={add} className="bg-white/5 px-4 py-2 rounded text-xs flex items-center gap-1"><Plus size={14}/> Add Achievement</button>
        <button onClick={() => onSave({ achievements: items })} className="btn-primary-cta !py-2 !px-4 text-xs">Save Achivements</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. EVENTS
// ─────────────────────────────────────────────────────────────
function EventsManager({ data, onSave }: any) {
  const [events, setEvents] = useState(data.events || []);
  const add = () => setEvents([...events, { id: `e-${Date.now()}`, title: "New Event", date: new Date().toISOString().split("T")[0], description: "Desc" }]);
  const update = (i: number, f: string, v: string) => { const nw = [...events]; nw[i][f] = v; setEvents(nw); };
  const remove = (i: number) => setEvents(events.filter((_: any, idx: number) => idx !== i));

  return (
    <div className="space-y-4">
      {events.map((ev: any, i: number) => (
        <div key={ev.id} className="p-4 bg-white/5 rounded grid sm:grid-cols-4 gap-3 relative pr-10">
          <div className="col-span-1"><AdminInput type="date" label="Date" value={ev.date} onChange={(v: string) => update(i, 'date', v)} /></div>
          <div className="col-span-1"><AdminInput label="Title" value={ev.title} onChange={(v: string) => update(i, 'title', v)} /></div>
          <div className="col-span-2"><AdminInput label="Description" value={ev.description} onChange={(v: string) => update(i, 'description', v)} /></div>
          <button onClick={() => remove(i)} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-300"><Trash2 size={16}/></button>
        </div>
      ))}
      <div className="flex gap-2">
        <button onClick={add} className="bg-white/5 px-4 py-2 rounded text-xs flex items-center gap-1"><Plus size={14}/> Add Event</button>
        <button onClick={() => onSave({ events })} className="btn-primary-cta !py-2 !px-4 text-xs">Save Events</button>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────
// 6. LEADERSHIP
// ─────────────────────────────────────────────────────────────
function LeadershipManager({ data, onSave }: any) {
  const [items, setItems] = useState(data.leadership || []);
  const add = () => setItems([...items, { id: Date.now().toString(), name: "Name", role: "Role", photo: "", description: "Desc" }]);
  const update = (i: number, f: string, v: string) => { const nw = [...items]; nw[i][f] = v; setItems(nw); };
  const remove = (i: number) => setItems(items.filter((_: any, idx: number) => idx !== i));

  return (
    <div className="space-y-4">
      {items.map((it: any, i: number) => (
        <div key={it.id} className="p-4 bg-white/5 rounded flex gap-4 relative pr-10">
          <div className="w-1/4"><ImageUpload src={it.photo} fieldLabel="Photo" onUpload={(v:string) => update(i,'photo',v)} onRemove={() => update(i,'photo','')} /></div>
          <div className="w-3/4 grid grid-cols-2 gap-3">
            <AdminInput label="Name" value={it.name} onChange={(v: string) => update(i, 'name', v)} />
            <AdminInput label="Role" value={it.role} onChange={(v: string) => update(i, 'role', v)} />
            <div className="col-span-2"><AdminTextarea label="Description" value={it.description} onChange={(v: string) => update(i, 'description', v)} /></div>
          </div>
          <button onClick={() => remove(i)} className="absolute right-3 top-4 text-red-400 hover:text-red-300"><Trash2 size={16}/></button>
        </div>
      ))}
      <div className="flex gap-2">
        <button onClick={add} className="bg-white/5 px-4 py-2 rounded text-xs flex items-center gap-1"><Plus size={14}/> Add Leader</button>
        <button onClick={() => onSave({ leadership: items })} className="btn-primary-cta !py-2 !px-4 text-xs">Save Leadership</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 7. EDUCATORS
// ─────────────────────────────────────────────────────────────
function EducatorsManager({ data, onSave }: any) {
  const [items, setItems] = useState(data.educators || []);
  const add = () => setItems([...items, { id: Date.now().toString(), name: "Name", subject: "Subject", photo: "", description: "Desc" }]);
  const update = (i: number, f: string, v: string) => { const nw = [...items]; nw[i][f] = v; setItems(nw); };
  const remove = (i: number) => setItems(items.filter((_: any, idx: number) => idx !== i));

  return (
    <div className="space-y-4">
      {items.map((it: any, i: number) => (
        <div key={it.id} className="p-4 bg-white/5 rounded flex gap-4 relative pr-10">
          <div className="w-1/4"><ImageUpload src={it.photo} fieldLabel="Photo" onUpload={(v:string) => update(i,'photo',v)} onRemove={() => update(i,'photo','')} /></div>
          <div className="w-3/4 grid grid-cols-2 gap-3">
            <AdminInput label="Name" value={it.name} onChange={(v: string) => update(i, 'name', v)} />
            <AdminInput label="Subject" value={it.subject} onChange={(v: string) => update(i, 'subject', v)} />
            <div className="col-span-2"><AdminTextarea label="Description" value={it.description} onChange={(v: string) => update(i, 'description', v)} /></div>
          </div>
          <button onClick={() => remove(i)} className="absolute right-3 top-4 text-red-400 hover:text-red-300"><Trash2 size={16}/></button>
        </div>
      ))}
      <div className="flex gap-2">
        <button onClick={add} className="bg-white/5 px-4 py-2 rounded text-xs flex items-center gap-1"><Plus size={14}/> Add Educator</button>
        <button onClick={() => onSave({ educators: items })} className="btn-primary-cta !py-2 !px-4 text-xs">Save Educators</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 8. GALLERY
// ─────────────────────────────────────────────────────────────
function GalleryManager({ data, onSave }: any) {
  const [items, setItems] = useState(data.gallery || []);
  const add = () => setItems([...items, { id: Date.now().toString(), src: "", category: "General", caption: "Caption", visible: true }]);
  const update = (i: number, f: string, v: any) => { const nw = [...items]; nw[i][f] = v; setItems(nw); };
  const remove = (i: number) => setItems(items.filter((_: any, idx: number) => idx !== i));

  return (
    <div className="space-y-4">
      {items.map((it: any, i: number) => (
        <div key={it.id} className="p-4 bg-white/5 rounded grid grid-cols-12 gap-4 relative pr-10 items-center">
          <div className="col-span-3"><ImageUpload src={it.src} fieldLabel="Image" onUpload={(v:string) => update(i,'src',v)} onRemove={() => update(i,'src','')} /></div>
          <div className="col-span-3"><AdminInput label="Caption" value={it.caption} onChange={(v: string) => update(i, 'caption', v)} /></div>
          <div className="col-span-3">
            <label className="block text-xs font-body text-white/50 mb-1">Visibility</label>
            <label className="flex items-center gap-2 cursor-pointer mt-2">
              <input type="checkbox" checked={it.visible !== false} onChange={e => update(i,'visible', e.target.checked)} className="rounded" />
              <span className="text-sm">Visible</span>
            </label>
          </div>
          <button onClick={() => remove(i)} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-300"><Trash2 size={16}/></button>
        </div>
      ))}
      <div className="flex gap-2">
        <button onClick={add} className="bg-white/5 px-4 py-2 rounded text-xs flex items-center gap-1"><Plus size={14}/> Add Photo</button>
        <button onClick={() => onSave({ gallery: items })} className="btn-primary-cta !py-2 !px-4 text-xs">Save Gallery</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 9. TESTIMONIALS
// ─────────────────────────────────────────────────────────────
function TestimonialsManager({ data, onSave }: any) {
  const [items, setItems] = useState(data.testimonials || []);
  const add = () => setItems([...items, { id: Date.now().toString(), name: "Name", quote: "Quote", role: "Role", position: "center" }]);
  const update = (i: number, f: string, v: any) => { const nw = [...items]; nw[i][f] = v; setItems(nw); };
  const remove = (i: number) => setItems(items.filter((_: any, idx: number) => idx !== i));

  return (
    <div className="space-y-4">
      {items.map((it: any, i: number) => (
        <div key={it.id} className="p-4 bg-white/5 rounded flex gap-4 relative pr-10">
          <div className="w-1/4">
            <ImageUpload src={it.photo} fieldLabel="Photo" onUpload={(v:string) => update(i,'photo',v)} onRemove={() => update(i,'photo','')} />
            <div className="mt-2 text-xs text-white/50">Position</div>
            <select value={it.position || "center"} onChange={e => update(i, 'position', e.target.value)} className="w-full mt-1 bg-white/5 rounded px-2 py-1 text-sm outline-none">
              <option value="top">Top</option><option value="center">Center</option><option value="bottom">Bottom</option>
            </select>
          </div>
          <div className="w-3/4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <AdminInput label="Name" value={it.name} onChange={(v: string) => update(i, 'name', v)} />
              <AdminInput label="Role" value={it.role} onChange={(v: string) => update(i, 'role', v)} />
            </div>
            <AdminTextarea label="Quote" value={it.quote} onChange={(v: string) => update(i, 'quote', v)} />
          </div>
          <button onClick={() => remove(i)} className="absolute right-3 top-4 text-red-400"><Trash2 size={16}/></button>
        </div>
      ))}
      <div className="flex gap-2">
        <button onClick={add} className="bg-white/5 px-4 py-2 rounded text-xs flex items-center gap-1"><Plus size={14}/> Add Testimonial</button>
        <button onClick={() => onSave({ testimonials: items })} className="btn-primary-cta !py-2 !px-4 text-xs">Save Testimonials</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 10. BLOGS
// ─────────────────────────────────────────────────────────────
function BlogsManager({ data, onSave }: any) {
  const [items, setItems] = useState(data.blogs || []);
  const add = () => setItems([...items, { id: Date.now().toString(), type: "Management", title: "Reflections", description: "...", link: "https://" }]);
  const update = (i: number, f: string, v: string) => { const nw = [...items]; nw[i][f] = v; setItems(nw); };
  const remove = (i: number) => setItems(items.filter((_: any, idx: number) => idx !== i));

  return (
    <div className="space-y-4">
      {items.map((it: any, i: number) => (
        <div key={it.id} className="p-4 bg-white/5 rounded grid sm:grid-cols-4 gap-3 relative pr-10">
          <div className="col-span-1"><AdminSelect label="Type" value={it.type} onChange={(v:string)=>update(i,'type',v)} options={[{value:'Mentor',label:'Mentor'},{value:'Educator',label:'Educator'},{value:'Student',label:'Student'},{value:'Management',label:'Management'}]}/></div>
          <div className="col-span-1"><AdminInput label="Title" value={it.title} onChange={(v: string) => update(i, 'title', v)} /></div>
          <div className="col-span-1"><AdminInput label="Link" value={it.link} onChange={(v: string) => update(i, 'link', v)} /></div>
          <div className="col-span-4"><AdminTextarea label="Description" value={it.description} onChange={(v: string) => update(i, 'description', v)} /></div>
          <button onClick={() => remove(i)} className="absolute right-3 top-4 text-red-400 hover:text-red-300"><Trash2 size={16}/></button>
        </div>
      ))}
      <div className="flex gap-2">
        <button onClick={add} className="bg-white/5 px-4 py-2 rounded text-xs flex items-center gap-1"><Plus size={14}/> Add Blog</button>
        <button onClick={() => onSave({ blogs: items })} className="btn-primary-cta !py-2 !px-4 text-xs">Save Blogs</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 11. ADMISSIONS
// ─────────────────────────────────────────────────────────────
function AdmissionsManager({ data, onSave }: any) {
  const [adm, setAdm] = useState(data.admissions || { year: "2025-26", open: true, title: "Apply Now", description: "Join us", link: "https://" });

  return (
    <div className="space-y-4 grid grid-cols-2 gap-4">
      <div className="col-span-2 sm:col-span-1"><AdminInput label="Year Label" value={adm.year} onChange={(v: string) => setAdm({...adm, year:v})} /></div>
      <div className="col-span-2 sm:col-span-1">
        <label className="block text-xs font-body text-white/50 mb-1">Status</label>
        <label className="flex items-center gap-2 cursor-pointer mt-2 text-sm">
          <input type="checkbox" checked={adm.open} onChange={e => setAdm({...adm, open:e.target.checked})} className="rounded" /> Admissions Open
        </label>
      </div>
      <div className="col-span-2 sm:col-span-1"><AdminInput label="Title" value={adm.title} onChange={(v: string) => setAdm({...adm, title:v})} /></div>
      <div className="col-span-2 sm:col-span-1"><AdminInput label="Apply Link" value={adm.link} onChange={(v: string) => setAdm({...adm, link:v})} /></div>
      <div className="col-span-2"><AdminTextarea label="Description" value={adm.description} onChange={(v: string) => setAdm({...adm, description:v})} /></div>
      <div className="col-span-2">
        <button onClick={() => onSave({ admissions: adm })} className="btn-primary-cta !py-2 !px-4 text-xs">Save Admissions Info</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 12. RESOURCES
// ─────────────────────────────────────────────────────────────
function ResourcesManager({ data, onSave }: any) {
  const [items, setItems] = useState(data.resources || []);
  const add = () => setItems([...items, { id: Date.now().toString(), title: "Title", file: "", description: "Desc" }]);
  const update = (i: number, f: string, v: string) => { const nw = [...items]; nw[i][f] = v; setItems(nw); };
  const remove = (i: number) => setItems(items.filter((_: any, idx: number) => idx !== i));

  return (
    <div className="space-y-4">
      {items.map((it: any, i: number) => (
        <div key={it.id} className="p-4 bg-white/5 rounded grid sm:grid-cols-2 gap-3 relative pr-10">
          <div><AdminInput label="Title" value={it.title} onChange={(v: string) => update(i, 'title', v)} /></div>
          <div><FileUpload fileUrl={it.file} fieldLabel="Resource File" onUpload={(v:string) => update(i,'file',v)} onRemove={() => update(i,'file','')} /></div>
          <div className="col-span-2"><AdminTextarea label="Description" value={it.description} onChange={(v: string) => update(i, 'description', v)} /></div>
          <button onClick={() => remove(i)} className="absolute right-3 top-4 text-red-400 hover:text-red-300"><Trash2 size={16}/></button>
        </div>
      ))}
      <div className="flex gap-2">
        <button onClick={add} className="bg-white/5 px-4 py-2 rounded text-xs flex items-center gap-1"><Plus size={14}/> Add Resource</button>
        <button onClick={() => onSave({ resources: items })} className="btn-primary-cta !py-2 !px-4 text-xs">Save</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 13. FAQ
// ─────────────────────────────────────────────────────────────
function FaqsManager({ data, onSave }: any) {
  const [items, setItems] = useState(data.faqs || []);
  const add = () => setItems([...items, { id: Date.now().toString(), question: "Q?", answer: "A." }]);
  const update = (i: number, f: string, v: string) => { const nw = [...items]; nw[i][f] = v; setItems(nw); };
  const remove = (i: number) => setItems(items.filter((_: any, idx: number) => idx !== i));

  return (
    <div className="space-y-4">
      {items.map((it: any, i: number) => (
        <div key={it.id} className="p-4 bg-white/5 rounded space-y-3 relative pr-10">
          <AdminInput label="Question" value={it.question} onChange={(v: string) => update(i, 'question', v)} />
          <AdminTextarea label="Answer" value={it.answer} onChange={(v: string) => update(i, 'answer', v)} />
          <button onClick={() => remove(i)} className="absolute right-3 top-4 text-red-400 hover:text-red-300"><Trash2 size={16}/></button>
        </div>
      ))}
      <div className="flex gap-2">
        <button onClick={add} className="bg-white/5 px-4 py-2 rounded text-xs flex items-center gap-1"><Plus size={14}/> Add FAQ</button>
        <button onClick={() => onSave({ faqs: items })} className="btn-primary-cta !py-2 !px-4 text-xs">Save FAQs</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 14. CONTACT
// ─────────────────────────────────────────────────────────────
function ContactManager({ data, onSave }: any) {
  const [c, setC] = useState(data.contact || {});
  const update = (f: string, v: string) => setC({ ...c, [f]: v });

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="col-span-2"><AdminTextarea label="Address" value={c.address} onChange={(v: string) => update('address', v)} /></div>
      <AdminInput label="Phone" value={c.phone} onChange={(v: string) => update('phone', v)} />
      <AdminInput label="WhatsApp" value={c.whatsapp} onChange={(v: string) => update('whatsapp', v)} />
      <AdminInput label="Notification Email" value={c.email} onChange={(v: string) => update('email', v)} />
      <AdminInput label="Office Hours" value={c.hours} onChange={(v: string) => update('hours', v)} />
      <div className="col-span-2"><AdminInput label="Map Link URL" value={c.mapLink} onChange={(v: string) => update('mapLink', v)} /></div>
      <div className="col-span-2">
        <button onClick={() => onSave({ contact: c })} className="btn-primary-cta !py-2 !px-4 text-xs mt-2">Save Contact Info</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 15. SOCIAL MEDIA
// ─────────────────────────────────────────────────────────────
function SocialMediaManager({ data, onSave }: any) {
  const [items, setItems] = useState(data.socialMedia || []);
  const add = () => setItems([...items, { id: Date.now().toString(), platform: "Instagram", url: "https://" }]);
  const update = (i: number, f: string, v: string) => { const nw = [...items]; nw[i][f] = v; setItems(nw); };
  const remove = (i: number) => setItems(items.filter((_: any, idx: number) => idx !== i));

  return (
    <div className="space-y-4">
      {items.map((it: any, i: number) => (
        <div key={it.id} className="p-4 bg-white/5 rounded grid sm:grid-cols-3 gap-3 relative pr-10">
          <div className="col-span-1"><AdminSelect label="Platform" value={it.platform} onChange={(v:string)=>update(i,'platform',v)} options={['Facebook','Instagram','Twitter','LinkedIn','YouTube'].map(p=>({value:p,label:p}))}/></div>
          <div className="col-span-2"><AdminInput label="URL" value={it.url} onChange={(v: string) => update(i, 'url', v)} /></div>
          <button onClick={() => remove(i)} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-300"><Trash2 size={16}/></button>
        </div>
      ))}
      <div className="flex gap-2">
        <button onClick={add} className="bg-white/5 px-4 py-2 rounded text-xs flex items-center gap-1"><Plus size={14}/> Add Link</button>
        <button onClick={() => onSave({ socialMedia: items })} className="btn-primary-cta !py-2 !px-4 text-xs">Save Socials</button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 16. OUR STAFF
// -------------------------------------------------------------
function StaffManager({ data, onSave }: any) {
  const [items, setItems] = useState(data.staff || []);
  const add = () => setItems([...items, { id: Date.now().toString(), name: "Name", role: "Role", photo: "", description: "Desc" }]);
  const update = (i: number, f: string, v: string) => { const nw = [...items]; nw[i][f] = v; setItems(nw); };
  const remove = (i: number) => setItems(items.filter((_: any, idx: number) => idx !== i));

  return (
    <div className="space-y-4">
      {items.map((it: any, i: number) => (
        <div key={it.id} className="p-4 bg-white/5 rounded flex gap-4 relative pr-10">
          <div className="w-1/4"><ImageUpload src={it.photo} fieldLabel="Photo" onUpload={(v:string) => update(i,'photo',v)} onRemove={() => update(i,'photo','')} /></div>
          <div className="w-3/4 grid grid-cols-2 gap-3">
            <AdminInput label="Name" value={it.name} onChange={(v: string) => update(i, 'name', v)} />
            <AdminInput label="Role" value={it.role} onChange={(v: string) => update(i, 'role', v)} />
            <div className="col-span-2"><AdminTextarea label="Description" value={it.description} onChange={(v: string) => update(i, 'description', v)} /></div>
          </div>
          <button onClick={() => remove(i)} className="absolute right-3 top-4 text-red-400 hover:text-red-300"><Trash2 size={16}/></button>
        </div>
      ))}
      <div className="flex gap-2">
        <button onClick={add} className="bg-white/5 px-4 py-2 rounded text-xs flex items-center gap-1"><Plus size={14}/> Add Staff Member</button>
        <button onClick={() => onSave({ staff: items })} className="btn-primary-cta !py-2 !px-4 text-xs">Save Staff</button>
      </div>
    </div>
  );
}
