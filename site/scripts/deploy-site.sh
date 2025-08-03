#!/bin/bash

# Simple deployment script for the Windsurf Rules documentation site
# This script only builds and deploys the site without archiving

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

echo -e "${BLUE}🚀 Windsurf Rules Site Deployment${NC}"
echo "Repository: $REPO_ROOT"
echo "Site directory: $SITE_DIR"
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
wrangler pages deploy dist --project-name windsurf-rules

if [[ $? -eq 0 ]]; then
    echo -e "${GREEN}✅ Deployment successful!${NC}"
    echo -e "${GREEN}🌍 Site available at: https://windsurf-rules.pages.dev${NC}"
else
    echo -e "${RED}❌ Deployment failed${NC}"
    exit 1
fi

echo
echo -e "${GREEN}🎉 Site deployment completed!${NC}"
echo -e "${BLUE}📋 Summary:${NC}"
echo "  • Documentation site built and deployed"
echo "  • Site URL: https://windsurf-rules.pages.dev"
echo
