/**
 * optimize-images.mjs
 * ─────────────────────────────────────────────────────────────────
 * Deux modes de fonctionnement :
 *
 * 1. Conversion classique : photo_neyaura/ → photo_neyaura_webp/
 *    (arborescence miroir, conserve les sous-dossiers)
 *
 * 2. Conversion en place : parcourt photo_neyaura_webp/ et convertit
 *    sur place tout fichier JPG/PNG trouvé dans les sous-dossiers.
 *    Le fichier original est supprimé après conversion réussie.
 *
 * Usage : npm run optimize-images
 * ─────────────────────────────────────────────────────────────────
 */

import sharp from 'sharp'
import { readdir, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import { mkdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname  = path.dirname(fileURLToPath(import.meta.url))
const LEGACY_IN  = path.join(__dirname, '..', 'public', 'photo_neyaura')
const WEBP_DIR   = path.join(__dirname, '..', 'public', 'photo_neyaura_webp')

const SIZES   = [400, 800, 1600]
const QUALITY = 82
const EXTS    = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG']

// ── helpers ──────────────────────────────────────────────────────

async function getFiles(dir, extensions) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await getFiles(fullPath, extensions)))
    } else if (extensions.includes(path.extname(entry.name))) {
      files.push(fullPath)
    }
  }
  return files
}

async function convertToWebp(inputPath, outputDir, baseName) {
  if (!existsSync(outputDir)) await mkdir(outputDir, { recursive: true })

  const img  = sharp(inputPath)
  const meta = await img.metadata()

  for (const width of SIZES) {
    if (width > meta.width) continue
    const out = path.join(outputDir, `${baseName}-${width}w.webp`)
    await sharp(inputPath).resize({ width, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(out)
  }

  const fullOut = path.join(outputDir, `${baseName}.webp`)
  await sharp(inputPath).webp({ quality: QUALITY }).toFile(fullOut)

  return fullOut
}

// ── mode 1 : legacy (photo_neyaura → photo_neyaura_webp) ─────────

async function processLegacy() {
  if (!existsSync(LEGACY_IN)) return { success: 0, errors: 0 }

  const images = await getFiles(LEGACY_IN, EXTS)
  if (images.length === 0) return { success: 0, errors: 0 }

  console.log(`\n📁 Dossier source (photo_neyaura) : ${images.length} fichier(s)\n`)
  let success = 0, errors = 0

  for (const inputPath of images) {
    try {
      const relative  = path.relative(LEGACY_IN, inputPath)
      const parsed    = path.parse(relative)
      const outputDir = path.join(WEBP_DIR, parsed.dir)
      await convertToWebp(inputPath, outputDir, parsed.name)
      console.log(`  ✓ ${relative}`)
      success++
    } catch (err) {
      console.error(`  ✗ ${inputPath}: ${err.message}`)
      errors++
    }
  }

  return { success, errors }
}

// ── mode 2 : en place (photo_neyaura_webp/**/*.jpg|png) ──────────

async function processInPlace() {
  const originals = await getFiles(WEBP_DIR, EXTS)
  if (originals.length === 0) return { success: 0, errors: 0 }

  console.log(`\n📂 Fichiers originaux dans photo_neyaura_webp : ${originals.length} fichier(s)\n`)
  let success = 0, errors = 0

  for (const inputPath of originals) {
    const dir      = path.dirname(inputPath)
    const baseName = path.parse(inputPath).name

    // Vérifie que le .webp n'existe pas déjà pour éviter l'écrasement
    const targetWebp = path.join(dir, `${baseName}.webp`)
    if (existsSync(targetWebp)) {
      console.log(`  ⏭  ${path.relative(WEBP_DIR, inputPath)} (webp déjà présent, ignoré)`)
      continue
    }

    try {
      await convertToWebp(inputPath, dir, baseName)
      await unlink(inputPath) // supprime le JPG/PNG original
      console.log(`  ✓ ${path.relative(WEBP_DIR, inputPath)} → webp + variantes (original supprimé)`)
      success++
    } catch (err) {
      console.error(`  ✗ ${path.relative(WEBP_DIR, inputPath)}: ${err.message}`)
      errors++
    }
  }

  return { success, errors }
}

// ── run ──────────────────────────────────────────────────────────

async function run() {
  console.log('🔄  Optimisation des images...')

  const [legacy, inPlace] = await Promise.all([processLegacy(), processInPlace()])

  const total = legacy.success + inPlace.success
  const errs  = legacy.errors  + inPlace.errors

  console.log(`\n✅  Terminé — ${total} image(s) converties, ${errs} erreur(s)`)
  console.log(`📁  WebP disponibles dans : public/photo_neyaura_webp/`)

  if (total > 0) {
    console.log('\n💡  N\'oublie pas de mettre à jour les chemins dans src/data/portfolioData.js')
  }
}

run()
