/*!***************************************
 * Level Up Theme for High Level (GHL)
 * https//levelupthemes.com
 * Version: v1.7.30
 ****************************************/

function debounce(func, wait) {
  let timeout;
  return function executedFunction() {
    const later = () => {
      clearTimeout(timeout);
      func();
    };
    clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
  };
}

const POLYFILL_DELAY = 1e3;
const TOPNAV_SELECTOR = ".topnav";
const SCROLL_CLASS = "scroll";
const BANNER_SELECTOR = ".notification-banner";
const BANNER_HIDE_CLASS = "banner-hide";
const BANNER_FIXED_CLASS = "banner-fixed";
const TOPNAV_FIXED_CLASS = "topnav-fixed";
const BODY_SELECTOR = "body";
const CONTAINER_SELECTOR = "#preview-container";
let REPOSITIONED = false;
const observeResize = (banner, topnav) => {
  function onViewportResize() {
    positionBanner(banner, topnav, true, true);
  }
  window.addEventListener("resize", debounce(onViewportResize, 200));
};
const observeTopnav = (banner, topnav) => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "style") {
        const pos = getComputedStyle(topnav).getPropertyValue("position");
        if (pos === "fixed") {
          observer.disconnect();
          if (!REPOSITIONED) {
            observeResize(banner, topnav);
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
const getBlockPadding = (elem) => {
  const top = getComputedStyle(elem).getPropertyValue("padding-top");
  const bottom = getComputedStyle(elem).getPropertyValue("padding-bottom");
  const total = [top, bottom].reduce((acc, cur) => {
    return parseInt(cur, 10) + acc;
  }, 0);
  return `${total}px`;
};
const positionBanner = (banner, topnav, smooth = false, setTopMargin = true) => {
  if (!banner || !topnav) {
    return;
  }
  const root = document.documentElement;
  const navRect = topnav.getBoundingClientRect();
  const bannerRect = banner.getBoundingClientRect();
  const container = document.querySelector(CONTAINER_SELECTOR);
  if (!container) {
    return;
  }
  if (smooth) {
    container.style.setProperty("transition", "margin-top .3s ease-out");
  }
  banner.classList.add(BANNER_FIXED_CLASS);
  topnav.classList.add(TOPNAV_FIXED_CLASS);
  let offset = navRect.bottom;
  let totalHeight = offset;
  const bannerPos = getComputedStyle(banner).getPropertyValue("position");
  if (bannerPos === "fixed") {
    if (!banner.classList.contains(BANNER_HIDE_CLASS)) {
      offset += bannerRect.height;
      totalHeight += bannerRect.height;
    }
    if (banner.nextElementSibling) {
      offset += parseInt(
        getComputedStyle(banner.nextElementSibling).getPropertyValue(
          "margin-top"
        )
      );
    }
  }
  banner.style.setProperty("--topnav-padding", getBlockPadding(topnav));
  root.style.setProperty("--sticky-topnav-bottom", `${navRect.bottom}px`);
  root.style.setProperty("--top-sticky-height", `${totalHeight}px`);
  if (setTopMargin) {
    container.style.setProperty("margin-top", `${Math.round(offset)}px`);
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
  const closeBtn = banner.querySelector(".btn-close");
  closeBtn == null ? void 0 : closeBtn.addEventListener("click", () => {
    banner.classList.add(BANNER_HIDE_CLASS);
    positionBanner(banner, topnav, true, false);
  });
  const navPos = getComputedStyle(topnav).getPropertyValue("position");
  if (navPos !== "fixed" || !topnav.parentElement) {
    return observeTopnav(banner, topnav);
  }
  positionBanner(banner, topnav);
  observeResize(banner, topnav);
  return;
};
const scrollPolyfill = (topnav) => {
  if (!topnav) {
    return;
  }
  console.log("Level Up Theme: Adding nav scroll polyfill");
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
