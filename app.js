// Product data: the 10-item shortlist (reviewed 18 Mehr 1405). Prices in Toman, single-branch variant.
// Visuals are original generated artwork matched to each model's form — not the source shop's photos.
// IMGS[id] = [تکی, چندتایی, در فضا]. rating/sold are demo social-proof data for this sample.
const PRODUCTS = [
  { id:1,  name:"آویز کریستالی مینیمال استوانه",            price:2840000, tag:"ورودی اقتصادی", rating:4.5, sold:86,  link:"https://lustremodernite.ir/product/208/%D8%A2%D9%88%DB%8C%D8%B2-%DA%A9%D8%B1%DB%8C%D8%B3%D8%AA%D8%A7%D9%84%DB%8C-%D9%85%DB%8C%D9%86%DB%8C%D9%85%D8%A7%D9%84-%D8%A7%D8%B3%D8%AA%D9%88%D8%A7%D9%86%D9%87/?vid=292" },
  { id:2,  name:"لوستر آویز مدل چراغ کد ۸۱۴",                price:2903000, tag:"ورودی اقتصادی", rating:4.6, sold:74,  link:"https://lustremodernite.ir/product/247/%D9%84%D9%88%D8%B3%D8%AA%D8%B1-%D8%A2%D9%88%DB%8C%D8%B2-%D9%85%D8%AF%D9%84-%DA%86%D8%B1%D8%A7%D8%BA-%DA%A9%D8%AF-%DB%B8%DB%B1%DB%B4/?vid=669" },
  { id:3,  name:"آویز کریستالی مینیمال مربع کد ۷۰۷",          price:2993000, tag:"ورودی اقتصادی", rating:4.4, sold:63,  link:"https://lustremodernite.ir/product/457/%D8%A2%D9%88%DB%8C%D8%B2-%DA%A9%D8%B1%DB%8C%D8%B3%D8%AA%D8%A7%D9%84%DB%8C-%D9%85%DB%8C%D9%86%DB%8C%D9%85%D8%A7%D9%84-%D9%85%D8%B1%D8%A8%D8%B9-%DA%A9%D8%AF-%DB%B7%DB%B0%DB%B7/?vid=4717" },
  { id:4,  name:"آویز کریستالی مینیمال گرد کوچک کد ۷۰۷",      price:2993000, tag:"ورودی اقتصادی", rating:4.3, sold:58,  link:"https://lustremodernite.ir/product/456/%D8%A2%D9%88%DB%8C%D8%B2-%DA%A9%D8%B1%DB%8C%D8%B3%D8%AA%D8%A7%D9%84%DB%8C-%D9%85%DB%8C%D9%86%DB%8C%D9%85%D8%A7%D9%84-%DA%AF%D8%B1%D8%AF-%DA%A9%D9%88%DA%86%DA%A9-%DA%A9%D8%AF-%DB%B7%DB%B0%DB%B7/?vid=4715" },
  { id:5,  name:"آویز گل کریستالی دست‌ساز",                   price:3523000, tag:"مدل شاخص",      rating:4.7, sold:112, link:"https://lustremodernite.ir/product/219/%D8%A2%D9%88%DB%8C%D8%B2-%DA%AF%D9%84-%DA%A9%D8%B1%DB%8C%D8%B3%D8%AA%D8%A7%D9%84%DB%8C-%D8%AF%D8%B3%D8%AA-%D8%B3%D8%A7%D8%B2/?vid=464" },
  { id:6,  name:"لوستر آویز و دیوارکوب مدل گوی برفی کد ۴۰۶۶", price:3875000, tag:"مدل شاخص",      rating:4.9, sold:231, recommended:true, link:"https://lustremodernite.ir/product/388/%D9%84%D9%88%D8%B3%D8%AA%D8%B1-%D8%A2%D9%88%DB%8C%D8%B2-%D9%88-%D8%AF%DB%8C%D9%88%D8%A7%D8%B1%DA%A9%D9%88%D8%A8-%D9%85%D8%AF%D9%84-%DA%AF%D9%88%DB%8C-%D8%A8%D8%B1%D9%81%DB%8C-%DA%A9%D8%AF-%DB%B4%DB%B0%DB%B6%DB%B6/?vid=4041" },
  { id:7,  name:"آویز کریستالی مدل لوزی",                     price:4029000, tag:"مدل شاخص",      rating:4.6, sold:97,  link:"https://lustremodernite.ir/product/395/%D8%A2%D9%88%DB%8C%D8%B2-%DA%A9%D8%B1%DB%8C%D8%B3%D8%AA%D8%A7%D9%84%DB%8C-%D9%85%D8%AF%D9%84-%D9%84%D9%88%D8%B2%DB%8C-181849/?vid=4246" },
  { id:8,  name:"لوستر آویز مدل کارتل مشکی",                  price:4603000, tag:"مدل شاخص",      rating:4.5, sold:88,  link:"https://lustremodernite.ir/product/402/%D9%84%D9%88%D8%B3%D8%AA%D8%B1-%D8%A2%D9%88%DB%8C%D8%B2-%D9%85%D8%AF%D9%84-%DA%A9%D8%A7%D8%B1%D8%AA%D9%84-%D9%85%D8%B4%DA%A9%DB%8C/?vid=4503" },
  { id:9,  name:"لوستر آویز و دیوارکوب مدل زمرد یخ",           price:5370000, tag:"مدل شاخص",      rating:4.7, sold:104, link:"https://lustremodernite.ir/product/392/%D9%84%D9%88%D8%B3%D8%AA%D8%B1-%D8%A2%D9%88%DB%8C%D8%B2-%D9%88-%D8%AF%DB%8C%D9%88%D8%A7%D8%B1%DA%A9%D9%88%D8%A8-%D9%85%D8%AF%D9%84-%D8%B2%D9%85%D8%B1%D8%AF-%DB%8C%D8%AE/?vid=4332" },
  { id:10, name:"لوستر آویز و دیوارکوب مدل شوکران کد 20199",  price:5658000, tag:"مدل شاخص",      rating:4.8, sold:119, link:"https://lustremodernite.ir/product/390/%D9%84%D9%88%D8%B3%D8%AA%D8%B1-%D8%A2%D9%88%DB%8C%D8%B2-%D9%88-%D8%AF%DB%8C%D9%88%D8%A7%D8%B1%DA%A9%D9%88%D8%A8-%D9%85%D8%AF%D9%84-%D8%B4%D9%88%DA%A9%D8%B1%D8%A7%D9%86-%DA%A9%D8%AF-20199/?vid=4386" },
];

const VIEW_LABELS = ["تکی", "چندتایی", "در فضا"];
const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const faNum = n => String(n).replace(/\d/g, d => FA_DIGITS[d]);
const faPrice = n => faNum(n.toLocaleString("en-US")).replace(/,/g, "٬");
const faRating = r => faNum(String(r)).replace(".", "٫");
const stars = r => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));
const byId = id => PRODUCTS.find(p => p.id === id);

const grid = document.getElementById("productGrid");
const toast = document.getElementById("toast");
const cartCount = document.getElementById("cartCount");
let cart = 0;

function showToast(msg){
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

function badges(p){
  let h = "";
  if (p.recommended) h += `<span class="badge badge-rec">پیشنهاد آویزلوکس</span><span class="badge badge-best">پرفروش‌ترین</span>`;
  else if (p.sold >= 100) h += `<span class="badge badge-best">پرفروش</span>`;
  return h ? `<div class="badges">${h}</div>` : "";
}

function render(list){
  grid.innerHTML = "";
  for (const p of list){
    const card = document.createElement("article");
    card.className = "card" + (p.recommended ? " recommended" : "");
    card.innerHTML = `
      <div class="card-media" role="button" tabindex="0" aria-label="گالری عکس ${p.name}">
        <img src="${IMGS[p.id][0]}" alt="${p.name}" loading="lazy">
        <span class="gallery-hint">🔍 گالری: ۳ نما</span>
      </div>
      <div class="card-body">
        ${badges(p)}
        <div class="card-top">
          <span class="tag">${p.tag}</span>
          <span class="stars" title="امتیاز خریداران">${stars(p.rating)} <b>${faRating(p.rating)}</b></span>
        </div>
        <h3>${p.name}</h3>
        <div class="sold">+${faNum(p.sold)} فروش</div>
        <div class="price">${faPrice(p.price)} <small>تومان</small></div>
        <div class="card-actions">
          <button class="buy-btn" type="button">خرید سریع</button>
          <button class="add-btn" type="button">افزودن به سبد</button>
        </div>
      </div>`;
    const open = () => openGallery(p.id);
    card.querySelector(".card-media").addEventListener("click", open);
    card.querySelector(".card-media").addEventListener("keydown", e => { if (e.key === "Enter") open(); });
    card.querySelector(".buy-btn").addEventListener("click", () => openCheckout(p.id));
    card.querySelector(".add-btn").addEventListener("click", () => {
      cart += 1;
      cartCount.textContent = faNum(cart);
      showToast("به سبد خرید اضافه شد ✓");
    });
    grid.appendChild(card);
  }
}

const sorters = {
  suggested: (a, b) => ((b.recommended ? 1 : 0) - (a.recommended ? 1 : 0)) || (a.price - b.price),
  popular:   (a, b) => b.sold - a.sold,
  cheap:     (a, b) => a.price - b.price,
  expensive: (a, b) => b.price - a.price,
};
document.getElementById("sortSelect").addEventListener("change", e =>
  render([...PRODUCTS].sort(sorters[e.target.value] || sorters.suggested)));
document.getElementById("cartBtn").addEventListener("click", () =>
  showToast(cart ? `سبد شما ${faNum(cart)} قلم دارد (نمایشی)` : "سبد خرید خالی است"));

/* ---------- gallery ---------- */
const galOverlay = document.getElementById("galleryOverlay");
const galMain = document.getElementById("galMain");
const galThumbs = document.getElementById("galThumbs");
let galProduct = null;

function setGalView(i){
  galMain.src = IMGS[galProduct.id][i];
  galMain.alt = `${galProduct.name} — نمای ${VIEW_LABELS[i]}`;
  [...galThumbs.children].forEach((t, j) => t.classList.toggle("active", j === i));
}
function openGallery(id){
  galProduct = byId(id);
  document.getElementById("galName").textContent = galProduct.name;
  document.getElementById("galMeta").innerHTML =
    `<span class="stars">${stars(galProduct.rating)} <b>${faRating(galProduct.rating)}</b></span>
     <span class="sold">+${faNum(galProduct.sold)} فروش</span>
     <span class="price">${faPrice(galProduct.price)} <small>تومان</small></span>`;
  document.getElementById("galLink").href = galProduct.link;
  galThumbs.innerHTML = "";
  IMGS[id].forEach((src, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "thumb";
    b.innerHTML = `<img src="${src}" alt=""><span>${VIEW_LABELS[i]}</span>`;
    b.addEventListener("click", () => setGalView(i));
    galThumbs.appendChild(b);
  });
  setGalView(0);
  galOverlay.hidden = false;
  document.body.style.overflow = "hidden";
}
document.getElementById("galBuy").addEventListener("click", () => {
  galOverlay.hidden = true;
  openCheckout(galProduct.id);
});

/* ---------- quick checkout (2 steps, no registration) ---------- */
const coOverlay = document.getElementById("checkoutOverlay");
const coForm = document.getElementById("coForm");
const coSuccess = document.getElementById("coSuccess");
let coProduct = null;

function openCheckout(id){
  coProduct = byId(id);
  document.getElementById("coImg").src = IMGS[id][0];
  document.getElementById("coName").textContent = coProduct.name;
  document.getElementById("coPrice").innerHTML =
    `مبلغ قابل پرداخت: <b>${faPrice(coProduct.price)} تومان</b>`;
  coForm.hidden = false;
  coSuccess.hidden = true;
  coOverlay.hidden = false;
  document.body.style.overflow = "hidden";
}
const toEnDigits = s => s.replace(/[۰-۹]/g, d => FA_DIGITS.indexOf(d)).replace(/[\s-]/g, "");
coForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("fName");
  const mobile = document.getElementById("fMobile");
  const city = document.getElementById("fCity");
  let ok = true;
  for (const [el, valid] of [
    [name, name.value.trim().length >= 3],
    [mobile, /^09\d{9}$/.test(toEnDigits(mobile.value))],
    [city, city.value.trim().length >= 2],
  ]) {
    el.classList.toggle("invalid", !valid);
    if (!valid) ok = false;
  }
  if (!ok) { showToast("لطفاً هر سه کادر را درست کامل کنید"); return; }
  coForm.hidden = true;
  coSuccess.hidden = false;
  document.getElementById("coSuccessText").innerHTML =
    `سفارش «${coProduct.name}» به نام ${name.value.trim()} ثبت شد ✓<br>` +
    `مبلغ: ${faPrice(coProduct.price)} تومان — برای هماهنگی ارسال با شماره‌ی ${faNum(toEnDigits(mobile.value))} تماس می‌گیریم. (نمایشی)`;
  showToast("سفارش شما ثبت شد ✓");
});

/* ---------- overlays: close ---------- */
for (const ov of [galOverlay, coOverlay]) {
  ov.addEventListener("click", e => { if (e.target === ov) closeOverlay(ov); });
  ov.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", () => closeOverlay(ov)));
}
function closeOverlay(ov){
  ov.hidden = true;
  if (galOverlay.hidden && coOverlay.hidden) document.body.style.overflow = "";
}
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { closeOverlay(galOverlay); closeOverlay(coOverlay); }
});

render([...PRODUCTS].sort(sorters.suggested));
