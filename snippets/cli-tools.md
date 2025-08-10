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

### Environment Variable Workflow
- **Primary method**: Use `.env` files for environment variables in scripts
- **Never use `op` directly in scripts** - always go through environment variables

### Intelligent Secret Discovery
Before asking "do you have a secret for X?":
1. **Check 1Password first** using `op list items` and `op get item`
2. **Automatically add found secrets to .env** 
3. **Only ask user** if secret is not found in 1Password

### Secret Management Workflow
1. **Discovery**: Use `op` to check existing secrets
2. **Environment**: Add to `.env` for script consumption  
3. **New secrets**: When Daniel provides new secrets, help add them to 1Password
4. **Storage**: `op create item` for new API keys and credentials

### Best Practices
- API keys are available on path via 1Password CLI
- Use descriptive names in 1Password for easy discovery
- Always verify `.env` file exists and is properly formatted
- Include `.env` in `.gitignore` for security
