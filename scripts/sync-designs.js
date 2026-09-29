import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const REMOTE_MANIFEST_URL = 'https://raw.githubusercontent.com/siddharthkmaharana/landing_page_gallery/main/designs.json'
const LOCAL_GALLERY_DIR = path.resolve(ROOT, '../landing-page-gallery')
const LOCAL_DESIGNS_DATA_PATH = path.resolve(ROOT, 'src/data/designs.js')
const PUBLIC_DESIGNS_IMG_DIR = path.resolve(ROOT, 'public/images/designs')

async function syncDesigns() {
  console.log('🔄 Checking for updated designs from landing_page_gallery...')
  let designsData = null

  // Check remote first, fallback to local directory if present
  try {
    const res = await fetch(`${REMOTE_MANIFEST_URL}?t=${Date.now()}`)
    if (res.ok) {
      designsData = await res.json()
      console.log('✅ Fetched designs manifest from GitHub successfully.')
    }
  } catch (err) {
    console.warn('⚠️ Could not fetch from GitHub, checking local sibling folder...', err.message)
  }

  if (!designsData && fs.existsSync(path.join(LOCAL_GALLERY_DIR, 'designs.json'))) {
    try {
      designsData = JSON.parse(fs.readFileSync(path.join(LOCAL_GALLERY_DIR, 'designs.json'), 'utf8'))
      console.log('✅ Loaded designs manifest from local sibling repo.')
    } catch (err) {
      console.error('❌ Failed to read local designs.json:', err.message)
    }
  }

  if (!designsData || !Array.isArray(designsData)) {
    console.error('❌ No valid designs manifest found to sync.')
    return
  }

  // Ensure public images directory exists
  if (!fs.existsSync(PUBLIC_DESIGNS_IMG_DIR)) {
    fs.mkdirSync(PUBLIC_DESIGNS_IMG_DIR, { recursive: true })
  }

  // Generate src/data/designs.js
  const fileContent = `/**
 * DESIGN SHOWCASE DATA
 * Automatically synchronized with https://github.com/siddharthkmaharana/landing_page_gallery
 * Last synced: ${new Date().toISOString()}
 */

export const designProjects = ${JSON.stringify(designsData, null, 2)};

export const designs = designProjects;
export default designProjects;
`

  fs.writeFileSync(LOCAL_DESIGNS_DATA_PATH, fileContent, 'utf8')
  console.log(`✨ Successfully synced ${designsData.length} designs to src/data/designs.js!`)
}

syncDesigns().catch(console.error)
