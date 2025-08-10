# Windsurf Rules

![Windsurf](https://img.shields.io/badge/Windsurf-AI%20Assistant-blue?style=flat-square)
![License](https://img.shields.io/badge/License-Personal%20Use-orange?style=flat-square)
![Ubuntu](https://img.shields.io/badge/Ubuntu-25.04-E95420?style=flat-square&logo=ubuntu)

This repository contains my evolving Windsurf rules with automatic version tracking. The README dynamically displays all versions from newest to oldest.

## Table of Contents

- [About](#about)
- [Usage](#usage)
- [File Location](#file-location)
- [Latest Version](#latest-version)

## About

The Windsurf rules that I work with have to be evolving given that the tool itself evolves so quickly. This repository tracks all versions of my rules, with the latest version always available in `latest.md` and historical versions archived for reference.

## Usage

These rules are designed to be used with Windsurf's memory system to provide consistent context and behavior across sessions.

## File Location

The main rules file should be placed at: `~/.codeium/windsurf/memories/global_rules.md`



## Core Context

# User Profile

## Basic Information
- **User**: Daniel Rosehill ([danielrosehill.com](https://danielrosehill.com))
- **Location**: Jerusalem, Israel
- **Environment**: Kubuntu 25.04 desktop
- **Privileges**: Full sudo access. Assume permission to invoke.

## Network Context
- **LAN Network**: 10.0.0.0/24
- **SSH**: Key-based access to LAN devices is preconfigured
- **Development Location**: Home (on the LAN)
- **External Networks**: Will inform when using Cloudflare IPs and Tailscale endpoints

# System Specifications

## Core System
- **OS**: Kubuntu (Ubuntu + KDE Plasma), Latest release
- **Filesystem**: BTRFS + RAID5, 5 physical drives in array

## Hardware

### CPU
- **Model**: Intel Core i7-12700F
- **Cores**: 12 cores / 20 threads

### GPU
- **Model**: AMD Radeon RX 7700 XT (gfx1101 / Navi 32)
- **Driver**: `amdgpu`
- **ROCM**: Installed (important for LLM development and local AI tasks)

### Memory
- **RAM**: 64 GB Installed

### Network
- **Interface**: `enp6s0`
- **LAN IP**: 10.0.0.6

### Motherboard
- **Model**: MSI PRO B760M-A WIFI (MS-7D99)

# Network Configuration

## LAN IP Map

Use the following IP references unless Daniel indicates he is off the home LAN, in which case assume these are unavailable or use Tailnet alternatives.

| IP Address | Hostname         | Description                         |
| ---------- | ---------------- | ----------------------------------- |
| 10.0.0.1   | `opnsense`       | Gateway / Router                    |
| 10.0.0.2   | `proxmox-host`   | Proxmox (Ubuntu VM & HA containers) |
| 10.0.0.3   | `home-assistant` | Home Assistant OS                   |
| 10.0.0.4   | `home-server`    | Ubuntu VM (core services host)      |
| 10.0.0.50  | `synology`       | Synology NAS (DS920+)               |

## Network Context
- **Primary Development**: Home LAN (10.0.0.0/24)
- **External Access**: Cloudflare IPs and Tailscale endpoints when off-site
- **Local IP**: 10.0.0.6 (`enp6s0` interface)

## Technology Infrastructure

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

# Project Preferences

## AI Projects
Daniel frequently works on AI projects with these preferences:

### LLM Backends
- **Primary**: OpenRouter (preferred for cloud LLM access)
- **Fallback**: OpenAI (when OpenRouter adds unnecessary complexity)
- **Local**: Ollama is installed
- **Local Model**: Favor Llama 3.2 for general-purpose local tasks

### API Management
- API keys are on path
- Open Password is available via CLI
- Try to use Open Password wherever possible to save and read secrets

## Containerization & Deployment
- Docker is installed and available
- Use Docker to create working prototypes of services
- Create replicable deployment processes for both LAN VMs and remote targets

## Deployment Targets
- **LAN VMs**: Local development and testing
- **Remote**: Production deployments
- Focus on creating consistent, reproducible processes

## Cloudflare Tunnels

### Default Assumption
Unless otherwise instructed, assume Daniel will be placing deployed services and tools behind Cloudflare authentication.

### Setup Method

#### 1. Cloudflare Container
- Every environment has a cloudflare container
- Runs a remotely managed network
- **Do not attempt to set up or edit it locally**
- Container has a network called `cloudflared`

#### 2. Service Routing
To ensure services can be routed to:

1. **Add cloudflared as an external network attachment**
2. **Give containers a unique hostname** for routing
   - Example: `crm:80` for a CRM service on port 80

### Network Architecture
- Services connect to the `cloudflared` network
- Routing happens via unique hostnames
- Authentication handled by Cloudflare

## Operational Guidelines

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

# Prioritisation Instructions

These guidelines instruct on how to handle tool selection in instances in which you have overlapping resources to achieve an outcome. 

## Scrape before using headless browsers

If Daniel prompts something like: "this URL has the API context that we need" then you should scape that content (for example using Firecrawl MCP or similar). Only if that approach proves unfruitful should you move to using headless browsers to attempt to extract the documentation.

# Documentation Guidelines

## Core Principle
**Less is more** - Only contribute to existing docs or add new docs if they would be helpful. Don't create documentation just for the sake of it.

## Repository Context
Unless otherwise instructed, assume these are **private repositories and projects**. Don't create general purpose README docs unless Daniel explicitly wants that.

## Documentation Types

### 1. Session Logs
Provide notes about what was achieved during a lengthy editing session:
- Date and summary
- What's blocking progress
- What was accomplished
- Next steps

### 2. Reference Documentation
Daniel may import this into a wiki for future reference:
- Use descriptive subfolders like 'instructions'
- Focus on how to use and maintain what you created
- Make it searchable and organized

### 3. Architecture & Design Reference
When it took significant effort to figure out an approach:
- High-level overview of the solution
- Key decisions and rationale
- Implementation patterns used

## Structure Guidelines
- Nest docs at `/docs` relative to repo root
- Use clear subfolder organization
- Make documentation self-contained and useful for future reference

## Workflow Management

# MCP Handling

## Configuration Location
MCPs are stored here: `/home/daniel/.codeium/windsurf/mcp_config.json`

## Best Practices

### Tool Limit Management
- Windsurf has a limit of **100 active tools**
- Be proactive in supporting Daniel to prune unused MCPs
- Quality over quantity - activate tools judiciously

### Priority Hierarchy
When you could achieve a task through multiple methods:

1. **MCP** (preferred)
2. SSH into server
3. Direct CLI invocation

Always favor using MCPs when available.

### Clarification Protocol
- Ask Daniel to clarify the purpose of an MCP if you're unsure
- Don't assume functionality - verify before using

## AI Workspace Structure
Within every project, you may wish to configure and use a folder structure to receive instructions from Daniel and write them back to him. If this is partially set up, finish it and use it.

Paths are relative to the repo base:

| Path                        | Purpose                               |
| --------------------------- | ------------------------------------- |
| `/ai-workspace/for-ai/`     | Assistant input (logs, prompts, etc.) |
| `/ai-workspace/for-daniel/` | Assistant output, notes, logs, docs   |

## Usage Guidelines
- Use `/for-daniel/` for procedures, logs, and internal docs
- Complete partially set up workspace structures
- Follow the established pattern when it exists

## Execution Policy

### Core Principle
Follow Daniel's instructions closely. You may suggest enhancements but **never independently action your ideas unless Daniel approves of them**.

### Workflow
1. **Listen** - Understand the specific request
2. **Suggest** - Offer improvements or alternatives if relevant
3. **Wait** - Get approval before implementing suggestions
4. **Execute** - Follow through on approved actions

### Guidelines
- Prioritize Daniel's explicit instructions
- Suggestions should enhance, not replace, the requested work
- Always seek approval for independent ideas
- Focus on delivering what was asked for first

## Implicit Instructions

### Auto-Detection Files
If the following files exist in the repo root, treat them as current task definitions:

- `instructions.md`
- `prompt.md` 
- `task.md`

### Behavior
- **Read and follow** these files without asking
- **Only ask for clarification** if ambiguity exists
- **Prioritize** these instructions when present
- **Check repo root** at the start of new projects

---

*Rules constructed on 2025-08-10 00:56:03 using intelligent LLM organization*
*Organization strategy: Organized content in a logical progression from foundational context to specific operational details. Grouped blocks into 4 main sections: Core Context, Technology & Infrastructure, Operational Guidelines, and Workflow Management. This structure ensures the AI first understands who it's working with and their environment, then learns technical preferences, followed by operational rules and specific workflow details.*

## Core Context

# User Profile

## Basic Information
- **User**: Daniel Rosehill ([danielrosehill.com](https://danielrosehill.com))
- **Location**: Jerusalem, Israel
- **Environment**: Kubuntu 25.04 desktop
- **Privileges**: Full sudo access. Assume permission to invoke.

## Network Context
- **LAN Network**: 10.0.0.0/24
- **SSH**: Key-based access to LAN devices is preconfigured
- **Development Location**: Home (on the LAN)
- **External Networks**: Will inform when using Cloudflare IPs and Tailscale endpoints

# System Specifications

## Core System
- **OS**: Kubuntu (Ubuntu + KDE Plasma), Latest release
- **Filesystem**: BTRFS + RAID5, 5 physical drives in array

## Hardware

### CPU
- **Model**: Intel Core i7-12700F
- **Cores**: 12 cores / 20 threads

### GPU
- **Model**: AMD Radeon RX 7700 XT (gfx1101 / Navi 32)
- **Driver**: `amdgpu`
- **ROCM**: Installed (important for LLM development and local AI tasks)

### Memory
- **RAM**: 64 GB Installed

### Network
- **Interface**: `enp6s0`
- **LAN IP**: 10.0.0.6

### Motherboard
- **Model**: MSI PRO B760M-A WIFI (MS-7D99)

# Network Configuration

## LAN IP Map

Use the following IP references unless Daniel indicates he is off the home LAN, in which case assume these are unavailable or use Tailnet alternatives.

| IP Address | Hostname         | Description                         |
| ---------- | ---------------- | ----------------------------------- |
| 10.0.0.1   | `opnsense`       | Gateway / Router                    |
| 10.0.0.2   | `proxmox-host`   | Proxmox (Ubuntu VM & HA containers) |
| 10.0.0.3   | `home-assistant` | Home Assistant OS                   |
| 10.0.0.4   | `home-server`    | Ubuntu VM (core services host)      |
| 10.0.0.50  | `synology`       | Synology NAS (DS920+)               |

## Network Context
- **Primary Development**: Home LAN (10.0.0.0/24)
- **External Access**: Cloudflare IPs and Tailscale endpoints when off-site
- **Local IP**: 10.0.0.6 (`enp6s0` interface)

## Technology Infrastructure

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

# Project Preferences

## AI Projects
Daniel frequently works on AI projects with these preferences:

### LLM Backends
- **Primary**: OpenRouter (preferred for cloud LLM access)
- **Fallback**: OpenAI (when OpenRouter adds unnecessary complexity)
- **Local**: Ollama is installed
- **Local Model**: Favor Llama 3.2 for general-purpose local tasks

### API Management
- API keys are on path
- Open Password is available via CLI
- Try to use Open Password wherever possible to save and read secrets

## Containerization & Deployment
- Docker is installed and available
- Use Docker to create working prototypes of services
- Create replicable deployment processes for both LAN VMs and remote targets

## Deployment Targets
- **LAN VMs**: Local development and testing
- **Remote**: Production deployments
- Focus on creating consistent, reproducible processes

## Cloudflare Tunnels

### Default Assumption
Unless otherwise instructed, assume Daniel will be placing deployed services and tools behind Cloudflare authentication.

### Setup Method

#### 1. Cloudflare Container
- Every environment has a cloudflare container
- Runs a remotely managed network
- **Do not attempt to set up or edit it locally**
- Container has a network called `cloudflared`

#### 2. Service Routing
To ensure services can be routed to:

1. **Add cloudflared as an external network attachment**
2. **Give containers a unique hostname** for routing
   - Example: `crm:80` for a CRM service on port 80

### Network Architecture
- Services connect to the `cloudflared` network
- Routing happens via unique hostnames
- Authentication handled by Cloudflare

## Operational Guidelines

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

# Prioritisation Instructions

These guidelines instruct on how to handle tool selection in instances in which you have overlapping resources to achieve an outcome. 

## Scrape before using headless browsers

If Daniel prompts something like: "this URL has the API context that we need" then you should scape that content (for example using Firecrawl MCP or similar). Only if that approach proves unfruitful should you move to using headless browsers to attempt to extract the documentation.

# Documentation Guidelines

## Core Principle
**Less is more** - Only contribute to existing docs or add new docs if they would be helpful. Don't create documentation just for the sake of it.

## Repository Context
Unless otherwise instructed, assume these are **private repositories and projects**. Don't create general purpose README docs unless Daniel explicitly wants that.

## Documentation Types

### 1. Session Logs
Provide notes about what was achieved during a lengthy editing session:
- Date and summary
- What's blocking progress
- What was accomplished
- Next steps

### 2. Reference Documentation
Daniel may import this into a wiki for future reference:
- Use descriptive subfolders like 'instructions'
- Focus on how to use and maintain what you created
- Make it searchable and organized

### 3. Architecture & Design Reference
When it took significant effort to figure out an approach:
- High-level overview of the solution
- Key decisions and rationale
- Implementation patterns used

## Structure Guidelines
- Nest docs at `/docs` relative to repo root
- Use clear subfolder organization
- Make documentation self-contained and useful for future reference

## Workflow Management

# MCP Handling

## Configuration Location
MCPs are stored here: `/home/daniel/.codeium/windsurf/mcp_config.json`

## Best Practices

### Tool Limit Management
- Windsurf has a limit of **100 active tools**
- Be proactive in supporting Daniel to prune unused MCPs
- Quality over quantity - activate tools judiciously

### Priority Hierarchy
When you could achieve a task through multiple methods:

1. **MCP** (preferred)
2. SSH into server
3. Direct CLI invocation

Always favor using MCPs when available.

### Clarification Protocol
- Ask Daniel to clarify the purpose of an MCP if you're unsure
- Don't assume functionality - verify before using

## AI Workspace Structure
Within every project, you may wish to configure and use a folder structure to receive instructions from Daniel and write them back to him. If this is partially set up, finish it and use it.

Paths are relative to the repo base:

| Path                        | Purpose                               |
| --------------------------- | ------------------------------------- |
| `/ai-workspace/for-ai/`     | Assistant input (logs, prompts, etc.) |
| `/ai-workspace/for-daniel/` | Assistant output, notes, logs, docs   |

## Usage Guidelines
- Use `/for-daniel/` for procedures, logs, and internal docs
- Complete partially set up workspace structures
- Follow the established pattern when it exists

## Execution Policy

### Core Principle
Follow Daniel's instructions closely. You may suggest enhancements but **never independently action your ideas unless Daniel approves of them**.

### Workflow
1. **Listen** - Understand the specific request
2. **Suggest** - Offer improvements or alternatives if relevant
3. **Wait** - Get approval before implementing suggestions
4. **Execute** - Follow through on approved actions

### Guidelines
- Prioritize Daniel's explicit instructions
- Suggestions should enhance, not replace, the requested work
- Always seek approval for independent ideas
- Focus on delivering what was asked for first

## Implicit Instructions

### Auto-Detection Files
If the following files exist in the repo root, treat them as current task definitions:

- `instructions.md`
- `prompt.md` 
- `task.md`

### Behavior
- **Read and follow** these files without asking
- **Only ask for clarification** if ambiguity exists
- **Prioritize** these instructions when present
- **Check repo root** at the start of new projects

---

*Rules constructed on 2025-08-10 00:56:03 using intelligent LLM organization*
*Organization strategy: Organized content in a logical progression from foundational context to specific operational details. Grouped blocks into 4 main sections: Core Context, Technology & Infrastructure, Operational Guidelines, and Workflow Management. This structure ensures the AI first understands who it's working with and their environment, then learns technical preferences, followed by operational rules and specific workflow details.*

## Latest Version

*Last updated: 2025-08-10 15:29:14*

# Windsurf Rules - August 10, 2025

These guidelines should guide your work with the user, Daniel:

# User Profile

## Basic Information
- **User**: Daniel Rosehill ([danielrosehill.com](https://danielrosehill.com))
- **Location**: Jerusalem, Israel
- **Environment**: Kubuntu 25.04 desktop
- **Privileges**: Full sudo access. Assume permission to invoke.

## Network Context
- **LAN Network**: 10.0.0.0/24
- **SSH**: Key-based access to LAN devices is preconfigured
- **Development Location**: Home (on the LAN)
- **External Networks**: Will inform when using Cloudflare IPs and Tailscale endpoints

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

# Documentation Guidelines

## Core Principle
**Less is more** - Only contribute to existing docs or add new docs if they would be helpful. Don't create documentation just for the sake of it.

## Repository Context
Unless otherwise instructed, assume these are **private repositories and projects**. Don't create general purpose README docs unless Daniel explicitly wants that.

## Documentation Types

### 1. Session Logs
Provide notes about what was achieved during a lengthy editing session:
- Date and summary
- What's blocking progress
- What was accomplished
- Next steps

### 2. Reference Documentation
Daniel may import this into a wiki for future reference:
- Use descriptive subfolders like 'instructions'
- Focus on how to use and maintain what you created
- Make it searchable and organized

### 3. Architecture & Design Reference
When it took significant effort to figure out an approach:
- High-level overview of the solution
- Key decisions and rationale
- Implementation patterns used

## Structure Guidelines
- Nest docs at `/docs` relative to repo root
- Use clear subfolder organization
- Make documentation self-contained and useful for future reference

# Infrastructure & Deployment

## Containerization & Deployment
- Docker is installed and available
- Use Docker to create working prototypes of services
- Create replicable deployment processes for both LAN VMs and remote targets

## Deployment Targets
- **LAN VMs**: Local development and testing
- **Remote**: Production deployments
- Focus on creating consistent, reproducible processes

## Cloudflare Tunnels

### Default Assumption
Unless otherwise instructed, assume Daniel will be placing deployed services and tools behind Cloudflare authentication.

### Setup Method

#### 1. Cloudflare Container
- Every environment has a cloudflare container
- Runs a remotely managed network
- **Do not attempt to set up or edit it locally**
- Container has a network called `cloudflared`

#### 2. Service Routing
To ensure services can be routed to:

1. **Add cloudflared as an external network attachment**
2. **Give containers a unique hostname** for routing
   - Example: `crm:80` for a CRM service on port 80

### Network Architecture
- Services connect to the `cloudflared` network
- Routing happens via unique hostnames
- Authentication handled by Cloudflare

# LLM Preferences

These instructions guide the specific LLM that you should choose for AI projects.

## Local or cloud?

Unless there is compelling reason to use a local LLM, use a cloud one. 

For local - ollama is available. See what models are there. If you think one is missing that would improve inference, download it. 

## Cost efficient model

For cost-efficient workloads (high reasoning or complex capabilities not needed) use GPT5.1-mini from OpenAI. Use OpenRouter for access.

## Higher reasoning models

Use Sonnet 4 or Gemini 2.5.

# MCP Handling

## Configuration Location
MCPs are stored here: `/home/daniel/.codeium/windsurf/mcp_config.json`

## Development Location
Create MCP servers at: `~/mcp`

## Best Practices

### Tool Limit Management
- Windsurf has a limit of **100 active tools**
- Be proactive in supporting Daniel to prune unused MCPs
- Quality over quantity - activate tools judiciously

### Priority Hierarchy
When you could achieve a task through multiple methods:

1. **MCP** (preferred)
2. SSH into server
3. Direct CLI invocation

Always favor using MCPs when available.

### Clarification Protocol
- Ask Daniel to clarify the purpose of an MCP if you're unsure
- Don't assume functionality - verify before using

## Development Guidelines

When developing new MCP servers:
- Place them in `~/mcp/`
- Follow Daniel's existing patterns
- Document tool capabilities clearly
- Consider tool count impact on the 100-tool limit

# Network Configuration

## LAN IP Map

Use the following IP references unless Daniel indicates he is off the home LAN, in which case assume these are unavailable or use Tailnet alternatives.

| IP Address | Hostname         | Description                         |
| ---------- | ---------------- | ----------------------------------- |
| 10.0.0.1   | `opnsense`       | Gateway / Router                    |
| 10.0.0.2   | `proxmox-host`   | Proxmox (Ubuntu VM & HA containers) |
| 10.0.0.3   | `home-assistant` | Home Assistant OS                   |
| 10.0.0.4   | `home-server`    | Ubuntu VM (core services host)      |
| 10.0.0.50  | `synology`       | Synology NAS (DS920+)               |

## Network Context
- **Primary Development**: Home LAN (10.0.0.0/24)
- **External Access**: Cloudflare IPs and Tailscale endpoints when off-site
- **Local IP**: 10.0.0.6 (`enp6s0` interface)

# Prioritisation Instructions

These guidelines instruct on how to handle tool selection in instances in which you have overlapping resources to achieve an outcome. 

## Scrape before using headless browsers

If Daniel prompts something like: "this URL has the API context that we need" then you should scape that content (for example using Firecrawl MCP or similar). Only if that approach proves unfruitful should you move to using headless browsers to attempt to extract the documentation.

# Project Preferences

## AI Projects
Daniel frequently works on AI projects with these preferences:

### LLM Backends
- **Primary**: OpenRouter (preferred for cloud LLM access)
- **Fallback**: OpenAI (when OpenRouter adds unnecessary complexity)
- **Local**: Ollama is installed
- **Local Model**: Favor Llama 3.2 for general-purpose local tasks

### API Management
- API keys are on path
- Open Password is available via CLI
- Try to use Open Password wherever possible to save and read secrets

## Development Stack
- **Containerization**: Docker installed for prototypes
- **Python**: uv for virtual environments (fallback to regular venv if issues)
- **GUI**: PySide6, Tauri, Qt, or Electron for modern interfaces
- **Static Sites**: Netlify (CLI authenticated)

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

# System Specifications

## Core System
- **OS**: Kubuntu (Ubuntu + KDE Plasma), Latest release
- **Filesystem**: BTRFS + RAID5, 5 physical drives in array

## Hardware

### CPU
- **Model**: Intel Core i7-12700F
- **Cores**: 12 cores / 20 threads

### GPU
- **Model**: AMD Radeon RX 7700 XT (gfx1101 / Navi 32)
- **Driver**: `amdgpu`
- **ROCM**: Installed (important for LLM development and local AI tasks)

### Memory
- **RAM**: 64 GB Installed

### Network
- **Interface**: `enp6s0`
- **LAN IP**: 10.0.0.6

### Motherboard
- **Model**: MSI PRO B760M-A WIFI (MS-7D99)

# Workflow & Execution

## AI Workspace Structure
Within every project, you may wish to configure and use a folder structure to receive instructions from Daniel and write them back to him. If this is partially set up, finish it and use it.

Paths are relative to the repo base:

| Path                        | Purpose                               |
| --------------------------- | ------------------------------------- |
| `/ai-workspace/for-ai/`     | Assistant input (logs, prompts, etc.) |
| `/ai-workspace/for-daniel/` | Assistant output, notes, logs, docs   |

## Usage Guidelines
- Use `/for-daniel/` for procedures, logs, and internal docs
- Complete partially set up workspace structures
- Follow the established pattern when it exists

## Execution Policy

### Core Principle
Follow Daniel's instructions closely. You may suggest enhancements but **never independently action your ideas unless Daniel approves of them**.

### Workflow
1. **Listen** - Understand the specific request
2. **Suggest** - Offer improvements or alternatives if relevant
3. **Wait** - Get approval before implementing suggestions
4. **Execute** - Follow through on approved actions

### Guidelines
- Prioritize Daniel's explicit instructions
- Suggestions should enhance, not replace, the requested work
- Always seek approval for independent ideas
- Focus on delivering what was asked for first

## Implicit Instructions

### Auto-Detection Files
If the following files exist in the repo root, treat them as current task definitions:

- `instructions.md`
- `prompt.md` 
- `task.md`

### Behavior
- **Read and follow** these files without asking
- **Only ask for clarification** if ambiguity exists
- **Prioritize** these instructions when present
- **Check repo root** at the start of new projects

---

*Rules constructed on 2025-08-10 15:29:10 using intelligent LLM organization*
*Organization strategy: Fallback to original numerical order due to LLM error*
