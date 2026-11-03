ASMARON LANGUAGE ACADEMY v36.08 — ONLINE + VOICE SETUP (HINDI)
===============================================================

IMPORTANT: ZIP project source hai; ye pehle se published website nahi hai. Online AI/voice ke liye backend host, API key, model access, billing aur HTTPS zaroori hain.

LOCAL COMPUTER
--------------
1. Node.js 22.6+ install karein.
2. ZIP extract karein.
3. START_ASMARON_WINDOWS.bat (Windows) ya start-asmaron.sh (Mac/Linux) run karein.
4. .env file mein OPENAI_API_KEY set karein. Key ko index.html, GitHub public repo ya browser/localStorage mein kabhi na daalein.
5. http://localhost:3000 open karein. Localhost par microphone permission supported hoti hai.

ONLINE RENDER DEPLOYMENT
------------------------
1. Project ke saare files GitHub repository ke root mein upload karein.
2. Render Dashboard → New → Blueprint select karke repository connect karein.
3. OPENAI_API_KEY ko Render Environment Secret mein set karein.
4. Deploy complete hone par HTTPS website open karein.
5. /api/health check karein. Text AI ke liye aiReady=true aur voice ke liye liveReady=true hona chahiye.
6. Home → Start Live Teacher → microphone permission Allow.
7. Teacher ko bolkar check karein; uska audio response aana chahiye.
8. Mute mic, Unmute mic aur End buttons test karein.

AGAR LIVE VOICE NA CHALE
------------------------
- liveReason=missing_api_key: Render Environment mein OPENAI_API_KEY missing hai.
- liveReason=invalid_api_key: key invalid/revoked hai.
- liveReason=model_not_available: GPT-Live ya delegated Responses model project ko available nahi hai. OPENAI_LIVE_MODEL / OPENAI_LIVE_RESPONSES_MODEL ko enabled model IDs se configure karein.
- provider_rate_limited: API rate/usage limit check karein.
- provider_unreachable / timeout: backend logs, network aur provider status check karein.
- microphone prompt na aaye: HTTPS use karein; browser site permission Allow karein; Acode/file:// preview se Live Voice nahi chalega.
- teacher audio na aaye: phone media volume, output route aur browser autoplay permission check karein. Audio controls fallback dikhe to Play dabayein.

V36.08 RELIABILITY FIXES
------------------------
- Startup cancel/race fix: permission prompt ya network setup ke dauran End dabane par pending attempt invalidate hota hai. Late microphone stream turant stop hoti hai.
- Stale WebRTC events ignore hote hain.
- Mute/unmute local mic track ke saath GPT-Live input-audio event bhi bhejta hai.
- Health endpoint text model aur dono Live/Delegated models ko alag verify karta hai; sirf text AI ready hone par voice ko ready nahi batata.
- Better connection diagnostics and provider error detail.

COST / SECURITY
---------------
OpenAI API billing ChatGPT plan se alag hoti hai. GPT-Live duration aur delegated Responses usage separately bill ho sakte hain. API dashboard par limits set karein. OPENAI_API_KEY sirf hosting server ke secret environment mein rakhein.

LIMITATIONS
-----------
Progress local browser/device par save hota hai; cloud account sync included nahi hai. Real microphone/audio session ko aapke API key, billing, deployment aur Android device par test karna zaroori hai. Automated tests real voice call ka substitute nahi hain.
