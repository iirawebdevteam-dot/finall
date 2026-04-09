import { createContext, useContext, useEffect, useState } from "react";
import { getSiteData } from "@/lib/siteData";

type ThemeMode = "dark" | "light" | "system";
type ColorMode = "orange" | "blue" | "green" | "purple" | "red";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: ThemeMode;
  color: ColorMode;
  setTheme: (theme: ThemeMode) => void;
  setColor: (color: ColorMode) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  color: "orange",
  setTheme: () => null,
  setColor: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeMode>("system");
  const [color, setColor] = useState<ColorMode>("orange");

  useEffect(() => {
    // Load initial theme from siteData
    const data = getSiteData();
    setTheme(data.themeMode || "system");
    setColor(data.colorMode || "orange");
    
    // Listen for changes
    const handleStorage = () => {
      const updated = getSiteData();
      setTheme(updated.themeMode || "system");
      setColor(updated.colorMode || "orange");
    };
    window.addEventListener("siteDataChanged", handleStorage);
    return () => window.removeEventListener("siteDataChanged", handleStorage);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.remove("theme-orange", "theme-blue", "theme-green", "theme-purple", "theme-red");

    // Apply color mode
    if (color) {
      root.classList.add(`theme-${color}`);
    } else {
      root.classList.add("theme-orange"); // Safe fallback
    }

    // Apply light/dark mode
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme, color]);

  const value = {
    theme,
    color,
    setTheme: (theme: ThemeMode) => {
      setTheme(theme);
    },
    setColor: (color: ColorMode) => {
      setColor(color);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
