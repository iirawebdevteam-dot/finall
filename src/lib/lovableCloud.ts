import { SiteData } from './siteData';

const LOVABLE_CLOUD_API = process.env.REACT_APP_LOVABLE_CLOUD_API || 'https://api.lovable.dev/v1';
const LOVABLE_PROJECT_ID = process.env.REACT_APP_LOVABLE_PROJECT_ID;
const LOVABLE_API_KEY = process.env.REACT_APP_LOVABLE_API_KEY;

interface CloudResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Initialize Lovable Cloud connection
export const initLovableCloud = async () => {
  try {
    if (!LOVABLE_PROJECT_ID || !LOVABLE_API_KEY) {
      console.warn('Lovable Cloud credentials not configured. Using local storage fallback.');
      return false;
    }
    
    // Test connection to Lovable Cloud
    const response = await fetch(`${LOVABLE_CLOUD_API}/projects/${LOVABLE_PROJECT_ID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    
    return response.ok;
  } catch (error) {
    console.error('Lovable Cloud initialization failed:', error);
    return false;
  }
};

// Fetch site data from Lovable Cloud
export const fetchSiteDataFromCloud = async (collectionName = 'siteData'): Promise<SiteData | null> => {
  try {
    if (!LOVABLE_PROJECT_ID || !LOVABLE_API_KEY) return null;

    const response = await fetch(`${LOVABLE_CLOUD_API}/projects/${LOVABLE_PROJECT_ID}/data/${collectionName}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const result: CloudResponse<SiteData> = await response.json();
    return result.success && result.data ? result.data : null;
  } catch (error) {
    console.error('Failed to fetch from Lovable Cloud:', error);
    return null;
  }
};

// Save site data to Lovable Cloud
export const saveSiteDataToCloud = async (
  data: SiteData,
  collectionName = 'siteData'
): Promise<boolean> => {
  try {
    if (!LOVABLE_PROJECT_ID || !LOVABLE_API_KEY) {
      console.warn('Lovable Cloud not configured. Data saved locally only.');
      return false;
    }

    const response = await fetch(`${LOVABLE_CLOUD_API}/projects/${LOVABLE_PROJECT_ID}/data/${collectionName}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const result: CloudResponse<SiteData> = await response.json();
    return result.success;
  } catch (error) {
    console.error('Failed to save to Lovable Cloud:', error);
    return false;
  }
};

// Upload image to Lovable Cloud Storage
export const uploadImageToCloud = async (
  file: File,
  folder = 'images'
): Promise<{ url: string; path: string } | null> => {
  try {
    if (!LOVABLE_PROJECT_ID || !LOVABLE_API_KEY) return null;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const response = await fetch(
      `${LOVABLE_CLOUD_API}/projects/${LOVABLE_PROJECT_ID}/storage/upload`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        },
        body: formData,
      }
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const result = await response.json();
    return result.success ? { url: result.url, path: result.path } : null;
  } catch (error) {
    console.error('Failed to upload image to Lovable Cloud:', error);
    return null;
  }
};

// Delete image from Lovable Cloud Storage
export const deleteImageFromCloud = async (path: string): Promise<boolean> => {
  try {
    if (!LOVABLE_PROJECT_ID || !LOVABLE_API_KEY) return false;

    const response = await fetch(
      `${LOVABLE_CLOUD_API}/projects/${LOVABLE_PROJECT_ID}/storage/delete`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path }),
      }
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const result: CloudResponse<{}> = await response.json();
    return result.success;
  } catch (error) {
    console.error('Failed to delete image from Lovable Cloud:', error);
    return false;
  }
};

// List all images in a folder
export const listImagesByFolder = async (folder = 'images'): Promise<string[]> => {
  try {
    if (!LOVABLE_PROJECT_ID || !LOVABLE_API_KEY) return [];

    const response = await fetch(
      `${LOVABLE_CLOUD_API}/projects/${LOVABLE_PROJECT_ID}/storage/list?folder=${folder}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const result = await response.json();
    return result.success ? result.files : [];
  } catch (error) {
    console.error('Failed to list images from Lovable Cloud:', error);
    return [];
  }
};
