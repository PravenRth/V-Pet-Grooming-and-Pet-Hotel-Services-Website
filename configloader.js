// config-loader.js
// Loads site configuration (contact info, hours, banner, FAQ) from Firestore
// and applies it to the page. This replaces the old static config.js file —
// now the info can be edited from admin-dashboard.html with no code needed,
// and changes appear on the live site right away.

import { db } from "./firebase-init.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Fallback values, used only if Firestore can't be reached or the
// config document hasn't been created yet.
const DEFAULT_CONFIG = {
  phone: "011-3602 0431",
  whatsapp: "601136020431",
  address: "83, Jalan Seri Impian 1, Taman Impian Emas, 83100 Skudai, Johor",
  openingDays: "Tuesday – Sunday",
  openingHours: "10am – 7pm",
  showBanner: false,
  bannerText: "",
  faq: []
};

function applyConfig(c) {
  document.querySelectorAll(".cfg-phone").forEach(el => el.textContent = c.phone);
  document.querySelectorAll(".cfg-whatsapp").forEach(el => {
    el.href = "https://wa.me/" + c.whatsapp;
    if (el.textContent.includes("WhatsApp")) el.textContent = "WhatsApp " + c.phone;
  });
  document.querySelectorAll(".cfg-hours").forEach(el =>
    el.textContent = c.openingDays + ": " + c.openingHours
  );
  document.querySelectorAll(".cfg-address").forEach(el => el.textContent = c.address);
  document.querySelectorAll("a.nav-cta, a.mobile-cta").forEach(el => {
    if (el.href.includes("wa.me")) el.href = "https://wa.me/" + c.whatsapp;
  });

  if (c.showBanner && c.bannerText) {
    const banner = document.createElement("div");
    banner.style.cssText = "background:#0071E3;color:white;text-align:center;padding:10px 24px;font-size:13px;font-weight:500;position:relative;z-index:201;";
    const link = document.createElement("a");
    link.href = "https://wa.me/" + c.whatsapp;
    link.style.cssText = "color:white;text-decoration:underline;margin-left:8px;";
    link.textContent = "Book now →";
    banner.textContent = c.bannerText + " ";
    banner.appendChild(link);
    document.body.insertBefore(banner, document.body.firstChild);
  }

  renderFaq(c.faq);
}

function renderFaq(faq) {
  const container = document.getElementById("faq-container");
  if (!container || !Array.isArray(faq)) return;

  container.innerHTML = "";
  faq.forEach(section => {
    const catDiv = document.createElement("div");
    catDiv.className = "faq-category";

    const title = document.createElement("p");
    title.className = "faq-category-title";
    title.textContent = section.category;
    catDiv.appendChild(title);

    (section.questions || []).forEach(item => {
      const faqItem = document.createElement("div");
      faqItem.className = "faq-item";

      const btn = document.createElement("button");
      btn.className = "faq-question";
      btn.setAttribute("aria-expanded", "false");

      const h3 = document.createElement("h3");
      h3.textContent = item.q;
      const icon = document.createElement("div");
      icon.className = "faq-icon";
      icon.textContent = "+";
      btn.appendChild(h3);
      btn.appendChild(icon);

      const answerWrap = document.createElement("div");
      answerWrap.className = "faq-answer";
      const p = document.createElement("p");
      p.textContent = item.a;
      answerWrap.appendChild(p);

      faqItem.appendChild(btn);
      faqItem.appendChild(answerWrap);
      catDiv.appendChild(faqItem);
    });

    container.appendChild(catDiv);
  });

  container.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains("open");
      container.querySelectorAll(".faq-item").forEach(i => {
        i.classList.remove("open");
        i.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

async function loadConfig() {
  try {
    const snap = await getDoc(doc(db, "config", "site"));
    return snap.exists() ? { ...DEFAULT_CONFIG, ...snap.data() } : DEFAULT_CONFIG;
  } catch (err) {
    console.error("Could not load site config from Firestore, using defaults:", err);
    return DEFAULT_CONFIG;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadConfig().then(applyConfig);
});