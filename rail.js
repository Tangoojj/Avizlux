/* آویزلوکس — هیروی «ریل برنجی» (نسخه‌ی ۷)
   ده مدل منتخب روی ریل؛ حالت عادی: نیم‌رخ (فریم ۰ اطلس). هاور/تمرکز/مرکز موبایل:
   چرخش برگشت‌پذیر ~۹۰ درجه با پخش‌کننده‌ی فریم (الگوی interactive-garment-starter، MIT).
   فریم‌های اطلس از عکس واقعی همان محصول ساخته شده‌اند (برش + چرخش هندسی)؛ هیچ بازطراحی‌ای در کار نیست.
   کلیک/لمس → خرید سریع موجود (openBuy در app.js). */
(function () {
  "use strict";
  var ORDER = ["4046", "4028", "4027", "3027", "4026", "3074", "3061", "3055", "3057", "4024"];
  var DEFAULT_CODE = "4026";
  var FRAMES = 13, COLS = 4, ROWS = 4;
  var TURN_MS = 360, INTENT_MS = 80;

  var row = document.getElementById("railRow");
  if (!row || typeof byCode !== "function") return;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var FA = "۰۱۲۳۴۵۶۷۸۹";
  var faNum = function (n) { return String(n).replace(/\d/g, function (d) { return FA[d]; }); };
  var price = (typeof faPrice === "function") ? faPrice : function (n) { return faNum(n.toLocaleString("en-US")).replace(/,/g, "٬"); };

  var slots = ORDER.map(function (code, i) {
    var p = byCode(code);
    var el = document.createElement("button");
    el.type = "button";
    el.className = "rail-slot" + (code === DEFAULT_CODE ? " is-default" : "");
    el.setAttribute("aria-label", p.name + "، کد " + faNum(code) + "، " + price(p.price) + " تومان — برای خرید سریع بزنید");
    el.innerHTML =
      '<span class="rail-stem" aria-hidden="true"></span>' +
      '<span class="rail-sway" style="animation-delay:' + (i * -0.9).toFixed(1) + 's">' +
        '<span class="rail-frame" role="img" aria-hidden="true">' +
          '<img class="rail-poster" src="' + ((window.RAIL_POSTERS && window.RAIL_POSTERS[code]) || "") + '" alt="" decoding="async">' +
        '</span>' +
      '</span>' +
      '<span class="rail-code" aria-hidden="true">No. ' + code + '</span>';
    row.appendChild(el);
    return { code: code, prod: p, el: el, frame: el.querySelector(".rail-frame"),
             poster: el.querySelector(".rail-poster"),
             p: code === DEFAULT_CODE ? 1 : 0, target: code === DEFAULT_CODE ? 1 : 0,
             shown: -1, ready: false };
  });
  var activeIdx = ORDER.indexOf(DEFAULT_CODE);
  var defaultIdx = activeIdx;

  /* ---------- کپشن زیر ریل ---------- */
  var rcName = document.getElementById("rcName"), rcMeta = document.getElementById("rcMeta"),
      rcPrice = document.getElementById("rcPrice"), rcBuy = document.getElementById("rcBuy"),
      rcGallery = document.getElementById("rcGallery");
  function renderCaption() {
    var s = slots[activeIdx], p = s.prod;
    rcName.textContent = p.name;
    rcMeta.textContent = "کد " + faNum(s.code) + " · " + p.dims + " · " + p.mat;
    rcPrice.innerHTML = (p.old ? '<span class="old">' + price(p.old) + "</span>" : "") + price(p.price) + ' <span class="unit">تومان</span>';
    rcBuy.textContent = "خرید سریع";
  }
  rcBuy.addEventListener("click", function () { openBuy(slots[activeIdx].code); });
  rcGallery.addEventListener("click", function () { openGallery(slots[activeIdx].code); });
  renderCaption();

  /* ---------- موتور فریم ---------- */
  function framePos(t) {
    var idx = Math.round(t * (FRAMES - 1));
    var col = idx % COLS, r = Math.floor(idx / COLS);
    return { idx: idx, x: COLS > 1 ? (col / (COLS - 1)) * 100 : 0, y: ROWS > 1 ? (r / (ROWS - 1)) * 100 : 0 };
  }
  function paint(s) {
    var d = s.p * s.p * s.p * (s.p * (s.p * 6 - 15) + 10); /* smootherstep — دو سرِ نرم */
    var f = framePos(d);
    if (f.idx === s.shown) return;
    s.shown = f.idx;
    if (s.ready) s.frame.style.backgroundPosition = f.x.toFixed(2) + "% " + f.y.toFixed(2) + "%";
  }
  var last = null, running = false;
  function loop(ts) {
    if (last == null) last = ts;
    var dt = Math.min(64, ts - last); last = ts;
    var moving = false;
    slots.forEach(function (s) {
      if (s.p !== s.target) {
        var step = dt / TURN_MS;
        s.p = s.target > s.p ? Math.min(s.target, s.p + step) : Math.max(s.target, s.p - step);
        moving = true;
      }
      paint(s);
    });
    if (moving) requestAnimationFrame(loop);
    else { running = false; last = null; }
  }
  function kick() { if (!running) { running = true; requestAnimationFrame(loop); } }

  function setActive(i, opts) {
    opts = opts || {};
    if (i === activeIdx && !opts.force) { kick(); return; }
    activeIdx = i;
    slots.forEach(function (s, j) {
      s.target = j === i ? 1 : 0;
      s.el.classList.toggle("is-active", j === i);
      var push = 0;
      if (j === i - 1) push = -16; else if (j === i + 1) push = 16;
      s.el.style.transform = push ? "translateX(" + push + "px)" : "";
    });
    renderCaption();
    kick();
  }
  slots[activeIdx].el.classList.add("is-active");
  slots.forEach(function (s) { paint(s); });

  /* ---------- بارگذاری تنبل اطلس‌ها (بعد از اولین رندر) ---------- */
  function loadAtlases() {
    var sc = document.createElement("script");
    sc.src = "rail-frames.js";
    sc.onload = function () {
      if (!window.RAIL_FRAMES) return;
      slots.forEach(function (s) {
        if (!window.RAIL_FRAMES[s.code]) return;
        s.ready = true;
        s.frame.style.backgroundImage = 'url("' + window.RAIL_FRAMES[s.code] + '")';
        s.shown = -1;
        paint(s);
        if (s.poster) s.poster.style.display = "none";
      });
      if (reduced) slots.forEach(function (s) { s.p = s.target = 1; paint(s); });
    };
    document.head.appendChild(sc);
  }
  if ("requestIdleCallback" in window) requestIdleCallback(loadAtlases, { timeout: 1200 });
  else setTimeout(loadAtlases, 350);

  /* ---------- دسکتاپ: هاور با تأخیر قصد ---------- */
  var intentTimer = null;
  slots.forEach(function (s, i) {
    s.el.addEventListener("pointerenter", function (e) {
      if (e.pointerType === "touch") return;
      clearTimeout(intentTimer);
      intentTimer = setTimeout(function () { setActive(i); }, INTENT_MS);
    });
    s.el.addEventListener("focus", function () { setActive(i); });
    s.el.addEventListener("click", function () { openBuy(s.code); });
  });
  document.getElementById("railStage").addEventListener("pointerleave", function (e) {
    if (e.pointerType === "touch") return;
    clearTimeout(intentTimer);
    setActive(defaultIdx);
  });

  /* ---------- موبایل: سوایپ و مرکز ---------- */
  var settleTimer = null;
  row.addEventListener("scroll", function () {
    if (window.innerWidth > 760) return;
    clearTimeout(settleTimer);
    settleTimer = setTimeout(function () {
      var rr = row.getBoundingClientRect(), mid = rr.left + rr.width / 2, best = 0, bd = 1e9;
      slots.forEach(function (s, i) {
        var r = s.el.getBoundingClientRect(), d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bd) { bd = d; best = i; }
      });
      setActive(best);
    }, 130);
  }, { passive: true });
})();
