/****************************************
 * Level Up Theme for High Level (GHL)
 * https//levelupthemes.com
 * Version: v1.7.12
 ****************************************/

const POLYFILL_DELAY = 1e3;
const TOPNAV_SELECTOR = ".topnav";
const SCROLL_CLASS = "scroll";
const BANNER_SELECTOR = ".notification-banner";
const BANNER_HIDE_CLASS = "banner-hide";
const BANNER_SHOW_CLASS = "banner-show-fixed";
const BODY_SELECTOR = "body";
const CONTAINER_SELECTOR = "#preview-container";
let REPOSITIONED = false;
const observeTopnav = (topnav, banner) => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "style") {
        const pos = getComputedStyle(topnav).getPropertyValue("position");
        if (pos === "fixed") {
          observer.disconnect();
          if (!REPOSITIONED) {
            positionBanner(banner, topnav);
          }
        }
      }
    });
  });
  observer.observe(topnav, {
    attributes: true,
    attributeFilter: ["style"]
  });
  return observer;
};
const positionBanner = (banner, topnav) => {
  if (!banner || !topnav) {
    return;
  }
  const navRect = topnav.getBoundingClientRect();
  const bannerRect = banner.getBoundingClientRect();
  banner.style.setProperty("--_top", `${navRect.bottom}px`);
  banner.classList.add(BANNER_SHOW_CLASS);
  const container = document.querySelector(CONTAINER_SELECTOR);
  if (container) {
    if (!container.dataset.fixedMarginBase) {
      const baseMargin = getComputedStyle(container).getPropertyValue("margin-top");
      container.dataset.fixedMarginBase = baseMargin;
    }
    let margin = parseInt(container.dataset.fixedMarginBase) || 0;
    margin = margin + bannerRect.height;
    if (banner.nextElementSibling) {
      margin = margin + parseInt(
        getComputedStyle(banner.nextElementSibling).getPropertyValue(
          "margin-top"
        )
      ) || 0;
    }
    margin = Math.round(margin);
    container.style.setProperty("margin-top", `${margin}px`);
  }
  REPOSITIONED = true;
};
const setBanner = (topnav) => {
  const banner = document.querySelector(BANNER_SELECTOR);
  if (!banner) {
    return;
  }
  if (getComputedStyle(banner).getPropertyValue("display") === "none") {
    return;
  }
  function closeEvent(event) {
    banner.classList.add(BANNER_HIDE_CLASS);
  }
  const closeBtn = banner.querySelector(".btn-close");
  closeBtn == null ? void 0 : closeBtn.addEventListener("click", closeEvent);
  const navPos = getComputedStyle(topnav).getPropertyValue("position");
  if (navPos !== "fixed" || !topnav.parentElement) {
    return observeTopnav(topnav, banner);
  }
  return positionBanner(topnav, banner);
};
const scrollPolyfill = (topnav) => {
  if (!topnav) {
    return;
  }
  console.log("Level Up: Adding nav scroll polyfill");
  const intercept = document.createElement("div");
  intercept.setAttribute("data-observer-intercept", "");
  const container = document.querySelector(BODY_SELECTOR);
  container.insertBefore(intercept, container.firstChild);
  const observer = new IntersectionObserver(([entry]) => {
    topnav.classList.toggle(SCROLL_CLASS, !(entry == null ? void 0 : entry.isIntersecting));
  });
  observer.observe(intercept);
};
const run = () => {
  const topnav = document.querySelector(TOPNAV_SELECTOR);
  setBanner(topnav);
  if (CSS.supports("animation-timeline:scroll()")) {
    return;
  }
  setTimeout(() => {
    scrollPolyfill(topnav);
  }, POLYFILL_DELAY);
};
var topnav = {
  run
};

export { topnav as default };
//# sourceMappingURL=topnav.js.map
