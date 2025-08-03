#!/bin/bash

# Windsurf Rules Archive and Deploy Script
# This script archives the current rules and deploys the documentation site

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_DIR="$(dirname "$SCRIPT_DIR")"
REPO_ROOT="$(dirname "$SITE_DIR")"

echo -e "${BLUE}🚀 Windsurf Rules Archive and Deploy${NC}"
echo "Repository: $REPO_ROOT"
echo "Site directory: $SITE_DIR"
echo

# Check if we're in the right directory
if [[ ! -f "$REPO_ROOT/latest.md" ]]; then
    echo -e "${RED}❌ Error: latest.md not found in repository root${NC}"
    exit 1
fi

# Generate today's date in DDMMYY format
TODAY=$(date +"%d%m%y")
ARCHIVE_FILE="$REPO_ROOT/archived-versions/${TODAY}.md"

echo -e "${YELLOW}📅 Today's date: $TODAY${NC}"

# Check if archive for today already exists
if [[ -f "$ARCHIVE_FILE" ]]; then
    echo -e "${YELLOW}⚠️  Archive for today ($TODAY.md) already exists${NC}"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${BLUE}ℹ️  Skipping archive step${NC}"
    else
        echo -e "${GREEN}📁 Archiving current rules to $TODAY.md${NC}"
        cp "$REPO_ROOT/latest.md" "$ARCHIVE_FILE"
        echo -e "${GREEN}✅ Rules archived successfully${NC}"
    fi
else
    echo -e "${GREEN}📁 Archiving current rules to $TODAY.md${NC}"
    cp "$REPO_ROOT/latest.md" "$ARCHIVE_FILE"
    echo -e "${GREEN}✅ Rules archived successfully${NC}"
fi

echo

# Update changelog if the generate-changelog script exists
if [[ -f "$SCRIPT_DIR/generate-changelog.js" ]]; then
    echo -e "${BLUE}📝 Updating changelog...${NC}"
    cd "$REPO_ROOT"
    node "$SCRIPT_DIR/generate-changelog.js"
    echo -e "${GREEN}✅ Changelog updated${NC}"
else
    echo -e "${YELLOW}⚠️  Changelog generator not found, skipping${NC}"
fi

echo

# Build the documentation site
echo -e "${BLUE}🏗️  Building documentation site...${NC}"
cd "$SITE_DIR"

# Install dependencies if node_modules doesn't exist
if [[ ! -d "node_modules" ]]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
fi

# Build the site
echo -e "${BLUE}🔨 Building Astro site...${NC}"
npm run build

if [[ $? -eq 0 ]]; then
    echo -e "${GREEN}✅ Site built successfully${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

echo

# Deploy to Cloudflare Pages
echo -e "${BLUE}🌐 Deploying to Cloudflare Pages...${NC}"

# Check if wrangler is available
if ! command -v wrangler &> /dev/null; then
    echo -e "${RED}❌ Wrangler CLI not found. Please install it first:${NC}"
    echo "npm install -g wrangler"
    exit 1
fi

# Deploy using wrangler
cd "$REPO_ROOT/site"
wrangler pages deploy dist --project-name windsurf-rules

if [[ $? -eq 0 ]]; then
    echo -e "${GREEN}✅ Deployment successful!${NC}"
    echo -e "${GREEN}🌍 Site available at: https://windsurf-rules.pages.dev${NC}"
else
    echo -e "${RED}❌ Deployment failed${NC}"
    exit 1
fi

echo

# Commit changes to git
echo -e "${BLUE}📝 Committing changes to git...${NC}"
cd "$REPO_ROOT"

# Add all changes
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo -e "${YELLOW}ℹ️  No changes to commit${NC}"
else
    # Commit with a descriptive message
    COMMIT_MSG="Archive rules for $TODAY and deploy documentation site"
    git commit -m "$COMMIT_MSG"
    echo -e "${GREEN}✅ Changes committed: $COMMIT_MSG${NC}"
    
    # Push to remote
    echo -e "${BLUE}📤 Pushing to remote repository...${NC}"
    git push
    
    if [[ $? -eq 0 ]]; then
        echo -e "${GREEN}✅ Changes pushed successfully${NC}"
    else
        echo -e "${YELLOW}⚠️  Failed to push changes (you may need to push manually)${NC}"
    fi
fi

echo
echo -e "${GREEN}🎉 Archive and deploy process completed!${NC}"
echo -e "${BLUE}📋 Summary:${NC}"
echo "  • Rules archived to: archived-versions/${TODAY}.md"
echo "  • Documentation site built and deployed"
echo "  • Changes committed to git"
echo "  • Site URL: https://windsurf-rules.pages.dev"
echo
