# Stack & Preferences

## Core Technology Stack

### AI & LLM Services
- **OpenRouter** - Preferred backend for cloud LLM access
- **OpenAI** - Fallback when OpenRouter adds complexity
- **Ollama** - Local LLM deployment (Llama 3.2 preferred)
- **Hugging Face** - Creating copies of datasets

### Cloud Services
- **Wasabi** - Cloud storage solution
- **Netlify** - Web deployment and hosting
- **Cloudflare** - DNS management and tunneling

### Development Tools
- **UV** - Python environment management (primary)
- **YADM** - Dotfiles and configuration versioning
- **GitHub** - Repository management and version control

### Repository Philosophy
- **Default to private** - Keep repositories private unless there's a specific reason for public access
- **Backup-first approach** - Strong preference for local backups of all important data

## Tool Priorities

### Python Development
1. **UV** (primary environment manager)
2. Regular `venv` (fallback for compatibility issues)

### Data Management
- **Local backups** are essential - always ensure local copies exist
- **Hugging Face** for dataset management and sharing
- **Wasabi** for cloud storage needs

### Deployment Pipeline
- **Netlify** for static sites and web applications
- **Cloudflare** for DNS and traffic management
- **GitHub** for source control and CI/CD

## Privacy & Security Preferences
- **Private by default** - All repositories should be private unless explicitly needed public
- **Local backup strategy** - Maintain local copies of critical data and configurations
- **Authenticated CLIs** - Use properly authenticated tools for secure operations
