# Automated README System

This repository now uses an automated system to keep the README.md synchronized with the latest rules.

## How It Works

### 1. Rules Construction
- Run `python3 construct_rules.py --use-1password` to generate new rules
- Script uses LLM intelligence to organize blocks optimally
- Overwrites `latest.md` with the new version
- Creates timestamped archive in `archived-versions/0825/`

### 2. README Injection
- Pre-push Git hook automatically runs `scripts/inject-latest-to-readme.py`
- Removes old versions table and development sections
- Injects current `latest.md` content into README.md
- Adds timestamp for when the injection occurred

### 3. Git Integration
- Pre-push hook ensures README is always current
- Automatically commits updated README if changes detected
- No manual intervention required

## Files

- `construct_rules.py` - Main rules constructor with LLM organization
- `scripts/inject-latest-to-readme.py` - README injection script
- `.git/hooks/pre-push` - Git hook for automation
- `latest.md` - Always contains current rules
- `archived-versions/0825/rules_YYYYMMDD_HHMMSS.md` - Timestamped archives

## Benefits

- ✅ README always shows current rules
- ✅ No manual version table maintenance
- ✅ Automatic archiving with timestamps
- ✅ LLM-optimized rule organization
- ✅ Clean, professional output
- ✅ Zero maintenance overhead

## Usage

Just run your normal Git workflow - the automation handles everything:

```bash
# Generate new rules (when needed)
python3 construct_rules.py --use-1password

# Normal Git workflow - automation kicks in
git add .
git commit -m "Updated rules"
git push  # <- Pre-push hook automatically updates README
```
