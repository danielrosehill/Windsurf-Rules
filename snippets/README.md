# Windsurf Rules Snippets

This directory contains modular components of the Windsurf rules that can be mixed and matched or updated independently.

## Structure

### Core Components
- `user-profile.md` - Basic user information and environment
- `system-specs.md` - Hardware and system specifications
- `network-config.md` - LAN IP mappings and network setup

### Development Preferences
- `stack-preferences.md` - Core technology stack and service preferences
- `project-preferences.md` - AI projects and tool preferences
- `documentation-guidelines.md` - How to create helpful documentation
- `python-conventions.md` - Python development standards

### Infrastructure & Tools
- `mcp-handling.md` - MCP server management and best practices
- `containerization.md` - Docker and deployment guidelines
- `cloudflare-tunnels.md` - Cloudflare setup and routing
- `cli-tools.md` - Available CLIs and authentication status

### Workflow
- `ai-workspace.md` - Standard project folder structure
- `file-hygiene.md` - Repository organization principles
- `execution-policy.md` - How to follow instructions and suggest improvements
- `implicit-instructions.md` - Auto-detection of task files

## Usage

These snippets can be:
1. **Combined** into a complete rules file
2. **Updated independently** when specific areas change
3. **Mixed and matched** for different contexts or projects
4. **Version controlled** separately to track changes in specific areas

## Building Complete Rules

Use the build script to combine snippets:

```bash
./scripts/build-from-snippets.sh
```
