# CLI Tools & Authentication

## Authenticated CLIs
The following tools are installed and authenticated:

- **`gh`** - GitHub CLI
- **`wrangler`** - Cloudflare CLI
- **`b2`** - Backblaze B2 object storage
- **`wasabi`** - Wasabi object storage
- **`op`** - 1Password CLI for secrets management
- **Netlify CLI** - Static site deployment (authenticated)

## Deployment Guidelines
- **Static sites**: Deploy through Netlify CLI
- **Do not deploy via Windsurf** - use dedicated CLIs instead

## Secrets Management
- Use `op` (1Password CLI) for secure secret handling
- API keys are available on path
- Prefer Open Password for saving and reading secrets
