# Installation Guide

## Quick Setup

The Windsurf rules should be placed in your global memory location:

```bash
# Copy latest rules to Windsurf memory location
cp latest.md ~/.codeium/windsurf/memories/global_rules.md
```

## Automatic Installation Script

Use the provided installation script for easy setup:

```bash
./scripts/install-rules.sh
```

## Manual Installation

1. Navigate to your Windsurf memory directory:
   ```bash
   cd ~/.codeium/windsurf/memories/
   ```

2. Copy the latest rules:
   ```bash
   cp /path/to/Windsurf-Rules-0725/latest.md global_rules.md
   ```

3. Verify installation:
   ```bash
   ls -la ~/.codeium/windsurf/memories/global_rules.md
   ```

## Updating Rules

To update to the latest version:

```bash
# From the repository root
./scripts/update-rules.sh
```

## Verification

After installation, restart Windsurf and verify the rules are loaded by checking that Cascade acknowledges your preferences in new conversations.
