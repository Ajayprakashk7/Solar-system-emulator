#!/usr/bin/env node

/**
 * Generate placeholder texture for missing planet/moon textures
 * Run: node scripts/generate-placeholder.js
 */

const fs = require('fs');
const path = require('path');

// Create a simple SVG placeholder
const width = 2048;
const height = 1024;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#4a4a4a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2a2a2a;stop-opacity:1" />
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#grad1)" />
  <text x="50%" y="50%" text-anchor="middle" fill="white" font-size="120" font-family="Arial, sans-serif" opacity="0.3" dy=".3em">
    Loading Texture...
  </text>
</svg>`;

const outputDir = path.join(__dirname, '..', 'public', 'images', 'bodies');
const outputPath = path.join(outputDir, 'placeholder_2k.svg');

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write SVG file
fs.writeFileSync(outputPath, svg);

console.log('✅ Placeholder texture generated:', outputPath);
console.log('📝 Note: This is an SVG placeholder. For production, convert to WebP using:');
console.log('   npm install --save-dev sharp');
console.log('   Then use sharp to convert SVG to WebP format');

// Also create a simple JS-based canvas version for immediate use
const canvasVersion = `
// This file can be used to generate a placeholder programmatically
export function generatePlaceholderTexture(width = 2048, height = 1024) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // Create radial gradient
  const gradient = ctx.createRadialGradient(
    width / 2, height / 2, 0,
    width / 2, height / 2, width / 2
  );
  gradient.addColorStop(0, '#4a4a4a');
  gradient.addColorStop(1, '#2a2a2a');
  
  // Fill background
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add text
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.font = '120px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Loading Texture...', width / 2, height / 2);
  
  return canvas.toDataURL('image/png');
}
`;

const jsOutputPath = path.join(outputDir, 'placeholder-generator.js');
fs.writeFileSync(jsOutputPath, canvasVersion);

console.log('✅ JavaScript placeholder generator created:', jsOutputPath);
