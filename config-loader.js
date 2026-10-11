// config-loader.js
// Reads the site settings from config.js (contact info, hours, banner, FAQ)
// and applies them to every page. To change anything, edit config.js only.

import { VPetConfig as c } from "./config.js";

function applyConfig() {
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

document.addEventListener("DOMContentLoaded", applyConfig);