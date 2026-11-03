#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")"
command -v node >/dev/null 2>&1 || { echo 'Node.js 22.6+ is required.'; exit 1; }
[ -f .env ] || cp .env.example .env
npm run check
npm test
exec node --env-file=.env server.js
