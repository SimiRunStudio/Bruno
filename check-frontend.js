'use strict';
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync(require('node:path').join(__dirname, '..', 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]).filter(Boolean);
if (scripts.length !== 1) throw new Error(`Expected one inline application script, found ${scripts.length}`);
new vm.Script(scripts[0], { filename: 'index.html:inline-script' });
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
if (duplicates.length) throw new Error(`Duplicate static IDs: ${[...new Set(duplicates)].join(', ')}`);
if (!html.includes('v36.16')) throw new Error('Frontend version marker missing');
for (const token of ['lessons-hub','lesson-workspace','lesson-feature','lesson-detail-grid','data-act=\"speakFeaturedPhrase\"','data-act=\"navConversation\"','data-act=\"start\"']) if (!html.includes(token)) throw new Error('Lessons workspace missing: '+token);
const actions = [...new Set([...html.matchAll(/data-act=\"([^\"]+)\"/g)].map(m => m[1]).filter(action => !action.includes('${')))];
const cases = new Set([...html.matchAll(/case'([^']+)':/g)].map(m => m[1]));
const missing = actions.filter(action => !cases.has(action));
if (missing.length) throw new Error(`Unwired data-act controls: ${missing.join(', ')}`);
if (!html.includes('orientation:landscape') || !html.includes('max-height:600px')) throw new Error('Compact landscape layout rules missing');
if (!html.includes('aria-live=\"polite\"')) throw new Error('Accessible live update region missing');
for (const label of ['AI Studio','Lessons','Conversation','Phrasebook','Progress','Settings','Help']) {
  if (!html.includes('>'+label+'</button>')) throw new Error(`Navigation destination missing: ${label}`);
}
if (html.includes('VERSION 34.00') || html.includes('VERSION 36.07') || html.includes('VERSION 36.06') || html.includes('v36.09')) throw new Error('Stale release marker');
if (!html.includes('id=\"helpSection\"')) throw new Error('Help destination is not wired to content');
console.log(`Frontend syntax PASS; ${ids.length} unique static IDs; ${scripts[0].length} script characters.`);

if (!html.includes('data:image/png;base64,') || !html.includes('data:image/jpeg;base64,')) throw new Error('Standalone embedded app/teacher images missing');
const speakMatch = html.match(/function speak\(text,lang=S\.target\)\{([\s\S]*?)\nfunction shuffle/);
if (!speakMatch || /alert\(/.test(speakMatch[1])) throw new Error('Speech fallback must not use blocking alerts');
if (!html.includes('id=\"appToast\"') && !html.includes("node.id='appToast'")) throw new Error('Accessible non-blocking toast missing');
console.log('Standalone image embedding and non-blocking speech fallback PASS.');
for (const token of ['practice-card-grid','practice-progress-card','practice-quiz-shell','PRACTICE_GRAMMAR_QUIZ','practiceListening','practiceSpeaking','practiceWriting','practiceConversation','practiceRevision','practiceChallenge','practiceTipsPanel']) if (!html.includes(token)) throw new Error('Practice workspace feature missing: '+token);
console.log('Practice workspace, offline grammar quiz and category actions PASS.');

if (!html.includes("type:'session.commentary.append'") || !html.includes("event.type==='session.input_transcript.delta'") || !html.includes("event.type==='session.output_transcript.delta'")) throw new Error('GPT-Live greeting/transcript event contract mismatch');
if (!html.includes("case'liveMute':toggleLiveMute()") || !html.includes('id=\"liveMuteBtn\"')) throw new Error('Live microphone mute control is not wired');
if (!html.includes("channel.addEventListener('close'")) throw new Error('Live data-channel close recovery handler missing');
if (!html.includes('liveAttemptId') || !html.includes('acquiredMic.getTracks().forEach(t=>t.stop())')) throw new Error('Live startup cancellation/race cleanup missing');
if (!html.includes('session.input_audio.mute') || !html.includes('session.input_audio.unmute')) throw new Error('GPT-Live microphone mute protocol missing');
console.log('GPT-Live event contract, independent captions, mute control, cancellation safety and disconnect recovery PASS.');
if (!html.includes('async function startAIRecording()') || !html.includes("fetch(base+'/api/transcribe'") || !html.includes("case'aiRecord':startAIRecording()")) throw new Error('Speech recording/transcription action is not fully wired');
if (!html.includes('if(choice&&S.lesson&&!choice.dataset.act)') || !html.includes("case'aiQuizChoice':")) throw new Error('Lesson and AI quiz choice routing is not safely separated');
console.log('Speech recording/transcription and AI quiz choice routing PASS.');
