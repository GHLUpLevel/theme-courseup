(function () {
  'use strict';

  const SEL_BTN_MORE = ".show-more-btn";
  const SEL_BTN_LESS = ".show-less-btn";
  const SEL_ROWS = ".c-row.show-more";
  const ENABLED_CLASS = "show-more-enabled";
  const HIDE_CLASS = "show-more-hide";
  const WRAPPER_CLASS = "show-more-wrapper";
  const DISABLED_CLASS = "show-more-disabled";
  const addClickListeners = (btnRow, listener) => {
    btnRow.querySelectorAll(`${SEL_BTN_MORE},${SEL_BTN_LESS}`).forEach((btn) => {
      btn.addEventListener("click", listener);
    });
  };
  const observeAndListen = (trigger, btnContainer, moreElems) => {
    function onClick(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      observer.disconnect();
      const enabled = btnContainer.classList.contains(ENABLED_CLASS);
      moreElems.forEach((elem) => {
        elem.classList[enabled ? "add" : "remove"](HIDE_CLASS);
      });
      btnContainer.classList[enabled ? "remove" : "add"](ENABLED_CLASS);
    }
    if (!trigger.parentNode || !btnContainer) {
      return;
    }
    const observer = new MutationObserver((list, obs) => {
      if (!trigger.parentNode) {
        trigger.removeEventListener("click", onClick);
        addClickListeners(btnContainer, onClick);
      }
    });
    observer.observe(trigger.parentNode, { childList: true });
    addClickListeners(btnContainer, onClick);
  };
  const run$1 = () => {
    document.querySelectorAll(SEL_BTN_MORE).forEach((trigger) => {
      const btnContainer = trigger.closest("div.inner");
      if (!btnContainer) {
        return;
      }
      let moreElems;
      try {
        moreElems = btnContainer.querySelectorAll(
          ".c-wrapper:has(.show-more)"
        );
      } catch (err) {
        console.warn("Browser does not support :has query selector");
        btnContainer.classList.add(DISABLED_CLASS);
        return;
      }
      if ((moreElems == null ? void 0 : moreElems.length) === 0 && btnContainer.parentNode) {
        const parentRow = trigger.closest(".c-row");
        if (parentRow == null ? void 0 : parentRow.parentNode) {
          moreElems = parentRow.parentNode.querySelectorAll(SEL_ROWS);
        }
      }
      if ((moreElems == null ? void 0 : moreElems.length) === 0) {
        btnContainer.classList.add(DISABLED_CLASS);
      } else {
        moreElems.forEach((elem) => {
          elem.classList.add(HIDE_CLASS, WRAPPER_CLASS);
        });
        observeAndListen(trigger, btnContainer, moreElems);
      }
    });
  };
  const init$1 = () => {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(run$1, 10);
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        setTimeout(run$1, 10);
      });
    }
  };
  var showMore = {
    init: init$1,
    run: run$1
  };

  const themeVariablesDefaults = [
    "theme-primary-color",
    "theme-secondary-color",
    "theme-text-headline-color",
    "theme-text-content-color",
    "theme-text-bold-color",
    "theme-text-italic-color",
    "theme-text-underlined-color",
    "theme-text-link-color",
    "theme-text-highlight-color",
    "theme-text-dark-bg-color",
    "theme-icon-color",
    "theme-button-primary-text-color",
    "theme-button-primary-bg-color",
    "theme-button-secondary-text-color",
    "theme-button-secondary-bg-color",
    "theme-background-1-color",
    "theme-background-2-color",
    "theme-background-3-color"
  ];
  const globalVariables = [
    "headlinefont",
    "contentfont"
  ];
  function setCSSDefaults() {
    themeVariablesDefaults.forEach((name) => {
      const themeVar = `--${name}`;
      if (getComputedStyle(document.documentElement).getPropertyValue(themeVar).trim().length < 2) {
        const defaultValue = getComputedStyle(
          document.documentElement
        ).getPropertyValue(`--default-${name}`);
        document.documentElement.style.setProperty(themeVar, defaultValue);
        console.log(`${themeVar} set to default:`, defaultValue);
      }
    });
    globalVariables.forEach((name) => {
      const varName = `--global-${name}`;
      const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      if (value.replace(/["']/g, "").length > 0) {
        document.documentElement.style.setProperty(name, value);
        console.log(`--${name} set to global value:`, value);
      }
    });
  }

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
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const elem = entry.target;
        elem.classList.add(...elem.dataset.animate.split(","));
        observer.unobserve(elem);
      }
    });
  });
  const processElem = (elem) => __async(void 0, null, function* () {
    const animClasses = [];
    elem.classList.forEach((cls) => {
      if (cls.substring(0, 8) === "animate-") {
        animClasses.push(cls);
      }
    });
    elem.dataset.animate = animClasses.join(",");
    elem.classList.remove(...animClasses);
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

  setCSSDefaults();
  showMore.init();
  animate.init();
  console.log(`"Level Up Theme" v: "1.6.12"`);
  console.log(`https://highlevelthemes.com`);

})();
//# sourceMappingURL=all.js.map
