# Expo Snack Setup Guide

## Quick Start

1. Go to https://snack.expo.dev
2. Click "New Snack" or sign in if needed
3. Follow the steps below to upload your code

## Step 1: Upload Files

### Option A: Manual Upload (Recommended)
1. In Snack, click the "Files" tab (left sidebar)
2. Upload these files one by one:
   - `App.tsx` (root level)
   - All files from `src/` directory
   - `package.json` (see Step 2 for modified version)
   - `app.json`
   - `babel.config.js`

### Option B: Import from GitHub (if you have a repo)
1. Click "Import" in Snack
2. Enter your GitHub repo URL
3. Snack will import the files automatically

## Step 2: Update Files for Snack

### A. Use Modified package.json

Copy the contents of `snack-package.json` (created in your project root) into Snack's package.json. This version removes Snack-incompatible packages:
- `expo-local-authentication` (not used in code, safe to remove)
- `expo-secure-store` (not used in code, safe to remove)  
- `react-native-worklets` and `react-native-worklets-core` (reanimated works without these)
- `react-native-web` and `react-dom` (not needed for mobile)

### B. Use Simplified app.json

Copy the contents of `snack-app.json` (created in your project root) into Snack's app.json. This removes the plugins that reference unsupported modules.

## Step 3: Configure Environment Variables

1. In Snack, click the "Environment" tab (left sidebar)
2. Add these environment variables:
   - `EXPO_PUBLIC_SUPABASE_URL` = `https://tpvcchlfsutmretgdgic.supabase.co`
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwdmNjaGxmc3V0bXJldGdkZ2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MTg5ODMsImV4cCI6MjA4MDE5NDk4M30.gO-Y0qjp8AKx1DQgq-_0r8R2vqGrNI1R_pUP2YrHbkc`

## Step 4: Upload Babel Config

Your existing `babel.config.js` should work fine in Snack. Just upload it as-is.

## Step 5: Handle Assets

1. In Snack, go to "Assets" tab
2. Upload images from `src/assets/images/`:
   - `accelerate-debt.png`
   - `building-blocks.png`
   - `flinks-logo.png`
   - `transunion-logo.png`
3. Also upload from `assets/images/` if referenced:
   - `financial-fitness-illustration.png`
   - `insurance-illustration.png`
   - `welcome-illustration.png`

## Step 6: Test the App

1. Click "Run" or press `Cmd+R` (Mac) / `Ctrl+R` (Windows)
2. Scan the QR code with Expo Go on your phone
3. Test key features:
   - Onboarding flow
   - Dashboard with calculations
   - Financial indicators

## Step 7: Share the Link

1. Click "Share" button in Snack
2. Copy the shareable URL (e.g., `https://snack.expo.dev/@yourusername/autopayplan`)
3. Send this link to your friend
4. They can:
   - Open the link on their phone
   - Tap "Open in Expo Go"
   - Or scan the QR code with Expo Go

## Troubleshooting

### If app doesn't load:
- Check console for errors
- Verify all environment variables are set
- Make sure all dependencies are in package.json

### If images don't load:
- Verify assets are uploaded in Snack
- Check image paths in code match Snack's asset structure

### If Supabase calls fail:
- Verify environment variables are set correctly
- Check Supabase project is accessible
- Look for CORS errors in console

## Notes

- Snack automatically installs dependencies from package.json
- Changes are saved automatically
- You can update the code and your friend will see updates when they refresh
- The app runs in Expo Go, so it's a real native experience

