'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const path = require('node:path');
const net = require('node:net');
async function freePort(){return await new Promise((resolve,reject)=>{const s=net.createServer();s.once('error',reject);s.listen(0,'127.0.0.1',()=>{const p=s.address().port;s.close(()=>resolve(p));});});}
test('HTTP server health, static app, method and API guards',async t=>{
 const port=await freePort();
 const child=spawn(process.execPath,['server.js'],{cwd:path.join(__dirname,'..'),env:{...process.env,PORT:String(port),OPENAI_API_KEY:'',ALLOWED_ORIGINS:''},stdio:'ignore'});
 t.after(()=>child.kill('SIGTERM'));
 const base=`http://127.0.0.1:${port}`;let ready=false;
 for(let i=0;i<50;i++){try{const r=await fetch(base+'/api/health');if(r.ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,100));}
 assert.equal(ready,true,'server should start');
 const health=await(await fetch(base+'/api/health')).json();assert.equal(health.ok,true);assert.equal(health.version,'36.16');assert.equal(health.reason,'missing_api_key');assert.equal(health.liveReady,false);assert.equal(health.liveReason,'missing_api_key');assert.ok(health.features.includes('full-duplex-live-transcript-captions'));assert.ok(health.features.includes('graceful-live-session-finalization'));assert.ok(health.features.includes('voice-note-file-upload'));assert.ok(health.features.includes('automatic-speech-language-detection'));assert.ok(health.features.includes('automatic-transcript-to-ai-tutor'));
 const page=await fetch(base+'/');assert.equal(page.status,200);assert.match(page.headers.get('content-type'),/text\/html/);assert.match(await page.text(),/Asmaron Language Academy/);
 assert.equal((await fetch(base+'/api/not-real')).status,404);
 const headers=await fetch(base+'/');assert.equal(headers.headers.get('x-content-type-options'),'nosniff');assert.equal(headers.headers.get('x-frame-options'),'DENY');
 const badJson=await fetch(base+'/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:'{broken'});assert.equal(badJson.status,503,'missing server key is checked before request parsing');
 const options=await fetch(base+'/api/ai',{method:'OPTIONS'});assert.equal(options.status,204);
 assert.equal((await fetch(base+'/api/ai',{method:'POST',headers:{'Content-Type':'text/plain'},body:'{}'})).status,415);
 assert.equal((await fetch(base+'/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'})).status,503);
 assert.equal((await fetch(base+'/api/transcribe',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'})).status,503,'voice transcription clearly requires a server-side API key');
 assert.equal((await fetch(base+'/api/session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sdp:'v=0\r\n'})})).status,503,'live session must fail clearly when server API key is absent');
 assert.equal((await fetch(base+'/',{method:'PUT'})).status,405);
 assert.equal((await fetch(base+'/..%2fserver.js')).status,404,'path traversal must be blocked');
 assert.equal((await fetch(base+'/server.js')).status,404,'server source must not be web-accessible');
 assert.equal((await fetch(base+'/.env.example')).status,404,'environment templates must not be web-accessible');
 assert.equal((await fetch(base+'/.gitignore')).status,404,'dotfiles must not be web-accessible');
 assert.equal((await fetch(base+'/assets/ai-teacher-portrait.jpg')).status,200,'public asset paths should remain available');
 assert.equal((await fetch(base+'/assets/..%2fserver.js')).status,404,'asset path traversal must be blocked');
 const sameOrigin=await fetch(base+'/api/health',{headers:{Origin:base}});assert.equal(sameOrigin.headers.get('access-control-allow-origin'),base,'same-origin requests should receive an exact CORS origin');
});

test('CORS allowlist rejects untrusted browser origins and reflects only the configured origin',async t=>{
 const port=await freePort();
 const child=spawn(process.execPath,['server.js'],{cwd:path.join(__dirname,'..'),env:{...process.env,PORT:String(port),OPENAI_API_KEY:'',ALLOWED_ORIGINS:'https://trusted.example'},stdio:'ignore'});
 t.after(()=>child.kill('SIGTERM'));
 const base=`http://127.0.0.1:${port}`;let ready=false;
 for(let i=0;i<50;i++){try{const r=await fetch(base+'/api/health');if(r.ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,100));}
 assert.equal(ready,true,'allowlist test server should start');
 const denied=await fetch(base+'/api/health',{headers:{Origin:'https://evil.example'}});
 assert.equal(denied.status,403);
 const allowed=await fetch(base+'/api/health',{headers:{Origin:'https://trusted.example'}});
 assert.equal(allowed.status,200);
 assert.equal(allowed.headers.get('access-control-allow-origin'),'https://trusted.example');
 const deniedOptions=await fetch(base+'/api/ai',{method:'OPTIONS',headers:{Origin:'https://evil.example'}});
 assert.equal(deniedOptions.status,403);
});

test('static app includes mobile and accessibility hardening and never serves server secrets',async t=>{
 const port=await freePort();
 const child=spawn(process.execPath,['server.js'],{cwd:path.join(__dirname,'..'),env:{...process.env,PORT:String(port),OPENAI_API_KEY:'',ALLOWED_ORIGINS:''},stdio:'ignore'});
 t.after(()=>child.kill('SIGTERM'));
 const base=`http://127.0.0.1:${port}`;let ready=false;
 for(let i=0;i<50;i++){try{const r=await fetch(base+'/');if(r.ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,100));}
 assert.equal(ready,true,'static test server should start');
 const page=await fetch(base+'/');const html=await page.text();
 assert.match(html,/v36\.16/);
 assert.match(html,/prefers-reduced-motion:reduce/);
 assert.match(html,/focus-visible/);
 assert.match(html,/safe-area-inset-bottom/);
 assert.match(page.headers.get('content-security-policy'),/frame-ancestors 'none'/);
 assert.equal((await fetch(base+'/server.js')).status,404);
 assert.equal((await fetch(base+'/.env.example')).status,404);
});
