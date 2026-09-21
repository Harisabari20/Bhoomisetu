const sharp = require('sharp');
const path = require('path');

async function cleanMapPerfect() {
  const inputPath = path.join(__dirname, '..', 'public', 'images', 'parcel_360_map_cropped.jpg');
  const outputPath = path.join(__dirname, '..', 'public', 'images', 'parcel_360_map_clean.jpg');

  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const width = metadata.width;
  const height = metadata.height;

  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const channels = info.channels;

  function getPixel(x, y) {
    x = Math.max(0, Math.min(width - 1, Math.round(x)));
    y = Math.max(0, Math.min(height - 1, Math.round(y)));
    const idx = (y * width + x) * channels;
    return [data[idx], data[idx + 1], data[idx + 2]];
  }

  function setPixel(x, y, rgb) {
    x = Math.max(0, Math.min(width - 1, Math.round(x)));
    y = Math.max(0, Math.min(height - 1, Math.round(y)));
    const idx = (y * width + x) * channels;
    data[idx] = rgb[0];
    data[idx + 1] = rgb[1];
    data[idx + 2] = rgb[2];
  }

  // 1. Top-Left Search Bar: Entire region from (0,0) to (490, 80)
  // We sample from the lush tree canopy below: y = 80 to 140
  for (let y = 0; y <= 75; y++) {
    for (let x = 0; x <= 490; x++) {
      const srcY = 80 + (y % 55);
      const srcX = x;
      setPixel(x, y, getPixel(srcX, srcY));
    }
  }

  // 2. Top-Right Basemap Switcher: from (730, 0) to (1002, 75)
  for (let y = 0; y <= 72; y++) {
    for (let x = 730; x < width; x++) {
      const srcY = 78 + (y % 50);
      const srcX = x;
      setPixel(x, y, getPixel(srcX, srcY));
    }
  }

  // 3. Left Toolbar: from (0, 75) to (85, 275)
  for (let y = 75; y <= 275; y++) {
    for (let x = 0; x <= 85; x++) {
      const srcX = 90 + (x % 50);
      const srcY = y;
      setPixel(x, y, getPixel(srcX, srcY));
    }
  }

  // 4. Bottom-Left Scale Bar: from (0, 680) to (240, 738)
  for (let y = 680; y < height; y++) {
    for (let x = 0; x <= 240; x++) {
      const srcY = 625 + (y % 50);
      const srcX = x;
      setPixel(x, y, getPixel(srcX, srcY));
    }
  }

  // 5. Bottom-Right Compass: from (905, 665) to (1002, 738)
  for (let y = 665; y < height; y++) {
    for (let x = 905; x < width; x++) {
      const srcY = 600 + (y % 60);
      const srcX = x;
      setPixel(x, y, getPixel(srcX, srcY));
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels,
    },
  })
    .jpeg({ quality: 95 })
    .toFile(outputPath);

  console.log('Perfect clean map image created at:', outputPath);
}

cleanMapPerfect().catch(console.error);
