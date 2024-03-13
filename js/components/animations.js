const element = document.querySelector(".my-element");
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5
};
const observer = new IntersectionObserver(function(entries, observer2) {
  entries.forEach((entry2) => {
    if (entry2.isIntersecting) {
      element.classList.add("show");
    } else {
      element.classList.remove("show");
    }
  });
}, options);
observer.observe(element);
function scrollTrigger(selector, options2 = {}) {
  let els = document.querySelectorAll(selector);
  els = Array.from(els);
  els.forEach((el) => {
    addObserver(el, options2);
  });
}
function addObserver(el, options2) {
  if (!("IntersectionObserver" in window)) {
    if (options2.cb) {
      options2.cb(el);
    } else {
      entry.target.classList.add("active");
    }
    return;
  }
  let observer2 = new IntersectionObserver((entries, observer3) => {
    entries.forEach((entry2) => {
      if (entry2.isIntersecting) {
        if (options2.cb) {
          options2.cb(el);
        } else {
          entry2.target.classList.add("active");
        }
        observer3.unobserve(entry2.target);
      }
    });
  }, options2);
  observer2.observe(el);
}
scrollTrigger(".intro-text");
//# sourceMappingURL=animations.js.map
