import { getSiteData, updateSiteData } from "@/lib/siteData";
import { Save, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminWhy({ setHasChanges }: any) {
  const data = getSiteData();
  const [sec, setSec] = useState(data.whyChooseUs || { description: "", features: [] });

  const add = () => {
    setSec({ ...sec, features: [...sec.features, { id: Date.now().toString(), title: "New Feature" }] });
    setHasChanges(true);
  };

  const updateF = (i: number, v: string) => {
    const f = [...sec.features];
    f[i].title = v;
    setSec({ ...sec, features: f });
    setHasChanges(true);
  };

  const removeF = (i: number) => {
    setSec({ ...sec, features: sec.features.filter((_: any, idx: number) => idx !== i) });
    setHasChanges(true);
  };

  const handleSave = () => {
    updateSiteData({ whyChooseUs: sec });
    toast.success("Why Choose Us updated successfully!");
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Why Choose Us Description</h2>
        <textarea
          value={sec.description}
          onChange={(e) => {
            setSec({ ...sec, description: e.target.value });
            setHasChanges(true);
          }}
          rows={5}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 resize-none"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Features</h2>
          <button
            onClick={add}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg text-sm transition-colors"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
        <div className="space-y-2">
          {sec.features.map((f: any, i: number) => (
            <div key={f.id} className="flex items-center gap-2">
              <input
                type="text"
                value={f.title}
                onChange={(e) => updateF(i, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={() => removeF(i)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
