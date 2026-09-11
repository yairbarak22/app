#!/usr/bin/env bash
# Build the static site and publish it to the gh-pages branch that GitHub Pages serves.
#
#   npm run deploy
#
# Project pages live at https://<user>.github.io/<repo>/, so the build needs that
# prefix; pass a different repo name as the first argument if yours differs.
set -euo pipefail

REPO_NAME="${1:-app}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

REMOTE="$(git config --get remote.origin.url)"
SHA="$(git rev-parse --short HEAD)"

echo "==> building with base path /$REPO_NAME"
NEXT_PUBLIC_BASE_PATH="/$REPO_NAME" npx next build

echo "==> publishing out/ to gh-pages"
touch out/.nojekyll
rm -rf out/.git
git -C out init -q
git -C out add -A
git -C out -c user.email="$(git config user.email || echo noreply@example.com)" \
            -c user.name="$(git config user.name || echo deploy)" \
            commit -q -m "Deploy $SHA"
git -C out push -f -q "$REMOTE" HEAD:gh-pages
rm -rf out/.git

echo "==> done. Pages serves this from the gh-pages branch."
