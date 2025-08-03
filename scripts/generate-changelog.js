#!/usr/bin/env node

/**
 * Windsurf Rules Changelog Generator
 * Automatically generates a changelog by comparing different versions of the rules
 */

const fs = require('fs');
const path = require('path');

// Configuration
const REPO_ROOT = path.dirname(__dirname);
const LATEST_FILE = path.join(REPO_ROOT, 'latest.md');
const ARCHIVE_DIR = path.join(REPO_ROOT, 'archived-versions');
const CHANGELOG_FILE = path.join(REPO_ROOT, 'CHANGELOG.md');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function parseDate(filename) {
  const match = filename.match(/^(\d{2})(\d{2})(\d{2})\.md$/);
  if (!match) return null;
  
  const [, day, month, year] = match;
  const fullYear = `20${year}`;
  return {
    filename: filename.replace('.md', ''),
    formatted: `${day}/${month}/${fullYear}`,
    date: new Date(`${fullYear}-${month}-${day}`)
  };
}

function extractTitle(content) {
  const match = content.match(/^# (.+)$/m);
  return match ? match[1] : 'Unknown';
}

function extractSections(content) {
  const sections = new Set();
  const lines = content.split('\n');
  
  for (const line of lines) {
    if (line.startsWith('## ')) {
      sections.add(line.substring(3).trim());
    }
  }
  
  return Array.from(sections);
}

function compareVersions(oldContent, newContent) {
  const oldSections = extractSections(oldContent);
  const newSections = extractSections(newContent);
  
  const added = newSections.filter(section => !oldSections.includes(section));
  const removed = oldSections.filter(section => !newSections.includes(section));
  const common = newSections.filter(section => oldSections.includes(section));
  
  // Simple content comparison for enhanced sections
  const enhanced = [];
  for (const section of common) {
    const oldSection = extractSectionContent(oldContent, section);
    const newSection = extractSectionContent(newContent, section);
    
    if (oldSection !== newSection && newSection.length > oldSection.length) {
      enhanced.push(section);
    }
  }
  
  return { added, removed, enhanced };
}

function extractSectionContent(content, sectionName) {
  const lines = content.split('\n');
  let inSection = false;
  let sectionContent = [];
  
  for (const line of lines) {
    if (line === `## ${sectionName}`) {
      inSection = true;
      continue;
    }
    
    if (inSection) {
      if (line.startsWith('## ')) {
        break;
      }
      sectionContent.push(line);
    }
  }
  
  return sectionContent.join('\n').trim();
}

function generateChangelogEntry(version, changes, title, date) {
  let entry = `## [${version}] - ${date}\n\n`;
  
  if (changes.added.length > 0) {
    entry += '### Added\n';
    for (const section of changes.added) {
      entry += `- **${section}**: New section added to the rules\n`;
    }
    entry += '\n';
  }
  
  if (changes.enhanced.length > 0) {
    entry += '### Enhanced\n';
    for (const section of changes.enhanced) {
      entry += `- **${section}**: Expanded with additional details and specifications\n`;
    }
    entry += '\n';
  }
  
  if (changes.removed.length > 0) {
    entry += '### Removed\n';
    for (const section of changes.removed) {
      entry += `- **${section}**: Section removed from the rules\n`;
    }
    entry += '\n';
  }
  
  return entry;
}

function getVersionStats(content) {
  const lines = content.split('\n').length;
  const words = content.split(/\s+/).length;
  const sections = extractSections(content).length;
  
  return { lines, words, sections };
}

async function generateChangelog() {
  log('🔄 Generating Windsurf Rules Changelog...', 'blue');
  
  try {
    // Read latest rules
    if (!fs.existsSync(LATEST_FILE)) {
      throw new Error('latest.md not found');
    }
    
    const latestContent = fs.readFileSync(LATEST_FILE, 'utf-8');
    const latestTitle = extractTitle(latestContent);
    const latestStats = getVersionStats(latestContent);
    
    // Read archived versions
    if (!fs.existsSync(ARCHIVE_DIR)) {
      throw new Error('archived-versions directory not found');
    }
    
    const archiveFiles = fs.readdirSync(ARCHIVE_DIR)
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const dateInfo = parseDate(file);
        if (!dateInfo) return null;
        
        const content = fs.readFileSync(path.join(ARCHIVE_DIR, file), 'utf-8');
        return {
          ...dateInfo,
          content,
          title: extractTitle(content),
          stats: getVersionStats(content)
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
    
    log(`📁 Found ${archiveFiles.length} archived versions`, 'green');
    
    // Generate changelog content
    let changelog = `# Windsurf Rules Changelog

This changelog documents the evolution of Daniel's Windsurf AI assistant rules and configuration.

## [Latest] - ${new Date().toLocaleDateString('en-GB')}

### Current Version
- **Title**: ${latestTitle}
- **Statistics**: ${latestStats.lines} lines, ${latestStats.words} words, ${latestStats.sections} sections
- **Status**: Active development version

`;

    // Compare versions and generate entries
    let previousContent = latestContent;
    
    for (let i = 0; i < archiveFiles.length; i++) {
      const version = archiveFiles[i];
      const changes = compareVersions(version.content, previousContent);
      
      if (changes.added.length > 0 || changes.enhanced.length > 0 || changes.removed.length > 0) {
        changelog += generateChangelogEntry(
          version.filename,
          changes,
          version.title,
          version.formatted
        );
      } else {
        // If no structural changes, add a simple entry
        changelog += `## [${version.filename}] - ${version.formatted}

### Updated
- **Content**: Minor updates and refinements
- **Statistics**: ${version.stats.lines} lines, ${version.stats.words} words, ${version.stats.sections} sections

`;
      }
      
      previousContent = version.content;
    }
    
    // Add version comparison table
    changelog += `---

## Version Comparison Summary

| Version | Date | Lines | Words | Sections | Major Focus |
|---------|------|-------|-------|----------|-------------|
| Latest | ${new Date().toLocaleDateString('en-GB')} | ${latestStats.lines} | ${latestStats.words} | ${latestStats.sections} | Current development |
`;
    
    for (const version of archiveFiles) {
      changelog += `| ${version.filename} | ${version.formatted} | ${version.stats.lines} | ${version.stats.words} | ${version.stats.sections} | Archive |
`;
    }
    
    changelog += `
## Evolution Highlights

1. **Scope Expansion**: Progressive evolution from basic usage guide to comprehensive development environment specification
2. **Personalization**: Increasing addition of user-specific details and preferences
3. **Technical Depth**: Growing hardware and software specification detail
4. **Workflow Integration**: Evolution from basic rules to complete development methodology
5. **Automation Focus**: Emphasis on automated workflows and tooling integration

---

*This changelog is automatically generated by comparing archived versions. Last updated: ${new Date().toLocaleString()}*
`;
    
    // Write changelog
    fs.writeFileSync(CHANGELOG_FILE, changelog);
    log(`✅ Changelog generated successfully: ${CHANGELOG_FILE}`, 'green');
    
    // Summary
    log('\n📊 Generation Summary:', 'cyan');
    log(`  • Latest version: ${latestStats.lines} lines, ${latestStats.words} words`, 'cyan');
    log(`  • Archived versions: ${archiveFiles.length}`, 'cyan');
    log(`  • Changelog entries: ${archiveFiles.length + 1}`, 'cyan');
    
  } catch (error) {
    log(`❌ Error generating changelog: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateChangelog();
}

module.exports = { generateChangelog };
