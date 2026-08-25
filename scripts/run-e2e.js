const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');
const {spawn, spawnSync} = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const harnessPath = '/tests/e2e/issues-39-40-harness.html';

function findExecutable(command) {
    const locator = process.platform === 'win32' ? 'where.exe' : 'which';
    const result = spawnSync(locator, [command], {encoding: 'utf8'});
    if (result.status !== 0) return undefined;
    return result.stdout.split(/\r?\n/).map(value => value.trim()).find(Boolean);
}

function findBrowser() {
    const configured = process.env.E2E_BROWSER;
    const candidates = configured ? [configured] : [];

    if (process.platform === 'win32') {
        candidates.push(
            path.join(process.env.PROGRAMFILES || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
            path.join(process.env['PROGRAMFILES(X86)'] || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
            path.join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
            path.join(process.env.PROGRAMFILES || '', 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
            path.join(process.env['PROGRAMFILES(X86)'] || '', 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
        );
    } else if (process.platform === 'darwin') {
        candidates.push(
            '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
            '/Applications/Chromium.app/Contents/MacOS/Chromium',
        );
    } else {
        candidates.push(
            '/usr/bin/google-chrome',
            '/usr/bin/google-chrome-stable',
            '/usr/bin/chromium',
            '/usr/bin/chromium-browser',
            '/usr/bin/microsoft-edge',
        );
    }

    const direct = candidates.find(candidate => candidate && fs.existsSync(candidate));
    if (direct) return direct;

    for (const command of ['google-chrome', 'chromium', 'chromium-browser', 'msedge']) {
        const located = findExecutable(command);
        if (located) return located;
    }

    throw new Error('No Chromium browser found. Set E2E_BROWSER to a Chrome, Edge, or Chromium executable.');
}

function contentType(filePath) {
    switch (path.extname(filePath)) {
        case '.html': return 'text/html; charset=utf-8';
        case '.js': return 'text/javascript; charset=utf-8';
        case '.map': return 'application/json; charset=utf-8';
        case '.css': return 'text/css; charset=utf-8';
        default: return 'application/octet-stream';
    }
}

function createServer() {
    return http.createServer((request, response) => {
        const requestPath = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
        const relativePath = requestPath.replace(/^[/\\]+/, '');
        const filePath = path.resolve(projectRoot, relativePath);
        const projectPrefix = `${projectRoot}${path.sep}`;

        if (filePath !== projectRoot && !filePath.startsWith(projectPrefix)) {
            response.writeHead(403).end('Forbidden');
            return;
        }

        fs.readFile(filePath, (error, contents) => {
            if (error) {
                response.writeHead(error.code === 'ENOENT' ? 404 : 500).end(error.message);
                return;
            }
            response.writeHead(200, {'Content-Type': contentType(filePath)});
            response.end(contents);
        });
    });
}

function delay(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function waitForDevTools(profilePath, browser, stderr) {
    const portFile = path.join(profilePath, 'DevToolsActivePort');
    const started = Date.now();
    while (Date.now() - started < 10000) {
        if (fs.existsSync(portFile)) {
            const [port] = fs.readFileSync(portFile, 'utf8').split(/\r?\n/);
            if (port) return Number(port);
        }
        if (browser.exitCode !== null) {
            throw new Error(`Browser exited before DevTools started.\n${stderr()}`);
        }
        await delay(50);
    }
    throw new Error('Timed out waiting for the browser debugging endpoint.');
}

function connectDevTools(webSocketUrl) {
    return new Promise((resolve, reject) => {
        const socket = new WebSocket(webSocketUrl);
        const pending = new Map();
        let nextId = 0;

        socket.addEventListener('open', () => {
            resolve({
                send(method, params = {}) {
                    return new Promise((resolveCommand, rejectCommand) => {
                        const id = ++nextId;
                        pending.set(id, {resolve: resolveCommand, reject: rejectCommand});
                        socket.send(JSON.stringify({id, method, params}));
                    });
                },
                close() {
                    socket.close();
                },
            });
        }, {once: true});
        socket.addEventListener('error', () => reject(new Error('Could not connect to Chrome DevTools.')), {once: true});
        socket.addEventListener('message', event => {
            const message = JSON.parse(event.data);
            if (!message.id || !pending.has(message.id)) return;
            const command = pending.get(message.id);
            pending.delete(message.id);
            if (message.error) command.reject(new Error(message.error.message));
            else command.resolve(message.result);
        });
        socket.addEventListener('close', () => {
            for (const command of pending.values()) {
                command.reject(new Error('Chrome DevTools connection closed.'));
            }
            pending.clear();
        });
    });
}

async function runBrowser(browserPath, url, profilePath) {
    const args = [
        '--headless=new',
        '--disable-gpu',
        '--disable-extensions',
        '--disable-background-networking',
        '--no-first-run',
        '--no-default-browser-check',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        `--user-data-dir=${profilePath}`,
        '--remote-debugging-port=0',
        'about:blank',
    ];
    const browser = spawn(browserPath, args, {windowsHide: true});
    let stderr = '';
    browser.stderr.on('data', chunk => stderr += chunk);

    let devTools;
    try {
        const port = await waitForDevTools(profilePath, browser, () => stderr);
        const pages = await fetch(`http://127.0.0.1:${port}/json/list`).then(response => response.json());
        const page = pages.find(candidate => candidate.type === 'page');
        if (!page?.webSocketDebuggerUrl) throw new Error('No debuggable browser page was found.');

        devTools = await connectDevTools(page.webSocketDebuggerUrl);
        await devTools.send('Page.enable');
        await devTools.send('Runtime.enable');
        await devTools.send('Page.navigate', {url});

        const started = Date.now();
        while (Date.now() - started < 20000) {
            const evaluation = await devTools.send('Runtime.evaluate', {
                expression: `(() => {
                    const result = document.getElementById('e2e-result');
                    return result ? {status: result.dataset.status, text: result.textContent} : null;
                })()`,
                returnByValue: true,
            });
            const result = evaluation.result?.value;
            if (result?.status === 'passed' || result?.status === 'failed') return result;
            await delay(50);
        }
        throw new Error('E2E page did not finish within 20 seconds.');
    } finally {
        devTools?.close();
        browser.kill();
        await new Promise(resolve => browser.once('close', resolve));
    }
}

async function main() {
    const browserPath = findBrowser();
    const profilePath = fs.mkdtempSync(path.join(os.tmpdir(), 'wall-clock-e2e-'));
    const server = createServer();

    try {
        await new Promise((resolve, reject) => {
            server.once('error', reject);
            server.listen(0, '127.0.0.1', resolve);
        });
        const address = server.address();
        const url = `http://127.0.0.1:${address.port}${harnessPath}`;
        const result = await runBrowser(browserPath, url, profilePath);
        if (result.status !== 'passed') {
            throw new Error(`E2E assertions failed.\n${result.text}`);
        }
        console.log(result.text.trim());
    } finally {
        await new Promise(resolve => server.close(resolve));
        fs.rmSync(profilePath, {recursive: true, force: true});
    }
}

main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
});
