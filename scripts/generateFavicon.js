const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Clean BhoomiSetu Cadastral Parcel Identity Icon:
// Dark emerald green background (#064E3B) + crisp gold cadastral boundary + white location pin
const svgIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#064E3B"/>
  <!-- Cadastral Parcel Boundary -->
  <polygon points="12,18 52,14 48,50 16,46" fill="#047857" fill-opacity="0.6" stroke="#10B981" stroke-width="2.5" stroke-dasharray="3,2"/>
  <!-- Inner House Footprint -->
  <rect x="22" y="24" width="16" height="14" rx="2" fill="#065F46" stroke="#34D399" stroke-width="1.5"/>
  <!-- Location Pin -->
  <circle cx="38" cy="28" r="6" fill="#F59E0B" stroke="#FFFFFF" stroke-width="1.5"/>
  <circle cx="38" cy="28" r="2.5" fill="#FFFFFF"/>
</svg>
`;

async function generate() {
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const pngBuffer = await sharp(Buffer.from(svgIcon))
    .resize(64, 64)
    .png()
    .toBuffer();

  const icoPath = path.join(publicDir, 'favicon.ico');
  fs.writeFileSync(icoPath, pngBuffer);
  console.log('Generated favicon.ico at:', icoPath);
}

generate().catch(console.error);
