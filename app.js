/* آویزلوکس v20 — منطق فروشگاه: فقط ۱۰ مدل آویز اپن و آشپزخانه.
   مسیر خرید: ۲ لمس، ۳ فیلد، بدون ثبت‌نام. مقایسه‌ی ساده حداکثر ۳ مدل. */
(function () {
  var P = window.PRODUCTS || [], IM = window.IMAGES || {};
  var byCode = {};
  P.forEach(function (p) { byCode[p.code] = p; });
  var SPACE_FA = { island: "اپن و آشپزخانه", dining: "میز ناهارخوری" };
  var state = { f: "all", q: "", sort: "rec" };
  var cmp = [];
  var gal = { code: null, idx: 0 };
  var buyCode = null;

  function $(id) { return document.getElementById(id); }
  function fa(n) { return Number(n).toLocaleString("fa-IR"); }
  function faD(s) { return String(s).replace(/[0-9]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹"[d]; }); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function spacesFa(p) { return p.spaces.map(function (s) { return SPACE_FA[s] || s; }).join(" • "); }
  var toastT;
  function toast(msg) {
    var t = $("toast"); t.textContent = msg; t.hidden = false;
    clearTimeout(toastT); toastT = setTimeout(function () { t.hidden = true; }, 2600);
  }

  /* ---------- گرید محصولات ---------- */
  function visible() {
    var list = P.filter(function (p) {
      if (state.f === "u45" && p.price >= 4500000) return false;
      if ((state.f === "island" || state.f === "dining") && p.spaces.indexOf(state.f) < 0) return false;
      if (state.q) {
        var q = state.q.trim();
        if ((p.name + " " + p.code + " " + p.mat).indexOf(q) < 0) return false;
      }
      return true;
    });
    if (state.sort === "cheap") list.sort(function (a, b) { return a.price - b.price; });
    else if (state.sort === "exp") list.sort(function (a, b) { return b.price - a.price; });
    else if (state.sort === "pop") list.sort(function (a, b) { return b.sold - a.sold || b.rating - a.rating; });
    else list.sort(function (a, b) { return (b.rec - a.rec) || (a.price - b.price); }); /* پیشنهادی: اول پیشنهاد ما، بعد اقتصادی‌ها */
    return list;
  }
  function cardHTML(p) {
    var badges = "";
    if (p.rec) badges += '<span class="badge rec">پیشنهاد آویزلوکس</span>';
    badges += '<span class="badge new">جدید</span>';
    var inCmp = cmp.indexOf(p.code) >= 0;
    return '<article class="card' + (p.rec ? " rec" : "") + '">' +
      '<div class="card-img-wrap" data-gal="' + p.code + '" role="button" aria-label="مشاهده‌ی عکس‌های ' + esc(p.name) + '">' +
        '<img class="card-img-top" src="' + IM[p.code][0] + '" alt="' + esc(p.name) + '" loading="lazy">' +
        '<div class="card-badges">' + badges + '</div></div>' +
      '<div class="card-body">' +
        '<h3 class="card-title">' + esc(p.name) + '</h3>' +
        '<p class="card-spec">کد ' + faD(p.code) + ' • ابعاد ' + esc(p.dims) + ' • مناسب: ' + spacesFa(p) + '</p>' +
        '<div class="card-stars"><span class="stars">★★★★★</span><span>' + faD(String(p.rating)) + ' | ' + fa(p.sold) + ' فروش</span></div>' +
        '<div class="card-price"><span class="now">' + fa(p.price) + '</span> <span class="unit">تومان</span></div>' +
        '<p class="card-inst">💳 امکان خرید قسطی</p>' +
      '</div>' +
      '<div class="card-footer">' +
        '<button class="btn-gold" style="flex:1" data-buy="' + p.code + '" type="button">خرید سریع</button>' +
        '<button class="btn-cmp" data-cmp="' + p.code + '" type="button" aria-pressed="' + inCmp + '">' + (inCmp ? "✓ در مقایسه" : "مقایسه") + '</button>' +
      '</div></article>';
  }
  function render() {
    var list = visible();
    $("grid").innerHTML = list.map(cardHTML).join("");
    $("gridEmpty").hidden = list.length > 0;
    $("gridCount").textContent = fa(list.length) + " مدل";
  }

  /* ---------- فیلتر / مرتب‌سازی / جست‌وجو ---------- */
  function setFilter(f, scroll) {
    state.f = f;
    document.querySelectorAll("#chips .chip").forEach(function (c) {
      c.classList.toggle("active", c.dataset.f === f);
    });
    render();
    if (scroll) $("products").scrollIntoView({ behavior: "smooth" });
  }
  $("chips").addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (b) setFilter(b.dataset.f, false);
  });
  document.querySelectorAll(".space-card").forEach(function (c) {
    c.addEventListener("click", function () { setFilter(c.dataset.space, true); });
  });
  document.querySelectorAll("[data-space-link]").forEach(function (a) {
    a.addEventListener("click", function () { setFilter(a.dataset.spaceLink === "all" ? "all" : a.dataset.spaceLink, false); });
  });
  $("sortSel").addEventListener("change", function () { state.sort = this.value; render(); });
  $("searchInput").addEventListener("input", function () {
    state.q = this.value; render();
  });

  /* ---------- مقایسه (حداکثر ۳ مدل) ---------- */
  function syncCmpBar() {
    var bar = $("cmpBar");
    bar.hidden = cmp.length === 0;
    $("cmpBarText").textContent = fa(cmp.length) + " مدل برای مقایسه انتخاب شده";
    document.querySelectorAll("[data-cmp]").forEach(function (b) {
      var on = cmp.indexOf(b.dataset.cmp) >= 0;
      b.setAttribute("aria-pressed", on);
      b.textContent = on ? "✓ در مقایسه" : "مقایسه";
    });
  }
  function toggleCmp(code) {
    var i = cmp.indexOf(code);
    if (i >= 0) cmp.splice(i, 1);
    else {
      if (cmp.length >= 3) { toast("برای مقایسه حداکثر سه مدل کافی است 🌿"); return; }
      cmp.push(code);
    }
    syncCmpBar();
  }
  function openCompare() {
    if (!cmp.length) return;
    $("cmpGrid").innerHTML = cmp.map(function (code) {
      var p = byCode[code];
      return '<div class="cmp-col">' +
        '<img src="' + IM[code][0] + '" alt="' + esc(p.name) + '">' +
        '<h4>' + esc(p.name) + '</h4>' +
        '<span class="cmp-code">کد ' + faD(p.code) + '</span>' +
        '<span class="cmp-price">' + fa(p.price) + ' تومان</span>' +
        '<span>ابعاد: ' + esc(p.dims) + '</span>' +
        '<span>جنس: ' + esc(p.mat) + '</span>' +
        '<span>فضای مناسب: ' + spacesFa(p) + '</span>' +
        '<button class="btn-gold btn-buy" data-buy="' + code + '" type="button">خرید سریع</button>' +
      '</div>';
    }).join("");
    showOverlay("compareOverlay");
  }
  $("cmpOpen").addEventListener("click", openCompare);
  $("cmpClear").addEventListener("click", function () { cmp = []; syncCmpBar(); });

  /* ---------- گالری ---------- */
  function openGallery(code, idx) {
    gal = { code: code, idx: idx || 0 };
    var p = byCode[code], imgs = IM[code];
    $("gName").textContent = p.name;
    $("gStars").textContent = "★★★★★ " + faD(String(p.rating));
    $("gSold").textContent = fa(p.sold) + " فروش";
    $("gSpecs").innerHTML = "<span>کد " + faD(p.code) + "</span><span>ابعاد " + esc(p.dims) + "</span><span>" + esc(p.mat) + "</span><span>مناسب: " + spacesFa(p) + "</span><span>💳 امکان خرید قسطی</span>";
    $("gPrice").innerHTML = "<b>" + fa(p.price) + "</b> تومان";
    $("gThumbs").innerHTML = imgs.map(function (src, i) {
      return '<button class="g-thumb' + (i === gal.idx ? " active" : "") + '" data-gi="' + i + '" type="button"><img src="' + src + '" alt="">نمای ' + fa(i + 1) + '</button>';
    }).join("");
    $("gImg").src = imgs[gal.idx];
    $("gImg").alt = p.name;
    showOverlay("gallery");
  }
  $("gThumbs").addEventListener("click", function (e) {
    var b = e.target.closest("[data-gi]"); if (!b) return;
    gal.idx = Number(b.dataset.gi);
    $("gImg").src = IM[gal.code][gal.idx];
    this.querySelectorAll(".g-thumb").forEach(function (t, i) { t.classList.toggle("active", i === gal.idx); });
  });
  $("gBuy").addEventListener("click", function () { hideOverlay("gallery"); openBuy(gal.code); });

  /* ---------- خرید سریع: ۲ لمس، ۳ فیلد ---------- */
  function openBuy(code) {
    buyCode = code;
    var p = byCode[code];
    $("bImg").src = IM[code][0];
    $("bName").textContent = p.name;
    $("bPrice").textContent = fa(p.price) + " تومان";
    $("bTotal").textContent = fa(p.price);
    $("formErr").hidden = true;
    $("buyForm").hidden = false;
    $("buySuccess").hidden = true;
    showOverlay("buyOverlay");
  }
  function normDigits(s) {
    return String(s).replace(/[۰-۹]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹".indexOf(d); }).replace(/[^0-9]/g, "");
  }
  $("bSubmit").addEventListener("click", function () {
    var name = $("fName").value.trim(), mob = normDigits($("fMobile").value), city = $("fCity").value.trim();
    var err = "";
    if (name.length < 3) err = "نام و نام خانوادگی را کامل بنویس 🌿";
    else if (!/^09[0-9]{9}$/.test(mob)) err = "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود 🌿";
    else if (city.length < 2) err = "شهر را بنویس تا ارسال را هماهنگ کنیم 🌿";
    if (err) { var e = $("formErr"); e.textContent = err; e.hidden = false; return; }
    var code = "AVZ-" + (10000 + Math.floor(Math.random() * 89999));
    $("okText").textContent = name + " عزیز، سفارش «" + byCode[buyCode].name + "» ثبت شد؛ برای هماهنگی ارسال با شما تماس می‌گیریم. 🌸";
    $("okCode").textContent = code;
    $("buyForm").hidden = true;
    $("buySuccess").hidden = false;
  });

  /* ---------- اورلی‌ها ---------- */
  function showOverlay(id) { $(id).hidden = false; document.body.style.overflow = "hidden"; }
  function hideOverlay(id) { $(id).hidden = true; document.body.style.overflow = ""; }
  ["gallery", "compareOverlay", "buyOverlay"].forEach(function (id) {
    $(id).addEventListener("click", function (e) { if (e.target === this) hideOverlay(id); });
  });
  $("gClose").addEventListener("click", function () { hideOverlay("gallery"); });
  $("cClose").addEventListener("click", function () { hideOverlay("compareOverlay"); });
  $("bClose").addEventListener("click", function () { hideOverlay("buyOverlay"); });
  $("okClose").addEventListener("click", function () { hideOverlay("buyOverlay"); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") ["gallery", "compareOverlay", "buyOverlay"].forEach(hideOverlay);
  });

  /* ---------- رویدادهای گرید و مقایسه ---------- */
  document.addEventListener("click", function (e) {
    var buy = e.target.closest("[data-buy]");
    if (buy) { hideOverlay("compareOverlay"); hideOverlay("gallery"); openBuy(buy.dataset.buy); return; }
    var cm = e.target.closest("[data-cmp]");
    if (cm) { toggleCmp(cm.dataset.cmp); return; }
    var gl = e.target.closest("[data-gal]");
    if (gl) { openGallery(gl.dataset.gal, 0); }
  });

  /* ---------- منوی موبایل ---------- */
  $("navToggle").addEventListener("click", function () {
    var m = $("navMenu"), open = m.classList.toggle("open");
    this.setAttribute("aria-expanded", open);
  });
  document.querySelectorAll("#navMenu .nav-link").forEach(function (a) {
    a.addEventListener("click", function () { $("navMenu").classList.remove("open"); });
  });

  window.AVZ = { openBuy: openBuy, openGallery: openGallery, byCode: byCode };
  render();
  syncCmpBar();
})();
