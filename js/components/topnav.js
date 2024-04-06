/****************************************
 * Level Up Theme for High Level (GHL)
 * https//highlevelthemes.com
 * Version: v1.7.11
 ****************************************/

const TOPNAV_SELECTOR = ".topnav";
const SCROLL_CLASS = "scroll";
const run = () => {
  if (CSS.supports("animation-timeline:scroll()")) {
    return;
  }
  const topnav = document.querySelector(TOPNAV_SELECTOR);
  if (!topnav || !topnav.parentElement) {
    return;
  }
  const intercept = document.createElement("div");
  intercept.setAttribute("data-observer-intercept", "");
  topnav.before(intercept);
  const observer = new IntersectionObserver(([entry]) => {
    topnav.classList.toggle(SCROLL_CLASS, !entry.isIntersecting);
  });
  observer.observe(intercept);
};
var topnav = {
  run
};

export { topnav as default };
//# sourceMappingURL=topnav.js.map
