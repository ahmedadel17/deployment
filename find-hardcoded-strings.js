const fs = require('fs');
const path = require('path');

// Function to recursively find all .tsx and .ts files
function findFiles(dir, extensions = ['.tsx', '.ts']) {
  let files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.includes('node_modules') && !item.includes('.git')) {
      files = files.concat(findFiles(fullPath, extensions));
    } else if (extensions.some(ext => item.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Function to extract hardcoded strings from a file
function extractHardcodedStrings(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const strings = [];
  
  // Pattern 1: JSX text content between tags
  const jsxTextPattern = />([A-Z][a-zA-Z\s]{2,})</g;
  let match;
  while ((match = jsxTextPattern.exec(content)) !== null) {
    const text = match[1].trim();
    if (text.length > 2 && !text.includes('{') && !text.includes('}')) {
      strings.push({
        text: text,
        type: 'JSX Text',
        line: content.substring(0, match.index).split('\n').length,
        file: filePath
      });
    }
  }
  
  // Pattern 2: String literals in quotes
  const stringLiteralPattern = /["']([A-Z][a-zA-Z\s]{2,})["']/g;
  while ((match = stringLiteralPattern.exec(content)) !== null) {
    const text = match[1].trim();
    if (text.length > 2 && !text.includes('{') && !text.includes('}')) {
      strings.push({
        text: text,
        type: 'String Literal',
        line: content.substring(0, match.index).split('\n').length,
        file: filePath
      });
    }
  }
  
  // Pattern 3: Template literals with hardcoded text
  const templateLiteralPattern = /`([A-Z][a-zA-Z\s]{2,})`/g;
  while ((match = templateLiteralPattern.exec(content)) !== null) {
    const text = match[1].trim();
    if (text.length > 2 && !text.includes('{') && !text.includes('}')) {
      strings.push({
        text: text,
        type: 'Template Literal',
        line: content.substring(0, match.index).split('\n').length,
        file: filePath
      });
    }
  }
  
  return strings;
}

// Main execution
const componentsDir = './components';
const appDir = './app';

console.log('🔍 Finding hardcoded strings in React components...\n');

const allFiles = [
  ...findFiles(componentsDir),
  ...findFiles(appDir)
];

const allHardcodedStrings = [];

for (const file of allFiles) {
  const strings = extractHardcodedStrings(file);
  allHardcodedStrings.push(...strings);
}

// Group by text content
const groupedStrings = {};
allHardcodedStrings.forEach(item => {
  if (!groupedStrings[item.text]) {
    groupedStrings[item.text] = [];
  }
  groupedStrings[item.text].push(item);
});

// Display results
console.log(`📊 Found ${allHardcodedStrings.length} hardcoded strings across ${allFiles.length} files\n`);

console.log('📝 Hardcoded strings found:\n');
Object.keys(groupedStrings).sort().forEach(text => {
  console.log(`"${text}"`);
  groupedStrings[text].forEach(item => {
    console.log(`  - ${item.type} in ${item.file}:${item.line}`);
  });
  console.log('');
});

// Generate translation keys
console.log('\n🔑 Suggested translation keys:\n');
Object.keys(groupedStrings).sort().forEach(text => {
  const key = text.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
  console.log(`"${key}": "${text}",`);
});
