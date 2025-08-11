#!/usr/bin/env python3
"""
Intelligent Windsurf Rules Constructor

This script uses an LLM to intelligently organize and construct the Windsurf rules
from individual blocks, optimizing the structure for maximum effectiveness as a system prompt.
"""

import os
import glob
from pathlib import Path
from datetime import datetime
import openai
from openai import OpenAI
import argparse
import json

class RulesConstructor:
    def __init__(self, openrouter_key=None, openai_key=None):
        """Initialize the constructor with API credentials."""
        self.blocks_dir = Path("latest/blocks")
        self.output_file = Path("latest.md")
        self.timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Try to get API keys from environment or 1Password - prioritize OpenAI
        if openai_key:
            self.client = OpenAI(api_key=openai_key)
            self.model = "gpt-5-mini-2025-08-07"
        elif openrouter_key:
            self.client = OpenAI(
                base_url="https://openrouter.ai/api/v1",
                api_key=openrouter_key
            )
            self.model = "anthropic/claude-3.5-sonnet-20241022"
        else:
            # Try to get from environment - prioritize OpenAI
            openai_key = os.getenv('OPENAI_API_KEY')
            openrouter_key = os.getenv('OPENROUTER_API_KEY')
            
            if openai_key:
                self.client = OpenAI(api_key=openai_key)
                self.model = "gpt-5-mini-2025-08-07"
            elif openrouter_key:
                self.client = OpenAI(
                    base_url="https://openrouter.ai/api/v1",
                    api_key=openrouter_key
                )
                self.model = "anthropic/claude-3.5-sonnet-20241022"
            else:
                raise ValueError("No API key found. Set OPENROUTER_API_KEY or OPENAI_API_KEY environment variable, or pass as argument.")

    def load_blocks(self):
        """Load all markdown blocks from the blocks directory."""
        blocks = {}
        
        if not self.blocks_dir.exists():
            raise FileNotFoundError(f"Blocks directory not found: {self.blocks_dir}")
        
        for block_file in sorted(self.blocks_dir.glob("*.md")):
            with open(block_file, 'r', encoding='utf-8') as f:
                content = f.read().strip()
                # Extract the filename without extension as the key
                key = block_file.stem
                blocks[key] = {
                    'filename': block_file.name,
                    'content': content,
                    'path': str(block_file)
                }
        
        return blocks

    def analyze_and_organize_blocks(self, blocks):
        """Use LLM to analyze blocks and determine optimal organization."""
        
        # Prepare FULL block content for the LLM (not just summaries)
        block_data = []
        for key, block in blocks.items():
            # Extract title from content (first line starting with #)
            lines = block['content'].split('\n')
            title = next((line.strip('# ') for line in lines if line.startswith('#')), key)
            
            # Remove numbering from key for cleaner organization
            clean_key = key.split('-', 1)[1] if '-' in key and key[0].isdigit() else key
            
            block_data.append({
                'key': key,
                'clean_key': clean_key,
                'filename': block['filename'],
                'title': title,
                'full_content': block['content'],
                'word_count': len(block['content'].split())
            })

        organization_prompt = f"""
You are an expert at creating effective system prompts for AI assistants. You have been given {len(blocks)} content blocks that need to be intelligently organized into a cohesive system prompt for Windsurf (an AI coding assistant).

**CRITICAL REQUIREMENTS:**
1. **PRESERVE ALL CONTENT**: Every instruction, detail, and guideline must be included in the final output
2. **NO OMISSIONS**: Do not skip, summarize, or leave out any information from the blocks
3. **Light rewriting allowed**: You may lightly rewrite content for clarity while preserving ALL meaning and instructions
4. **Complete preservation**: Especially important are prioritization guidelines, tool selection rules, and operational instructions
5. **Remove numbering**: Ignore the numerical prefixes in filenames - focus on content organization

Here are the blocks with their FULL content:

{json.dumps(block_data, indent=2)}

Your task is to:
1. Analyze the content and purpose of each block
2. Determine the most logical and effective order for maximum impact
3. Group related blocks together
4. Consider the psychological flow - what should the AI see first vs last
5. Optimize for clarity and actionability while preserving ALL content
6. Lightly rewrite blocks for clarity if needed (but preserve all instructions)

Principles to follow:
- Start with foundational context (who the user is, their environment)
- Follow with preferences and constraints that guide behavior
- End with specific operational details and conventions
- Group related concepts together
- Consider cognitive load - don't overwhelm with too much detail upfront
- Ensure critical information is positioned for maximum retention
- NEVER omit prioritization rules or tool selection guidelines

Return a JSON response with this structure:
{{
    "organization_strategy": "Brief explanation of your organizational approach",
    "ordered_blocks": [
        {{
            "key": "block_key",
            "reasoning": "Why this block is positioned here",
            "section_group": "logical_group_name",
            "rewritten_content": "Optionally rewritten content for clarity (or original if no changes needed)"
        }}
    ],
    "section_groups": [
        {{
            "name": "group_name",
            "description": "Purpose of this section group",
            "blocks": ["key1", "key2"]
        }}
    ]
}}
"""

        try:
            # Use different parameters based on model
            if "gpt-5-mini" in self.model:
                # GPT-5-mini only supports default temperature
                response = self.client.chat.completions.create(
                    model=self.model,
                    messages=[
                        {"role": "system", "content": "You are an expert at organizing system prompts for maximum effectiveness. Always respond with valid JSON."},
                        {"role": "user", "content": organization_prompt}
                    ]
                )
            else:
                # Other models support custom temperature
                response = self.client.chat.completions.create(
                    model=self.model,
                    messages=[
                        {"role": "system", "content": "You are an expert at organizing system prompts for maximum effectiveness. Always respond with valid JSON."},
                        {"role": "user", "content": organization_prompt}
                    ],
                    temperature=0.3
                )
            
            organization = json.loads(response.choices[0].message.content)
            return organization
            
        except Exception as e:
            print(f"Error getting LLM organization: {e}")
            # Fallback to original order
            return {
                "organization_strategy": "Fallback to original numerical order due to LLM error",
                "ordered_blocks": [{"key": key, "reasoning": "Original order", "section_group": "default"} for key in sorted(blocks.keys())],
                "section_groups": [{"name": "default", "description": "All blocks", "blocks": list(sorted(blocks.keys()))}]
            }

    def construct_rules(self, blocks, organization):
        """Construct the final rules document based on LLM organization."""
        
        # Header
        content = [
            "# Windsurf Rules - " + datetime.now().strftime("%B %d, %Y"),
            "",
            "These guidelines should guide your work with the user, Daniel:",
            ""
        ]
        
        # Skip organizational comments in final output
        
        # Group blocks by section
        current_section = None
        
        for block_info in organization['ordered_blocks']:
            key = block_info['key']
            section_group = block_info.get('section_group', 'default')
            
            if key not in blocks:
                print(f"Warning: Block '{key}' not found in loaded blocks")
                continue
            
            # Add section header if we're starting a new section
            if section_group != current_section:
                section_info = next((s for s in organization['section_groups'] if s['name'] == section_group), None)
                if section_info and section_group != 'default':
                    content.extend([
                        f"## {section_info['name'].replace('_', ' ').title()}",
                        ""
                    ])
                current_section = section_group
            
            # Add the block content (use rewritten version if provided, otherwise original)
            rewritten_content = block_info.get('rewritten_content', '')
            if rewritten_content and rewritten_content.strip() and rewritten_content != "Original content preserved":
                block_content = rewritten_content
            else:
                block_content = blocks[key]['content']
            
            # Fix common capitalization issues
            block_content = block_content.replace(' mcp ', ' MCP ').replace(' Mcp ', ' MCP ').replace('mcp-', 'MCP-')
            content.extend([
                block_content,
                ""
            ])
        
        # Footer
        content.extend([
            "---",
            "",
            f"*Rules constructed on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} using intelligent LLM organization*",
            f"*Organization strategy: {organization['organization_strategy']}*"
        ])
        
        return '\n'.join(content)

    def save_rules(self, content):
        """Save the constructed rules to the output file and archive."""
        # Save to latest.md
        with open(self.output_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Rules successfully constructed and saved to: {self.output_file}")
        
        # Create archive copy with timestamp
        archive_dir = Path("archived-versions/0825")
        archive_dir.mkdir(parents=True, exist_ok=True)
        archive_file = archive_dir / f"rules_{self.timestamp}.md"
        
        with open(archive_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"📁 Archived copy saved to: {archive_file}")
        print(f"📊 Total size: {len(content)} characters")

    def run(self):
        """Main execution method."""
        print("🔧 Loading blocks...")
        blocks = self.load_blocks()
        print(f"📦 Loaded {len(blocks)} blocks")
        
        print("🤖 Analyzing blocks with LLM...")
        organization = self.analyze_and_organize_blocks(blocks)
        print(f"📋 Organization strategy: {organization['organization_strategy']}")
        
        print("🏗️  Constructing rules...")
        content = self.construct_rules(blocks, organization)
        
        print("💾 Saving rules...")
        self.save_rules(content)
        
        return True

def get_api_key_from_1password(item_name="OpenRouter"):
    """Try to get API key from 1Password CLI."""
    try:
        import subprocess
        result = subprocess.run(['op', 'item', 'get', item_name, '--field', 'credential'], 
                              capture_output=True, text=True, check=True)
        return result.stdout.strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None

def main():
    parser = argparse.ArgumentParser(description="Intelligently construct Windsurf rules from blocks")
    parser.add_argument('--openrouter-key', help='OpenRouter API key')
    parser.add_argument('--openai-key', help='OpenAI API key')
    parser.add_argument('--use-1password', action='store_true', help='Try to get API key from 1Password')
    
    args = parser.parse_args()
    
    openrouter_key = args.openrouter_key
    openai_key = args.openai_key
    
    # Try 1Password if requested
    if args.use_1password:
        print("🔐 Attempting to get API key from 1Password...")
        openrouter_key = get_api_key_from_1password("OpenRouter")
        if not openrouter_key:
            openai_key = get_api_key_from_1password("OpenAI")
    
    try:
        constructor = RulesConstructor(openrouter_key=openrouter_key, openai_key=openai_key)
        constructor.run()
    except Exception as e:
        print(f"❌ Error: {e}")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
