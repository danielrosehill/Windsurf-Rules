const fs = require('fs');
const path = require('path');

/**
 * Token Estimation Script for Windsurf Rules
 * Estimates tokens in latest.md and logs results to token-est.md
 */

function estimateTokens(text) {
    // Simple token estimation based on common tokenization patterns
    // This is an approximation - actual token counts may vary by model
    
    // Remove extra whitespace and normalize
    const normalizedText = text.replace(/\s+/g, ' ').trim();
    
    // Method 1: Word-based estimation (rough approximation)
    const words = normalizedText.split(/\s+/).filter(word => word.length > 0);
    const wordBasedEstimate = Math.ceil(words.length * 1.3); // ~1.3 tokens per word average
    
    // Method 2: Character-based estimation (more accurate for most models)
    const characters = normalizedText.length;
    const charBasedEstimate = Math.ceil(characters / 4); // ~4 characters per token average
    
    // Method 3: Subword estimation (considering punctuation, special chars)
    const subwordPattern = /[\w']+|[^\w\s]/g;
    const subwords = normalizedText.match(subwordPattern) || [];
    const subwordEstimate = Math.ceil(subwords.length * 1.1); // ~1.1 tokens per subword
    
    return {
        wordBased: wordBasedEstimate,
        characterBased: charBasedEstimate,
        subwordBased: subwordEstimate,
        average: Math.round((wordBasedEstimate + charBasedEstimate + subwordEstimate) / 3),
        wordCount: words.length,
        characterCount: characters
    };
}

function formatTimestamp() {
    const now = new Date();
    return now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
}

function main() {
    try {
        // Read latest.md
        const latestPath = path.join(__dirname, '..', 'latest.md');
        if (!fs.existsSync(latestPath)) {
            console.error('Error: latest.md not found');
            process.exit(1);
        }
        
        const content = fs.readFileSync(latestPath, 'utf8');
        const estimates = estimateTokens(content);
        const timestamp = formatTimestamp();
        
        // Prepare log entry
        const logEntry = `## Token Estimation - ${timestamp}

**File:** latest.md
**Word Count:** ${estimates.wordCount.toLocaleString()}
**Character Count:** ${estimates.characterCount.toLocaleString()}

**Token Estimates:**
- Word-based: ~${estimates.wordBased.toLocaleString()} tokens
- Character-based: ~${estimates.characterBased.toLocaleString()} tokens  
- Subword-based: ~${estimates.subwordBased.toLocaleString()} tokens
- **Average Estimate: ~${estimates.average.toLocaleString()} tokens**

---

`;

        // Read existing token-est.md or create new
        const tokenEstPath = path.join(__dirname, '..', 'token-est.md');
        let existingContent = '';
        
        if (fs.existsSync(tokenEstPath)) {
            existingContent = fs.readFileSync(tokenEstPath, 'utf8');
        } else {
            existingContent = `# Token Estimation Log

This file tracks token estimates for latest.md over time.

---

`;
        }
        
        // Prepend new entry (most recent first)
        const updatedContent = existingContent.replace('---\n\n', '---\n\n' + logEntry);
        
        // Write updated content
        fs.writeFileSync(tokenEstPath, updatedContent);
        
        // Output results to console
        console.log('Token Estimation Complete!');
        console.log('=========================');
        console.log(`Timestamp: ${timestamp}`);
        console.log(`Word Count: ${estimates.wordCount.toLocaleString()}`);
        console.log(`Character Count: ${estimates.characterCount.toLocaleString()}`);
        console.log('');
        console.log('Token Estimates:');
        console.log(`  Word-based: ~${estimates.wordBased.toLocaleString()} tokens`);
        console.log(`  Character-based: ~${estimates.characterBased.toLocaleString()} tokens`);
        console.log(`  Subword-based: ~${estimates.subwordBased.toLocaleString()} tokens`);
        console.log(`  Average: ~${estimates.average.toLocaleString()} tokens`);
        console.log('');
        console.log(`Results logged to: ${tokenEstPath}`);
        
    } catch (error) {
        console.error('Error estimating tokens:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { estimateTokens, formatTimestamp };
