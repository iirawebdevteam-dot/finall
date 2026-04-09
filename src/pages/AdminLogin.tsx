import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("admin@iira.co.in");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate authentication
    try {
      // For demo purposes, accept any password
      if (email.trim() && password.trim()) {
        // Store auth token in localStorage
        localStorage.setItem("adminToken", "authorized_" + Date.now());
        localStorage.setItem("adminEmail", email);
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 500);
      } else {
        setError("Please enter both email and password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-lg text-gray-600">IIRA International School</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-200">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="admin@iira.co.in"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Back Link */}
          <div className="text-center mt-6">
            <a
              href="/"
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              ← Back to Website
            </a>
          </div>
        </div>


        {/* Footer Note */}
        <div className="text-center mt-8 text-xs text-gray-500">
          <p>© 2024 IIRA International School. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
