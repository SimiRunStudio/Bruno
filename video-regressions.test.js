'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const server = fs.readFileSync(path.join(__dirname, '..', 'server.js'), 'utf8');
test('home progress ring is explicitly a daily goal, not a proficiency score', () => {
  assert.match(html, /<b>Daily Goal<\/b>/);
  assert.match(html, /Daily learning target · XP earned today/);
  assert.doesNotMatch(html, /<b>Your Progress<\/b>[\s\S]{0,600}Learning level · Practice snapshot/);
});
test('live teacher starts disconnected and never advertises ready before session start', () => {
  assert.match(html, /liveTeacherVisualState='idle'/);
  assert.match(html, /AI voice teacher · Not connected/);
  assert.match(html, /VOICE NOT CONNECTED/);
  assert.match(html, /function cleanupLiveTeacher\([^)]*finalState='idle'/);
  assert.match(html, /state==='listening'\?'LISTENING'/);
});
test('voice fallback message is concise and toast does not cover bottom controls', () => {
  assert.match(html, /This browser cannot play device speech/);
  assert.match(html, /#appToast\{top:calc\(76px/);
  assert.match(html, /max-height:min\(20vh,112px\)/);
  assert.match(html, /#appToast\{[^}]*bottom:auto/);
});
test('server and frontend use the same 36.16 release marker', () => {
  assert.match(server, /APP_VERSION = '36\.16'/);
  assert.match(html, /v36\.16/);
});
