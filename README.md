# Explore Native Art — in-store iPad prototype

**Brand:** Tanner Trading / Fifth Generation Trading Co. (Farmington, NM)  
**Prototype name:** Explore Native Art  
**Content date:** 2026-11-06 (America/Denver)  
**Format:** Standalone progressive web app (HTML/CSS/JS + manifest + service worker). No app store.

## Three areas (keep separate)

| Area | Path / entry | Audience | Notes |
|------|----------------|----------|-------|
| Public learning | `index.html` | Store visitors on iPads | Art-form cards, materials/techniques, quiz. No customer data collection. |
| Internal hallmark / artist research | Staff tools → Hallmark helper (`js/hallmarks-data.js`) | Employees | Typed mark / name / symbol search. Photo preview **not** matched. Staff toggle ≠ auth. |
| Private buyer intake | `buyer/` (separate owners/module) | Joe + buyers | **Not linked** from this education build; not packaged in the public education review zip. Delivered separately if needed. |

`research/` holds research-worker sources/rights drafts. The shipped hallmark UI reads the bundled prototype seed in `js/hallmarks-data.js` only unless you deliberately integrate more later.

## What this is / is not

- **Is:** Home-screen-installable web app *after* HTTPS hosting; offline cache of local lesson files after first secure load; touch-friendly tablet UI; kiosk idle reset + plain staff reset (**no in-app PIN**; staff UI toggle is not security).
- **Is not:** Tested on a physical iPad in this build; App Store binary; secure private staff vault; automated hallmark image recognition; Lightspeed/Shopify writer; live metal spot feed.

## Quick local preview (no install)

Museum-style exhibit entrance with seven galleries. Open `index.html` via any static file server from this folder (recommended) or as a file URL for a basic look. Service worker / install / offline need **HTTPS** (or localhost).

```bash
cd /path/to/store-art-learning-app
python3 -m http.server 8765
# then visit http://127.0.0.1:8765/
```

## Deploy for in-store iPads (required for real install + offline)

1. Host this folder on **HTTPS** (intranet or public static host). HTTP/`file://` will not give reliable PWA install or service-worker offline.
2. Open the site in **Safari on iPad**.
3. Share → **Add to Home Screen**. Opens standalone via `manifest.webmanifest`.
4. First load online so `sw.js` can cache local assets. Later visits can use cached lessons offline. External source links still need network (marked “needs connection”).
5. **Content review required** before public rollout (cultural accuracy; hallmark archive merge).

See **READINESS.md** for implemented vs not.

### iPad Guided Access (kiosk lock — OS level, not in-app)

Verified against Apple Support (“Use Guided Access on iPhone or iPad”, support.apple.com/en-us/111795):

1. Settings → Accessibility → Guided Access → On; set a passcode.
2. Open the Home Screen web app.
3. Triple-click the top button → Guided Access → Start.

For always-on single-app kiosk on supervised devices, Apple documents **Single App Mode** via Apple Configurator / MDM. This app has **no in-app passcode gate** — staff demo entry is not authentication.

## Staff hallmark helper (honest limits)

- Search: (1) photo capture **preview only — matching NOT connected**, (2) typed hallmark letters, (3) typed name, (4) symbol description text **only for sourced associations**.
- No fake confidence scores; no filename-based pseudo-matches.
- Demo / quality-mark seed only until research merge; employee must confirm before inventory use.
- No gallery hallmark photo binaries until rights cleared (see `research/rights/` if present).
- Schema: `assets/HALLMARKS_SCHEMA.md`.

## Buyer module

Buyer intake is a **separate** local module under `buyer/` (other owners). The public education UI **does not link** to `./buyer/index.html`. Keep private vendor data out of the public education review zip; education SW still refuses to cache `/buyer/` paths if present on a combined host.

## Tests

```bash
node tests/smoke-test.mjs
```

## Distribution zip (public education review)

Package **only** the public education + staff reference files (exclude `buyer/`, `buyer-module-*.zip`, `research/`, secrets). Staging example:

```bash
STAMP=explore-native-art-review-2026-11-06
STAGE=/tmp/$STAMP
rm -rf "$STAGE" && mkdir -p "$STAGE"/{assets,css,icons,js,tests}
cp store-art-learning-app/{index.html,manifest.webmanifest,sw.js,README.md,READINESS.md,LOCAL_PREVIEW.html} "$STAGE"/
cp store-art-learning-app/assets/HALLMARKS_SCHEMA.md "$STAGE"/assets/
cp store-art-learning-app/css/styles.css "$STAGE"/css/
cp store-art-learning-app/icons/* "$STAGE"/icons/
cp store-art-learning-app/js/{app.js,content.js,hallmarks-data.js,artists-seed-data.js,artists.seed.json,staff-hallmarks.js} "$STAGE"/js/
cp store-art-learning-app/tests/{smoke-test.mjs,fixtures-ambiguity.mjs} "$STAGE"/tests/
cd /tmp && zip -r /workspace/$STAMP.zip $STAMP
```

## Approval / decisions still needed

- Cultural content review of public lessons before floor use.
- Decide Guided Access vs supervised Single App Mode (OS-level; no in-app PIN).
- HTTPS host choice for both stores’ iPads.
- Hallmark research merge + image rights (Art-Amerindien / Medicine Man / others).
- Real staff auth + private storage before buyer uploads or production hallmark library.


## Staff entry

A small, low-contrast **Staff** control in the bottom corner opens staff tools. It is a UI toggle only — **not a login** and not security. Customer home no longer lists a staff button.

## Photos & films

Visitor galleries show “Photograph coming soon” / “Introductory film — coming soon.” See **READINESS.md** for the shot list Joe should supply.
