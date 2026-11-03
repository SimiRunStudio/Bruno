ASMARON v36.08 — LIVE AI TEACHER
================================

Live Teacher browser microphone aur speaker ke saath GPT-Live WebRTC session use karta hai.

REQUIREMENTS
- HTTPS hosted app (localhost development exception).
- Modern browser with RTCPeerConnection, data channel, microphone and audio playback support.
- Server-side OPENAI_API_KEY and access to configured GPT-Live and delegated Responses models.
- Provider usage billing/limits.

HOW TO USE
1. Backend deploy karein aur /api/health check karein.
2. App Home screen par Live AI Teacher section kholein.
3. Start Live Teacher press karein and microphone permission allow karein.
4. Speak naturally. Transcript appears as events arrive; captions are accumulated rather than replacing prior partial words.
5. End Session press karein. App session.closed confirmation ka wait karta hai; timeout par final usage unconfirmed batata hai and local audio resources release karta hai.

TROUBLESHOOTING
- Microphone prompt na aaye: browser site permissions check karein; HTTP public host par microphone supported nahi hota.
- Connection error: /api/health, API key, model access, provider billing, Render logs and network restrictions check karein.
- Audio na sune: device media volume/output route aur browser autoplay permission check karein; page par tap karna pad sakta hai.
- Static Acode preview mein server-side live voice kaam nahi karega; Node backend host karein.

Live sessions duration-based billed ho sakte hain; delegated Responses usage separately billed ho sakta hai. Pricing and limits provider dashboard par verify karein.


V36.08 LIVE VOICE UPDATE: GPT-Live session startup greeting and transcript event names are aligned with current GPT-Live documentation. Captions are independent for learner and teacher; microphone mute/unmute and safe disconnect cleanup are available. Real testing requires deployed HTTPS and API access.

V36.08: Startup cancel/race handling improved. If you tap End while permission or connection setup is pending, the pending attempt is cancelled; any microphone stream that resolves later is stopped immediately. Mute/unmute also sends GPT-Live input-audio control events.
