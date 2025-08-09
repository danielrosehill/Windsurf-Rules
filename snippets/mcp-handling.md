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
