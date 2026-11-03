ASMARON LANGUAGE ACADEMY v36.16
================================

Yeh language-learning app offline lessons aur online AI features dono support karta hai.
Main tabs: Home, Courses, Practice, Progress, Settings.

OFFLINE PREVIEW
1. ZIP extract karein.
2. Root ka index.html Acode ya modern browser mein open karein.
3. Offline lessons, phrase practice, local progress aur browser-supported device text-to-speech use karein. Agar Acode WebView mein TTS available na ho, app ab blocking alert nahi dikhata; voice ke liye Chrome ya configured Live Teacher use karein.
4. Static preview mein Node.js backend nahi chalta; online AI ke liye HTTPS-hosted backend zaroori hai.

ONLINE AI SETUP
1. Folder ki files repository root mein upload karein.
2. Render par Blueprint deploy karein (render.yaml included).
3. Server Environment/Secrets mein OPENAI_API_KEY set karein. API key ko index.html, ZIP ya public repository mein kabhi na rakhein.
4. /api/health open karke backend status dekhein. aiReady:true ka matlab configured model metadata check pass hua; actual AI generation test alag se karein.
5. Hosted app ke Settings tab mein AI backend URL check karein; same-origin hosting auto-detect hoti hai.

FEATURES
- Offline courses, phrasebook, practice, progress and local spaced-review data.
- AI lesson packs, tutor, adaptive coach, smart explanations, 12-question assessment, writing correction, roleplay and translation.
- Microphone recording/transcription (HTTPS + permission + backend + API billing).
- GPT-Live speech-to-speech AI teacher using WebRTC (HTTPS + supported browser + API project access + usage billing).

DATA & LIMITS
- Progress and saved AI packs are stored in this browser/device localStorage. Export a backup from Settings before clearing browser data.
- No login, cloud sync or multi-device profile in this build.
- Acode static preview cannot run server.js; use Node.js 22.6+ or deploy the included backend.
- AI content may contain errors; verify important/formal language. API usage is billed separately by the provider.
- No claim of zero bugs or guaranteed lag-free operation: use the included QA audit for tested scope and remaining real-device checks.
