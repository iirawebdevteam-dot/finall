# Lovable Cloud Setup Guide

## Overview
This project integrates **Lovable Cloud** for backend storage, database, and image management. Lovable Cloud replaces localStorage with persistent cloud storage while maintaining localStorage as a fallback.

## Prerequisites
- Lovable Cloud account with $25 free credits (or active payment method)
- Lovable Cloud Project ID
- API Key from Lovable Cloud

## Setup Steps

### 1. Create Lovable Cloud Project
1. Visit [Lovable Dashboard](https://lovable.dev/dashboard)
2. Navigate to **Cloud** section
3. Create a new project named `IIRA-Sports-Academy`
4. Go to **Settings → API Keys**
5. Generate a new API key for development
6. Copy your **Project ID** and **API Key**

### 2. Configure Environment Variables

Create a `.env.local` file in the project root (replace with your actual credentials):

```env
REACT_APP_LOVABLE_CLOUD_API=https://api.lovable.dev/v1
REACT_APP_LOVABLE_PROJECT_ID=your-project-id-here
REACT_APP_LOVABLE_API_KEY=your-api-key-here
```

**For production deployment (Vercel):**
1. Go to Vercel Project Settings
2. Navigate to **Environment Variables**
3. Add the three variables above
4. Redeploy the project

### 3. Verify Integration
1. Start the dev server: `npm run dev`
2. Go to `/admin` panel
3. Edit any content (e.g., change hero headline)
4. Check browser console for "Data synced to Lovable Cloud" message
5. Data will be saved to both Lovable Cloud and local storage

## Features Enabled by Lovable Cloud

### ✅ Persistent Storage
- All admin panel edits automatically sync to Lovable Cloud
- Data persists across browser sessions and devices
- Public website reads from Lovable Cloud in real-time

### ✅ Image Management
- Upload images via the admin panel
- Images stored in Lovable Cloud Storage
- Automatic CDN delivery for fast loading
- Crop and resize before saving

### ✅ Multi-User Support
- Multiple admins can edit simultaneously
- Changes sync across all connected clients
- Last-write-wins conflict resolution

### ✅ Backup & Recovery
- Automatic daily backups
- Version history for all updates
- 30-day restore capability

## API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/projects/{id}` | GET | Verify connection |
| `/projects/{id}/data/{collection}` | GET | Fetch site data |
| `/projects/{id}/data/{collection}` | PUT | Save site data |
| `/projects/{id}/storage/upload` | POST | Upload images |
| `/projects/{id}/storage/delete` | DELETE | Delete images |
| `/projects/{id}/storage/list` | GET | List images in folder |

## File Structure

```
src/
├── lib/
│   ├── lovableCloud.ts       # Cloud SDK & API calls
│   ├── siteData.ts          # Enhanced with cloud sync
│   └── images.ts            # Image utilities
├── pages/
│   └── Admin.tsx            # Admin panel (unchanged)
└── App.tsx                  # Entry point
```

## Troubleshooting

### "Lovable Cloud credentials not configured"
- Check that `.env.local` file exists
- Verify environment variables are spelled correctly
- Restart dev server after updating `.env.local`

### "Failed to save to Lovable Cloud"
- Check API key validity in Lovable Dashboard
- Verify project ID matches Lovable Cloud project
- Check network connectivity
- Data will still save to localStorage as fallback

### Images not uploading
- Check file size (max 10MB per file)
- Verify image format (JPG, PNG, WebP)
- Ensure Project ID and API Key are correct

## Migration from localStorage

If you have existing data in localStorage:
1. All current data remains in localStorage
2. First save triggers cloud sync
3. New edits sync to both locations
4. Cloud data takes precedence when loading

## Security Notes

- API keys are stored only in environment variables
- Never commit `.env.local` to git
- `.env.local` is in `.gitignore`
- Use different API keys for dev/staging/production
- Rotate API keys regularly in Lovable Dashboard

## Next Steps

1. ✅ Set up environment variables
2. ✅ Test admin panel saves
3. ✅ Deploy to Vercel with production credentials
4. ✅ Monitor Lovable Cloud usage dashboard
5. ✅ Set up automated backups if needed

## Support

- [Lovable Cloud Docs](https://docs.lovable.dev/integrations/cloud)
- [API Reference](https://docs.lovable.dev/integrations/cloud/api)
- Contact admin@iira.co.in for integration questions
