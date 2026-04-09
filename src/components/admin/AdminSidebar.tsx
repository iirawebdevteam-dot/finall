import { X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  activeSection: string;
  onSelectSection: (section: string) => void;
}

const menuItems = [
  { id: "home", label: "Homepage", icon: "🏠" },
  { id: "why-choose", label: "Why Choose Us", icon: "⭐" },
  { id: "specialties", label: "Specialties", icon: "✨" },
  { id: "achievements", label: "Achievements", icon: "🏆" },
  { id: "events", label: "School Events", icon: "📅" },
  { id: "leadership", label: "Our Pillars", icon: "👔" },
  { id: "educators", label: "Our Educators", icon: "📚" },
  { id: "gallery", label: "Gallery", icon: "🖼️" },
  { id: "testimonials", label: "Testimonials", icon: "💬" },
  { id: "blogs", label: "Community Blogs", icon: "✍️" },
  { id: "admissions", label: "Admissions", icon: "📖" },
  { id: "resources", label: "Resources", icon: "📥" },
  { id: "faq", label: "FAQ", icon: "❓" },
  { id: "contact", label: "Contact Info", icon: "☎️" },
  { id: "social", label: "Social Media", icon: "🔗" },
  { id: "staff", label: "Our Staff", icon: "👥" },
];

export default function AdminSidebar({
  isOpen,
  activeSection,
  onSelectSection,
}: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => onSelectSection(activeSection)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative w-64 h-screen bg-white border-r border-gray-200 overflow-y-auto z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
              IRA
            </div>
            <h2 className="font-bold text-gray-900 hidden sm:block">IIRA Admin</h2>
          </div>
          <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-3 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`w-full text-left px-3 py-3 rounded-lg transition-colors font-medium text-sm flex items-center gap-3 ${
                activeSection === item.id
                  ? "bg-orange-100 text-orange-600 border-l-4 border-orange-500"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <a
            href="/"
            className="block text-center text-sm text-gray-600 hover:text-gray-900 transition-colors py-2 font-medium"
          >
            ← Back to Website
          </a>
        </div>
      </aside>
    </>
  );
}
