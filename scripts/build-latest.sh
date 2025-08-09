#!/bin/bash

# Build latest.md from ordered blocks in latest/blocks/
# Usage: ./scripts/build-latest.sh

LATEST_DIR="latest"
BLOCKS_DIR="$LATEST_DIR/blocks"
OUTPUT_FILE="$LATEST_DIR/latest.md"
TEMP_FILE=$(mktemp)

echo "Building latest.md from ordered blocks..."

# Check if blocks directory exists
if [[ ! -d "$BLOCKS_DIR" ]]; then
    echo "❌ Error: $BLOCKS_DIR directory not found"
    exit 1
fi

# Header
cat > "$TEMP_FILE" << EOF
# Windsurf Rules - $(date +"%B %d, %Y")

These guidelines should guide your work with the user, Daniel:

EOF

# Process blocks in numerical order
for block_file in $(ls "$BLOCKS_DIR"/*.md | sort -V); do
    if [[ -f "$block_file" ]]; then
        echo "" >> "$TEMP_FILE"
        echo "## $(basename "$block_file" .md | sed 's/^[0-9]*-//' | tr '-' ' ' | sed 's/\b\w/\U&/g')" >> "$TEMP_FILE"
        echo "" >> "$TEMP_FILE"
        # Skip the header line from each block
        tail -n +2 "$block_file" >> "$TEMP_FILE"
        echo "" >> "$TEMP_FILE"
        echo "---" >> "$TEMP_FILE"
    fi
done

# Remove the last separator
sed -i '$d' "$TEMP_FILE"

# Move to final location
mv "$TEMP_FILE" "$OUTPUT_FILE"

echo "✅ Built latest rules file: $OUTPUT_FILE"
echo "📊 File size: $(wc -c < "$OUTPUT_FILE") bytes"
echo "📄 Line count: $(wc -l < "$OUTPUT_FILE") lines"
echo ""
echo "🔄 To archive this version, run: ./scripts/archive-version.sh"
