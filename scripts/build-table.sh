#!/bin/bash

# Build versions table for README.md
# This script runs the Node.js table builder

echo "🔄 Building versions table..."

# Change to the project root directory
cd "$(dirname "$0")/.."

# Run the table builder
node scripts/build-versions-table.js

if [ $? -eq 0 ]; then
    echo "✅ Versions table built successfully"
else
    echo "❌ Failed to build versions table"
    exit 1
fi
