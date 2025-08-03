# Dynamic README System

This repository uses a dynamic content injection system to automatically update the README.md file with the latest rules from `latest.md`.

## How It Works

1. **Source File**: `latest.md` contains the current version of the Windsurf rules
2. **Target File**: `README.md` gets automatically updated with content from `latest.md`
3. **Update Script**: `update-readme.js` handles the content injection
4. **Automation**: GitHub Actions and shell scripts provide automated updates

## Files Overview

### Core Files
- `latest.md` - The source of truth for current rules
- `README.md` - Auto-generated file with injected content
- `update-readme.js` - Node.js script that performs the content injection

### Automation Files
- `update.sh` - Shell script for manual updates
- `package.json` - Node.js project configuration with npm scripts
- `.github/workflows/update-readme.yml` - GitHub Actions workflow

## Usage

### Manual Update
```bash
# Option 1: Use the shell script
./update.sh

# Option 2: Use npm script
npm run update-readme

# Option 3: Run Node.js script directly
node update-readme.js
```

### Automatic Updates
- **GitHub Actions**: Automatically triggers when `latest.md` is modified
- **Pre-deploy Hook**: Runs `npm run predeploy` which updates the README

## Content Injection Process

1. The script reads `latest.md` and extracts:
   - The full content
   - The date from the title (e.g., "July 28, 2025")

2. It updates the README.md by:
   - Updating the main title with the latest date
   - Updating the version badge
   - Replacing content between markers with the latest rules

3. Content is injected between these markers:
   - Start: `## Complete Rules Content`
   - End: `<!-- END_DYNAMIC_RULES -->`

## Markers System

The README uses HTML comments as markers to define where dynamic content should be injected:

```markdown
## Complete Rules Content

[DYNAMIC CONTENT GETS INJECTED HERE]

<!-- END_DYNAMIC_RULES -->
```

## Benefits

1. **Single Source of Truth**: Only `latest.md` needs to be updated
2. **Automatic Synchronization**: README stays in sync with latest rules
3. **Version Control**: All changes are tracked in git
4. **CI/CD Integration**: Works with deployment pipelines
5. **Manual Override**: Can be run manually when needed

## Troubleshooting

### Common Issues

1. **Missing Markers**: Ensure `<!-- END_DYNAMIC_RULES -->` exists in README.md
2. **Node.js Not Found**: Install Node.js 18+ 
3. **File Not Found**: Ensure both `latest.md` and `README.md` exist
4. **Permission Issues**: Make sure `update.sh` is executable (`chmod +x update.sh`)

### Debug Mode
The script provides detailed console output showing:
- Source file being read
- Date extracted from rules
- Update timestamp
- Success/failure status

## Customization

To modify the injection behavior, edit `update-readme.js`:

- Change `RULES_START_MARKER` to modify where content injection begins
- Change `RULES_END_MARKER` to modify where content injection ends
- Modify the date extraction logic in `extractRulesContent()`
- Adjust the title/badge update logic in `updateReadme()`
