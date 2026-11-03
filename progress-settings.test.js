const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

test('Progress and Settings screens render complete, data-honest sections', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const start = html.indexOf('function applyPreferences()');
  const settingsStart = html.indexOf('\nfunction settings(){', start);
  const end = html.indexOf('\nfunction ', settingsStart + 10);
  assert.ok(start >= 0 && settingsStart > start && end > settingsStart, 'screen render functions exist');
  const today = new Date();
  const date = today.getFullYear() + '-' + String(today.getMonth()+1).padStart(2,'0') + '-' + String(today.getDate()).padStart(2,'0');
  const context = {
    S: {tab:'Progress',theme:'dark',fontScale:1,reducedMotion:false,remindersEnabled:true,reminderTime:'00:00',dailyXP:10,dailyGoal:40,langXP:120,streak:3,streakBest:7,attempts:24,correct:20,target:'en',source:'hi',soundRate:.85,ttsEnabled:true,
      history:[{date,language:'en',correct:3,attempts:4,type:'grammar-quiz'},{date,language:'en',correct:2,attempts:3,type:'lesson'}],
      review:{en:{0:{level:3,right:4,wrong:1,last:date,due:date}}},mastery:{en:{0:2}},studentModel:{en:{0:{seen:3,right:2,wrong:1}}},adaptive:{en:{difficulty:2.5}},aiLibrary:[]},
    LANGS:[['en','English'],['hi','Hindi']],PHRASES:{en:['Hello','How are you?','Thank you'],hi:['नमस्ते','आप कैसे हैं?','धन्यवाद']},
    document:{querySelector:()=>null,documentElement:{dataset:{}}},window:{matchMedia:()=>({matches:false})},
    $:()=>null,aiBase:()=>'',aiStatus:'AI not connected',esc:x=>String(x??'').replace(/[&<>"']/g,''),normalizeAnswer:x=>String(x||'').toLowerCase().trim(),
    today:()=>date,Date,Math,Number,String,Object,Array
  };
  vm.createContext(context);
  vm.runInContext(html.slice(start,end),context);
  const progress = vm.runInContext('progress()',context);
  const settings = vm.runInContext('settings()',context);
  for (const label of ['Weekly activity','Daily goal','28-day consistency','Course mastery','Practice mix','Achievements','YOUR NEXT BEST STEP']) assert.ok(progress.includes(label), `Progress includes ${label}`);
  for (const label of ['Learning preferences','Language preferences','Appearance & accessibility','Audio & pronunciation','Study reminders','AI connection','Data, privacy & backup','Reset progress']) assert.ok(settings.includes(label), `Settings includes ${label}`);
  assert.match(settings, /id="theme"/);
  assert.match(settings, /id="fontScale"/);
  assert.match(settings, /id="remindersEnabled"/);
  assert.match(settings, /No automatic cloud sync/);
});
