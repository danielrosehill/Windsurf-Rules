# Conventions & Tools

## Python Conventions

### Virtual Environment Management
- **Primary**: Use `uv` to create virtual environments
- **Fallback**: Switch to regular `venv` if running into package difficulties

### Environment Activation
- **Always activate** the environment after creating it
- **Verify activation** before attempting to run scripts
- **First troubleshooting step**: Check if virtual environment is active when encountering package availability errors

### Best Practices
- Ensure environment is active before running any Python scripts
- If package errors occur, verify environment activation first
- Use uv unless specific compatibility issues arise

## CLI Tools & Authentication

### Authenticated CLIs
The following tools are installed and authenticated:

- **`gh`** - GitHub CLI
- **`wrangler`** - Cloudflare CLI
- **`b2`** - Backblaze B2 object storage
- **`wasabi`** - Wasabi object storage
- **`op`** - 1Password CLI for secrets management
- **Netlify CLI** - Static site deployment (authenticated)

### Deployment Guidelines
- **Static sites**: Deploy through Netlify CLI
- **Do not deploy via Windsurf** - use dedicated CLIs instead

### Secrets Management
- Use `op` (1Password CLI) for secure secret handling
- API keys are available on path
- Prefer Open Password for saving and reading secrets

## File Hygiene & Structure

### Repository Organization
Daniel likes to keep organized file repositories.

### Script Management
- **Avoid generating many single-purpose scripts**
- If you can run commands directly, prefer that approach
- Consolidate related functionality when possible

### Proactive Cleanup
- Consider initiating repository cleanups during lengthy sessions
- Clean up throughout a project lifecycle
- Maintain organized structure as work progresses

### Privacy Considerations
- **Default assumption**: Private repositories
- **Public repos**: Don't expose secrets or PII
- Flag any private information encountered in public contexts

### Repository Hygiene
- Keep file structure logical and navigable
- Remove unused files and scripts
- Organize related files into appropriate directories
