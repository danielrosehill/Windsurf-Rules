#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to build a versions table for README.md from archived versions
 * Scans archived-versions directory and creates a table sorted by date (newest first)
 */

const ARCHIVED_VERSIONS_DIR = 'archived-versions';
const README_FILE = 'README.md';
const LATEST_FILE = 'latest.md';
const TABLE_START_MARKER = '## Versions';
const TABLE_END_MARKER = '<!-- END_VERSIONS_TABLE -->';

/**
 * Parse date from filename format DDMMYY
 * @param {string} filename - e.g., "030825.md"
 * @returns {Date} - parsed date object
 */
function parseFilenameDate(filename) {
    const basename = path.basename(filename, '.md');
    if (basename.length !== 6) {
        throw new Error(`Invalid filename format: ${filename}`);
    }
    
    const day = parseInt(basename.substring(0, 2), 10);
    const month = parseInt(basename.substring(2, 4), 10);
    const year = parseInt(basename.substring(4, 6), 10);
    
    // Assume 20XX for years
    const fullYear = 2000 + year;
    
    return new Date(fullYear, month - 1, day); // month is 0-indexed
}

/**
 * Format date for display
 * @param {Date} date 
 * @returns {string} - formatted date string
 */
function formatDisplayDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Get file size in a readable format
 * @param {string} filePath 
 * @returns {string} - formatted file size
 */
function getFileSize(filePath) {
    const stats = fs.statSync(filePath);
    const bytes = stats.size;
    
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Scan archived versions and build version data
 * @returns {Array} - array of version objects
 */
function scanVersions() {
    const versions = [];
    
    try {
        const files = fs.readdirSync(ARCHIVED_VERSIONS_DIR);
        
        for (const file of files) {
            if (file.endsWith('.md')) {
                try {
                    const date = parseFilenameDate(file);
                    const filePath = path.join(ARCHIVED_VERSIONS_DIR, file);
                    const size = getFileSize(filePath);
                    
                    versions.push({
                        filename: file,
                        date: date,
                        displayDate: formatDisplayDate(date),
                        size: size,
                        path: `archived-versions/${file}`
                    });
                } catch (error) {
                    console.warn(`Skipping invalid filename: ${file} - ${error.message}`);
                }
            }
        }
        
        // Add latest.md as the most recent version
        if (fs.existsSync(LATEST_FILE)) {
            const latestSize = getFileSize(LATEST_FILE);
            versions.push({
                filename: 'latest.md',
                date: new Date(), // Current date for latest
                displayDate: 'Latest Version',
                size: latestSize,
                path: 'latest.md'
            });
        }
        
        // Sort by date (newest first)
        versions.sort((a, b) => b.date - a.date);
        
        return versions;
    } catch (error) {
        console.error(`Error scanning versions directory: ${error.message}`);
        return [];
    }
}

/**
 * Build the versions table markdown
 * @param {Array} versions 
 * @returns {string} - markdown table
 */
function buildVersionsTable(versions) {
    if (versions.length === 0) {
        return 'No versions found.';
    }
    
    let table = '| Version | Date | Size | Link |\n';
    table += '|---------|------|------|------|\n';
    
    for (const version of versions) {
        const versionName = version.filename === 'latest.md' ? 'Latest' : version.filename.replace('.md', '');
        const link = `[${versionName}](${version.path})`;
        
        table += `| ${versionName} | ${version.displayDate} | ${version.size} | ${link} |\n`;
    }
    
    return table;
}

/**
 * Update README.md with the versions table
 */
function updateReadme() {
    try {
        const versions = scanVersions();
        const table = buildVersionsTable(versions);
        
        const readmeContent = fs.readFileSync(README_FILE, 'utf8');
        
        const startIndex = readmeContent.indexOf(TABLE_START_MARKER);
        const endIndex = readmeContent.indexOf(TABLE_END_MARKER);
        
        if (startIndex === -1) {
            console.error(`Start marker "${TABLE_START_MARKER}" not found in README.md`);
            return false;
        }
        
        if (endIndex === -1) {
            console.error(`End marker "${TABLE_END_MARKER}" not found in README.md`);
            return false;
        }
        
        const beforeTable = readmeContent.substring(0, startIndex + TABLE_START_MARKER.length);
        const afterTable = readmeContent.substring(endIndex);
        
        const newContent = `${beforeTable}\n\n${table}\n\n${afterTable}`;
        
        fs.writeFileSync(README_FILE, newContent, 'utf8');
        
        console.log('✅ README.md updated successfully with versions table');
        console.log(`📊 Found ${versions.length} versions`);
        
        return true;
    } catch (error) {
        console.error(`Error updating README: ${error.message}`);
        return false;
    }
}

// Run the update if this script is executed directly
if (require.main === module) {
    updateReadme();
}

module.exports = { updateReadme, scanVersions, buildVersionsTable };
