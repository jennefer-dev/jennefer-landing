import {writeFile} from 'node:fs/promises';

const pages = await fetch('http://127.0.0.1:9224/json/list').then((response) => response.json());
const page = pages.find((item) => item.type === 'page');
if (!page) throw new Error('No Chrome page found');

const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.addEventListener('open', resolve, {once: true});
  ws.addEventListener('error', reject, {once: true});
});

let nextId = 1;
const pending = new Map();
ws.addEventListener('message', ({data}) => {
  const message = JSON.parse(data);
  const callback = pending.get(message.id);
  if (callback) {
    pending.delete(message.id);
    callback(message);
  }
});

function send(method, params = {}) {
  const id = nextId++;
  return new Promise((resolve) => {
    pending.set(id, resolve);
    ws.send(JSON.stringify({id, method, params}));
  });
}

async function evaluate(expression) {
  const response = await send('Runtime.evaluate', {expression, returnByValue: true});
  if (response.error || response.result.exceptionDetails) throw new Error(JSON.stringify(response));
  return response.result.result.value;
}

async function shot(name) {
  await new Promise((resolve) => setTimeout(resolve, 700));
  const screenshot = await send('Page.captureScreenshot', {format: 'png', captureBeyondViewport: false});
  await writeFile(name, Buffer.from(screenshot.result.data, 'base64'));
}

await send('Page.enable');
await send('Runtime.enable');

for (const [label, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
  await send('Emulation.setDeviceMetricsOverride', {width, height, deviceScaleFactor: 1, mobile: label === 'mobile'});
  await evaluate(`(() => { document.documentElement.style.scrollBehavior='auto'; const s=document.getElementById('routing-demo'); window.scrollTo({top:s.getBoundingClientRect().top+window.scrollY-100,behavior:'instant'}); return window.scrollY; })()`);
  await shot(`routing-${label}-check.png`);
}

await evaluate(`(() => { document.querySelectorAll('#routing-demo button')[2].click(); return true; })()`);
await new Promise((resolve) => setTimeout(resolve, 800));
const routedText = await evaluate(`document.getElementById('routing-demo').innerText.includes('Tasker')`);
if (!routedText) throw new Error('Tasker route did not appear');

ws.close();
