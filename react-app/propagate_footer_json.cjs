const fs = require('fs');
const path = require('path');

// Read the home page footer HTML
const homeContent = fs.readFileSync('src/pages/Home.jsx', 'utf8');
const startIdxHome = homeContent.indexOf('<footer');
const endIdxHome = homeContent.indexOf('</footer>', startIdxHome);
if (startIdxHome === -1 || endIdxHome === -1) {
  console.error("Could not find footer in Home.jsx");
  process.exit(1);
}
const footerHtml = homeContent.substring(startIdxHome, endIdxHome + 9);
console.log(`Extracted footer HTML from Home.jsx. Length: ${footerHtml.length}`);

function patchJsonFile(filepath) {
  try {
    const rawContent = fs.readFileSync(filepath, 'utf8');
    const data = JSON.parse(rawContent);
    
    if (!data.htmlContent) {
      console.log(`No htmlContent in: ${filepath}`);
      return;
    }
    
    let html = data.htmlContent;
    const startIdx = html.indexOf('<footer');
    if (startIdx === -1) {
      console.log(`No footer found in htmlContent of: ${filepath}`);
      return;
    }
    
    const endIdx = html.indexOf('</footer>', startIdx);
    if (endIdx === -1) {
      console.log(`No closing footer tag in htmlContent of: ${filepath}`);
      return;
    }
    
    const originalFooter = html.substring(startIdx, endIdx + 9);
    if (originalFooter === footerHtml) {
      console.log(`Footer already identical in: ${filepath}`);
      return;
    }
    
    // Replace and update
    data.htmlContent = html.substring(0, startIdx) + footerHtml + html.substring(endIdx + 9);
    
    // Write back JSON
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Successfully updated JSON footer in: ${filepath}`);
  } catch (err) {
    console.error(`Error parsing/writing ${filepath}:`, err);
  }
}

// Walk public directory and patch all JSON files
function patchJsonDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      patchJsonDir(full);
    } else if (file.endsWith('.json')) {
      if (file.includes('searchIndex')) return;
      patchJsonFile(full);
    }
  });
}

patchJsonDir('public');
console.log('JSON footer propagation complete.');
