#!/bin/bash

# AutoPayPlan - Expo Snack Creation Script
# This script prepares your project for Expo Snack and provides instructions

set -e

echo "🚀 AutoPayPlan - Expo Snack Setup"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Backup original files
echo -e "${BLUE}Step 1: Backing up original files...${NC}"
if [ ! -f "package.json.backup" ]; then
  cp package.json package.json.backup
  cp app.json app.json.backup
  echo -e "${GREEN}✓ Backups created${NC}"
else
  echo -e "${YELLOW}⚠ Backups already exist, skipping...${NC}"
fi

# Step 2: Replace with snack-compatible versions
echo -e "${BLUE}Step 2: Preparing snack-compatible files...${NC}"
cp snack-package.json package.json
cp snack-app.json app.json
echo -e "${GREEN}✓ Files replaced${NC}"

# Step 3: Display GitHub URL for import
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Ready for Expo Snack!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}Option 1: Import from GitHub (Easiest)${NC}"
echo "1. Go to: https://snack.expo.dev"
echo "2. Click 'New Snack'"
echo "3. Click 'Import git repository'"
echo "4. Enter: https://github.com/repeatableai/AutoPayPlan.git"
echo "5. Snack will import your project"
echo ""
echo -e "${YELLOW}⚠ IMPORTANT: After import, you MUST:${NC}"
echo "   a) Replace package.json with snack-package.json content"
echo "   b) Replace app.json with snack-app.json content"
echo "   c) Set environment variables (see below)"
echo ""

# Step 4: Environment variables
echo -e "${BLUE}Environment Variables to Set in Snack:${NC}"
echo ""
echo "EXPO_PUBLIC_SUPABASE_URL=https://tpvcchlfsutmretgdgic.supabase.co"
echo "EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwdmNjaGxmc3V0bXJldGdkZ2ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MTg5ODMsImV4cCI6MjA4MDE5NDk4M30.gO-Y0qjp8AKx1DQgq-_0r8R2vqGrNI1R_pUP2YrHbkc"
echo ""

# Step 5: Restore original files
echo -e "${BLUE}Step 5: Restoring original files...${NC}"
cp package.json.backup package.json
cp app.json.backup app.json
echo -e "${GREEN}✓ Original files restored${NC}"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Next Steps:${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "1. Open https://snack.expo.dev"
echo "2. Import from GitHub: https://github.com/repeatableai/AutoPayPlan.git"
echo "3. Replace package.json and app.json with snack versions"
echo "4. Set environment variables in Snack UI"
echo "5. Upload assets (images) if needed"
echo "6. Test and share!"
echo ""
echo -e "${YELLOW}Files ready:${NC}"
echo "  - snack-package.json"
echo "  - snack-app.json"
echo "  - SNACK_SETUP_GUIDE.md (detailed instructions)"
echo ""

