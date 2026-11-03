ASMARON LANGUAGE ACADEMY v36.16 — ACODE / ANDROID GUIDE

1. ZIP extract karke poora folder Acode me open karein. index.html ko Preview/browser me open karein.
2. Lessons, phrase practice, local progress, settings aur backup device/browser par kaam karte hain.
3. Acode ka file:// preview Node backend nahi chalata. Online AI Tutor, voice recording/transcription, uploaded voice notes aur Live AI Teacher ke liye Node.js backend ko localhost ya HTTPS hosting par run/deploy karein. Voice note upload ke liye microphone permission zaroori nahi; recording ke liye permission chahiye.
4. Server environment me OPENAI_API_KEY set karein. API key ko index.html/browser code me kabhi paste na karein.
5. App > Settings > Online AI connection me deployed backend ka HTTPS URL save karein.
6. Live voice ke liye HTTPS, microphone permission, supported WebRTC browser, model access aur API billing required hai. Direct file:// mode se online AI voice kaam nahi karega.

Premium navy/electric-blue/cyan UI, desktop navigation rail aur mobile bottom navigation. Existing lessons, practice, phrasebook, progress, backup, settings and AI controls retained.


UI / ACCESSIBILITY UPDATE v36.16
- Dark navy theme contrast and form controls are unified across screens.
- Keyboard focus rings, disabled-state affordances, reduced-motion support and safe-area spacing are included.
- Mobile navigation touch targets and narrow 320–380px layout spacing are hardened.
- The app remains a single-file offline frontend; backend-dependent AI features still require the Node server and HTTPS/localhost as described above.
