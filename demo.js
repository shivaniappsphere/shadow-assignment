import { delegateShadowEvents } from './src/delegator.js';
import { processStyleThiefBatch } from './src/styleBatch.js';
import { transmitTelemetryOrFallback } from './src/telemetry.js';

/* TASK 1 */
const host = document.getElementById('shadow-host');
const log = document.getElementById('log');

delegateShadowEvents(host, ['click'], (data) => {
  const div = document.createElement('div');
  div.textContent = JSON.stringify(data);
  log.prepend(div);
});

/* TASK 2 */
const btn = document.getElementById('runStyleBtn');
const targets = document.querySelectorAll('.target');
const output = document.getElementById('style-output');

btn.onclick = () => {
  processStyleThiefBatch(targets, output);
};

/* TASK 3 */
const tBtn = document.getElementById('sendTelemetryBtn');
const status = document.getElementById('telemetry-status');

tBtn.onclick = () => {
  const payload = {
    event: 'click',
    time: Date.now()
  };

  const res = transmitTelemetryOrFallback(
    payload,
    'https://httpbin.org/post'
  );

  status.innerHTML = `
    Size: ${res.size} bytes <br>
    Method: ${res.method} <br>
    Status: ${res.status}
  `;
};