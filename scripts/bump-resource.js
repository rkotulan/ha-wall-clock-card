// Bumps the cache-busting `?v=` query on the card's Lovelace resource URL via
// the Home Assistant WebSocket API, so browsers pick up a freshly deployed
// bundle without manual resource edits. Called from scripts/deploy.js after a
// successful copy, or standalone: `node scripts/bump-resource.js`.
//
// Needs Node >= 22 (native WebSocket). Configure in deploy.local.json:
//   {
//     "dest":  "Z:\\www\\wall-clock-card",
//     "haUrl": "http://192.88.99.153:8123",
//     "haToken": "<long-lived access token>"
//   }
// Optional: "resourceUrl" — path prefix of the resource to bump
// (default "/local/wall-clock-card/wall-clock-card.js").

const fs = require('fs');
const path = require('path');

const CONFIG_FILE = path.resolve(__dirname, '..', 'deploy.local.json');
const DEFAULT_RESOURCE = '/local/wall-clock-card/wall-clock-card.js';
const TIMEOUT_MS = 10000;

function readConfig() {
  if (!fs.existsSync(CONFIG_FILE)) return null;
  try {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  } catch (err) {
    console.warn(`[deploy] Could not parse ${CONFIG_FILE}: ${err.message}`);
    return null;
  }
}

// Resolves with the list of results of the queued commands.
function haWebSocketSession(wsUrl, token, commands) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    const results = [];
    let msgId = 0;
    let pending = null;

    const timer = setTimeout(() => {
      ws.close();
      reject(new Error(`timed out after ${TIMEOUT_MS / 1000}s`));
    }, TIMEOUT_MS);

    const finish = (err) => {
      clearTimeout(timer);
      ws.close();
      err ? reject(err) : resolve(results);
    };

    const sendNext = () => {
      pending = commands.shift();
      if (!pending) return finish();
      try {
        ws.send(JSON.stringify({ id: ++msgId, ...pending(results) }));
      } catch (err) {
        finish(err);
      }
    };

    ws.onerror = () => finish(new Error(`could not connect to ${wsUrl}`));
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'auth_required') {
        ws.send(JSON.stringify({ type: 'auth', access_token: token }));
      } else if (msg.type === 'auth_ok') {
        sendNext();
      } else if (msg.type === 'auth_invalid') {
        finish(new Error('authentication failed — check haToken'));
      } else if (msg.type === 'result' && msg.id === msgId) {
        if (!msg.success) {
          return finish(new Error(msg.error ? msg.error.message : 'command failed'));
        }
        results.push(msg.result);
        sendNext();
      }
    };
  });
}

// Bumps ?v= on the matching Lovelace resource. Resolves to true if bumped,
// false if bumping is not configured (silent no-op). Rejects on real errors.
async function bumpResource() {
  const cfg = readConfig();
  if (!cfg || !cfg.haUrl || !cfg.haToken) return false;

  const wsUrl = String(cfg.haUrl).trim().replace(/\/+$/, '')
    .replace(/^http/, 'ws') + '/api/websocket';
  const resourcePath = (cfg.resourceUrl || DEFAULT_RESOURCE).trim();

  const [resources] = await haWebSocketSession(wsUrl, cfg.haToken, [
    () => ({ type: 'lovelace/resources' }),
    (results) => {
      const resource = results[0].find((r) => r.url.split('?')[0] === resourcePath);
      if (!resource) {
        throw new Error(`no Lovelace resource matching ${resourcePath} found`);
      }
      const newUrl = `${resourcePath}?v=${Date.now()}`;
      console.log(`[deploy] Resource ${resource.url} -> ${newUrl}`);
      return {
        type: 'lovelace/resources/update',
        resource_id: resource.id,
        res_type: resource.type,
        url: newUrl,
      };
    },
  ]);
  return true;
}

module.exports = { bumpResource };

// Standalone run: `node scripts/bump-resource.js`
if (require.main === module) {
  bumpResource()
    .then((bumped) => {
      if (!bumped) {
        console.warn('[deploy] haUrl/haToken not set in deploy.local.json — nothing to bump.');
        process.exitCode = 1;
      }
    })
    .catch((err) => {
      console.error(`[deploy] Resource bump failed: ${err.message}`);
      process.exitCode = 1;
    });
}
