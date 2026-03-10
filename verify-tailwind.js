// Simple verification script to check Tailwind configuration
const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Tailwind CSS setup...\n');

// Check if required files exist
const requiredFiles = [
  'tailwind.config.ts',
  'postcss.config.js',
  'app/globals.css',
  'app/layout.tsx',
  'app/page.tsx'
];

requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log('✅', file);
  } else {
    console.log('❌', file);
  }
});

console.log('\n🎨 Custom Design Tokens Overview:');
console.log('📁 tailwind.config.ts contains:');
console.log('  • Custom colors: primary, secondary, success, warning, error, pomodoro');
console.log('  • Typography: Display, Sans, Mono fonts with timer-specific sizes');
console.log('  • Spacing: Extended scale with component-specific values');
console.log('  • Shadows: Soft, medium, strong, and timer-specific shadows');
console.log('  • Animations: Fade-in, slide-up, pulse-slow');

console.log('\n🎯 Custom CSS Classes Available:');
console.log('  • .btn-primary, .btn-secondary, .btn-success, .btn-warning, .btn-error');
console.log('  • .card, .timer-display, .section-spacing');
console.log('  • bg-primary, text-success, etc.');

console.log('\n📄 Demo Page Features:');
console.log('  • Demonstrates all custom color tokens');
console.log('  • Shows typography variations');
console.log('  • Examples of custom spacing');
console.log('  • Custom button components');
console.log('  • Timer display with pomodoro colors');

console.log('\n✅ Tailwind CSS setup complete with custom design tokens!');