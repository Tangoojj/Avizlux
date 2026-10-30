/* آویزلوکس v21 — حرکت ظریف روی عکس‌های واقعی (بدون تصویر ساختگی):
   ۱) تیلت نرم حداکثر ~۵ درجه + برق نور دنبال‌کننده‌ی نشانگر روی قاب تست و نمای اصلی گالری؛
   ۲) زوم روان در گالری: دکمه، چرخ ماوس، دوبارکلیک، کشیدن برای جابه‌جایی و پینچ.
   فقط transform/opacity (بدون جابه‌جایی چیدمان)، خاموش با prefers-reduced-motion،
   روی کارت‌ها فقط هاور دسکتاپ (مقیاس/هاله) — هنگام اسکرول موبایل هیچ تیلتی نیست. */
(function () {
  "use strict";
  function $(id) { return document.getElementById(id); }
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ================= زوم گالری ================= */
  var gMain = $("gMain"), gImg = $("gImg"), gallery = $("gallery");
  var z = { s: 1, x: 0, y: 0 };
  var pointers = new Map();
  var pinchD = 0, lastPt = null, panning = false;

  function clampPan() {
    var r = gMain.getBoundingClientRect();
    var mx = Math.max(0, (z.s - 1) * r.width / 2);
    var my = Math.max(0, (z.s - 1) * r.height / 2);
    z.x = Math.min(mx, Math.max(-mx, z.x));
    z.y = Math.min(my, Math.max(-my, z.y));
  }
  function applyZoom(anim) {
    clampPan();
    gImg.style.transition = (anim && !reduced) ? "transform .25s ease" : "none";
    gImg.style.transform = "translate(" + z.x.toFixed(1) + "px," + z.y.toFixed(1) + "px) scale(" + z.s.toFixed(3) + ")";
    gMain.classList.toggle("zoomed", z.s > 1.01);
  }
  function resetZoom(anim) { z = { s: 1, x: 0, y: 0 }; applyZoom(anim); }
  function zoomAt(ns, clientX, clientY) {
    ns = Math.min(3, Math.max(1, ns));
    var r = gMain.getBoundingClientRect();
    var cx = clientX - (r.left + r.width / 2), cy = clientY - (r.top + r.height / 2);
    var k = ns / z.s;
    z.x = cx - (cx - z.x) * k;
    z.y = cy - (cy - z.y) * k;
    z.s = ns;
    applyZoom(false);
  }
  function centerZoom(ns) {
    var r = gMain.getBoundingClientRect();
    zoomAt(ns, r.left + r.width / 2, r.top + r.height / 2);
  }
  if (gMain && gImg) {
    gImg.draggable = false;
    $("gzIn").addEventListener("click", function () { centerZoom(z.s * 1.4); });
    $("gzOut").addEventListener("click", function () { centerZoom(z.s / 1.4); });
    $("gzReset").addEventListener("click", function () { resetZoom(true); });
    gMain.addEventListener("wheel", function (e) {
      e.preventDefault();
      zoomAt(z.s * (e.deltaY < 0 ? 1.15 : 0.87), e.clientX, e.clientY);
    }, { passive: false });
    gMain.addEventListener("dblclick", function (e) {
      if (z.s > 1.01) resetZoom(true); else zoomAt(2, e.clientX, e.clientY);
    });
    gMain.addEventListener("pointerdown", function (e) {
      if (e.target.closest(".g-zoom-ui")) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      try { gMain.setPointerCapture(e.pointerId); } catch (err) {}
      if (pointers.size === 1) { lastPt = { x: e.clientX, y: e.clientY }; panning = z.s > 1.01; }
      if (pointers.size === 2) {
        var pts = Array.from(pointers.values());
        pinchD = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        panning = false;
      }
    });
    gMain.addEventListener("pointermove", function (e) {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2) {
        var pts = Array.from(pointers.values());
        var d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        if (pinchD > 0 && d > 0) {
          zoomAt(z.s * d / pinchD, (pts[0].x + pts[1].x) / 2, (pts[0].y + pts[1].y) / 2);
        }
        pinchD = d;
      } else if (panning && lastPt) {
        z.x += e.clientX - lastPt.x;
        z.y += e.clientY - lastPt.y;
        lastPt = { x: e.clientX, y: e.clientY };
        applyZoom(false);
      }
    });
    function endPointer(e) {
      pointers.delete(e.pointerId);
      if (pointers.size === 0) { panning = false; lastPt = null; pinchD = 0; }
      if (pointers.size === 1) { var p = Array.from(pointers.values())[0]; lastPt = { x: p.x, y: p.y }; panning = z.s > 1.01; }
    }
    gMain.addEventListener("pointerup", endPointer);
    gMain.addEventListener("pointercancel", endPointer);
    /* بازنشانی زوم با تعویض عکس یا بسته‌شدن گالری */
    new MutationObserver(function () { resetZoom(false); }).observe(gImg, { attributes: true, attributeFilter: ["src"] });
    new MutationObserver(function () { if (gallery.hidden) resetZoom(false); }).observe(gallery, { attributes: true, attributeFilter: ["hidden"] });
    $("gThumbs").addEventListener("click", function () { resetZoom(false); });
  }

  /* ================= تیلت + برق نور ================= */
  function attachTilt(el, maxDeg, guard) {
    if (!el || reduced || !finePointer) return;
    var sheen = document.createElement("div");
    sheen.className = "tilt-sheen";
    sheen.setAttribute("aria-hidden", "true");
    el.appendChild(sheen);
    var raf = null, px = 0.5, py = 0.5;
    el.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      if (guard && guard()) { el.style.transform = ""; sheen.style.opacity = "0"; return; }
      var r = el.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width;
      py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
      el.style.setProperty("--my", (py * 100).toFixed(1) + "%");
      sheen.style.opacity = "1";
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        el.style.transition = "transform .12s ease-out";
        el.style.transform = "perspective(950px) rotateX(" + (-(py - 0.5) * 2 * maxDeg).toFixed(2) + "deg) rotateY(" + ((px - 0.5) * 2 * maxDeg).toFixed(2) + "deg)";
      });
    });
    el.addEventListener("pointerleave", function () {
      el.style.transition = "transform .5s ease";
      el.style.transform = "";
      sheen.style.opacity = "0";
    });
  }
  attachTilt($("kStage"), 5, null);
  attachTilt(gMain, 4, function () { return z.s > 1.01 || panning; });
})();
