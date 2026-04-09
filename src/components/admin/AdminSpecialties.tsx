import { Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminSpecialties({ setHasChanges }: any) {
  const [items, setItems] = useState([]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Specialties</h2>
      <div className="p-8 text-center text-gray-500">
        <p>Specialties management interface coming soon</p>
        <button
          onClick={() => {
            toast.info("Section will be implemented with full interface");
            setHasChanges(true);
          }}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg"
        >
          <Save size={18} className="inline mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
