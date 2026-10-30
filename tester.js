/* آویزلوکس v20 — استودیو تست آویز.
   قاعده‌ی همیشگی: فقط عکس واقعی محصول. برای مدل‌های جدید برشِ تمیز (پس‌زمینه‌حذف‌شده)
   به دست نیامد، پس استودیو هر مدل را با عکس واقعی خودش در قاب صحنه نشان می‌دهد؛
   اگر روزی کامپوزیت تمیزی ساخته شود، TESTER_IMGS آن را فعال می‌کند (set/T3/L3/L5). */
(function () {
  var P = window.PRODUCTS || [], IM = window.IMAGES || {}, TI = window.TESTER_IMGS || {};
  var byCode = {};
  P.forEach(function (p) { byCode[p.code] = p; });
  var MODE_FA = { set: "مجموعه اصلی", T3: "تکی ×۳", L3: "طولی ×۳", L5: "طولی ×۵", photo: "مجموعه اصلی" };
  var cur = { code: "707", mode: "photo" };

  function $(id) { return document.getElementById(id); }
  function fa(n) { return Number(n).toLocaleString("fa-IR"); }
  var stage = $("kStage"), photo = $("kPhoto"), flower = $("kFlower");
  var hangImgs = stage.querySelectorAll(".k-hang img");
  var fx = stage.querySelectorAll(".k-shade,.k-glow,.k-cone,.k-pool");

  function modesFor(code) {
    var t = TI[code] || {}, modes = [];
    ["set", "T3", "L3", "L5"].forEach(function (k) { if (t[k]) modes.push(k); });
    if (!modes.length) modes.push("photo");
    return modes;
  }
  function buildModes() {
    var modes = modesFor(cur.code);
    if (modes.indexOf(cur.mode) < 0) cur.mode = modes[0];
    $("kModes").innerHTML = modes.map(function (m) {
      return '<button class="k-mode' + (m === cur.mode ? " on" : "") + '" data-mode="' + m + '" type="button">' + MODE_FA[m] + '</button>';
    }).join("");
  }
  function buildThumbs() {
    $("kThumbs").innerHTML = P.map(function (p) {
      return '<button class="k-thumb' + (p.code === cur.code ? " on" : "") + '" data-code="' + p.code + '" type="button" aria-label="' + p.name + '">' +
        '<img src="' + IM[p.code][0] + '" alt=""><span>' + p.code + '</span></button>';
    }).join("");
  }
  function setFx(on) {
    flower.style.display = on ? "" : "none";
    fx.forEach(function (el) { el.style.display = on ? "" : "none"; });
  }
  function show() {
    var p = byCode[cur.code], t = TI[cur.code] || {};
    stage.classList.remove("long");
    if (cur.mode === "photo" || !t[cur.mode]) {
      /* ارائه‌ی واقعی: عکس خودِ محصول در قاب صحنه */
      photo.src = IM[cur.code][0];
      setFx(false);
      hangImgs.forEach(function (im) { im.classList.remove("on"); im.removeAttribute("src"); });
    } else if (cur.mode === "set") {
      photo.src = SCENE.kitchen;
      flower.src = SCENE.flower;
      setFx(true);
      hangImgs.forEach(function (im, i) {
        if (i === 0) { im.src = t.set; im.classList.add("on"); }
        else im.classList.remove("on");
      });
    } else {
      /* کامپوزیت تمام‌قاب (طولی/تکی) */
      stage.classList.add("long");
      photo.src = SCENE.kitchen;
      setFx(true);
      flower.style.display = "none"; /* گل در کامپوزیت پخته شده است */
      hangImgs.forEach(function (im, i) {
        if (i === 0) { im.src = t[cur.mode]; im.classList.add("on"); }
        else im.classList.remove("on");
      });
    }
    $("kBadge").classList.toggle("hide", !p.rec);
    $("ksName").textContent = p.name;
    $("ksMeta").textContent = "ابعاد " + p.dims + " • " + p.mat;
    $("ksPrice").innerHTML = '<span class="now">' + fa(p.price) + ' تومان</span>';
    buildModes();
    buildThumbs();
  }
  $("kModes").addEventListener("click", function (e) {
    var b = e.target.closest("[data-mode]"); if (!b) return;
    cur.mode = b.dataset.mode; show();
  });
  $("kThumbs").addEventListener("click", function (e) {
    var b = e.target.closest("[data-code]"); if (!b) return;
    cur.code = b.dataset.code; cur.mode = modesFor(cur.code)[0]; show();
    stage.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  $("ksBuy").addEventListener("click", function () { if (window.AVZ) AVZ.openBuy(cur.code); });
  $("ksGallery").addEventListener("click", function () { if (window.AVZ) AVZ.openGallery(cur.code, 0); });
  show();
})();
