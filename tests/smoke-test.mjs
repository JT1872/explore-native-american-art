import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import vm from "vm";
import assert from "assert";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

let passed = 0, failed = 0;
function check(name, fn) {
  try { fn(); passed++; console.log("PASS:", name); }
  catch (e) { failed++; console.error("FAIL:", name, "—", e.message); }
}

check("required release files exist", () => {
  for (const f of [
    "index.html","css/styles.css","js/content.js","js/app.js",
    "manifest.webmanifest","sw.js","icons/icon.svg","README.md","READINESS.md",
    "VOICE_GUIDE.md"
  ]) assert.ok(fs.existsSync(path.join(root, f)), "missing " + f);
  // Staff hallmark package lives elsewhere now
  for (const f of [
    "js/hallmarks-data.js","js/artists-seed-data.js","js/artists.seed.json",
    "js/staff-hallmarks.js","assets/HALLMARKS_SCHEMA.md","tests/fixtures-ambiguity.mjs"
  ]) assert.ok(!fs.existsSync(path.join(root, f)), "staff file should be gone: " + f);
});

check("no staff UI or scripts in customer index/SW/app", () => {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");
  const app = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
  const css = fs.readFileSync(path.join(root, "css/styles.css"), "utf8");
  assert.ok(!/staffEntry|staff-fab|staff-hallmarks|hallmarks-data|artists-seed-data/i.test(html));
  assert.ok(!/<script[^>]+staff/i.test(html));
  assert.ok(!/hallmarks-data|artists-seed-data|staff-hallmarks|artists\.seed\.json/i.test(sw));
  assert.ok(/ena-v1-2026-11-09-kiosk-a/.test(sw));
  assert.ok(!/ENA_STAFF|staffEntry|staff-fab|renderStaff/i.test(app));
  assert.ok(!/staff-fab|staff-mode/i.test(css));
});

check("no hardcoded kiosk PIN", () => {
  const app = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
  assert.ok(!/STAFF_PIN/.test(app));
  assert.ok(!/Enter the store PIN/.test(app));
  assert.ok(!/const\s+PIN\s*=/.test(app));
  assert.ok(!/prompt\([^)]*PIN/i.test(app));
});

check("education UI has no buyer module href", () => {
  for (const f of ["js/app.js", "index.html"]) {
    const raw = fs.readFileSync(path.join(root, f), "utf8");
    assert.ok(!/href=["'][^"']*\.?\/?buyer\//i.test(raw), "buyer href leaked in " + f);
  }
  const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");
  assert.ok(/\/buyer\//.test(sw) && /Never put private buyer/i.test(sw));
});

check("public learning intact; no CDN", () => {
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  assert.ok(!/cdn\.|unpkg|jsdelivr/i.test(html));
  const css = fs.readFileSync(path.join(root, "css/styles.css"), "utf8");
  assert.ok(!/fonts\.googleapis|fonts\.gstatic|cdn\.jsdelivr|unpkg\.com/i.test(css));
  const ctx = { window: {}, console }; ctx.window = ctx;
  vm.runInNewContext(fs.readFileSync(path.join(root, "js/content.js"), "utf8"), ctx);
  assert.equal(ctx.ENA_CONTENT.artForms.length, 7);
  const order = ctx.ENA_CONTENT.artForms.map((a) => a.id);
  assert.deepEqual(order, ["jewelry","rug","sandpainting","pottery","sculpture","painting","basket"]);
  for (const a of ctx.ENA_CONTENT.artForms) {
    assert.ok(a.introVideo && a.introVideo.src && /assets\/videos\//.test(a.introVideo.src));
    assert.ok(["coming_soon","awaiting_file","ready"].includes(a.introVideo.status), a.id + " status");
    assert.ok(a.wallLabel && a.wallLabel.credit);
    assert.ok(Array.isArray(a.deeper) && a.deeper.length >= 1);
    assert.ok(a.discovery && typeof a.discovery === "string");
    const wc = a.discovery.trim().split(/\s+/).length;
    assert.ok(wc >= 40 && wc <= 70, a.id + " discovery words " + wc);
  }
  const jewelry = ctx.ENA_CONTENT.artForms.find((a) => a.id === "jewelry");
  assert.equal(jewelry.introVideo.status, "ready");
  assert.ok(jewelry.introVideo.video && jewelry.introVideo.video.provider === "vimeo");
  assert.equal(jewelry.introVideo.video.id, "1123330984");
  for (const a of ctx.ENA_CONTENT.artForms) {
    if (a.id === "jewelry") continue;
    assert.ok(["coming_soon","awaiting_file"].includes(a.introVideo.status), a.id + " still coming soon");
  }
  assert.equal(ctx.ENA_CONTENT.meta.deeperEnabled, false);
  assert.equal(ctx.ENA_CONTENT.meta.quizEnabled, false);
  assert.ok(ctx.ENA_CONTENT.meta.epigraph);
  const sand = ctx.ENA_CONTENT.artForms.find((a) => a.id === "sandpainting");
  assert.ok(sand.sacredNote);
  assert.ok(/cultural review/i.test(ctx.ENA_CONTENT.meta.exhibitLabel || ctx.ENA_CONTENT.meta.reviewStatus));
});

check("museum UI uses tap-to-play film with coming-soon fallback", () => {
  const app = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
  assert.ok(/data-play-intro/.test(app));
  assert.ok(/film-overlay|Coming soon/i.test(app));
  assert.ok(/playsinline/.test(app));
  assert.ok(/discovery/.test(app));
  assert.ok(/data-go-lesson/.test(app));
});

check("READINESS lists major gaps", () => {
  const r = fs.readFileSync(path.join(root, "READINESS.md"), "utf8");
  assert.ok(/photo recognition/i.test(r) || /cultural review/i.test(r));
  assert.ok(/auth/i.test(r) || /cultural review/i.test(r));
});

check("visitor UI omits developer notes", () => {
  const app = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  assert.ok(!/broken player/i.test(app));
  assert.ok(!/needs connection/i.test(app) || /internet connection/i.test(app));
  assert.ok(!/not a cultural design motif/i.test(app));
  assert.ok(!/Photograph forthcoming/i.test(app));
  assert.ok(!/art\.photoNeed/.test(app));
  assert.ok(/Photograph coming soon/i.test(app));
  assert.ok(/gallery-page-simple/.test(app));
  assert.ok(/class="discovery"/.test(app));
  assert.ok(!/Go deeper/i.test(app));
  assert.ok(!/data-go="quiz"/.test(app));
  assert.ok(!/staffEntry/.test(html));
});

check("hero images exist locally with credits and no hotlinks", () => {
  const ctx = { window: {}, console }; ctx.window = ctx;
  vm.runInNewContext(fs.readFileSync(path.join(root, "js/content.js"), "utf8"), ctx);
  const forms = ctx.ENA_CONTENT.artForms;
  assert.equal(forms.length, 7);
  const joeIds = ["jewelry", "rug", "sandpainting"];
  for (const a of forms) {
    assert.ok(a.hero, "missing hero for " + a.id);
    assert.equal(a.hero.kind, "photo");
    assert.ok(a.hero.src.startsWith("./assets/heroes/"));
    assert.ok(a.hero.card.startsWith("./assets/heroes/"));
    assert.ok(a.hero.creditLine);
    assert.ok(!/^https?:\/\//i.test(a.hero.src), "hotlink hero " + a.id);
    assert.ok(fs.existsSync(path.join(root, a.hero.src.replace("./", ""))));
    assert.ok(fs.existsSync(path.join(root, a.hero.card.replace("./", ""))));
    if (joeIds.includes(a.id)) {
      assert.equal(a.hero.source, "joe");
      assert.ok(/Photograph:\s*Tanner Trading/i.test(a.hero.creditLine));
    } else {
      assert.ok(a.hero.credit && a.hero.credit.license);
      assert.ok(a.hero.credit.sourceUrl);
    }
  }
  assert.ok(fs.existsSync(path.join(root, "assets/heroes/CREDITS.md")));
});

check("video player uses local path with coming-soon fallback", () => {
  const app = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
  assert.ok(/data-play-intro/.test(app));
  assert.ok(/openIntroFilm/.test(app));
  assert.ok(/film-overlay/.test(app));
  assert.ok(/Coming soon/i.test(app));
  assert.ok(/playsinline/.test(app));
  assert.ok(!/<video[^>]+src=["']https?:/i.test(app));
  const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");
  assert.ok(/ena-v1-2026-11-09-kiosk-a/.test(sw));
  assert.ok(sw.includes("jewelry-hero.webp"));
  assert.ok(!/assets\/videos\/.*\.mp4/.test(sw) || /NOT precached/i.test(sw));
  assert.ok(/mp4\|webm\|mov/.test(sw));
});

check("jewelry uses Vimeo in overlay; others stay coming-soon; SW skips Vimeo", () => {
  const app = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
  const content = fs.readFileSync(path.join(root, "js/content.js"), "utf8");
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");
  assert.ok(/player\.vimeo\.com\/video\//.test(app));
  assert.ok(/allow=["']autoplay; fullscreen; picture-in-picture["']/.test(app));
  assert.ok(/This film needs an internet connection/.test(app));
  assert.ok(/provider === "vimeo"/.test(app));
  assert.ok(/1123330984/.test(content));
  assert.ok(!/Content-Security-Policy/i.test(html));
  assert.ok(/Never intercept Vimeo|never cached/i.test(sw));
});

check("brand logo present locally with no hotlink", () => {
  assert.ok(fs.existsSync(path.join(root, "assets/brand/tanner-trading-logo.png")));
  assert.ok(fs.existsSync(path.join(root, "assets/brand/tanner-trading-logo-header.webp")));
  assert.ok(fs.existsSync(path.join(root, "assets/brand/tanner-trading-logo-home.webp")));
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const app = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
  assert.ok(html.includes("./assets/brand/tanner-trading-logo-header.webp"));
  assert.ok(app.includes("./assets/brand/tanner-trading-logo-home.webp"));
  assert.ok(!/src=["']https?:\/\/tannertrading\.com/i.test(html));
  const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");
  assert.ok(/ena-v1-2026-11-09-kiosk-a/.test(sw));
  assert.ok(sw.includes("tanner-trading-logo-header.webp"));
});

check("visitor scope is discovery + 60s video; deeper data retained", () => {
  const app = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
  const content = fs.readFileSync(path.join(root, "js/content.js"), "utf8");
  assert.ok(/visitorMode:\s*"discovery_video"/.test(content));
  assert.ok(/deeperEnabled:\s*false/.test(content));
  assert.ok(/quizEnabled:\s*false/.test(content));
  const gal = app.match(/function renderGallery\(art\) \{[\s\S]*?\n  \}/);
  assert.ok(gal);
  assert.ok(!/wall-label/.test(gal[0]));
  assert.ok(/discovery/.test(gal[0]));
  assert.ok(/function renderLesson/.test(app));
  assert.ok(/function renderQuiz/.test(app));
});

check("visitor shows three pillars only; title updated; home badge removed", () => {
  const ctx = { window: {}, console }; ctx.window = ctx;
  vm.runInNewContext(fs.readFileSync(path.join(root, "js/content.js"), "utf8"), ctx);
  const forms = ctx.ENA_CONTENT.artForms;
  const visible = forms.filter((a) => a.visible !== false);
  const hidden = forms.filter((a) => a.visible === false);
  assert.deepEqual(visible.map((a) => a.id), ["jewelry","rug","sandpainting"]);
  assert.deepEqual(hidden.map((a) => a.id).sort(), ["basket","painting","pottery","sculpture"]);
  assert.equal(ctx.ENA_CONTENT.meta.title, "Explore Native American Art");
  assert.equal(visible.find((a) => a.id === "jewelry").title, "Jewelry Making & Turquoise");

  const app = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
  const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.webmanifest"), "utf8"));
  assert.ok(/Explore Native American Art/.test(html));
  assert.ok(/<title>Explore Native American Art<\/title>/.test(html));
  assert.equal(manifest.name, "Explore Native American Art");
  assert.equal(manifest.short_name, "Native Art");
  assert.ok(/visitorArtForms/.test(app));
  assert.ok(/gallery-grid--three/.test(app));
  const home = app.match(/function renderHome\(\) \{[\s\S]*?\n  \}/)[0];
  assert.ok(!/exhibit-badge/.test(home));
  assert.ok(!/disclaimer/.test(home));
  assert.ok(/epigraph/.test(home));
  assert.ok(/meta\.location/.test(home));
  const gal = app.match(/function renderGallery\(art\) \{[\s\S]*?\n  \}/)[0];
  assert.ok(!/exhibit-badge/.test(gal) && !/Sources &amp; credits/.test(home));
  const readiness = fs.readFileSync(path.join(root, "READINESS.md"), "utf8");
  assert.ok(/cultural review/i.test(readiness));
});

check("phone header polish rules present", () => {
  const css = fs.readFileSync(path.join(root, "css/styles.css"), "utf8");
  assert.ok(/@media \(max-width: 430px\)/.test(css));
  assert.ok(/white-space:\s*nowrap/.test(css));
  assert.ok(/gallery-card h3[\s\S]{0,120}min-height:\s*0/.test(css));
});

console.log("\nSummary:", passed, "passed,", failed, "failed");
if (failed) process.exit(1);
