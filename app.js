// Avizlux redesign concept — real products, prices and photos harvested from avizelux.ir (24 Oct 2026).
// rating/sold are DEMO social-proof data for this sample (the real store shows no reviews yet).
// IMAGES[code] = [[dataURI, label], ...] — all photos are the store's own real product photos;
// detail views are close-up crops of those same real photos. No generated imagery anywhere.
const PRODUCTS = [
  { code:"4046", name:"آویز مدل کریستال اووال",        price:13500000, old:null,     off:8,  dims:"۱۲ × ۲۵ سانتی‌متر", mat:"کریستال درجه‌یک وارداتی و فلز طلایی آبکاری‌شده", spaces:["dining","salon"], rating:4.8, sold:98 },
  { code:"4028", name:"آویز مدل گوزن",                 price:12200000, old:13332000, off:8,  dims:"۱۵ سانتی‌متر",       mat:"کریستال درجه‌یک تمام وارداتی",                 spaces:["dining","salon"], rating:4.9, sold:176, best:true },
  { code:"4027", name:"آویز مدل قاصدک",                price:12026000, old:null,     off:null,dims:"۱۲ سانتی‌متر",       mat:"کریستال درجه‌یک وارداتی و فلز آبکاری‌شده",       spaces:["island","dining"], rating:4.7, sold:88 },
  { code:"4026", name:"آویز مدل گوی کریستال حباب‌دار", price:12200000, old:null,     off:null,dims:"۱۵ سانتی‌متر",       mat:"کریستال وارداتی و فلز آبکاری‌شده با ضمانت",      spaces:["island","dining"], rating:4.9, sold:231, rec:true, best:true },
  { code:"3027", name:"آویز مدل طاووس",                price:11282000, old:null,     off:null,dims:"۱۵ سانتی‌متر",       mat:"کریستال درجه‌یک وارداتی و فلز آبکاری‌شده طلایی", spaces:["salon"],           rating:4.6, sold:41 },
  { code:"3074", name:"آویز مدل قفل",                  price:10943000, old:null,     off:null,dims:"۱۵ × ۱۰ سانتی‌متر",  mat:"کریستال درجه‌یک وارداتی و فلز آبکاری‌شده",       spaces:["island","dining"], rating:4.5, sold:63 },
  { code:"3061", name:"آویز مدل C",                    price:10406000, old:null,     off:null,dims:"۱۸ سانتی‌متر",       mat:"بدنه‌ی طلایی",                                  spaces:["island"],          rating:4.4, sold:57 },
  { code:"3055", name:"آویز دیواری مدل نیوفیس",        price:10378000, old:null,     off:null,dims:"مدل دیواری",         mat:"لامپ SMD",                                       spaces:["salon"],           rating:4.3, sold:48 },
  { code:"3057", name:"آویز کره‌ای مدل مولتی‌لایت سفید",price:10378000, old:null,    off:null,dims:"رنگ سفید",           mat:"لامپ SMD درجه‌یک برند S.K",                      spaces:["dining","island"], rating:4.5, sold:72 },
  { code:"4024", name:"آویز مدل سکه حبابی",            price:10316000, old:null,     off:null,dims:"۱۲ سانتی‌متر",       mat:"کریستال درجه‌یک وارداتی و فلز آبکاری‌شده",       spaces:["island","dining"], rating:4.6, sold:94 },
  { code:"3056", name:"آویز کره‌ای مدل مولتی‌لایت",    price:9800000,  old:10378000, off:6,  dims:"چندشاخه",            mat:"لامپ SMD درجه‌یک برند S.K",                      spaces:["dining","salon"],  rating:4.7, sold:154, best:true },
  { code:"3076", name:"آویز مدل سیب",                  price:9100000,  old:9858000,  off:8,  dims:"۱۵ × ۱۰ سانتی‌متر",  mat:"کریستال درجه‌یک وارداتی و فلز آبکاری‌شده",       spaces:["island"],          rating:4.6, sold:119 },
  { code:"4066", name:"آویز مدل گوی برفی طلایی",       price:8855000,  old:null,     off:null,dims:"۱۳ سانتی‌متر",       mat:"اکرولیک فشرده و فلز آبکاری‌شده طلایی",           spaces:["island","dining"], rating:4.7, sold:143 },
  { code:"4067", name:"آویز مدل گوی برفی نقره‌ای",    price:8855000,  old:null,     off:null,dims:"۱۳ سانتی‌متر",       mat:"اکرولیک فشرده و فلز آبکاری‌شده نقره‌ای",         spaces:["island","dining"], rating:4.7, sold:127 },
  { code:"3081", name:"آویز مدل ورقه طلا",             price:8033000,  old:9549000,  off:16, dims:"—",                  mat:"کریستال درجه‌یک و فلز آبکاری‌شده طلایی",         spaces:["dining","salon"],  rating:4.6, sold:203, best:true },
  { code:"3086", name:"آویز مدل برگ نور",              price:8215000,  old:null,     off:null,dims:"۲۰ سانتی‌متر",       mat:"اکرولیک فشرده و فلز آبکاری‌شده طلایی",           spaces:["salon","island"],  rating:4.5, sold:66 },
  { code:"3085", name:"آویز مدل پلکسی",                price:8186000,  old:null,     off:null,dims:"—",                  mat:"لامپ SMD درجه‌یک برند S.K",                      spaces:["island"],          rating:4.4, sold:59 },
  { code:"3058", name:"آویز مدرن کروی مدل اوربیت",     price:2599000,  old:null,     off:null,dims:"رنگ سفید",           mat:"لامپ SMD",                                       spaces:["island"],          rating:4.5, sold:171 },
];
const byCode = c => PRODUCTS.find(p => p.code === c);

const FA = "۰۱۲۳۴۵۶۷۸۹";
const faNum = n => String(n).replace(/\d/g, d => FA[d]);
const faPrice = n => faNum(n.toLocaleString("en-US")).replace(/,/g, "٬");
const faRating = r => faNum(String(r)).replace(".", "٫");
const stars = r => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));
const toEn = s => s.replace(/[۰-۹]/g, d => FA.indexOf(d)).replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d));

const $ = id => document.getElementById(id);
const grid = $("grid"), dealsGrid = $("dealsGrid");
let filter = "all", sortMode = "rec";

function badges(p){
  let h = "";
  if (p.off) h += `<span class="badge off">٪${faNum(p.off)} تخفیف</span>`;
  if (p.rec) h += `<span class="badge rec">پیشنهاد آویزلوکس</span>`;
  if (p.best) h += `<span class="badge best">پرفروش</span>`;
  return h ? `<div class="card-badges">${h}</div>` : "";
}
function cardHTML(p){
  return `<article class="card${p.rec ? " rec" : ""}">
    <div class="card-photo" data-gallery="${p.code}">
      <img src="${IMAGES[p.code][0][0]}" alt="${p.name} کد ${faNum(p.code)}" loading="lazy">
      ${badges(p)}
    </div>
    <div class="card-body">
      <h3 class="card-name">${p.name}</h3>
      <p class="card-spec">کد ${faNum(p.code)} · ${p.dims}</p>
      <div class="card-meta"><span class="stars">${stars(p.rating)}</span><span>${faRating(p.rating)} · +${faNum(p.sold)} فروش</span></div>
      <div class="card-price">${p.old ? `<span class="old">${faPrice(p.old)}</span>` : ""}<span class="now">${faPrice(p.price)}</span> <span class="unit">تومان</span></div>
      <div class="card-actions">
        <button class="btn-buy" data-buy="${p.code}">خرید سریع</button>
        <button class="btn-view" data-gallery="${p.code}">مشاهده‌ی عکس‌ها</button>
      </div>
    </div>
  </article>`;
}
function applyFilter(list){
  if (filter === "all") return list;
  if (filter === "u10") return list.filter(p => p.price < 10000000);
  if (filter === "b1013") return list.filter(p => p.price >= 10000000 && p.price <= 13000000);
  return list.filter(p => p.spaces.includes(filter));
}
function applySort(list){
  const l = [...list];
  if (sortMode === "rec") l.sort((a,b) => (b.rec - a.rec) || (b.sold - a.sold));
  if (sortMode === "pop") l.sort((a,b) => b.sold - a.sold);
  if (sortMode === "cheap") l.sort((a,b) => a.price - b.price);
  if (sortMode === "exp") l.sort((a,b) => b.price - a.price);
  return l;
}
function renderGrid(){
  const list = applySort(applyFilter(PRODUCTS));
  grid.innerHTML = list.map(cardHTML).join("");
  $("gridCount").textContent = filter === "all" ? `همه‌ی مدل‌ها: ${faNum(list.length)} مدل` : `${faNum(list.length)} مدل در این انتخاب`;
}
function renderDeals(){
  dealsGrid.innerHTML = PRODUCTS.filter(p => p.off).map(cardHTML).join("");
}
$("chips").addEventListener("click", e => {
  const b = e.target.closest(".chip"); if (!b) return;
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  b.classList.add("active"); filter = b.dataset.f; renderGrid();
});
$("sortSel").addEventListener("change", e => { sortMode = e.target.value; renderGrid(); });
document.addEventListener("click", e => {
  const g = e.target.closest("[data-gallery]");
  if (g) { openGallery(g.dataset.gallery); return; }
  const b = e.target.closest("[data-buy]");
  if (b) { openBuy(b.dataset.buy); }
});

/* ---------- gallery ---------- */
let gCode = null;
function openGallery(code){
  gCode = code;
  const p = byCode(code), views = IMAGES[code];
  $("gName").textContent = `${p.name} — کد ${faNum(p.code)}`;
  $("gStars").textContent = stars(p.rating);
  $("gSold").textContent = `${faRating(p.rating)} · +${faNum(p.sold)} فروش`;
  $("gSpecs").innerHTML = [`ابعاد: ${p.dims}`, `جنس: ${p.mat}`, "ارتفاع قابل تنظیم", "ترانس هوشمند", "۳ حالت نوری"].map(s => `<span>${s}</span>`).join("");
  $("gPrice").innerHTML = `${p.old ? `<span class="old">${faPrice(p.old)} تومان</span>` : ""}<b>${faPrice(p.price)}</b> تومان`;
  $("gThumbs").innerHTML = views.map((v, i) =>
    `<button class="g-thumb${i === 0 ? " active" : ""}" data-view="${i}"><img src="${v[0]}" alt="${v[1]}">${v[1]}</button>`).join("");
  $("gImg").src = views[0][0];
  $("gImg").alt = `${p.name} — نمای ${views[0][1]}`;
  $("gallery").hidden = false;
  document.body.style.overflow = "hidden";
}
$("gThumbs").addEventListener("click", e => {
  const t = e.target.closest("[data-view]"); if (!t) return;
  document.querySelectorAll(".g-thumb").forEach(x => x.classList.remove("active"));
  t.classList.add("active");
  const v = IMAGES[gCode][+t.dataset.view];
  $("gImg").src = v[0]; $("gImg").alt = v[1];
});
function closeGallery(){ $("gallery").hidden = true; document.body.style.overflow = ""; }
$("gClose").addEventListener("click", closeGallery);
$("gallery").addEventListener("click", e => { if (e.target === $("gallery")) closeGallery(); });
$("gBuy").addEventListener("click", () => { const c = gCode; closeGallery(); openBuy(c); });

/* ---------- quick buy ---------- */
let bCode = null;
function openBuy(code){
  bCode = code;
  const p = byCode(code);
  $("bImg").src = IMAGES[code][0][0];
  $("bName").textContent = `${p.name} — کد ${faNum(p.code)}`;
  $("bPrice").textContent = `${faPrice(p.price)} تومان`;
  $("bTotal").textContent = faPrice(p.price);
  $("buyForm").hidden = false; $("buySuccess").hidden = true;
  $("formErr").hidden = true;
  $("buyOverlay").hidden = false;
  document.body.style.overflow = "hidden";
}
function closeBuy(){ $("buyOverlay").hidden = true; document.body.style.overflow = ""; }
$("bClose").addEventListener("click", closeBuy);
$("okClose").addEventListener("click", () => { closeBuy(); showToast("سفارش شما با موفقیت ثبت شد؛ به‌زودی تماس می‌گیریم."); });
$("buyOverlay").addEventListener("click", e => { if (e.target === $("buyOverlay")) closeBuy(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") { closeBuy(); closeGallery(); } });
$("bSubmit").addEventListener("click", () => {
  const name = $("fName").value.trim();
  const mobile = toEn($("fMobile").value.trim()).replace(/[\s-]/g, "");
  const city = $("fCity").value.trim();
  const err = $("formErr");
  let msg = "";
  if (name.length < 3) msg = "نام و نام خانوادگی را کامل بنویسید.";
  else if (!/^09\d{9}$/.test(mobile)) msg = "شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.";
  else if (city.length < 2) msg = "شهر را بنویسید.";
  if (msg) { err.textContent = msg; err.hidden = false; return; }
  err.hidden = true;
  const p = byCode(bCode);
  $("okText").textContent = `${name} عزیز، سفارش «${p.name}» برای شهر ${city} ثبت شد. برای هماهنگی ارسال و پرداخت با شماره‌ی ${faNum(mobile)} تماس می‌گیریم.`;
  $("okCode").textContent = "AVZ-" + faNum(String(Math.floor(10000 + Math.random() * 90000)));
  $("buyForm").hidden = true; $("buySuccess").hidden = false;
});

/* ---------- toast ---------- */
let toastTimer;
function showToast(msg){
  const t = $("toast"); t.textContent = msg; t.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.hidden = true, 4200);
}

/* ---------- hero / spotlight ---------- */
$("heroImg").src = IMAGES["4046"][2][0];
$("spotImg").src = IMAGES["4026"][0][0];
$("spotStars").textContent = stars(4.9);
$("spotSold").textContent = "۴٫۹ · +۲۳۱ فروش";
$("heroBuy").addEventListener("click", () => openBuy("4046"));
$("spotBuy").addEventListener("click", () => openBuy("4026"));
$("spotGallery").addEventListener("click", () => openGallery("4026"));

/* ---------- countdown to midnight ---------- */
function tick(){
  const now = new Date(); const end = new Date(now); end.setHours(24, 0, 0, 0);
  let s = Math.max(0, Math.floor((end - now) / 1000));
  const h = String(Math.floor(s / 3600)).padStart(2, "0"), m = String(Math.floor(s % 3600 / 60)).padStart(2, "0"), sec = String(s % 60).padStart(2, "0");
  $("countdown").textContent = `${h}:${m}:${sec}`;
}
tick(); setInterval(tick, 1000);

renderGrid();
renderDeals();
