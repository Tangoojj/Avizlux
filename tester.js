/* آویزلوکس v23 — استودیو تست آویز: هیرو خودِ آشپزخانه است.
   صحنه‌ی آشپزخانه‌ی ایرانی + گلدان روی اپن، و آویزها یکی‌یکی روی اپن عوض می‌شوند
   (چرخش خودکار؛ با اولین تعامل کاربر مکث می‌کند و پس از مکث دوباره ادامه می‌دهد).
   هر ۱۰ مدل کامپوزیت «تکی ×۳ روی اپن» دارند (یک‌چهارم، وسط و سه‌چهارمِ طول اپن،
   کف آویز ۷۵ سانتی‌متر بالای صفحه):
   - ۶ مدل (۷۰۷، 707G، ۳۹۴، ۳۸۵، ۳۸۳، ۴۰۲): برشِ عکس واقعی محصول (v22).
   - ۴ مدل (۳۸۴، ۳۹۵، ۳۹۳ و بهار ۳۸۷): به دستور کاربر و پس از مقایسه با کامپوزیت‌های
     جمینایِ خودش، کامپوزیت مولد از روی عکس پاک‌شده‌ی واقعی محصول + همان صحنه ساخته
     شد؛ وفاداری هر چهار (سیلوئت، الگوی کریستال، رنگ، تعداد شعله) در بازبینی ذره‌بینی
     کنار عکس اصلی کنترل شد — شواهد در stage-build/v23/fidelity-*.png نگه داشته شده.
   حالت «عکس واقعی» هم برای همه‌ی مدل‌ها در دسترس است. */
(function () {
  var P = window.PRODUCTS || [], IM = window.IMAGES || {}, TI = window.TESTER_IMGS || {};
  var byCode = {};
  P.forEach(function (p) { byCode[p.code] = p; });
  var MODE_FA = { T3: "تکی ×۳ روی اپن", photo: "عکس واقعی" };
  var order = P.map(function (p) { return p.code; });
  var cur = { code: "707", mode: "photo" };

  function $(id) { return document.getElementById(id); }
  function fa(n) { return Number(n).toLocaleString("fa-IR"); }
  function faD(s) { return String(s).replace(/[0-9]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹"[d]; }); }
  /* «روی اپن خودم ببین» — لینک واتساپ مدلِ در حال نمایش (با هر تعویض مدل به‌روز می‌شود) */
  function waMine(p) {
    var msg = "سلام آویزلوکس، مدل " + p.name + " (کد " + faD(p.code) + ") رو پسندیدم. عکس اپنم رو می‌فرستم تا آویز رو روی اپن خودم ببینم.";
    return "https://wa.me/989171837394?text=" + encodeURIComponent(msg);
  }
  var stage = $("kStage"), photo = $("kPhoto"), flower = $("kFlower");
  var shade = stage.querySelector(".k-shade");
  var fx = stage.querySelectorAll(".k-glow,.k-cone,.k-pool");
  var hangImgs = stage.querySelectorAll(".k-hang img");

  function modesFor(code) {
    var modes = [];
    if (TI[code] && TI[code].T3) modes.push("T3");
    modes.push("photo");
    return modes;
  }
  function buildModes() {
    var modes = modesFor(cur.code);
    if (modes.indexOf(cur.mode) < 0) cur.mode = modes[0];
    $("kModes").innerHTML = modes.map(function (m) {
      return '<button class="k-mode' + (m === cur.mode ? " on" : "") + '" data-mode="' + m + '" type="button">' + MODE_FA[m] + "</button>";
    }).join("");
  }
  function buildThumbs() {
    $("kThumbs").innerHTML = P.map(function (p) {
      return '<button class="k-thumb' + (p.code === cur.code ? " on" : "") + '" data-code="' + p.code + '" type="button" aria-label="' + p.name + '">' +
        '<img src="' + IM[p.code][0] + '" alt=""><span>' + p.code + "</span></button>";
    }).join("");
  }
  function show() {
    var p = byCode[cur.code], t = TI[cur.code] || {};
    var comp = cur.mode === "T3" && !!t.T3;
    photo.src = comp ? t.T3 : IM[cur.code][0];
    photo.alt = comp ? ("آشپزخانه‌ی ایرانی با سه آویز «" + p.name + "» روی اپن") : p.name;
    /* صحنه‌ی کامل (آشپزخانه + گلدان) داخل کامپوزیت پخته شده؛ در حالت عکس واقعی هم گلدان جدا نمی‌آید */
    flower.style.display = "none";
    shade.style.display = comp ? "" : "none";
    fx.forEach(function (el) { el.style.display = "none"; });
    hangImgs.forEach(function (im) { im.classList.remove("on"); im.removeAttribute("src"); });
    $("kBadge").classList.toggle("hide", !p.rec);
    $("ksName").textContent = p.name;
    $("ksMeta").textContent = "ابعاد " + p.dims + " • " + p.mat;
    $("ksPrice").innerHTML = '<span class="now">' + fa(p.price) + " تومان</span>";
    $("ksMine").href = waMine(p);
    buildModes();
    buildThumbs();
  }

  /* ---------- چرخش خودکار: یکی‌یکی، با مکث هنگام تعامل ---------- */
  var CYCLE_MS = 4500, RESUME_MS = 20000;
  var timer = null, resumeTimer = null;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function stopCycle() { if (timer) { clearInterval(timer); timer = null; } }
  function startCycle() {
    stopCycle();
    if (reduced || order.length < 2) return;
    timer = setInterval(function () {
      if (document.hidden) return;
      var i = order.indexOf(cur.code);
      cur.code = order[(i + 1) % order.length];
      cur.mode = modesFor(cur.code)[0];
      show();
    }, CYCLE_MS);
  }
  function interact() {
    stopCycle();
    if (resumeTimer) clearTimeout(resumeTimer);
    if (!reduced) resumeTimer = setTimeout(startCycle, RESUME_MS);
  }
  function select(code, scroll) {
    if (!byCode[code]) return;
    cur.code = code;
    cur.mode = modesFor(code)[0];
    show();
    interact();
    if (scroll) stage.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  $("kModes").addEventListener("click", function (e) {
    var b = e.target.closest("[data-mode]"); if (!b) return;
    cur.mode = b.dataset.mode; show(); interact();
  });
  $("kThumbs").addEventListener("click", function (e) {
    var b = e.target.closest("[data-code]"); if (!b) return;
    select(b.dataset.code, true);
  });
  stage.addEventListener("pointerdown", interact);
  $("ksBuy").addEventListener("click", function () { interact(); if (window.AVZ) AVZ.openBuy(cur.code); });
  $("ksGallery").addEventListener("click", function () { interact(); if (window.AVZ) AVZ.openGallery(cur.code, 0); });

  /* مشاهده‌ی همین مدل روی اپن آشپزخانه (از کارت محصول و گالری صدا زده می‌شود) */
  window.AVZ = window.AVZ || {};
  window.AVZ.showOnIsland = function (code) { select(code, true); };

  cur.mode = modesFor(cur.code)[0];
  show();
  startCycle();
})();
