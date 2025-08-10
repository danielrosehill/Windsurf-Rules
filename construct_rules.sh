#!/bin/bash

# Windsurf Rules Construction Wrapper
# Activates virtual environment and constructs rules using intelligent LLM organization

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo -e "${BLUE}🔧 Windsurf Rules Constructor${NC}"
echo "================================"

# Check if virtual environment exists
if [ ! -d ".venv" ]; then
    echo -e "${YELLOW}⚠️  Virtual environment not found. Creating with uv...${NC}"
    if command -v uv &> /dev/null; then
        uv venv .venv
        echo -e "${GREEN}✅ Virtual environment created with uv${NC}"
    else
        echo -e "${YELLOW}⚠️  uv not found, falling back to python -m venv${NC}"
        python3 -m venv .venv
        echo -e "${GREEN}✅ Virtual environment created with venv${NC}"
    fi
fi

# Activate virtual environment
echo -e "${BLUE}🔄 Activating virtual environment...${NC}"
source .venv/bin/activate

# Verify activation
if [[ "$VIRTUAL_ENV" != "" ]]; then
    echo -e "${GREEN}✅ Virtual environment activated: $(basename $VIRTUAL_ENV)${NC}"
else
    echo -e "${RED}❌ Failed to activate virtual environment${NC}"
    exit 1
fi

# Install/upgrade dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
pip install -q --upgrade pip
pip install -q -r requirements.txt
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Parse command line arguments
USE_1PASSWORD=false
OPENROUTER_KEY=""
EXTRA_ARGS=()

while [[ $# -gt 0 ]]; do
    case $1 in
        --use-1password)
            USE_1PASSWORD=true
            shift
            ;;
        --openrouter-key)
            OPENROUTER_KEY="$2"
            shift 2
            ;;
        *)
            EXTRA_ARGS+=("$1")
            shift
            ;;
    esac
done

# Handle API key retrieval
if [ "$USE_1PASSWORD" = true ]; then
    echo -e "${BLUE}🔐 Retrieving API key from 1Password...${NC}"
    if command -v op &> /dev/null; then
        # Try to get OpenRouter key from 1Password
        OPENROUTER_KEY=$(op read "op://Private/OpenRouter API Key/credential" 2>/dev/null || echo "")
        if [ -n "$OPENROUTER_KEY" ]; then
            echo -e "${GREEN}✅ OpenRouter API key retrieved from 1Password${NC}"
        else
            echo -e "${YELLOW}⚠️  OpenRouter key not found in 1Password, checking for OpenAI key...${NC}"
            OPENAI_KEY=$(op read "op://Private/OpenAI API Key/credential" 2>/dev/null || echo "")
            if [ -n "$OPENAI_KEY" ]; then
                echo -e "${GREEN}✅ OpenAI API key retrieved from 1Password${NC}"
                export OPENAI_API_KEY="$OPENAI_KEY"
            else
                echo -e "${RED}❌ No API keys found in 1Password${NC}"
                exit 1
            fi
        fi
    else
        echo -e "${RED}❌ 1Password CLI (op) not found${NC}"
        exit 1
    fi
fi

# Run the rules constructor
echo -e "${BLUE}🚀 Constructing Windsurf rules...${NC}"
echo "================================"

if [ -n "$OPENROUTER_KEY" ]; then
    python3 construct_rules.py --openrouter-key "$OPENROUTER_KEY" "${EXTRA_ARGS[@]}"
else
    python3 construct_rules.py "${EXTRA_ARGS[@]}"
fi

# Check if construction was successful
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Rules construction completed successfully!${NC}"
    if [ -f "latest.md" ]; then
        WORD_COUNT=$(wc -w < latest.md)
        echo -e "${BLUE}📄 Generated latest.md with ${WORD_COUNT} words${NC}"
    fi
else
    echo -e "${RED}❌ Rules construction failed${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}🎉 Done! Your Windsurf rules are ready.${NC}"
