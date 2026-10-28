/* آویزلوکس — هیروی «اپن آشپزخانه» (نسخه‌ی ۸)
   ده مدل منتخب بالای اپن آشپزخانه آویزان‌اند؛ مدل به‌صورت خودکار عوض می‌شود
   و با لمس/کلیک روی بندانگشتی‌ها، فلش‌ها یا سوایپ روی صحنه هم قابل تعویض است.
   تصویر هر مدل برشِ عکس واقعی همان محصول است (stage-imgs.js)؛ صحنه تصویرسازی است. */
(function () {
  "use strict";
  var ORDER = ["4046", "4028", "4027", "4026", "3027", "3074", "3061", "3055", "3057", "4024"];
  var DEFAULT_CODE = "4026";
  var ROTATE_MS = 4200, RESUME_MS = 14000;

  var stage = document.getElementById("kStage");
  if (!stage || typeof byCode !== "function") return;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var FA = "۰۱۲۳۴۵۶۷۸۹";
  var faNum = function (n) { return String(n).replace(/\d/g, function (d) { return FA[d]; }); };
  var price = (typeof faPrice === "function") ? faPrice : function (n) { return faNum(n.toLocaleString("en-US")).replace(/,/g, "٬"); };

  var layers = stage.querySelectorAll(".k-hang img");
  var nameEl = document.getElementById("ksName"), metaEl = document.getElementById("ksMeta"),
      priceEl = document.getElementById("ksPrice"), badgeEl = document.getElementById("kBadge"),
      countEl = document.getElementById("kCount");
  var thumbsWrap = document.getElementById("kThumbs");

  var idx = ORDER.indexOf(DEFAULT_CODE), front = 0, timer = null, resumeAt = 0;

  var thumbs = ORDER.map(function (code, i) {
    var p = byCode(code);
    var b = document.createElement("button");
    b.type = "button";
    b.className = "k-thumb";
    b.setAttribute("aria-label", p.name + "، کد " + faNum(code));
    b.innerHTML = '<img src="' + window.STAGE_IMGS[code] + '" alt="" loading="lazy"><span>' + code + "</span>";
    b.addEventListener("click", function () { userSelect(i); });
    thumbsWrap.appendChild(b);
    return b;
  });

  function render(i) {
    var code = ORDER[i], p = byCode(code);
    front = 1 - front;
    var show = layers[front], hide = layers[1 - front];
    show.src = window.STAGE_IMGS[code];
    show.alt = p.name + " نصب‌شده روی اپن آشپزخانه";
    show.classList.add("on");
    hide.classList.remove("on");
    nameEl.textContent = p.name;
    metaEl.textContent = "کد " + faNum(code) + " · " + (p.dims || "") + " · سه حالت نوری";
    priceEl.innerHTML = (p.old ? '<span class="old">' + price(p.old) + "</span>" : "") +
      price(p.price) + ' <span class="unit">تومان</span>';
    badgeEl.classList.toggle("show", code === DEFAULT_CODE);
    countEl.textContent = (i + 1) + " / " + ORDER.length;
    thumbs.forEach(function (t, j) {
      t.classList.toggle("active", j === i);
      if (j === i) t.setAttribute("aria-current", "true"); else t.removeAttribute("aria-current");
    });
    document.getElementById("ksBuy").onclick = function () { openBuy(code); };
    document.getElementById("ksGallery").onclick = function () { openGallery(code); };
  }

  function go(i) { idx = (i + ORDER.length) % ORDER.length; render(idx); }
  function userSelect(i) { go(i); hold(); }
  function hold() {
    resumeAt = Date.now() + RESUME_MS;
    stopAuto();
    setTimeout(startAuto, RESUME_MS);
  }
  function startAuto() {
    if (reduced || timer) return;
    timer = setInterval(function () {
      if (Date.now() < resumeAt || document.hidden) return;
      go(idx + 1);
    }, ROTATE_MS);
  }
  function stopAuto() { if (timer) { clearInterval(timer); timer = null; } }

  document.getElementById("kPrev").addEventListener("click", function () { userSelect(idx - 1); });
  document.getElementById("kNext").addEventListener("click", function () { userSelect(idx + 1); });
  stage.addEventListener("pointerenter", stopAuto);
  stage.addEventListener("pointerleave", startAuto);

  var tx = null;
  stage.addEventListener("touchstart", function (e) { tx = e.changedTouches[0].clientX; }, { passive: true });
  stage.addEventListener("touchend", function (e) {
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 42) userSelect(idx + (dx < 0 ? -1 : 1)); /* RTL: سوایپ چپ = قبلی */
    tx = null;
  }, { passive: true });


  render(idx);
  startAuto();
})();
