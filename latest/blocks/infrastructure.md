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
