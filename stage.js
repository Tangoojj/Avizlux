/* آویزلوکس — نسخه‌ی ۹: آویز روی اپنِ آشپزخانه‌ی واقعی
   عکس واقعی آشپزخانه پس‌زمینه است و آویز، برشِ عکس واقعی همان محصول (stage-imgs.js).
   مدل‌ها خودکار عوض می‌شوند؛ بندانگشتی و سوایپ هم هست. مسیر خرید همان خرید سریع قبلی است. */
(function () {
  var stage = document.getElementById("kStage");
  if (!stage || typeof PRODUCTS === "undefined" || !window.STAGE_IMGS) return;
  var ORDER = ["4046", "3074", "4028", "4027", "4026", "3027", "3061", "3055", "3057", "4024"];
  var DEFAULT_CODE = "4046", ROTATE_MS = 4200, RESUME_MS = 14000;
  var byCode = {};
  PRODUCTS.forEach(function (p) { byCode[p.code] = p; });
  ORDER = ORDER.filter(function (c) { return byCode[c] && window.STAGE_IMGS[c]; });
  if (!ORDER.length) return;

  document.getElementById("kPhoto").src = window.STAGE_IMGS.kitchen;
  document.getElementById("kFlower").src = window.STAGE_IMGS.flower;

  var layers = stage.querySelectorAll(".k-hang img");
  var badge = document.getElementById("kBadge");
  var nameEl = document.getElementById("ksName"), metaEl = document.getElementById("ksMeta"),
      priceEl = document.getElementById("ksPrice"), buyBtn = document.getElementById("ksBuy"),
      galBtn = document.getElementById("ksGallery"), thumbsEl = document.getElementById("kThumbs");
  var front = 0, idx = ORDER.indexOf(DEFAULT_CODE); if (idx < 0) idx = 0;
  var timer = null, current = null;

  ORDER.forEach(function (code, i) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "k-thumb"; b.dataset.i = i;
    b.setAttribute("aria-label", "مدل " + code);
    b.innerHTML = '<img src="' + window.STAGE_IMGS[code] + '" alt="" loading="lazy"><span>' + code + "</span>";
    b.addEventListener("click", function () { userSelect(i); });
    thumbsEl.appendChild(b);
  });
  var thumbs = thumbsEl.querySelectorAll(".k-thumb");

  function faNum(n) { return Number(n).toLocaleString("fa-IR"); }
  function show(i) {
    idx = (i + ORDER.length) % ORDER.length;
    var code = ORDER[idx], p = byCode[code]; current = p;
    var img = layers[front ^ 1];
    img.src = window.STAGE_IMGS[code];
    img.alt = p.name;
    img.classList.add("on"); layers[front].classList.remove("on"); front ^= 1;
    nameEl.textContent = p.name;
    var size = p.sizes && p.sizes[0] ? "ابعاد " + p.sizes[0] + " سانتی‌متر" : "";
    metaEl.textContent = "کد " + code + (size ? " · " + size : "") + (p.feature ? " · " + p.feature : "");
    var was = p.was ? '<span class="was">' + faNum(p.was) + "</span>" : "";
    var off = p.was ? '<span class="off">٪' + faNum(Math.round((1 - p.price / p.was) * 100)) + " تخفیف</span>" : "";
    priceEl.innerHTML = was + '<span class="now">' + faNum(p.price) + " تومان</span>" + off;
    badge.classList.toggle("hide", code !== "4026");
    thumbs.forEach(function (t, j) { t.classList.toggle("on", j === idx); });
  }
  function schedule(ms) { clearInterval(timer); timer = setInterval(function () { show(idx + 1); }, ms || ROTATE_MS); }
  function userSelect(i) { show(i); schedule(RESUME_MS); }
  buyBtn.addEventListener("click", function () { if (current && window.openBuy) openBuy(current.code); });
  galBtn.addEventListener("click", function () { if (current && window.openGallery) openGallery(current.code); });
  var tx = null;
  stage.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener("touchend", function (e) {
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 42) userSelect(idx + (dx < 0 ? -1 : 1));
  }, { passive: true });
  stage.addEventListener("mouseenter", function () { clearInterval(timer); });
  stage.addEventListener("mouseleave", function () { schedule(RESUME_MS); });
  show(idx); schedule();
})();
