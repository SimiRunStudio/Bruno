ASMARON LANGUAGE ACADEMY v36.16 — ONLINE AI SETUP (HINDI)
=========================================================

Is ZIP mein browser frontend aur Node.js backend dono hain. OpenAI API key ZIP mein include nahi hai.

RENDER DEPLOYMENT
1. ZIP extract karke sabhi project files repository ke ROOT mein upload karein (nested project folder na banayein).
2. Render Dashboard > New > Blueprint se repository connect karein; render.yaml included hai.
3. Render Environment/Secrets mein OPENAI_API_KEY ko secret ke roop mein set karein. Key ko GitHub, index.html, Acode ya ZIP mein kabhi paste na karein.
4. OPENAI_MODEL default gpt-6.1-terra hai. Apne API project mein model access confirm karein; zarurat par supported model ID environment mein set karein.
5. OPENAI_LIVE_MODEL default gpt-live-1 aur delegated Responses model gpt-5.6-terra hai. Live feature ke liye project/model access aur billing required hai.
6. Deploy ke baad https://YOUR-SERVICE.onrender.com/api/health kholein. aiReady:true model metadata probe pass hone ka signal hai; actual generation/live call ki guarantee nahi.
7. Hosted app kholein. Same-origin backend automatically detect hota hai. Separate frontend host par Settings mein backend URL set karein aur ALLOWED_ORIGINS mein exact frontend origin add karein.

SECURITY
- API key server-side hi rakhein.
- ALLOWED_ORIGINS empty hone par same-host browser origin allowed hota hai; cross-origin frontend ke liye exact comma-separated origins set karein.
- TRUST_PROXY=true sirf trusted reverse-proxy hosting par set karein.
- Built-in per-IP request throttling aur concurrency caps basic safeguards hain, complete user authentication ya production abuse prevention ka replacement nahi.

LOCAL DEVELOPMENT
- Node.js 22.6+ install karein.
- Terminal mein npm start chalayein, phir http://localhost:3000 kholein.
- OPENAI_API_KEY ko environment variable ke roop mein set karein; key source files mein na likhein.

FEATURES
AI Studio: lesson pack, tutor, coach, smart explanation, placement quiz, writing correction, multi-turn roleplay, translation, microphone recording and voice-note file upload. Voice is transcribed, sent automatically to the AI tutor, shown as editable text, and the reply can be spoken by browser TTS. Speech language can be auto-detected or explicitly set to the learning/help language. Live Teacher: WebRTC speech-to-speech, incremental transcript display, session usage updates and graceful close.

LIMITS
- Microphone recording requires HTTPS (localhost for development) and browser microphone permission. Uploaded audio files do not need microphone permission. Both voice paths require backend provider access and API billing; automatic language detection may still mishear unclear/noisy speech, so review the transcript before relying on it.
- Acode static HTML preview Node backend nahi chalata.
- No cloud learner accounts, login, multi-device sync or distributed quota service.
- Provider/model access, billing, browser audio behavior and deployment must be verified in your own account/device.
