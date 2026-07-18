// Copies the built bundle into a Home Assistant `www` folder so you don't have
// to copy it by hand. Used both standalone (`npm run deploy`) and from webpack
// (see webpack.config.js) so `npm run watch` auto-deploys on every rebuild.
//
// Configure the destination once, in order of precedence:
//   1. env var  HA_WWW_DEST
//   2. deploy.local.json  ->  { "dest": "Z:\\config\\www\\wall-clock-card" }
// The destination is the FOLDER that will contain wall-clock-card.js
// (typically <HA config>/www/wall-clock-card, served by HA as
//  /local/wall-clock-card/wall-clock-card.js).

const fs = require('fs');
const path = require('path');

const BUNDLE = 'wall-clock-card.js';
const DIST = path.resolve(__dirname, '..', 'dist', BUNDLE);
const CONFIG_FILE = path.resolve(__dirname, '..', 'deploy.local.json');

function resolveDest() {
  if (process.env.HA_WWW_DEST && process.env.HA_WWW_DEST.trim()) {
    return process.env.HA_WWW_DEST.trim();
  }
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      const cfg = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
      if (cfg && cfg.dest && String(cfg.dest).trim()) {
        return String(cfg.dest).trim();
      }
    } catch (err) {
      console.warn(`[deploy] Could not parse ${CONFIG_FILE}: ${err.message}`);
    }
  }
  return null;
}

// Copies the freshly built bundle to the configured HA folder.
// Returns true if it copied, false if no destination is configured (silent no-op
// so builds still succeed on machines without a deploy target).
function copyBundle({ silent = false } = {}) {
  const dest = resolveDest();
  if (!dest) {
    if (!silent) {
      console.warn(
        '[deploy] No destination configured. Set HA_WWW_DEST or create deploy.local.json ' +
        '(see deploy.local.example.json). Skipping copy.'
      );
    }
    return false;
  }
  if (!fs.existsSync(DIST)) {
    console.warn(`[deploy] Build output not found at ${DIST}. Run the build first.`);
    return false;
  }
  fs.mkdirSync(dest, { recursive: true });
  const target = path.join(dest, BUNDLE);
  fs.copyFileSync(DIST, target);
  console.log(`[deploy] Copied ${BUNDLE} -> ${target}`);

  // Fire-and-forget: bump the ?v= cache-buster on the HA Lovelace resource so
  // browsers reload the new bundle. No-op unless haUrl/haToken are configured.
  const { bumpResource } = require('./bump-resource');
  bumpResource().catch((err) => {
    console.warn(`[deploy] Resource bump failed: ${err.message}`);
  });
  return true;
}

module.exports = { resolveDest, copyBundle, BUNDLE };

// Standalone run: `node scripts/deploy.js` / `npm run deploy`
if (require.main === module) {
  const copied = copyBundle();
  if (!copied && !resolveDest()) {
    process.exitCode = 1; // explicit run with no target configured is an error
  }
}
