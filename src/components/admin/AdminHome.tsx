import { useState } from "react";
import { getSiteData, updateSiteData } from "@/lib/siteData";
import { Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminHome({ setHasChanges }: { setHasChanges: (val: boolean) => void }) {
  const data = getSiteData();
  const [home, setHome] = useState(data.home || { image: "", imageDescription: "", trustedBy: "" });
  const [stats, setStats] = useState(data.stats);

  const handleSave = () => {
    updateSiteData({ home, stats });
    toast.success("Homepage updated successfully!");
    setHasChanges(false);
  };

  const updateStat = (i: number, field: string, value: string) => {
    const newStats = [...stats];
    newStats[i] = { ...newStats[i], [field]: value };
    setStats(newStats);
    setHasChanges(true);
  };

  return (
    <div className="space-y-6">
      {/* 4 Stats Blocks */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Homepage Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.slice(0, 4).map((stat, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <input
                type="text"
                value={stat.value}
                onChange={(e) => updateStat(i, "value", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Stat value"
              />
              <input
                type="text"
                value={stat.label}
                onChange={(e) => updateStat(i, "label", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Label"
              />
              <input
                type="text"
                value={stat.suffix}
                onChange={(e) => updateStat(i, "suffix", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Suffix (e.g., +)"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Image & Description */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Home Image</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            {home.image && (
              <div className="mb-3 relative w-32 h-32 rounded-lg overflow-hidden border border-gray-300">
                <img src={home.image} alt="Home" className="w-full h-full object-cover" />
                <button
                  onClick={() => {
                    setHome({ ...home, image: "" });
                    setHasChanges(true);
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
            <label className="block px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:bg-gray-50">
              <span className="text-sm text-gray-600">{home.image ? "Change Image" : "Upload Image"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setHome({ ...home, image: reader.result as string });
                      setHasChanges(true);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Description
            </label>
            <textarea
              value={home.imageDescription}
              onChange={(e) => {
                setHome({ ...home, imageDescription: e.target.value });
                setHasChanges(true);
              }}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              placeholder="Describe the image..."
            />
          </div>
        </div>
      </div>

      {/* Trusted By Text */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Trusted By Text</h2>
        <textarea
          value={home.trustedBy}
          onChange={(e) => {
            setHome({ ...home, trustedBy: e.target.value });
            setHasChanges(true);
          }}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          placeholder="Enter text displayed in home section..."
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Save size={18} />
          Save Homepage
        </button>
      </div>
    </div>
  );
}
