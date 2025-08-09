#!/usr/bin/env python3
"""
README Latest Version Injector

This script injects the content of latest.md into README.md after the main body,
replacing any existing "Latest Version" section and removing the versions table.
"""

import re
from pathlib import Path
from datetime import datetime

def inject_latest_to_readme():
    """Inject latest.md content into README.md"""
    
    readme_path = Path("README.md")
    latest_path = Path("latest.md")
    
    if not readme_path.exists():
        print("❌ README.md not found")
        return False
    
    if not latest_path.exists():
        print("❌ latest.md not found")
        return False
    
    # Read current README
    with open(readme_path, 'r', encoding='utf-8') as f:
        readme_content = f.read()
    
    # Read latest rules
    with open(latest_path, 'r', encoding='utf-8') as f:
        latest_content = f.read()
    
    # Remove the versions table section
    # Pattern matches from "## Versions" to the next "## " section or end of file
    versions_pattern = r'## Versions.*?(?=## |\Z)'
    readme_content = re.sub(versions_pattern, '', readme_content, flags=re.DOTALL)
    
    # Remove any existing "Latest Version" section
    latest_version_pattern = r'## Latest Version.*?(?=## |\Z)'
    readme_content = re.sub(latest_version_pattern, '', readme_content, flags=re.DOTALL)
    
    # Remove the development section as it's no longer relevant
    dev_pattern = r'## Development.*?(?=## |\Z)'
    readme_content = re.sub(dev_pattern, '', readme_content, flags=re.DOTALL)
    
    # Clean up any trailing whitespace and ensure proper spacing
    readme_content = readme_content.rstrip() + '\n\n'
    
    # Add the latest version section
    latest_section = f"""## Latest Version

*Last updated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*

{latest_content}
"""
    
    # Combine the content
    final_content = readme_content + latest_section
    
    # Write the updated README
    with open(readme_path, 'w', encoding='utf-8') as f:
        f.write(final_content)
    
    print("✅ Successfully injected latest.md into README.md")
    print(f"📊 Total README size: {len(final_content)} characters")
    print(f"📊 Latest rules size: {len(latest_content)} characters")
    
    return True

def main():
    """Main execution"""
    try:
        success = inject_latest_to_readme()
        return 0 if success else 1
    except Exception as e:
        print(f"❌ Error: {e}")
        return 1

if __name__ == "__main__":
    exit(main())
