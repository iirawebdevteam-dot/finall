import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, X, Save } from "lucide-react";
import { toast } from "sonner";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHome from "@/components/admin/AdminHome";
import AdminWhy from "@/components/admin/AdminWhy";
import AdminSpecialties from "@/components/admin/AdminSpecialties";
import {
  AdminAchievements,
  AdminEvents,
  AdminLeadership,
  AdminEducators,
  AdminGallery,
  AdminTestimonials,
  AdminBlogs,
  AdminAdmissions,
  AdminResources,
  AdminFaq,
  AdminContact,
  AdminSocial,
  AdminStaff,
} from "@/components/admin/Sections";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [hasChanges, setHasChanges] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("adminToken");
    const email = localStorage.getItem("adminEmail");
    if (!token) {
      navigate("/admin");
    } else {
      setUserEmail(email || "");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    toast.success("Logged out successfully");
    navigate("/admin");
  };

  const sections: { [key: string]: { title: string; icon: string; component: React.ReactNode } } = {
    home: { title: "Homepage", icon: "🏠", component: <AdminHome setHasChanges={setHasChanges} /> },
    "why-choose": { title: "Why Choose Us", icon: "⭐", component: <AdminWhy setHasChanges={setHasChanges} /> },
    specialties: { title: "Specialties", icon: "✨", component: <AdminSpecialties setHasChanges={setHasChanges} /> },
    achievements: { title: "Achievements", icon: "🏆", component: <AdminAchievements setHasChanges={setHasChanges} /> },
    events: { title: "School Events", icon: "📅", component: <AdminEvents setHasChanges={setHasChanges} /> },
    leadership: { title: "Our Pillars", icon: "👔", component: <AdminLeadership setHasChanges={setHasChanges} /> },
    educators: { title: "Our Educators", icon: "📚", component: <AdminEducators setHasChanges={setHasChanges} /> },
    gallery: { title: "Gallery", icon: "🖼️", component: <AdminGallery setHasChanges={setHasChanges} /> },
    testimonials: { title: "Testimonials", icon: "💬", component: <AdminTestimonials setHasChanges={setHasChanges} /> },
    blogs: { title: "Community Blogs", icon: "✍️", component: <AdminBlogs setHasChanges={setHasChanges} /> },
    admissions: { title: "Admissions", icon: "📖", component: <AdminAdmissions setHasChanges={setHasChanges} /> },
    resources: { title: "Resources", icon: "📥", component: <AdminResources setHasChanges={setHasChanges} /> },
    faq: { title: "FAQ", icon: "❓", component: <AdminFaq setHasChanges={setHasChanges} /> },
    contact: { title: "Contact Info", icon: "☎️", component: <AdminContact setHasChanges={setHasChanges} /> },
    social: { title: "Social Media", icon: "🔗", component: <AdminSocial setHasChanges={setHasChanges} /> },
    staff: { title: "Our Staff", icon: "👥", component: <AdminStaff setHasChanges={setHasChanges} /> },
  };

  const currentSection = sections[activeSection];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar 
        isOpen={sidebarOpen} 
        activeSection={activeSection}
        onSelectSection={(section) => {
          setActiveSection(section);
          setSidebarOpen(false);
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            {/* Left: Menu Toggle & Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  {currentSection?.icon} {currentSection?.title}
                </h1>
              </div>
            </div>

            {/* Right: User & Actions */}
            <div className="flex items-center gap-4">
              {hasChanges && (
                <button
                  onClick={() => {
                    toast.success("Changes saved successfully!");
                    setHasChanges(false);
                  }}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Save size={18} />
                  <span className="hidden sm:inline">Save Changes</span>
                </button>
              )}
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm text-gray-900 font-medium">{userEmail}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 hover:text-red-700"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-4 sm:p-6">
            {currentSection?.component}
          </div>
        </main>
      </div>
    </div>
  );
}
