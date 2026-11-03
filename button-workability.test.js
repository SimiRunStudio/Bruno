'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

test('every rendered button has a delegated action or a dedicated data route', () => {
  const buttons = [...html.matchAll(/<button\b([^>]*)>/gi)].map(m => m[1]);
  assert.ok(buttons.length >= 80, `expected broad app controls, found ${buttons.length}`);
  const unhandled = buttons.filter(attrs => !/(?:data-act|data-tab|data-course|data-phrase|data-choice|data-quiz-choice)=/.test(attrs));
  assert.deepEqual(unhandled, [], 'every button must route to a working delegated handler');
  const actions = [...new Set([...html.matchAll(/data-act="([^"]+)"/g)].map(m => m[1]).filter(x => !x.includes('${')))];
  const cases = new Set([...html.matchAll(/case'([^']+)':/g)].map(m => m[1]));
  assert.deepEqual(actions.filter(x => !cases.has(x)), [], 'all literal data-act values must have a switch case');
});

test('speech recording action has a real microphone and transcription implementation', () => {
  assert.match(html, /async function startAIRecording\(\)/);
  assert.match(html, /navigator\.mediaDevices\?\.getUserMedia/);
  assert.match(html, /new MediaRecorder\(/);
  assert.match(html, /fetch\(base\+'\/api\/transcribe'/);
  assert.match(html, /case'aiRecord':startAIRecording\(\)/);
  assert.match(html, /case'aiStopRecord':stopAIRecording\(\)/);
  assert.match(html, /60-second limit reached/);
});

test('AI assessment answer choices are not swallowed by lesson choice routing', () => {
  const clickHandler = html.slice(html.indexOf("document.addEventListener('click'"), html.indexOf("document.addEventListener('change'"));
  assert.match(clickHandler, /if\(choice&&S\.lesson&&!choice\.dataset\.act\)/);
  assert.ok(clickHandler.indexOf("if(choice&&S.lesson&&!choice.dataset.act)") < clickHandler.indexOf("let a=e.target.closest('[data-act]')"));
  assert.match(clickHandler, /case'aiQuizChoice':/);
  assert.match(clickHandler, /case'aiQuizNext':/);
});

test('quiz actions validate the selected option and prevent advancing unanswered questions', () => {
  assert.match(html, /practiceQuizSession\.answers\[qi\]===undefined/);
  assert.match(html, /practiceQuizSession\.answers\[practiceQuizSession\.index\]!==undefined/);
  assert.match(html, /aiQuiz\.answers\[aiQuiz\.index\]===undefined/);
  assert.match(html, /aiQuiz\.answers\[aiQuiz\.index\]!==undefined/);
});

test('weak-area and challenge buttons start the matching learning modes', () => {
  assert.match(html, /case'practiceWeak':startLesson\(false,'weak'\)/);
  assert.match(html, /case'practiceChallenge':startLesson\(false,'challenge'\)/);
  assert.match(html, /modeOverride==='weak'/);
  assert.match(html, /modeOverride==='challenge'\?'type'/);
});
