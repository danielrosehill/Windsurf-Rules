#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Build versions table for README.md from archived versions
function buildVersionsTable() {
    console.log('📊 Building versions table...');
    
    const archivedDir = path.join(__dirname, '..', 'archived-versions');
    const readmePath = path.join(__dirname, '..', 'README.md');
    const latestPath = path.join(__dirname, '..', 'latest', 'latest.md');
    
    // Check if archived versions directory exists
    if (!fs.existsSync(archivedDir)) {
        console.log('⚠️  No archived-versions directory found');
        return;
    }
    
    // Get all version folders
    const versionFolders = fs.readdirSync(archivedDir)
        .filter(folder => fs.statSync(path.join(archivedDir, folder)).isDirectory())
        .sort((a, b) => b.localeCompare(a)); // Sort newest first
    
    let tableRows = [];
    
    // Add latest version first
    if (fs.existsSync(latestPath)) {
        const latestStats = fs.statSync(latestPath);
        const latestSize = (latestStats.size / 1024).toFixed(1);
        tableRows.push(`| Latest | Current Version | ${latestSize} KB | [Latest](latest/latest.md) |`);
    }
    
    // Process archived versions
    for (const folder of versionFolders) {
        const folderPath = path.join(archivedDir, folder);
        const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.md'));
        
        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const stats = fs.statSync(filePath);
            const size = (stats.size / 1024).toFixed(1);
            const version = path.basename(file, '.md');
            const date = formatDate(version);
            const link = `archived-versions/${folder}/${file}`;
            
            tableRows.push(`| ${version} | ${date} | ${size} KB | [${version}](${link}) |`);
        }
    }
    
    // Read current README
    let readmeContent = '';
    if (fs.existsSync(readmePath)) {
        readmeContent = fs.readFileSync(readmePath, 'utf8');
    }
    
    // Build new table
    const tableHeader = `| Version | Date | Size | Link |
|---------|------|------|------|`;
    
    const newTable = tableHeader + '\n' + tableRows.join('\n');
    
    // Replace table in README
    const startMarker = '| Version | Date | Size | Link |';
    const endMarker = '<!-- END_VERSIONS_TABLE -->';
    
    const startIndex = readmeContent.indexOf(startMarker);
    const endIndex = readmeContent.indexOf(endMarker);
    
    if (startIndex !== -1 && endIndex !== -1) {
        const beforeTable = readmeContent.substring(0, startIndex);
        const afterTable = readmeContent.substring(endIndex);
        
        const updatedContent = beforeTable + newTable + '\n\n\n' + afterTable;
        fs.writeFileSync(readmePath, updatedContent);
        
        console.log(`✅ Updated versions table with ${tableRows.length} entries`);
    } else {
        console.log('⚠️  Could not find table markers in README.md');
    }
}

// Format date from DDMMYY to readable format
function formatDate(version) {
    if (version.length === 6) {
        const day = version.substring(0, 2);
        const month = version.substring(2, 4);
        const year = '20' + version.substring(4, 6);
        return `${day}/${month}/${year}`;
    }
    return version;
}

// Run if called directly
if (require.main === module) {
    try {
        buildVersionsTable();
    } catch (error) {
        console.error('❌ Error building versions table:', error.message);
        process.exit(1);
    }
}

module.exports = { buildVersionsTable };
