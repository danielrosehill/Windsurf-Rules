#!/bin/bash

# Update README with latest rules
# This script can be run manually or as part of a deployment process

set -e

echo "🔄 Updating README with latest Windsurf rules..."

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed"
    exit 1
fi

# Check if required files exist
if [ ! -f "latest.md" ]; then
    echo "❌ latest.md not found"
    exit 1
fi

if [ ! -f "README.md" ]; then
    echo "❌ README.md not found"
    exit 1
fi

# Install dependencies if package.json exists
if [ -f "package.json" ]; then
    echo "📦 Installing dependencies..."
    npm install --silent
fi

# Run the update script
echo "🚀 Running update script..."
node update-readme.js

# Check if git is available and we're in a git repo
if command -v git &> /dev/null && [ -d ".git" ]; then
    echo "📊 Git status:"
    git status --porcelain README.md
    
    echo ""
    echo "💡 To commit changes, run:"
    echo "   git add README.md"
    echo "   git commit -m 'Update README with latest rules'"
    echo "   git push"
else
    echo "ℹ️  Not in a git repository or git not available"
fi

echo "✅ Update complete!"
