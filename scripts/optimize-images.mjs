/**
 * optimize-images.mjs
 * ─────────────────────────────────────────────────────────────────
 * Convertit toutes les images du dossier public/photo_neyaura/ en WebP
 * et génère 3 tailles (400w, 800w, 1600w) pour le srcset.
 *
 * Prérequis : npm install -D sharp
 * Lancement  : npm run optimize-images
 * ─────────────────────────────────────────────────────────────────
 */

import sharp from 'sharp'
import { readdir, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const INPUT_DIR  = path.join(__dirname, '..', 'public', 'photo_neyaura')
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'photo_neyaura_webp')

const SIZES   = [400, 800, 1600]  // largeurs générées
const QUALITY = 82                // qualité WebP (80-85 = excellent compromis)
const EXTS    = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG']

async function getImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await getImages(fullPath)))
    } else if (EXTS.includes(path.extname(entry.name))) {
      files.push(fullPath)
    }
  }
  return files
}

async function processImage(inputPath) {
  const relative  = path.relative(INPUT_DIR, inputPath)
  const parsed    = path.parse(relative)
  const outputDir = path.join(OUTPUT_DIR, parsed.dir)

  if (!existsSync(outputDir)) await mkdir(outputDir, { recursive: true })

  const img = sharp(inputPath)
  const meta = await img.metadata()

  for (const width of SIZES) {
    if (width > meta.width) continue // pas d'agrandissement
    const outputPath = path.join(outputDir, `${parsed.name}-${width}w.webp`)
    await sharp(inputPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outputPath)
    console.log(`✓ ${relative} → ${parsed.name}-${width}w.webp`)
  }

  // Version full (non redimensionnée) pour la lightbox
  const fullPath = path.join(outputDir, `${parsed.name}.webp`)
  await sharp(inputPath)
    .webp({ quality: QUALITY })
    .toFile(fullPath)
  console.log(`✓ ${relative} → ${parsed.name}.webp (full)`)
}

async function run() {
  console.log('🔄 Optimisation des images...\n')
  const images = await getImages(INPUT_DIR)
  console.log(`📷 ${images.length} images trouvées\n`)

  let success = 0
  let errors  = 0

  for (const imgPath of images) {
    try {
      await processImage(imgPath)
      success++
    } catch (err) {
      console.error(`✗ Erreur sur ${imgPath}: ${err.message}`)
      errors++
    }
  }

  console.log(`\n✅ Terminé — ${success} images converties, ${errors} erreurs`)
  console.log(`📁 Fichiers WebP dans : ${OUTPUT_DIR}`)
  console.log('\n💡 Pour utiliser les WebP, remplace les chemins dans portfolioData.js')
  console.log('   ex: /photo_neyaura/mariage/IMG_0213.jpeg')
  console.log('    → /photo_neyaura_webp/mariage/IMG_0213.webp')
}

run()
