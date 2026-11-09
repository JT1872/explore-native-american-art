# Explore Native Art — readiness (2026-11-09)

This is a **reviewable museum-style prototype**, not a complete integrated production app.

## Implemented in this review release

- Museum exhibit entrance + **seven** galleries in Joe’s order: Jewelry, Rug Weaving, Sandpainting, Pottery, Sculpture, Painting, Basket Weaving
- Wall-label style captions; credit lines; dignified “Exhibit in development — under cultural review” badge
- 60-second intro **film poster** (coming soon) per gallery — clean visitor-facing poster state
- Optional **Go deeper** micro-lessons drawn from curriculum research + museum sources
- Large iconic **hero photographs** for six categories (open-license museum photos under `assets/heroes/`; see CREDITS.md)
- Jewelry, Rug Weaving, and Sandpainting heroes use **Joe / Tanner Trading floor photographs**
- Sandpainting photo is a commercial sandpainting on board; ceremonial vs commercial respect note remains; **cultural reviewer should confirm the image is appropriate for display**
- Tap-to-play intro film on each hero photo (`assets/videos/<id>.mp4`); graceful “coming soon” overlay until files exist
- Sandpainting gallery keeps sacred/ceremonial vs commercial distinction; no restricted designs
- Touch-friendly tablet CSS, reduced-motion support, large tap targets, refined serif/sans system fonts (offline, no CDN)
- Web app manifest + service worker for **HTTPS** install/offline of local lesson assets
- Staff **demo** entry via discreet corner control (UI toggle only — not a login): hallmark helper unchanged in function (A–Z, typed search, photo preview only)
- Bundled read-only research seed for staff tools: 20 entities / 32 marks
- Idle return to exhibit entrance; plain staff reset (**no passcode** in-app)
- Local smoke tests (`node tests/smoke-test.mjs`)

## Not implemented / not included

- **No** Joe intro videos embedded yet (posters only)
- **No** Joe floor photography embedded yet (frames only)
- **No** automated photo recognition or confidence scores
- **No** authentication / private staff vault (staff toggle ≠ security)
- **No** Lightspeed/Shopify writes; buyer module **not linked** and not in public zip
- **No** live metal spot feed
- **No** third-party gallery hallmark photo binaries
- **Not** tested on a physical iPad; Guided Access is OS-level
- **Not** a finished cultural-review sign-off for floor use


## Media Joe must supply (not in visitor UI)

Visitor screens show only “Photograph coming soon” / “Introductory film — coming soon.” Internal shot lists live here:

### Intro films (≈60 seconds each)
1. Jewelry
2. Rug Weaving
3. Sandpainting (orientation only — no ceremonial imagery or restricted designs)
4. Pottery
5. Sculpture
6. Painting
7. Basket Weaving

### Floor photography (Joe-owned only; artist/community labels visible)
- **Jewelry:** Close-ups of tagged floor jewelry (bezel, inlay, stamped silver).
- **Rug Weaving:** Detail photos of tagged weavings (yarn, edges, region/artist labels).
- **Sandpainting:** Clearly labeled commercial sandpaintings by named artists only. Never photograph or recreate ceremonial sandpaintings.
- **Pottery:** Tagged Pueblo and other pottery (polish, paint, labels).
- **Sculpture:** Multi-angle floor sculpture with artist names visible. No generic pan-Indian clip art.
- **Painting:** Tagged Native artists’ paintings (full work + signature detail).
- **Basket Weaving:** Tagged baskets (start/rim construction); optional labeled import comparisons.

## Staff entry

One discreet bottom-corner **Staff** control opens staff tools (UI toggle only — not authentication). Honesty that this is not a login belongs in README/staff screens, not on the customer home.

## Review zip vs development tree

- **Review release zip:** public shell + staff reference data only (no `research/` raw scrapes, no private buyer records, no secrets).
- **Development tree** may contain sibling `research/` and `buyer/` owned by other workers — not part of the customer-facing release.


## Offline video decision

Intro films in `assets/videos/*.mp4` are **not** added to the service-worker precache (files are large). When a film is present on the device/network it plays from the local path; when absent, the UI shows a museum-style “Introductory film — coming soon” overlay. Runtime fetch caching also skips `.mp4`/`.webm`/`.mov` so large videos do not fill the education cache.


## Sandpainting floor photo (cultural review)

Joe supplied a photograph of a commercial sandpainting on board (hand pointing at the work). It is captioned neutrally as “Sandpainting on board” with credit “Photograph: Tanner Trading.” The gallery still carries the sacred/commercial respect note. A cultural reviewer should confirm this specific image is appropriate before floor use. Do not treat it as a ceremonial sandpainting.
