/* آویزلوکس — استودیو تست آویز: مدل + چیدمان (مجموعه اصلی / تکی×۳ / طولی×۳ / طولی×۵) روی اپن آشپزخانه */
(function () {
  var stage = document.getElementById("kStage");
  if (!stage || typeof PRODUCTS === "undefined" || !window.STAGE_IMGS) return;
  var MODES = [
    { key: "set", label: "مجموعه‌ی اصلی" },
    { key: "T3", label: "تکی × ۳" },
    { key: "L3", label: "طولی × ۳" },
    { key: "L5", label: "طولی × ۵" }
  ];
  var MODELS = PRODUCTS.filter(function (p) { return window.STAGE_IMGS[p.code]; });
  if (!MODELS.length) return;
  var byCode = {};
  PRODUCTS.forEach(function (p) { byCode[p.code] = p; });

  document.getElementById("kPhoto").src = window.STAGE_IMGS.kitchen;
  document.getElementById("kFlower").src = window.STAGE_IMGS.flower;

  var layers = stage.querySelectorAll(".k-hang img");
  var badge = document.getElementById("kBadge");
  var nameEl = document.getElementById("ksName"), metaEl = document.getElementById("ksMeta"),
      priceEl = document.getElementById("ksPrice"), buyBtn = document.getElementById("ksBuy"),
      galBtn = document.getElementById("ksGallery"), thumbsEl = document.getElementById("kThumbs"),
      modesEl = document.getElementById("kModes");
  var front = 0, current = null, curMode = "T3";

  function hasMode(code, key) {
    if (key === "set") return true;
    return !!(window.TESTER_IMGS && window.TESTER_IMGS[code + "-" + key]);
  }
  function faNum(n) { return Number(n).toLocaleString("fa-IR"); }

  var modeBtns = MODES.map(function (m) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "k-mode"; b.dataset.mode = m.key; b.textContent = m.label;
    b.addEventListener("click", function () { setMode(m.key); });
    modesEl.appendChild(b);
    return b;
  });

  var thumbs = MODELS.map(function (p) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "k-thumb"; b.dataset.code = p.code;
    b.setAttribute("aria-label", "مدل " + p.code);
    b.innerHTML = '<img src="' + window.STAGE_IMGS[p.code] + '" alt="" loading="lazy"><span>' + p.code + "</span>";
    b.addEventListener("click", function () { select(p.code, true); });
    thumbsEl.appendChild(b);
    return b;
  });

  function syncControls() {
    modeBtns.forEach(function (b) {
      var key = b.dataset.mode;
      b.classList.toggle("on", key === curMode);
      b.disabled = !hasMode(current.code, key);
    });
    thumbs.forEach(function (t) { t.classList.toggle("on", t.dataset.code === current.code); });
  }

  function render() {
    var p = current, code = p.code;
    var useLong = curMode !== "set" && hasMode(code, curMode);
    var img = layers[front ^ 1];
    img.src = useLong ? window.TESTER_IMGS[code + "-" + curMode] : window.STAGE_IMGS[code];
    stage.classList.toggle("long", useLong);
    img.alt = p.name;
    img.classList.add("on"); layers[front].classList.remove("on"); front ^= 1;
    nameEl.textContent = p.name;
    var modeLabel = MODES.filter(function (m) { return m.key === curMode; })[0].label;
    metaEl.textContent = "کد " + code + " · چیدمان: " + (useLong ? modeLabel : "مجموعه‌ی اصلی");
    var was = p.was ? '<span class="was">' + faNum(p.was) + "</span>" : "";
    var off = p.was ? '<span class="off">٪' + faNum(Math.round((1 - p.price / p.was) * 100)) + " تخفیف</span>" : "";
    priceEl.innerHTML = was + '<span class="now">' + faNum(p.price) + " تومان</span>" + off;
    badge.classList.toggle("hide", code !== "4026");
    syncControls();
  }
  function select(code, keepMode) {
    current = byCode[code];
    if (!keepMode || !hasMode(code, curMode)) curMode = hasMode(code, "T3") ? "T3" : "set";
    render();
  }
  function setMode(key) { if (hasMode(current.code, key)) { curMode = key; render(); } }

  buyBtn.addEventListener("click", function () { if (current && window.openBuy) openBuy(current.code); });
  galBtn.addEventListener("click", function () { if (current && window.openGallery) openGallery(current.code); });

  /* کارت‌های فضا → فیلتر کاتالوگ */
  document.querySelectorAll(".space-card").forEach(function (card) {
    card.addEventListener("click", function () {
      var chip = document.querySelector('.chip[data-f="' + card.dataset.space + '"]');
      if (chip) chip.click();
      document.getElementById("products").scrollIntoView({ behavior: "smooth" });
    });
  });

  select("3081", false);
})();
