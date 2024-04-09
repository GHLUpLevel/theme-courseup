/****************************************
 * Level Up Theme for High Level (GHL)
 * https//levelupthemes.com
 * Version: v1.7.19
 ****************************************/

const SELECTOR = ":is([class*=animate-], [class*=adorn-])";
const PLAY_CLASS = "animate-play";
const CLIP_CLASSES = ["animate-fadeIn", "adorn-"];
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const elem = entry.target;
      observer.unobserve(elem);
      elem.classList.add(PLAY_CLASS);
    }
  });
});
const needsClipping = (classList) => {
  for (const cls of CLIP_CLASSES) {
    if (classList.value.includes(cls)) {
      return true;
    }
  }
  return false;
};
const run = () => {
  document.querySelectorAll(SELECTOR).forEach((elem) => {
    if (needsClipping(elem.classList) && elem.parentElement) {
      const section = elem.closest(".c-section");
      const clipElem = section ? section : elem.parentElement;
      clipElem.style.overflowX = "clip";
    }
    observer.observe(elem);
  });
};
var animate = {
  run
};

export { animate as default };
//# sourceMappingURL=animate.js.map
