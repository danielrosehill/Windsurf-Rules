#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to dynamically update README.md with the latest rules content
 * This can be run manually or as a pre-deploy hook
 */

const LATEST_RULES_FILE = 'latest.md';
const README_FILE = 'README.md';
const RULES_START_MARKER = '## Complete Rules Content';
const RULES_END_MARKER = '<!-- END_DYNAMIC_RULES -->';

function getCurrentDate() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'Asia/Jerusalem'
    };
    return now.toLocaleDateString('en-US', options);
}

function extractRulesContent() {
    try {
        const latestContent = fs.readFileSync(LATEST_RULES_FILE, 'utf8');
        
        // Extract the title and date from the first line
        const lines = latestContent.split('\n');
        const titleLine = lines[0];
        const dateMatch = titleLine.match(/July (\d+), (\d+)/);
        
        let extractedDate = 'Latest Version';
        if (dateMatch) {
            extractedDate = `July ${dateMatch[1]}, ${dateMatch[2]}`;
        }
        
        // Return the content starting from the first heading
        return {
            content: latestContent,
            date: extractedDate
        };
    } catch (error) {
        console.error(`Error reading ${LATEST_RULES_FILE}:`, error.message);
        return null;
    }
}

function updateReadme() {
    try {
        const readmeContent = fs.readFileSync(README_FILE, 'utf8');
        const rulesData = extractRulesContent();
        
        if (!rulesData) {
            console.error('Failed to extract rules content');
            return false;
        }
        
        // Find the start of the rules section
        const startIndex = readmeContent.indexOf(RULES_START_MARKER);
        if (startIndex === -1) {
            console.error(`Could not find start marker: ${RULES_START_MARKER}`);
            return false;
        }
        
        // Find the end marker or end of file
        let endIndex = readmeContent.indexOf(RULES_END_MARKER);
        if (endIndex === -1) {
            // If no end marker exists, append to the end
            endIndex = readmeContent.length;
        } else {
            // Include the end marker in the replacement
            endIndex += RULES_END_MARKER.length;
        }
        
        // Update the title in the README to reflect the latest date
        let updatedContent = readmeContent.substring(0, startIndex);
        
        // Update the main title with the latest date
        updatedContent = updatedContent.replace(
            /# Windsurf Rules \([^)]+\)/,
            `# Windsurf Rules (${rulesData.date})`
        );
        
        // Update the version badge
        updatedContent = updatedContent.replace(
            /!\[Version\]\(https:\/\/img\.shields\.io\/badge\/Version-[^)]+\)/,
            `![Version](https://img.shields.io/badge/Version-${rulesData.date.replace(/\s+/g, '%20')}-green?style=flat-square)`
        );
        
        // Add the rules content section
        updatedContent += RULES_START_MARKER + '\n\n';
        updatedContent += rulesData.content + '\n\n';
        updatedContent += RULES_END_MARKER;
        
        // Add any content that was after the end marker
        const originalEndIndex = readmeContent.indexOf(RULES_END_MARKER);
        if (originalEndIndex !== -1) {
            const afterEndMarker = readmeContent.substring(originalEndIndex + RULES_END_MARKER.length);
            updatedContent += afterEndMarker;
        }
        
        // Write the updated content
        fs.writeFileSync(README_FILE, updatedContent, 'utf8');
        
        console.log(`✅ README.md updated successfully with rules from ${LATEST_RULES_FILE}`);
        console.log(`📅 Rules date: ${rulesData.date}`);
        console.log(`🕒 Updated at: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' })}`);
        
        return true;
    } catch (error) {
        console.error('Error updating README:', error.message);
        return false;
    }
}

function main() {
    console.log('🔄 Updating README.md with latest rules...');
    
    // Check if required files exist
    if (!fs.existsSync(LATEST_RULES_FILE)) {
        console.error(`❌ ${LATEST_RULES_FILE} not found`);
        process.exit(1);
    }
    
    if (!fs.existsSync(README_FILE)) {
        console.error(`❌ ${README_FILE} not found`);
        process.exit(1);
    }
    
    const success = updateReadme();
    
    if (success) {
        console.log('✨ README update completed successfully!');
        process.exit(0);
    } else {
        console.error('❌ README update failed');
        process.exit(1);
    }
}

// Run the script if called directly
if (require.main === module) {
    main();
}

module.exports = { updateReadme, extractRulesContent };
