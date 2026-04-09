const fs = require('fs');
const path = require('path');

const dir = 'src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
files.push('../components/Navbar.tsx', '../components/Footer.tsx', '../components/Topbar.tsx');
files.push('Admin.tsx'); // already in pages

function processFile(filePath) {
  const fullPath = path.join(dir, filePath);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');

  // Skip Hero section replacements manually in Index.tsx or general replaces
  if (fullPath.includes('Index.tsx')) {
    // Keep hero text white by targeting specific hero class if necessary. 
    // Actually, hero wrapper is <section className="relative min-h-screen ...
    // We'll just carefully replace known specific strings.
    content = content.replace(/section-dark-1/g, 'bg-background');
    content = content.replace(/section-dark-2/g, 'bg-muted');
  } else if (!fullPath.includes('Admin.tsx')) {
    content = content.replace(/section-dark-1/g, 'bg-background');
    content = content.replace(/section-dark-2/g, 'bg-muted');
  }

  if (fullPath.includes('Admin.tsx')) {
    content = content.replace(/bg-\[#0a0a0a\] text-white/g, 'bg-background text-foreground');
    content = content.replace(/bg-\[#111\]/g, 'bg-card');
    content = content.replace(/bg-\[#1a1a1a\]/g, 'bg-background text-foreground');
  }

  // Replace text-white/opacity with text-muted-foreground or text-foreground/opacity
  content = content.replace(/text-white\/30/g, 'text-foreground/30');
  content = content.replace(/text-white\/40/g, 'text-muted-foreground');
  content = content.replace(/text-white\/50/g, 'text-muted-foreground');
  content = content.replace(/text-white\/60/g, 'text-muted-foreground');
  content = content.replace(/text-white\/70/g, 'text-foreground/70');
  content = content.replace(/text-white\/80/g, 'text-foreground/80');

  // Replace text-white but ONLY outside of Hero sections or buttons...
  // Actually, replacing text-white with text-foreground everywhere except Hero is tricky with Regex.
  // Let's replace 'text-white' -> 'text-foreground' but then put back 'text-white' in Hero if needed.
  if(!fullPath.includes('Index.tsx')) {
    content = content.replace(/\btext-white\b/g, 'text-foreground');
  } else {
    // Safe replace for Index.tsx avoiding Hero
    content = content.replace(/text-white/g, (match, offset, string) => {
      // If it's near 'hero', keep white. 
      // simplistic approach: just replace all, we'll fix Hero manually.
      return 'text-foreground';
    });
  }

  // Same for bg-white/x and border-white/x
  content = content.replace(/bg-white\/5/g, 'bg-foreground/5');
  content = content.replace(/bg-white\/10/g, 'bg-foreground/10');
  content = content.replace(/bg-white\/20/g, 'bg-foreground/20');
  
  content = content.replace(/border-white\/5/g, 'border-foreground/5');
  content = content.replace(/border-white\/10/g, 'border-foreground/10');
  content = content.replace(/border-white\/20/g, 'border-foreground/20');

  fs.writeFileSync(fullPath, content);
}

const uniqueFiles = [...new Set(files)];
uniqueFiles.forEach(processFile);
console.log('Script completed.');
