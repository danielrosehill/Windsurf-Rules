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
