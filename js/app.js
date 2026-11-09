(function () {
  "use strict";

  var C = window.ENA_CONTENT;
  var IDLE_MS = 3 * 60 * 1000;
  var WARN_MS = 30 * 1000;
  var root = document.getElementById("app");
  var live = document.getElementById("live");
  var idleTimer = null;
  var warnTimer = null;
  var state = {
    view: "home",
    artId: null,
    lessonId: null,
    quizIndex: 0,
    quizScore: 0,
    quizAnswered: false,
    quizDone: false,
  };

  function announce(msg) {
    if (live) live.textContent = msg;
  }

  function byId(id) {
    for (var i = 0; i < C.artForms.length; i++) {
      if (C.artForms[i].id === id) return C.artForms[i];
    }
    return null;
  }

  function isVisitorVisible(art) {
    if (!art) return false;
    return art.visible !== false;
  }

  function visitorArtForms() {
    return C.artForms.filter(isVisitorVisible);
  }

  function lessonById(art, lessonId) {
    if (!art || !art.deeper) return null;
    for (var i = 0; i < art.deeper.length; i++) {
      if (art.deeper[i].id === lessonId) return art.deeper[i];
    }
    return null;
  }

  function sourceMap() {
    var m = {};
    C.sources.forEach(function (s) { m[s.id] = s; });
    return m;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function creditList(ids) {
    var sm = sourceMap();
    return (ids || [])
      .map(function (id) {
        var s = sm[id];
        if (!s) return "";
        return (
          "<li><a href=\"" +
          escapeHtml(s.url) +
          "\" target=\"_blank\" rel=\"noopener noreferrer\">" +
          escapeHtml(s.label) +
          '</a><span class="ext-hint" title="Opens in browser when online" aria-label="External link">↗</span></li>'
        );
      })
      .join("");
  }


  function heroMediaHtml(art, opts) {
    opts = opts || {};
    var h = art.hero || {};
    var sizeClass = opts.sizeClass || "hero-media";
    var pos = h.objectPosition || "center center";
    var playLabel = "Play introductory film for " + (art.title || "this gallery");
    if (h.kind === "photo" && h.src) {
      return (
        '<button type="button" class="' + sizeClass + ' hero-tap" data-play-intro="' +
        escapeHtml(art.id) +
        '" aria-label="' + escapeHtml(playLabel) + '">' +
        '<img src="' + escapeHtml(h.src) + '" alt="' + escapeHtml(h.alt || art.title) +
        '" loading="lazy" decoding="async" style="object-position:' + escapeHtml(pos) + '" ' +
        (h.fallback ? 'onerror="this.onerror=null;this.src=\'' + escapeHtml(h.fallback) + '\'"' : "") +
        "/>" +
        '<span class="play-badge" aria-hidden="true"><span class="play-triangle"></span></span>' +
        "</button>" +
        (h.creditLine
          ? '<p class="img-credit">' + escapeHtml(h.creditLine) + "</p>"
          : "")
      );
    }
    // typographic / missing photo
    return (
      '<button type="button" class="' + sizeClass + ' hero-tap hero-typo" data-play-intro="' +
      escapeHtml(art.id) +
      '" aria-label="' + escapeHtml(playLabel) + '">' +
      '<div class="hero-typo-inner">' +
      '<span class="play-badge" aria-hidden="true"><span class="play-triangle"></span></span>' +
      "<strong>" + escapeHtml(art.title) + "</strong>" +
      "<span>Photograph coming soon</span>" +
      "</div>" +
      "</button>" +
      '<p class="img-credit">' +
      escapeHtml((h && h.creditLine) || "Photograph coming soon.") +
      "</p>"
    );
  }

  function closeFilmOverlay() {
    var ov = document.getElementById("filmOverlay");
    if (!ov) return;
    var vid = ov.querySelector("video");
    if (vid) {
      try { vid.pause(); } catch (e) {}
      try { vid.removeAttribute("src"); vid.load(); } catch (e2) {}
    }
    // Remove iframe so Vimeo audio stops immediately
    var frame = ov.querySelector("iframe");
    if (frame) {
      try { frame.src = "about:blank"; } catch (e3) {}
      try { frame.remove(); } catch (e4) {}
    }
    ov.remove();
    document.body.classList.remove("film-open");
  }

  function openIntroFilm(artId) {
    var art = byId(artId);
    if (!art) return;
    closeFilmOverlay();
    var intro = art.introVideo || {};
    var videoCfg = intro.video || art.video || null;
    var src = intro.src || ("./assets/videos/" + art.id + ".mp4");
    var ov = document.createElement("div");
    ov.id = "filmOverlay";
    ov.className = "film-overlay";
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.setAttribute("aria-label", "Introductory film");
    ov.innerHTML =
      '<div class="film-overlay-panel">' +
      '<button type="button" class="btn film-close" data-film-close="1">Close</button>' +
      '<div class="film-stage" id="filmStage">' +
      '<div class="film-loading">Preparing film…</div>' +
      "</div></div>";
    document.body.appendChild(ov);
    document.body.classList.add("film-open");
    ov.addEventListener("click", function (ev) {
      var c = ev.target.closest("[data-film-close]");
      if (c || ev.target === ov) closeFilmOverlay();
    });

    function showComingSoon() {
      var stage = document.getElementById("filmStage");
      if (!stage) return;
      stage.innerHTML =
        '<div class="film-coming-soon">' +
        '<p class="film-kicker">Introductory film</p>' +
        "<h3>Coming soon</h3>" +
        "<p>A short orientation film for " +
        escapeHtml(art.title) +
        " will play here when it is ready.</p>" +
        '<div class="film-runtime">' +
        escapeHtml(intro.runtime || "≈ 60 sec") +
        "</div></div>";
      announce("Introductory film coming soon");
    }

    function showOffline() {
      var stage = document.getElementById("filmStage");
      if (!stage) return;
      stage.innerHTML =
        '<div class="film-coming-soon film-offline">' +
        '<p class="film-kicker">Introductory film</p>' +
        "<h3>Needs a connection</h3>" +
        "<p>This film needs an internet connection.</p>" +
        "</div>";
      announce("This film needs an internet connection");
    }

    function showVimeoPlayer(vimeoId) {
      var stage = document.getElementById("filmStage");
      if (!stage) return;
      var embed =
        "https://player.vimeo.com/video/" +
        encodeURIComponent(String(vimeoId)) +
        "?autoplay=1&playsinline=1&title=0&byline=0&portrait=0&dnt=1";
      stage.innerHTML =
        '<div class="film-vimeo-wrap">' +
        '<iframe class="film-vimeo" title="' +
        escapeHtml(intro.title || art.title || "Introductory film") +
        '" src="' +
        escapeHtml(embed) +
        '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>' +
        "</div>";
      announce("Playing introductory film");
    }

    function showLocalPlayer() {
      var stage = document.getElementById("filmStage");
      if (!stage) return;
      stage.innerHTML =
        '<video class="film-video" playsinline webkit-playsinline controls controlslist="nodownload" preload="metadata" src="' +
        escapeHtml(src) +
        '"></video>';
      var vid = stage.querySelector("video");
      vid.addEventListener("ended", function () {
        closeFilmOverlay();
        announce("Film ended");
      });
      vid.addEventListener("error", function () {
        showComingSoon();
      });
      var playPromise = vid.play();
      if (playPromise && playPromise.catch) {
        playPromise.catch(function () {
          /* user can tap controls */
        });
      }
      announce("Playing introductory film");
    }

    // Prefer remote provider (Vimeo) when configured
    if (videoCfg && videoCfg.provider === "vimeo" && videoCfg.id) {
      if (typeof navigator !== "undefined" && navigator.onLine === false) {
        showOffline();
        return;
      }
      showVimeoPlayer(videoCfg.id);
      return;
    }

    // Local mp4 path: probe file, else coming soon
    fetch(src, { method: "HEAD" })
      .then(function (res) {
        if (res.ok) showLocalPlayer();
        else showComingSoon();
      })
      .catch(function () {
        showLocalPlayer();
      });
  }


    function diagramSvg(kind) {
    if (kind === "jewelry") {
      return (
        '<svg viewBox="0 0 320 140" role="img" aria-label="Neutral diagram of stone set in a metal bezel">' +
        '<rect x="20" y="40" width="120" height="60" rx="4" fill="#e7e5e4" stroke="#44403c" stroke-width="2"/>' +
        '<ellipse cx="80" cy="70" rx="28" ry="22" fill="#a8a29e" stroke="#1c1917" stroke-width="2"/>' +
        '<path d="M160 70 H200" stroke="#78716c" stroke-width="2"/>' +
        '<rect x="210" y="35" width="90" height="70" rx="4" fill="#fafaf9" stroke="#44403c" stroke-width="2"/>' +
        '<ellipse cx="255" cy="70" rx="22" ry="18" fill="#a8a29e" stroke="#1c1917" stroke-width="2"/>' +
        '<text x="80" y="125" text-anchor="middle" font-size="12" fill="#57534e">stone</text>' +
        '<text x="255" y="125" text-anchor="middle" font-size="12" fill="#57534e">bezel holds stone</text>' +
        "</svg>"
      );
    }
    if (kind === "weaving") {
      return (
        '<svg viewBox="0 0 320 140" role="img" aria-label="Neutral diagram of warp and weft interlacing">' +
        '<g stroke="#1c1917" stroke-width="2">' +
        '<line x1="40" y1="20" x2="40" y2="120"/><line x1="70" y1="20" x2="70" y2="120"/>' +
        '<line x1="100" y1="20" x2="100" y2="120"/><line x1="130" y1="20" x2="130" y2="120"/>' +
        '<line x1="160" y1="20" x2="160" y2="120"/></g>' +
        '<g stroke="#78716c" stroke-width="7" stroke-linecap="round">' +
        '<path d="M30 45 H170"/><path d="M30 75 H170"/><path d="M30 105 H170"/></g>' +
        '<text x="240" y="55" font-size="13" fill="#57534e">warp = vertical</text>' +
        '<text x="240" y="80" font-size="13" fill="#57534e">weft = horizontal</text>' +
        "</svg>"
      );
    }
    if (kind === "pottery") {
      return (
        '<svg viewBox="0 0 320 140" role="img" aria-label="Neutral diagram of stacked clay coils forming a vessel">' +
        '<ellipse cx="90" cy="110" rx="50" ry="12" fill="#e7e5e4" stroke="#57534e" stroke-width="2"/>' +
        '<path d="M50 110 C50 70 50 40 90 35 C130 40 130 70 130 110" fill="#d6d3d1" stroke="#44403c" stroke-width="2"/>' +
        '<path d="M58 95 H122 M60 80 H120 M65 65 H115 M72 52 H108" stroke="#78716c" stroke-width="2" fill="none"/>' +
        '<text x="200" y="50" font-size="13" fill="#57534e">1. roll coils</text>' +
        '<text x="200" y="75" font-size="13" fill="#57534e">2. stack &amp; join</text>' +
        '<text x="200" y="100" font-size="13" fill="#57534e">3. scrape smooth</text>' +
        "</svg>"
      );
    }
    if (kind === "sand") {
      return (
        '<svg viewBox="0 0 320 140" role="img" aria-label="Neutral diagram distinguishing temporary ground work from permanent board art">' +
        '<rect x="24" y="70" width="110" height="36" fill="#d6d3d1" stroke="#44403c" stroke-width="2"/>' +
        '<text x="79" y="60" text-anchor="middle" font-size="12" fill="#57534e">temporary ground</text>' +
        '<rect x="186" y="40" width="110" height="66" fill="#fafaf9" stroke="#44403c" stroke-width="2"/>' +
        '<text x="241" y="30" text-anchor="middle" font-size="12" fill="#57534e">permanent backing</text>' +
        '<text x="160" y="128" text-anchor="middle" font-size="12" fill="#78716c">ceremony ≠ commercial art</text>' +
        "</svg>"
      );
    }
    if (kind === "sculpture") {
      return (
        '<svg viewBox="0 0 320 140" role="img" aria-label="Neutral diagram of viewing a form from three angles">' +
        '<rect x="40" y="35" width="50" height="70" fill="#d6d3d1" stroke="#44403c" stroke-width="2"/>' +
        '<rect x="130" y="45" width="50" height="60" fill="#a8a29e" stroke="#44403c" stroke-width="2"/>' +
        '<rect x="220" y="30" width="50" height="75" fill="#78716c" stroke="#1c1917" stroke-width="2"/>' +
        '<text x="65" y="125" text-anchor="middle" font-size="12" fill="#57534e">front</text>' +
        '<text x="155" y="125" text-anchor="middle" font-size="12" fill="#57534e">side</text>' +
        '<text x="245" y="125" text-anchor="middle" font-size="12" fill="#57534e">three-quarter</text>' +
        "</svg>"
      );
    }
    if (kind === "painting") {
      return (
        '<svg viewBox="0 0 320 140" role="img" aria-label="Neutral diagram of a framed painting surface">' +
        '<rect x="70" y="20" width="180" height="100" fill="#1c1917" stroke="#44403c" stroke-width="2"/>' +
        '<rect x="86" y="36" width="148" height="68" fill="#fafaf9" stroke="#a8a29e" stroke-width="2"/>' +
        '<text x="160" y="75" text-anchor="middle" font-size="13" fill="#57534e">surface · signature · label</text>' +
        "</svg>"
      );
    }
    return (
      '<svg viewBox="0 0 320 140" role="img" aria-label="Neutral diagram of a coiled basket structure">' +
      '<path d="M160 70 m-10 0 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0" fill="none" stroke="#78716c" stroke-width="5"/>' +
      '<path d="M160 70 m-28 0 a28 28 0 1 0 56 0 a28 28 0 1 0 -56 0" fill="none" stroke="#57534e" stroke-width="5"/>' +
      '<path d="M160 70 m-46 0 a46 46 0 1 0 92 0 a46 46 0 1 0 -92 0" fill="none" stroke="#44403c" stroke-width="5"/>' +
      '<circle cx="160" cy="70" r="3" fill="#1c1917"/>' +
      '<text x="20" y="30" font-size="13" fill="#57534e">center start</text>' +
      '<text x="210" y="110" font-size="13" fill="#57534e">coils stitch outward</text>' +
      "</svg>"
    );
  }

  function renderHome() {
    var visible = visitorArtForms();
    var cards = visible
      .map(function (a) {
        var h = a.hero || {};
        var media =
          h.kind === "photo" && (h.card || h.src)
            ? '<button type="button" class="gallery-card-media hero-tap" data-play-intro="' +
              a.id +
              '" aria-label="Play introductory film for ' +
              escapeHtml(a.title) +
              '">' +
              '<img src="' +
              escapeHtml(h.card || h.src) +
              '" alt="' +
              escapeHtml(h.alt || a.title) +
              '" loading="lazy" decoding="async" style="object-position:' +
              escapeHtml(h.objectPosition || "center") +
              '"/>' +
              '<span class="play-badge" aria-hidden="true"><span class="play-triangle"></span></span>' +
              "</button>"
            : '<button type="button" class="gallery-card-media hero-tap hero-typo" data-play-intro="' +
              a.id +
              '" aria-label="Play introductory film for ' +
              escapeHtml(a.title) +
              '">' +
              '<div class="hero-typo-inner">' +
              '<span class="play-badge" aria-hidden="true"><span class="play-triangle"></span></span>' +
              "<span>Photograph coming soon</span>" +
              "</div>" +
              "</button>";
        return (
          '<article class="gallery-card">' +
          "<h3>" +
          escapeHtml(a.title) +
          "</h3>" +
          media +
          '<div class="gallery-card-body">' +
          '<button type="button" class="cta-btn" data-go-art="' +
          a.id +
          '">Open</button>' +
          "</div></article>"
        );
      })
      .join("");

    var gridClass =
      "gallery-grid" + (visible.length === 3 ? " gallery-grid--three" : "");

    return (
      '<section class="hero-exhibit">' +
      '<div class="home-brand">' +
      '<img src="./assets/brand/tanner-trading-logo-home.webp" width="280" height="152" alt="Tanner Trading — a family tradition since 1872" />' +
      "</div>" +
      (C.meta.epigraph
        ? '<p class="epigraph">“' + escapeHtml(C.meta.epigraph) + '”</p>'
        : "") +
      "<h2>" +
      escapeHtml(C.meta.subtitle) +
      "</h2>" +
      '<p class="hero-meta">' +
      escapeHtml(C.meta.location) +
      "</p>" +
      "</section>" +
      '<div class="' +
      gridClass +
      '">' +
      cards +
      "</div>" +
      ""
    );
  }

  function renderGallery(art) {
    if (!art || !isVisitorVisible(art)) return renderHome();
    var respect = art.sacredNote
      ? '<p class="respect-short">' + escapeHtml(art.sacredNote) + "</p>"
      : "";
    return (
      '<div class="gallery-page gallery-page-simple">' +
      '<div class="footer-bar gallery-nav">' +
      '<button type="button" class="btn" data-go="home">← Home</button>' +
      "</div>" +
      '<p class="gallery-kicker">Learn</p>' +
      '<h2 class="gallery-title">' +
      escapeHtml(art.title) +
      "</h2>" +
      heroMediaHtml(art, { sizeClass: "gallery-hero-media" }) +
      '<p class="film-hint">Tap the photograph to play a short film (~60 sec).</p>' +
      respect +
      '<p class="discovery">' +
      escapeHtml(art.discovery || art.short || "") +
      "</p>" +
      "</div>"
    );
  }

  function renderLesson(art, lesson) {
    if (!art || !lesson) return renderHome();
    return (
      '<div class="footer-bar" style="margin-bottom:16px">' +
      '<button type="button" class="btn" data-go-art="' +
      escapeHtml(art.id) +
      '">← ' +
      escapeHtml(art.title) +
      " gallery</button>" +
      "</div>" +
      '<div class="exhibit-badge" style="margin-bottom:14px">' +
      escapeHtml(C.meta.exhibitLabel || C.meta.reviewStatus) +
      "</div>" +
      '<section class="panel">' +
      '<p class="quiz-progress">' +
      escapeHtml(lesson.minutes) +
      " · deeper lesson</p>" +
      "<h2>" +
      escapeHtml(lesson.title) +
      "</h2>" +
      "<p><strong>Objective.</strong> " +
      escapeHtml(lesson.objective) +
      "</p>" +
      "<h3>Talking points</h3>" +
      "<ol>" +
      (lesson.talkingPoints || [])
        .map(function (t) {
          return "<li>" + escapeHtml(t) + "</li>";
        })
        .join("") +
      "</ol>" +
      '<div class="notice"><strong>Touch activity.</strong> ' +
      escapeHtml(lesson.touch) +
      "</div>" +
      '<div class="credit-lines"><h3>Credit lines</h3><ul class="source-list">' +
      creditList(lesson.sourceIds || art.sourceIds) +
      "</ul></div>" +
      "</section>"
    );
  }

  function renderQuiz() {
    if (state.quizDone) {
      return (
        '<section class="panel">' +
        "<h2>Knowledge check complete</h2>" +
        '<div class="score-big">' +
        state.quizScore +
        " / " +
        C.quiz.length +
        "</div>" +
        "<p>Thanks for looking closely. Ask staff if you want to see examples of any gallery on the floor.</p>" +
        '<button type="button" class="btn btn-primary" data-go="home">Back to entrance</button> ' +
        '<button type="button" class="btn" data-quiz-restart="1">Try again</button>' +
        "</section>"
      );
    }
    var q = C.quiz[state.quizIndex];
    var choices = q.choices
      .map(function (c) {
        return (
          '<button type="button" class="choice" data-choice="' +
          c.id +
          '"' +
          (state.quizAnswered ? " disabled" : "") +
          ">" +
          escapeHtml(c.text) +
          "</button>"
        );
      })
      .join("");
    return (
      '<div class="footer-bar" style="margin-bottom:12px">' +
      '<button type="button" class="btn" data-go="home">← Entrance</button>' +
      "</div>" +
      '<section class="panel">' +
      '<div class="quiz-progress">Question ' +
      (state.quizIndex + 1) +
      " of " +
      C.quiz.length +
      "</div>" +
      "<h2>" +
      escapeHtml(q.prompt) +
      "</h2>" +
      '<div id="choices">' +
      choices +
      "</div>" +
      '<div id="feedback" class="feedback hidden"></div>' +
      '<button type="button" class="btn btn-primary hidden" id="nextQ" data-quiz-next="1">Next</button>' +
      "</section>"
    );
  }


  function heroCreditsList() {
    return C.artForms
      .map(function (a) {
        var h = a.hero || {};
        var c = h.credit;
        if (!c && h.kind !== "photo") {
          return (
            "<li><strong>" +
            escapeHtml(a.title) +
            ".</strong> Photograph coming soon.</li>"
          );
        }
        if (h.source === "joe" || (c && c.photographer === "Tanner Trading" && !c.sourceUrl)) {
          return (
            "<li><strong>" +
            escapeHtml(a.title) +
            ".</strong> " +
            escapeHtml(h.creditLine || "Photograph: Tanner Trading") +
            (c && c.note ? " " + escapeHtml(c.note) : "") +
            "</li>"
          );
        }
        return (
          "<li><strong>" +
          escapeHtml(a.title) +
          ".</strong> " +
          escapeHtml(c.title) +
          (c.maker ? ", " + escapeHtml(c.maker) : "") +
          (c.nation ? " / " + escapeHtml(c.nation) : "") +
          (c.date ? ", " + escapeHtml(c.date) : "") +
          ". " +
          escapeHtml(c.institution || "") +
          ". Photo: " +
          escapeHtml(c.photographer || "") +
          ". " +
          escapeHtml(c.license || "") +
          (c.sourceUrl
            ? '. <a href="' +
              escapeHtml(c.sourceUrl) +
              '" target="_blank" rel="noopener noreferrer">Source</a>'
            : "") +
          "</li>"
        );
      })
      .join("");
  }

  function renderSources() {
    var items = C.sources
      .map(function (s) {
        return (
          "<li><a href=\"" +
          escapeHtml(s.url) +
          "\" target=\"_blank\" rel=\"noopener noreferrer\">" +
          escapeHtml(s.label) +
          '</a><span class="ext-hint" title="Opens in browser when online" aria-label="External link">↗</span></li>'
        );
      })
      .join("");
    return (
      '<div class="footer-bar" style="margin-bottom:12px">' +
      '<button type="button" class="btn" data-go="home">← Entrance</button>' +
      "</div>" +
      '<section class="panel">' +
      "<h2>Sources &amp; credits</h2>" +
      "<p>These credit lines support the short films and photographs in this prototype (" +
      escapeHtml(C.meta.contentDate) +
      ". It paraphrases publicly available museum and educational resources. It is not a substitute for tribal or curator review.</p>" +
      '<ul class="source-list">' +
      items +
      "</ul>" +
      "<h3>Exhibit photographs</h3>" +
      '<ul class="source-list">' +
      heroCreditsList() +
      "</ul>" +
      '<p class="small muted">Brand: ' +
      escapeHtml(C.meta.brand) +
      " · " +
      escapeHtml(C.meta.location) +
      ". No customer data is collected by this app.</p>" +
      "</section>"
    );
  }

  function render() {
    var html = "";
    if (state.view === "home") html = renderHome();
    else if (state.view === "art") html = renderGallery(byId(state.artId));
    else if (state.view === "lesson") html = renderLesson(byId(state.artId), lessonById(byId(state.artId), state.lessonId));
    else if (state.view === "quiz") html = renderQuiz();
    else if (state.view === "sources") html = renderSources(); else html = renderHome();

    root.innerHTML = html;


    document.body.classList.remove("kiosk-fade");
    void document.body.offsetWidth;
    document.body.classList.add("kiosk-fade");
  }

  function goHome() {
    state.view = "home";
    state.artId = null;
    state.lessonId = null;
    state.quizIndex = 0;
    state.quizScore = 0;
    state.quizAnswered = false;
    state.quizDone = false;
    render();
    announce("Returned to exhibit entrance");
    window.scrollTo(0, 0);
  }

  function resetIdle() {
    clearTimeout(idleTimer);
    clearTimeout(warnTimer);
    var toast = document.getElementById("idleToast");
    if (toast) toast.remove();
    warnTimer = setTimeout(function () {
      if (document.getElementById("idleToast")) return;
      var t = document.createElement("div");
      t.id = "idleToast";
      t.className = "idle-toast";
      t.setAttribute("role", "status");
      t.textContent = "Still exploring? Tap anywhere to continue. Resetting soon…";
      document.body.appendChild(t);
    }, IDLE_MS - WARN_MS);
    idleTimer = setTimeout(function () {
      goHome();
      announce("Session reset after inactivity");
    }, IDLE_MS);
  }

  function onChoice(choiceId) {
    if (state.quizAnswered) return;
    var q = C.quiz[state.quizIndex];
    var correct = null;
    q.choices.forEach(function (c) {
      if (c.correct) correct = c.id;
    });
    state.quizAnswered = true;
    var buttons = root.querySelectorAll(".choice");
    buttons.forEach(function (btn) {
      var id = btn.getAttribute("data-choice");
      btn.disabled = true;
      if (id === correct) btn.classList.add("correct");
      if (id === choiceId && choiceId !== correct) btn.classList.add("wrong");
    });
    if (choiceId === correct) state.quizScore += 1;
    var fb = document.getElementById("feedback");
    if (fb) {
      fb.classList.remove("hidden");
      fb.textContent = q.explain;
    }
    var next = document.getElementById("nextQ");
    if (next) {
      next.classList.remove("hidden");
      next.textContent = state.quizIndex >= C.quiz.length - 1 ? "See results" : "Next";
    }
  }

  function nextQuiz() {
    if (state.quizIndex >= C.quiz.length - 1) state.quizDone = true;
    else {
      state.quizIndex += 1;
      state.quizAnswered = false;
    }
    render();
  }

  root.addEventListener("click", function (e) {
    var t = e.target.closest(
      "[data-go],[data-go-art],[data-go-lesson],[data-choice],[data-quiz-next],[data-quiz-restart],[data-play-intro],[data-film-close]"
    );
    if (!t) return;

    if (t.hasAttribute("data-play-intro")) {
      var playId = t.getAttribute("data-play-intro");
      if (!isVisitorVisible(byId(playId))) {
        announce("That gallery is not on the floor yet");
        return;
      }
      openIntroFilm(playId);
      return;
    }
    if (t.hasAttribute("data-film-close")) {
      closeFilmOverlay();
      return;
    }

    if (t.hasAttribute("data-go")) {
      var dest = t.getAttribute("data-go");
      if (dest === "home") goHome();
      if (dest === "quiz") {
        // Visitor quiz disabled for current 60-sec scope; data retained for later
        if (C.meta && C.meta.quizEnabled === false) {
          state.view = "home";
          render();
          announce("Short films are the focus for now");
        } else {
          state.view = "quiz";
          state.quizIndex = 0;
          state.quizScore = 0;
          state.quizAnswered = false;
          state.quizDone = false;
          render();
        }
      }
      if (dest === "sources") {
        state.view = "sources";
        render();
      }
      window.scrollTo(0, 0);
    }

    if (t.hasAttribute("data-go-art")) {
      var goArtId = t.getAttribute("data-go-art");
      if (!isVisitorVisible(byId(goArtId))) {
        state.view = "home";
        state.artId = null;
        render();
        announce("That gallery is not on the floor yet");
        return;
      }
      state.view = "art";
      state.artId = goArtId;
      state.lessonId = null;
      render();
      announce("Opened " + ((byId(state.artId) || {}).title || "gallery"));
      window.scrollTo(0, 0);
    }

    if (t.hasAttribute("data-go-lesson")) {
      if (C.meta && C.meta.deeperEnabled === false) {
        announce("Deeper lessons are saved for later");
        return;
      }
      state.view = "lesson";
      state.lessonId = t.getAttribute("data-go-lesson");
      render();
      announce("Opened deeper lesson");
      window.scrollTo(0, 0);
    }

    if (t.hasAttribute("data-choice")) onChoice(t.getAttribute("data-choice"));
    if (t.hasAttribute("data-quiz-next")) nextQuiz();
    if (t.hasAttribute("data-quiz-restart")) {
      state.quizIndex = 0;
      state.quizScore = 0;
      state.quizAnswered = false;
      state.quizDone = false;
      render();
    }
  });

  ["pointerdown", "keydown", "touchstart", "mousemove", "scroll"].forEach(function (evt) {
    document.addEventListener(evt, resetIdle, { passive: true });
  });


  window.ENA_APP = {
    goHome: goHome,
    getState: function () {
      return JSON.parse(JSON.stringify(state));
    },
    setState: function (s) {
      Object.assign(state, s);
      render();
    },
    render: render,
    content: C,
    IDLE_MS: IDLE_MS
  };

  render();
  resetIdle();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("./sw.js").catch(function () {});
    });
  }
})();
