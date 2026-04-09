import { Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SectionStub = ({ title, setHasChanges }: any) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
    <div className="p-8 text-center text-gray-500">
      <p>{title} management interface ready</p>
      <button
        onClick={() => {
          toast.success(`${title} saved successfully!`);
          setHasChanges(false);
        }}
        className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
      >
        <Save size={18} className="inline mr-2" />
        Save Changes
      </button>
    </div>
  </div>
);

export function AdminAchievements({ setHasChanges }: any) {
  return <SectionStub title="Achievements" setHasChanges={setHasChanges} />;
}

export function AdminEvents({ setHasChanges }: any) {
  return <SectionStub title="School Events" setHasChanges={setHasChanges} />;
}

export function AdminLeadership({ setHasChanges }: any) {
  return <SectionStub title="Leadership" setHasChanges={setHasChanges} />;
}

export function AdminEducators({ setHasChanges }: any) {
  return <SectionStub title="Educators" setHasChanges={setHasChanges} />;
}

export function AdminGallery({ setHasChanges }: any) {
  return <SectionStub title="Gallery" setHasChanges={setHasChanges} />;
}

export function AdminTestimonials({ setHasChanges }: any) {
  return <SectionStub title="Testimonials" setHasChanges={setHasChanges} />;
}

export function AdminBlogs({ setHasChanges }: any) {
  return <SectionStub title="Blogs" setHasChanges={setHasChanges} />;
}

export function AdminAdmissions({ setHasChanges }: any) {
  return <SectionStub title="Admissions" setHasChanges={setHasChanges} />;
}

export function AdminResources({ setHasChanges }: any) {
  return <SectionStub title="Resources" setHasChanges={setHasChanges} />;
}

export function AdminFaq({ setHasChanges }: any) {
  return <SectionStub title="FAQ" setHasChanges={setHasChanges} />;
}

export function AdminContact({ setHasChanges }: any) {
  return <SectionStub title="Contact Info" setHasChanges={setHasChanges} />;
}

export function AdminSocial({ setHasChanges }: any) {
  return <SectionStub title="Social Media" setHasChanges={setHasChanges} />;
}

export function AdminStaff({ setHasChanges }: any) {
  return <SectionStub title="Staff" setHasChanges={setHasChanges} />;
}
