#!/bin/bash

# Token Estimation Script for Windsurf Rules
# Estimates tokens in latest.md and logs results to token-est.md

echo "🔢 Estimating tokens in latest.md..."
echo ""

# Run the Node.js token estimation script
node scripts/estimate-tokens.js

echo ""
echo "✅ Token estimation complete!"
echo "📄 Results saved to token-est.md"
