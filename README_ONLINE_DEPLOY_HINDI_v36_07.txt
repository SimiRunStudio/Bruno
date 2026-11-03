ASMARON LANGUAGE ACADEMY v36.08 — ONLINE DEPLOYMENT GUIDE
===============================================================

This build is based on v36.06 and retains its existing learning systems, local progress, AI Studio, transcription, backend and deployment configuration.

VOICE-TO-VOICE IMPROVEMENTS
---------------------------
1. Aligned GPT-Live startup greeting with the official GPT-Live session flow: trusted developer input at session creation plus session.commentary.append after session.started.
2. Replaced mismatched Realtime transcript event names with GPT-Live session.input_transcript.delta and session.output_transcript.delta.
3. Kept learner and teacher transcript drafts independent so full-duplex/overlapping speech is not merged into one draft.
4. Added short idle grouping for transcript fragments, preserving the content of each speaker turn.
5. Added microphone mute/unmute control without ending the live session.
6. Added data-channel close recovery, failed/disconnected WebRTC cleanup, and graceful close timeout handling.
7. Added an audio-controls fallback if the browser blocks autoplay.
8. Improved live-session setup watchdog and microphone track cleanup.

ONLINE SETUP
------------
- Deploy the project root using the included Render Blueprint or Dockerfile.
- Use Node.js 22.6 or later.
- Add OPENAI_API_KEY only to the hosting provider's server-side secret environment.
- Ensure the API project has GPT-Live, Responses and transcription model access and sufficient API billing.
- Open the deployed HTTPS URL; microphone access requires HTTPS (localhost is allowed for local development).
- In Settings, save the backend URL if the app is hosted separately, then test the connection.
- On Home, tap Start Live Teacher, grant microphone permission, speak, and wait for the teacher's audio reply. Use Mute mic to pause your microphone and End to close the session.

IMPORTANT LIMITATIONS
---------------------
The ZIP is deployment-ready source, not an already-published website. Real voice-to-voice calls cannot be verified without the owner's API key, model permissions, billing, HTTPS deployment and a physical microphone/speaker device. Automated tests do not certify every Android browser, Bluetooth route, network handoff, production load, authentication, or cloud learner synchronization. Do not expose OPENAI_API_KEY in index.html, localStorage, a public repository, or a browser.

V36.08 RELIABILITY FIXES
-----------------------
- Live startup now uses an attempt ID to cancel stale async work. If the user ends a session while the Android/browser permission prompt or network setup is pending, late microphone streams are immediately stopped instead of leaving the mic active or reviving a cancelled session.
- Late WebRTC track/data-channel events from an old attempt are ignored.
- Startup and ICE gathering timeouts are bounded; cancellation releases microphone, audio element, data channel and peer connection.
- Microphone mute/unmute now silences the local media track and also sends the corresponding GPT-Live session input-audio mute event.
- Provider errors show the upstream detail when available.
