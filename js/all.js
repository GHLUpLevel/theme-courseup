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
        console.log(`Level Up: ${themeVar} set to default:`, defaultValue);
      }
    });
    globalVariables.forEach((name) => {
      const varName = `--global-${name}`;
      const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      if (value.replace(/["']/g, "").length > 0) {
        document.documentElement.style.setProperty(`--${name}`, value);
        console.log(`Level Up: --${name} set to global value:`, value);
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
  const run$1 = () => {
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
    run: run$1
  };

  const run = () => {
    topnav.run();
    setTimeout(animate.run, 100);
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
  console.log(`Powered by Level Up Theme v1.7.12:`, "https://levelupthemes.com");

})();
//# sourceMappingURL=all.js.map
