#!/bin/bash

# Archive current latest.md with timestamp
# Usage: ./scripts/archive-version.sh [optional-description]

LATEST_FILE="latest/latest.md"
ARCHIVE_DIR="archived-versions"
DATE_FOLDER=$(date +%m%d)
TIMESTAMP=$(date +%d%m%y)
DESCRIPTION="${1:-}"

echo "Archiving current version..."

# Check if latest.md exists
if [[ ! -f "$LATEST_FILE" ]]; then
    echo "❌ Error: $LATEST_FILE not found. Run ./scripts/build-latest.sh first."
    exit 1
fi

# Create archive directory structure
ARCHIVE_PATH="$ARCHIVE_DIR/$DATE_FOLDER"
mkdir -p "$ARCHIVE_PATH"

# Copy latest.md with timestamp
ARCHIVE_FILE="$ARCHIVE_PATH/$TIMESTAMP.md"
cp "$LATEST_FILE" "$ARCHIVE_FILE"

# Create metadata file
METADATA_FILE="$ARCHIVE_PATH/metadata.json"
FILE_SIZE=$(wc -c < "$LATEST_FILE")
LINE_COUNT=$(wc -l < "$LATEST_FILE")

cat > "$METADATA_FILE" << EOF
{
  "version": "$TIMESTAMP",
  "date": "$(date +%Y-%m-%d)",
  "timestamp": "$(date -Iseconds)",
  "size_bytes": $FILE_SIZE,
  "line_count": $LINE_COUNT,
  "description": "$DESCRIPTION",
  "source": "latest/blocks/",
  "archived_from": "$LATEST_FILE"
}
EOF

# Create changes file if description provided
if [[ -n "$DESCRIPTION" ]]; then
    CHANGES_FILE="$ARCHIVE_PATH/changes.md"
    cat > "$CHANGES_FILE" << EOF
# Changes in $(date +%d/%m/%y)

## Description
$DESCRIPTION

## Metadata
- **Size**: $FILE_SIZE bytes
- **Lines**: $LINE_COUNT
- **Source**: Built from latest/blocks/
- **Archived**: $(date -Iseconds)
EOF
fi

echo "✅ Archived version: $ARCHIVE_FILE"
echo "📊 File size: $FILE_SIZE bytes"
echo "📄 Line count: $LINE_COUNT lines"
echo "📁 Archive location: $ARCHIVE_PATH/"

# Update versions table
if [[ -f "scripts/build-table.sh" ]]; then
    echo ""
    echo "🔄 Updating versions table..."
    ./scripts/build-table.sh
fi

echo ""
echo "🎯 Next steps:"
echo "   - Edit blocks in latest/blocks/ for changes"
echo "   - Run ./scripts/build-latest.sh to rebuild"
echo "   - Run ./scripts/archive-version.sh to save new version"
