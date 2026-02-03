import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const svgPath = path.join(__dirname, 'public', 'app-icon.svg')
const outputDir = path.join(__dirname, 'public')

const sizes = [
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
  { size: 180, name: 'apple-touch-icon.png' }
]

async function generateIcons() {
  const svgBuffer = fs.readFileSync(svgPath)

  for (const { size, name } of sizes) {
    const outputPath = path.join(outputDir, name)

    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath)

    console.log(`✅ Gerado: ${name}`)
  }

  console.log('\n✨ Todos os ícones PNG foram gerados com sucesso!')
}

generateIcons().catch(console.error)
