# Google Maps Setup Instructions

## 🚨 Current Issue
The map is showing "This page didn't load Google Maps correctly" because the API key is not configured.

## 🔧 How to Fix

### Step 1: Get Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Maps JavaScript API**
   - **Geocoding API**
   - **Places API** (optional, for enhanced features)
4. Create credentials (API Key)
5. Copy the API key

### Step 2: Add API Key to Environment
1. Open the `.env.local` file in your project root
2. Replace `your_google_maps_api_key_here` with your actual API key:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### Step 3: Restart Development Server
```bash
npm run dev
```

## 🔒 Security Notes
- Never commit your API key to version control
- Add `.env.local` to your `.gitignore` file
- Consider setting up API key restrictions in Google Cloud Console

## 🎯 What You'll Get
- Interactive map centered on Egypt (Cairo)
- Click to select location functionality
- Automatic geocoding to get full addresses
- Draggable marker for precise positioning
- Form integration to capture lat/lng coordinates

## 🐛 Troubleshooting
If you still see errors:
1. Check browser console for specific error messages
2. Verify API key is correct and active
3. Ensure required APIs are enabled
4. Check API key restrictions (if any)
5. Verify billing account is set up (Google Maps requires billing)

## 📍 Map Features
- **Default Location**: Cairo, Egypt (30.0444, 31.2357)
- **Zoom Level**: 12 (good for city-level view)
- **Map Type**: Roadmap (shows streets and addresses)
- **Interactions**: Click to select, drag marker to adjust
- **Geocoding**: Automatic address lookup from coordinates


