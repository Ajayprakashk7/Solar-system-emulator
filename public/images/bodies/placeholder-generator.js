
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
