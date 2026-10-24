// Product data: the 10-item shortlist (reviewed 18 Mehr 1405). Prices in Toman, single-branch variant.
// Visuals are original generated artwork matched to each model's form — not the source shop's photos.
const PRODUCTS = [
  { id:1,  name:"آویز کریستالی مینیمال استوانه",            price:2840000, tag:"ورودی اقتصادی", link:"https://lustremodernite.ir/product/208/%D8%A2%D9%88%DB%8C%D8%B2-%DA%A9%D8%B1%DB%8C%D8%B3%D8%AA%D8%A7%D9%84%DB%8C-%D9%85%DB%8C%D9%86%DB%8C%D9%85%D8%A7%D9%84-%D8%A7%D8%B3%D8%AA%D9%88%D8%A7%D9%86%D9%87/?vid=292" },
  { id:2,  name:"لوستر آویز مدل چراغ کد ۸۱۴",                price:2903000, tag:"ورودی اقتصادی", link:"https://lustremodernite.ir/product/247/%D9%84%D9%88%D8%B3%D8%AA%D8%B1-%D8%A2%D9%88%DB%8C%D8%B2-%D9%85%D8%AF%D9%84-%DA%86%D8%B1%D8%A7%D8%BA-%DA%A9%D8%AF-%DB%B8%DB%B1%DB%B4/?vid=669" },
  { id:3,  name:"آویز کریستالی مینیمال مربع کد ۷۰۷",          price:2993000, tag:"ورودی اقتصادی", link:"https://lustremodernite.ir/product/457/%D8%A2%D9%88%DB%8C%D8%B2-%DA%A9%D8%B1%DB%8C%D8%B3%D8%AA%D8%A7%D9%84%DB%8C-%D9%85%DB%8C%D9%86%DB%8C%D9%85%D8%A7%D9%84-%D9%85%D8%B1%D8%A8%D8%B9-%DA%A9%D8%AF-%DB%B7%DB%B0%DB%B7/?vid=4717" },
  { id:4,  name:"آویز کریستالی مینیمال گرد کوچک کد ۷۰۷",      price:2993000, tag:"ورودی اقتصادی", link:"https://lustremodernite.ir/product/456/%D8%A2%D9%88%DB%8C%D8%B2-%DA%A9%D8%B1%DB%8C%D8%B3%D8%AA%D8%A7%D9%84%DB%8C-%D9%85%DB%8C%D9%86%DB%8C%D9%85%D8%A7%D9%84-%DA%AF%D8%B1%D8%AF-%DA%A9%D9%88%DA%86%DA%A9-%DA%A9%D8%AF-%DB%B7%DB%B0%DB%B7/?vid=4715" },
  { id:5,  name:"آویز گل کریستالی دست‌ساز",                   price:3523000, tag:"مدل شاخص",      link:"https://lustremodernite.ir/product/219/%D8%A2%D9%88%DB%8C%D8%B2-%DA%AF%D9%84-%DA%A9%D8%B1%DB%8C%D8%B3%D8%AA%D8%A7%D9%84%DB%8C-%D8%AF%D8%B3%D8%AA-%D8%B3%D8%A7%D8%B2/?vid=464" },
  { id:6,  name:"لوستر آویز و دیوارکوب مدل گوی برفی کد ۴۰۶۶", price:3875000, tag:"مدل شاخص",      link:"https://lustremodernite.ir/product/388/%D9%84%D9%88%D8%B3%D8%AA%D8%B1-%D8%A2%D9%88%DB%8C%D8%B2-%D9%88-%D8%AF%DB%8C%D9%88%D8%A7%D8%B1%DA%A9%D9%88%D8%A8-%D9%85%D8%AF%D9%84-%DA%AF%D9%88%DB%8C-%D8%A8%D8%B1%D9%81%DB%8C-%DA%A9%D8%AF-%DB%B4%DB%B0%DB%B6%DB%B6/?vid=4041" },
  { id:7,  name:"آویز کریستالی مدل لوزی",                     price:4029000, tag:"مدل شاخص",      link:"https://lustremodernite.ir/product/395/%D8%A2%D9%88%DB%8C%D8%B2-%DA%A9%D8%B1%DB%8C%D8%B3%D8%AA%D8%A7%D9%84%DB%8C-%D9%85%D8%AF%D9%84-%D9%84%D9%88%D8%B2%DB%8C-181849/?vid=4246" },
  { id:8,  name:"لوستر آویز مدل کارتل مشکی",                  price:4603000, tag:"مدل شاخص",      link:"https://lustremodernite.ir/product/402/%D9%84%D9%88%D8%B3%D8%AA%D8%B1-%D8%A2%D9%88%DB%8C%D8%B2-%D9%85%D8%AF%D9%84-%DA%A9%D8%A7%D8%B1%D8%AA%D9%84-%D9%85%D8%B4%DA%A9%DB%8C/?vid=4503" },
  { id:9,  name:"لوستر آویز و دیوارکوب مدل زمرد یخ",           price:5370000, tag:"مدل شاخص",      link:"https://lustremodernite.ir/product/392/%D9%84%D9%88%D8%B3%D8%AA%D8%B1-%D8%A2%D9%88%DB%8C%D8%B2-%D9%88-%D8%AF%DB%8C%D9%88%D8%A7%D8%B1%DA%A9%D9%88%D8%A8-%D9%85%D8%AF%D9%84-%D8%B2%D9%85%D8%B1%D8%AF-%DB%8C%D8%AE/?vid=4332" },
  { id:10, name:"لوستر آویز و دیوارکوب مدل شوکران کد 20199",  price:5658000, tag:"مدل شاخص",      link:"https://lustremodernite.ir/product/390/%D9%84%D9%88%D8%B3%D8%AA%D8%B1-%D8%A2%D9%88%DB%8C%D8%B2-%D9%88-%D8%AF%DB%8C%D9%88%D8%A7%D8%B1%DA%A9%D9%88%D8%A8-%D9%85%D8%AF%D9%84-%D8%B4%D9%88%DA%A9%D8%B1%D8%A7%D9%86-%DA%A9%D8%AF-20199/?vid=4386" },
];

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const faNum = n => String(n).replace(/\d/g, d => FA_DIGITS[d]);
const faPrice = n => faNum(n.toLocaleString("en-US")).replace(/,/g, "٬");

const grid = document.getElementById("productGrid");
const toast = document.getElementById("toast");
const cartCount = document.getElementById("cartCount");
let cart = 0;

function showToast(msg){
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

function render(list){
  grid.innerHTML = "";
  for (const p of list){
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img src="${IMGS[p.id]}" alt="${p.name}" loading="lazy">
      <div class="card-body">
        <span class="tag">${p.tag}</span>
        <h3>${p.name}</h3>
        <div class="price">${faPrice(p.price)} <small>تومان</small></div>
        <div class="card-actions">
          <a class="view" href="${p.link}" target="_blank" rel="noopener">مشاهده‌ی محصول</a>
          <button class="add-btn" type="button">افزودن به سبد</button>
        </div>
      </div>`;
    card.querySelector(".add-btn").addEventListener("click", () => {
      cart += 1;
      cartCount.textContent = faNum(cart);
      showToast("به سبد خرید اضافه شد ✓");
    });
    grid.appendChild(card);
  }
}

document.getElementById("sortSelect").addEventListener("change", e => {
  const sorted = [...PRODUCTS].sort((a,b) =>
    e.target.value === "cheap" ? a.price - b.price : b.price - a.price);
  render(sorted);
});
document.getElementById("cartBtn").addEventListener("click", () =>
  showToast(cart ? `سبد شما ${faNum(cart)} قلم دارد (نمایشی)` : "سبد خرید خالی است"));

render(PRODUCTS);
