const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const resourcesDir = path.join(__dirname, '../resources');
const svgPath = path.join(resourcesDir, 'icon.svg');
const pngPath = path.join(resourcesDir, 'icon.png');

async function generateIcons() {
  console.log('🎨 Generating app icons from SVG...');

  // Step 1: Convert SVG to PNG at 1024x1024
  console.log('📸 Converting SVG to PNG (1024x1024)...');
  await sharp(svgPath)
    .resize(1024, 1024)
    .png()
    .toFile(pngPath);
  console.log('✅ PNG created:', pngPath);

  // Step 2: Generate .ico and .icns using electron-icon-builder
  console.log('🔧 Generating .ico and .icns files...');
  try {
    execSync('npx electron-icon-builder --input=./resources/icon.png --output=./resources', {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit'
    });
    console.log('✅ Icon files generated successfully!');
    console.log('   - resources/icons/icon.ico (Windows)');
    console.log('   - resources/icons/icon.icns (macOS)');
  } catch (error) {
    console.error('❌ Error generating icon files:', error.message);
    console.log('\n💡 Tip: You can also manually convert the PNG to .ico and .icns using online tools');
  }
}

generateIcons().catch(console.error);
