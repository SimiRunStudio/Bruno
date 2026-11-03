'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const server = fs.readFileSync(path.join(__dirname, '..', 'server.js'), 'utf8');

test('AI Studio offers microphone recording and uploaded voice notes', () => {
  assert.match(html, /data-act="aiRecord"/);
  assert.match(html, /data-act="aiUploadAudio"/);
  assert.match(html, /id="aiAudioFile" type="file" accept="audio\//);
  assert.match(html, /id="aiSpeechLanguage"/);
  assert.match(html, /Auto-detect · Hindi, English or mixed/);
});

test('voice pipeline transcribes, submits to tutor, displays transcript and optionally speaks reply', () => {
  assert.match(html, /async function transcribeAudioBlob\(blob\)/);
  assert.match(html, /async function sendVoiceToTutor\(blob/);
  assert.match(html, /aiRequest\(\{task:'tutor',message:transcript,speakResponse:true\}\)/);
  assert.match(html, /You said: '\+message/);
  assert.match(html, /speak\(obj\.content,S\.target\)/);
  assert.match(html, /Review the transcript above/);
});

test('manual Ask AI uses the current edited text rather than stale prefill text', () => {
  assert.match(html, /inputMessage\.trim\(\)\|\|aiPrefillMessage/);
  assert.match(html, /async function aiRequest\(options=\{\}\)/);
});

test('transcription supports automatic language detection and larger supported audio files', () => {
  assert.match(server, /lang!=='auto'/);
  assert.match(server, /if\(lang!=='auto'\)form\.append\('languages\[\]'/);
  assert.match(server, /readBody\(req,17\*1024\*1024,30000\)/);
  assert.match(server, /audio\.length>12\*1024\*1024/);
  assert.match(server, /'audio\/flac':'flac'/);
});
