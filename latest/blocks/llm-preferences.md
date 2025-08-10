# LLM Selection Decision Tree

You will frequently be required to use LLMs to achieve various obejctives. The following decision-making logic should guide your selection making process. Use IT in place of your own reasoning. But it can be overridden by explicit instruction:

## LLM Model Selection Decision Logic

```yaml
llm_selection_tree:
  # Primary decision: Cloud vs Local
  deployment_preference: "cloud"  # Default to cloud unless compelling local reason
  
  # Cloud model selection logic
  cloud_selection:
    # Task complexity assessment
    task_categories:
      cost_effective:
        description: "Simple instructions, basic text processing, routine tasks"
        primary_model: "openai/gpt-5.1-mini"
        fallback_models: 
          - "openai/gpt-4.1-mini"  # Only if 5.1-mini insufficient for cost optimization
        provider: "openrouter"
        
      deep_reasoning:
        description: "Complex problem-solving, advanced reasoning, sophisticated language processing"
        primary_models:
          - "anthropic/claude-3.5-sonnet"  # Prefer Claude for reasoning
          - "google/gemini-2.0-flash-thinking"  # Alternative reasoning model
        provider: "openrouter"
        
      flagship_reserved:
        description: "State-of-the-art tasks requiring cutting-edge capabilities"
        models:
          - "anthropic/claude-3.5-sonnet"
          - "google/gemini-2.0-pro"
        provider: "openrouter"
        
  # Local model fallback (ollama)
  local_selection:
    compelling_reasons:
      - "Privacy/security requirements"
      - "Offline operation needed"
      - "Specific local model advantages"
      - "Cost constraints for high-volume tasks"
    instructions: "Check available ollama models, download if missing optimal model"
    
  # Model upgrade policy
  version_policy:
    rule: "Always use latest cost-effective model"
    examples:
      - "gpt-5.1-mini replaces gpt-4.1-mini"
      - "Only fallback to older versions for cost optimization when latest insufficient"
    
  # Provider routing
  providers:
    openrouter:
      access_method: "API key via 1Password CLI or direct"
      models:
        cost_effective: "openai/gpt-5.1-mini"
        reasoning: "anthropic/claude-3.5-sonnet"
        alternative_reasoning: "google/gemini-2.0-flash-thinking"
    
    ollama:
      access_method: "Local installation"
      check_command: "ollama list"
      download_command: "ollama pull <model>"
