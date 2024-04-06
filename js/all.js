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
  const run$3 = () => {
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
  var showMore = {
    run: run$3
  };

  const themeVariablesDefaults = [
    "theme-primary-color",
    "theme-secondary-color",
    "theme-accent-color",
    "theme-attention-color",
    "theme-text-headline-color",
    "theme-text-content-color",
    "theme-text-link-color",
    "theme-text-dark-bg-color",
    "theme-icon-color",
    "theme-button-primary-text-color",
    "theme-button-primary-bg-color",
    "theme-background-1-color",
    "theme-background-2-color",
    "theme-background-dark-color"
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
        document.documentElement.style.setProperty(`--${name}`, value);
        console.log(`--${name} set to global value:`, value);
      }
    });
  }

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
  const run$2 = () => {
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
    run: run$2
  };

  const TOPNAV_SELECTOR = ".topnav";
  const SCROLL_CLASS = "scroll";
  const run$1 = () => {
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
    run: run$1
  };

  const run = () => {
    setTimeout(animate.run, 100);
    setTimeout(topnav.run, 1e3);
    showMore.run();
  };
  const init = () => {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(run, 10);
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        setTimeout(run, 10);
      });
    }
  };
  setCSSDefaults();
  init();
  console.log(`Powered by Level Up Theme v1.7.11:`, "https://highlevelthemes.com");

})();
//# sourceMappingURL=all.js.map
