/****************************************
 * Level Up Theme for High Level (GHL)
 * https//highlevelthemes.com
 * Version: v1.7.10
 ****************************************/

var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const ANIMATE_SELECTOR = "[class*=animate-]";
const PLAY_CLASS = "animate-play";
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const elem = entry.target;
      observer.unobserve(elem);
      elem.classList.add(PLAY_CLASS);
    }
  });
});
const processElem = (elem) => __async(void 0, null, function* () {
  observer.observe(elem);
});
const run = () => {
  document.querySelectorAll(ANIMATE_SELECTOR).forEach((elem) => {
    processElem(elem);
  });
};
const init = () => __async(void 0, null, function* () {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(run, 10);
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(run, 10);
    });
  }
});
var animate = { init };

export { animate as default };
//# sourceMappingURL=animate.js.map
