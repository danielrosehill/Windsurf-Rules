#!/bin/bash

# Build complete Windsurf rules from snippets
# Usage: ./scripts/build-from-snippets.sh [output-file]

OUTPUT_FILE="${1:-latest.md}"
SNIPPETS_DIR="snippets"
TEMP_FILE=$(mktemp)

echo "Building Windsurf rules from snippets..."

# Header
cat > "$TEMP_FILE" << 'EOF'
# Windsurf Rules - $(date +"%B %d, %Y")

These guidelines should guide your work with the user, Daniel:

EOF

# Replace the date placeholder
sed -i "s/\$(date +\"%B %d, %Y\")/$(date +"%B %d, %Y")/g" "$TEMP_FILE"

# Add snippets in logical order
snippets=(
    "user-profile.md"
    "system-specs.md" 
    "network-config.md"
    "stack-preferences.md"
    "project-preferences.md"
    "documentation-guidelines.md"
    "mcp-handling.md"
    "ai-workspace.md"
    "containerization.md"
    "cloudflare-tunnels.md"
    "python-conventions.md"
    "file-hygiene.md"
    "cli-tools.md"
    "execution-policy.md"
    "implicit-instructions.md"
)

for snippet in "${snippets[@]}"; do
    if [[ -f "$SNIPPETS_DIR/$snippet" ]]; then
        echo "" >> "$TEMP_FILE"
        echo "## $(basename "$snippet" .md | tr '-' ' ' | sed 's/\b\w/\U&/g')" >> "$TEMP_FILE"
        echo "" >> "$TEMP_FILE"
        # Skip the header line from each snippet
        tail -n +2 "$SNIPPETS_DIR/$snippet" >> "$TEMP_FILE"
        echo "" >> "$TEMP_FILE"
        echo "---" >> "$TEMP_FILE"
    else
        echo "Warning: Snippet $snippet not found"
    fi
done

# Remove the last separator
sed -i '$d' "$TEMP_FILE"

# Move to final location
mv "$TEMP_FILE" "$OUTPUT_FILE"

echo "✅ Built complete rules file: $OUTPUT_FILE"
echo "📊 File size: $(wc -c < "$OUTPUT_FILE") bytes"
echo "📄 Line count: $(wc -l < "$OUTPUT_FILE") lines"
