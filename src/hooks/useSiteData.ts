import { useState, useEffect } from "react";
import { getSiteData, SiteData } from "@/lib/siteData";

export function useSiteData(): SiteData {
  const [data, setData] = useState<SiteData>(getSiteData);

  useEffect(() => {
    // Handler for cross-tab (standard StorageEvent) or same-tab custom event
    const handleStorageChange = () => {
      setData(getSiteData());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("siteDataChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("siteDataChanged", handleStorageChange);
    };
  }, []);

  return data;
}
