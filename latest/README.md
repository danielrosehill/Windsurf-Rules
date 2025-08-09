# Latest Rules Management

This directory contains the current version of your Windsurf rules in a modular block system.

## Structure

- `latest.md` - The compiled rules file (auto-generated)
- `blocks/` - Ordered rule blocks that make up your current rules

## Block System

Blocks are processed in numerical order:
- `1-about-me.md` - Personal profile and environment
- `2-system-specs.md` - Hardware specifications
- `3-network-config.md` - Network and infrastructure
- `4-stack-preferences.md` - Technology stack choices
- `5-project-preferences.md` - Development preferences
- `6-documentation.md` - Documentation guidelines
- `7-mcp-handling.md` - MCP management
- `8-workflow.md` - Workspace and execution policies
- `9-infrastructure.md` - Docker, Cloudflare, deployment
- `10-conventions.md` - Python, CLI tools, file hygiene

## Usage

1. **Edit blocks** - Modify individual numbered blocks in `blocks/`
2. **Build rules** - Run `../scripts/build-latest.sh` to compile into `latest.md`
3. **Archive version** - Run `../scripts/archive-version.sh` to save timestamped copy

## Difference from Snippets

- **Snippets** (`../snippets/`) - Reusable components for sharing
- **Blocks** (`blocks/`) - Your personal, ordered rule components
