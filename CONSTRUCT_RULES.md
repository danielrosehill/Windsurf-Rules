# Intelligent Rules Constructor

This script (`construct_rules.py`) uses an LLM to intelligently organize and construct the Windsurf rules from individual blocks, optimizing the structure for maximum effectiveness as a system prompt.

## Features

- **LLM-Powered Organization**: Uses Claude 3.5 Sonnet or GPT-4 to analyze blocks and determine optimal ordering
- **Intelligent Grouping**: Groups related concepts together for better cognitive flow
- **Psychological Optimization**: Orders content from foundational context to specific operational details
- **Fallback Support**: Falls back to numerical ordering if LLM analysis fails
- **1Password Integration**: Can automatically retrieve API keys from 1Password CLI

## Usage

### Basic Usage
```bash
python3 construct_rules.py --openrouter-key "your-key-here"
```

### With 1Password
```bash
python3 construct_rules.py --use-1password
```

### With OpenAI instead of OpenRouter
```bash
python3 construct_rules.py --openai-key "your-openai-key"
```

## How It Works

1. **Load Blocks**: Reads all `.md` files from `latest/blocks/`
2. **LLM Analysis**: Sends block summaries to LLM for intelligent organization
3. **Structure Optimization**: LLM determines:
   - Optimal ordering for maximum impact
   - Logical grouping of related concepts
   - Psychological flow (foundational → specific)
4. **Construction**: Builds the final `latest.md` with:
   - Intelligent section grouping
   - Reasoning comments for each block placement
   - Organization strategy documentation

## Organization Strategy

The LLM follows these principles:

- **Start with foundational context** (who the user is, their environment)
- **Follow with preferences and constraints** that guide behavior  
- **End with specific operational details** and conventions
- **Group related concepts** together
- **Consider cognitive load** - don't overwhelm with detail upfront
- **Position critical information** for maximum retention

## Requirements

- Python 3.7+
- `openai` package (`pip install openai`)
- OpenRouter or OpenAI API key
- Optional: 1Password CLI for key management

## Output

Generates `latest.md` with:
- Timestamp header
- Organization strategy comments
- Intelligently grouped and ordered content
- Block placement reasoning
- Construction metadata footer

The result is a more effective system prompt that flows logically from context to specifics.
