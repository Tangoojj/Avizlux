/* آویزلوکس v25 — «مشاور انتخاب آویز»: دموی قانون‌محور و محلی (استاتیک، بدون سرور).
   هیچ چت زنده‌ای در کار نیست و هیچ قیمتی ساخته نشده است: همه‌ی قیمت‌ها، نام‌ها،
   ابعاد و جنس‌ها از همان کاتالوگ ۱۰ مدلی نمونه (catalog.js) خوانده می‌شوند.
   قاعده‌ها (از راهنمای خودِ سایت): روی اپن ردیف فرد ۳تایی روی یک‌چهارم، وسط و
   سه‌چهارم طول اپن؛ کف آویز ۷۰ تا ۸۰ سانتی‌متر بالای صفحه‌ی اپن؛ پیش‌فرض
   «پیشنهاد آویزلوکس» = مدل ۷۰۷ (فیلد rec در کاتالوگ).
   سبک‌ها فقط از نام و جنسِ ثبت‌شده در کاتالوگ برداشت شده‌اند: «کریستالی» یعنی
   جنس شامل کریستال است، «مینیمال» یعنی نام شامل مینیمال است، «مدرن» یعنی
   مینیمال یا مشکیِ اکرولیک/فلز است، و «خطی/طولی» یک چیدمان است (ردیف ۳تایی روی
   اپن)، نه ویژگیِ ثبت‌شده‌ی محصول — پس رتبه‌ی محصول را عوض نمی‌کند.
   فضای ثبت‌شده در کاتالوگ فقط «اپن» و «میز ناهارخوری» است؛ برای پذیرایی،
   اتاق‌خواب، کافه و ورودی، پیشنهاد بر اساس سبک و بودجه است و مناسب‌بودن فضا
   صراحتاً «ثبت‌نشده در کاتالوگ» اعلام می‌شود، نه ادعا. */
(function () {
  var P = window.PRODUCTS || [], IM = window.IMAGES || {}, TI = window.TESTER_IMGS || {};
  var byCode = {};
  P.forEach(function (p) { byCode[p.code] = p; });
  function $(id) { return document.getElementById(id); }
  function fa(n) { return Number(n).toLocaleString("fa-IR"); }
  function faD(s) { return String(s).replace(/[0-9]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹"[d]; }); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  var SPACE_FA = { island: "اپن و آشپزخانه", dining: "میز ناهارخوری" };
  var SPACE_LABEL = { island: "اپن/جزیره", dining: "میز ناهارخوری", living: "پذیرایی", bedroom: "اتاق‌خواب", cafe: "کافه", entry: "ورودی" };
  var STYLE_LABEL = { modern: "مدرن", crystal: "کریستالی", linear: "خطی/طولی", minimal: "مینیمال", any: "فرقی نمی‌کند" };
  var BUDGET_LABEL = { u31: "تا ۳٬۱۰۰٬۰۰۰ تومان", mid: "۳٬۱۰۰٬۰۰۰ تا ۴٬۳۰۰٬۰۰۰ تومان", o43: "بالای ۴٬۳۰۰٬۰۰۰ تومان", any: "بدون محدودیت" };
  /* برچسب سبک فقط از نام/جنس ثبت‌شده؛ «خطی/طولی» چیدمان است و این‌جا برچسب ندارد. */
  var STYLE_TAGS = {
    "707": ["crystal", "minimal"], "707G": ["crystal", "minimal"],
    "394": ["crystal"], "385": ["crystal"], "384": ["crystal"],
    "383": ["crystal"], "395": ["crystal"], "387": ["crystal"],
    "393": ["modern"], "402": ["modern"]
  };
  function inBudget(p, b) {
    if (b === "u31") return p.price <= 3100000;
    if (b === "mid") return p.price > 3100000 && p.price <= 4300000;
    if (b === "o43") return p.price > 4300000;
    return true;
  }
  function spacesFa(p) { return p.spaces.map(function (s) { return SPACE_FA[s] || s; }).join(" • "); }
  function waMine(p) {
    var msg = "سلام آویزلوکس، مدل " + p.name + " (کد " + faD(p.code) + ") رو پسندیدم. عکس اپنم رو می‌فرستم تا آویز رو روی اپن خودم ببینم.";
    return "https://wa.me/989171837394?text=" + encodeURIComponent(msg);
  }
  function sceneImg(p) {
    if (TI[p.code] && TI[p.code].T3) return { src: TI[p.code].T3, cap: "صحنه‌ی نمونه: تکی ×۳ روی اپن" };
    return { src: IM[p.code][0], cap: "عکس محصول" };
  }
  function recommend(space, style, budget) {
    /* بودجه قید سخت است (هر بازه دست‌کم ۲ مدل دارد)؛ فضا و سبک امتیازی‌اند. */
    var pool = P.filter(function (p) { return inBudget(p, budget); });
    var scored = pool.map(function (p) {
      var why = [], score = 0;
      if (p.spaces.indexOf(space) >= 0) { score += 3; why.push("مناسب فضای ثبت‌شده: " + SPACE_FA[space]); }
      if (style !== "any" && style !== "linear" && (STYLE_TAGS[p.code] || []).indexOf(style) >= 0) {
        score += 3; why.push("سبک «" + STYLE_LABEL[style] + "» در نام/جنس کاتالوگ");
      }
      if (budget !== "any") { score += 2; why.push("در بازه‌ی بودجه: " + BUDGET_LABEL[budget]); }
      if (p.rec) { score += 1; why.push("پیشنهاد آویزلوکس (پیش‌فرض)"); }
      return { p: p, score: score, why: why };
    });
    scored.sort(function (a, b) {
      return (b.score - a.score) || ((b.p.rec ? 1 : 0) - (a.p.rec ? 1 : 0)) || (a.p.price - b.p.price);
    });
    return scored.slice(0, 2);
  }
  function renderResult(space, style, budget) {
    var box = $("advResult");
    var picks = recommend(space, style, budget);
    var notes = [];
    if (space !== "island" && space !== "dining") {
      notes.push("⚠️ در کاتالوگ نمونه، برای این مدل‌ها فقط فضای «اپن» و «میز ناهارخوری» ثبت شده است؛ مناسب‌بودن برای «" + SPACE_LABEL[space] + "» را پیش از خرید در واتساپ بپرسید.");
    }
    if (style !== "any" && style !== "linear" && !picks.some(function (r) { return (STYLE_TAGS[r.p.code] || []).indexOf(style) >= 0; })) {
      notes.push("در بازه‌ی انتخابی، هیچ مدلی با سبک «" + STYLE_LABEL[style] + "» در نام/جنس کاتالوگ ثبت نشده بود؛ پیشنهادها نزدیک‌ترین‌ها از نظر فضا و بودجه‌اند.");
    }
    var html = '<p class="adv-summary">برای «' + SPACE_LABEL[space] + '» + سبک «' + STYLE_LABEL[style] + '» + بودجه «' + BUDGET_LABEL[budget] + '»:</p>';
    html += '<div class="adv-cards">' + picks.map(function (r) {
      var p = r.p, im = sceneImg(p);
      var badges = p.rec ? '<span class="badge rec">پیشنهاد آویزلوکس</span>' : "";
      return '<article class="adv-card">' +
        '<img src="' + im.src + '" alt="' + esc(p.name) + '">' +
        '<p class="adv-cap">' + im.cap + '</p>' +
        '<div class="card-badges" style="position:static;margin-bottom:6px">' + badges + "</div>" +
        '<h3>' + esc(p.name) + "</h3>" +
        '<p class="card-spec">کد ' + faD(p.code) + " • ابعاد " + esc(p.dims) + " • مناسب (ثبت‌شده): " + spacesFa(p) + "</p>" +
        '<p class="card-spec">جنس: ' + esc(p.mat) + "</p>" +
        '<div class="card-price"><span class="now">' + fa(p.price) + '</span> <span class="unit">تومان</span></div>' +
        '<p class="card-inst">💳 امکان خرید قسطی</p>' +
        '<ul class="adv-why">' + r.why.map(function (w) { return "<li>" + esc(w) + "</li>"; }).join("") + "</ul>" +
        '<div class="adv-actions">' +
          '<button class="btn-scene" data-adv-scene="' + p.code + '" type="button">🏝️ مشاهده روی اپن</button>' +
          '<button class="btn-gold" data-adv-gal="' + p.code + '" type="button">مشاهده‌ی عکس‌ها</button>' +
          '<a class="btn-mine" href="' + waMine(p) + '" target="_blank" rel="noopener">🏝️ روی اپن خودم ببین</a>' +
        "</div></article>";
    }).join("") + "</div>";
    if (space === "island") {
      html += '<p class="adv-rule">💡 چیدمان روی اپن: ردیف فرد ۳تایی روی یک‌چهارم، وسط و سه‌چهارم طول اپن؛ کف آویز ۷۰ تا ۸۰ سانتی‌متر بالای صفحه‌ی اپن.</p>';
    }
    if (style === "linear") {
      html += '<p class="adv-rule">💡 «خطی/طولی» یعنی همین مدل‌ها را به‌صورت ردیف ۳تایی روی اپن ببینی؛ در استودیوی بالای صفحه حالت «تکی ×۳ روی اپن» همان چیدمان است.</p>';
    }
    if (notes.length) html += '<div class="adv-notes">' + notes.map(function (n) { return "<p>" + esc(n) + "</p>"; }).join("") + "</div>";
    html += '<p class="adv-honest">این پیشنهاد را چند قاعده‌ی ثابت ساخته است، نه یک چت زنده؛ برای سؤال بیشتر، واتساپ فروشگاه در دسترس است.</p>';
    box.innerHTML = html;
    box.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  var form = $("advForm");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var space = (form.querySelector('input[name="advSpace"]:checked') || {}).value;
    var style = (form.querySelector('input[name="advStyle"]:checked') || {}).value;
    var budget = (form.querySelector('input[name="advBudget"]:checked') || {}).value;
    var err = $("advErr");
    if (!space || !style || !budget) {
      err.textContent = "هر سه سؤال را جواب بده تا پیشنهاد دقیق شود 🌿";
      err.hidden = false;
      return;
    }
    err.hidden = true;
    renderResult(space, style, budget);
  });
  form.addEventListener("reset", function () {
    $("advErr").hidden = true;
    $("advResult").innerHTML = '<p class="adv-placeholder">هر سه سؤال را جواب بده و «پیشنهاد من را نشان بده» را بزن؛ ۱ تا ۲ مدل از همان ۱۰ مدل کاتالوگ، با قیمت واقعی، پیشنهاد می‌شود.</p>';
  });
  document.addEventListener("click", function (e) {
    var scn = e.target.closest("[data-adv-scene]");
    if (scn) { if (window.AVZ && AVZ.showOnIsland) AVZ.showOnIsland(scn.dataset.advScene); return; }
    var gal = e.target.closest("[data-adv-gal]");
    if (gal) { if (window.AVZ && AVZ.openGallery) AVZ.openGallery(gal.dataset.advGal, 0); }
  });
  /* ---------- سؤال آزاد: فقط پاسخ‌های آماده‌ی قانون‌محور ---------- */
  var qBtn = $("advAskBtn");
  if (qBtn) qBtn.addEventListener("click", function () {
    var q = ($("advAsk").value || "").trim();
    var ans = $("advAnswer");
    if (!q) { ans.textContent = "سؤالت را بنویس؛ مثلاً «آویز را چقدر بالا نصب کنم؟» یا «چند تا آویز لازم دارم؟»"; return; }
    var t = q;
    if (/ارتفاع|بلند|بالا|فاصله|نصب/.test(t)) {
      ans.textContent = "برای صفحه‌ی اپن: کف آویز باید ۷۰ تا ۸۰ سانتی‌متر بالای صفحه‌ی اپن باشد؛ نه به سر می‌خورد، نه نورش گم می‌شود. این عدد در راهنمای همین سایت برای اپن ثبت شده است؛ برای فضاهای دیگر در واتساپ بپرسید.";
    } else if (/چند|تعداد|چندتا/.test(t)) {
      ans.textContent = "روی اپن، ردیف فرد پیشنهاد می‌شود: معمولاً سه‌تایی (روی یک‌چهارم، وسط و سه‌چهارم طول اپن)؛ برای اپن خیلی کشیده، پنج‌تایی. برای شمار دقیقِ اپن خودت، عکس اپن را در واتساپ بفرست.";
    } else if (/قسط|پرداخت|شرایط/.test(t)) {
      ans.textContent = "روی همه‌ی مدل‌های نمونه امکان خرید قسطی هست؛ شرایط قسط را در واتساپ فروشگاه بپرسید.";
    } else if (/قیمت|ارزان|بودجه|گرا/.test(t)) {
      ans.textContent = "ده مدل کاتالوگ نمونه از ۲٬۹۹۳٬۰۰۰ تا ۴٬۶۰۳٬۰۰۰ تومان‌اند؛ بازه‌های مشاور هم از همین قیمت‌های واقعی ساخته شده‌اند (تا ۳٬۱۰۰٬۰۰۰ / ۳٬۱۰۰٬۰۰۰ تا ۴٬۳۰۰٬۰۰۰ / بالای ۴٬۳۰۰٬۰۰۰ تومان).";
    } else if (/واتساپ|تماس|مشاوره|سفارش/.test(t)) {
      ans.textContent = "مشاوره و سفارش از واتساپ فروشگاه انجام می‌شود؛ روی هر مدل دکمه‌ی «روی اپن خودم ببین» هست که پیامت با نام و کد همان مدل آماده می‌شود.";
    } else {
      ans.textContent = "این مشاور فقط پاسخ‌های آماده‌ی قانون‌محور دارد و چت زنده نیست؛ سؤال‌های دیگر را در واتساپ فروشگاه بپرس تا فروشنده جواب بدهد.";
    }
  });
})();
