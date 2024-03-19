(function () {
  'use strict';

  const SEL_BTN_MORE = ".c-button .show-more-btn";
  const SEL_BTN_LESS = ".c-button .show-less-btn";
  const SEL_ROWS = ".c-row.show-more";
  const SHOWN_CLASS = "show-more-shown";
  const DISABLED_CLASS = "show-more-disabled";
  const addClickListeners = (btnRow, listener) => {
    btnRow.querySelectorAll(`${SEL_BTN_MORE},${SEL_BTN_LESS}`).forEach((btn) => {
      btn.addEventListener("click", listener);
    });
  };
  const toggleClass = (elem, show) => {
    if (show) {
      elem.classList.add(SHOWN_CLASS);
    } else {
      elem.classList.remove(SHOWN_CLASS);
    }
  };
  const observeAndListen = (trigger, parentRow, rows) => {
    function listener(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      observer.disconnect();
      const isShown = parentRow.classList.contains(SHOWN_CLASS);
      rows.forEach((row) => {
        toggleClass(row, !isShown);
      });
      toggleClass(parentRow, !isShown);
    }
    if (!trigger.parentNode || !parentRow) {
      return;
    }
    const observer = new MutationObserver((list, obs) => {
      if (!trigger.parentNode) {
        trigger.removeEventListener("click", listener);
        addClickListeners(parentRow, listener);
      }
    });
    observer.observe(trigger.parentNode, { childList: true });
    addClickListeners(parentRow, listener);
  };
  const run = () => {
    document.querySelectorAll(SEL_BTN_MORE).forEach((trigger) => {
      var _a;
      const parentRow = trigger.closest(".c-row");
      if (!parentRow) {
        return;
      }
      const rows = (_a = parentRow.parentNode) == null ? void 0 : _a.querySelectorAll(SEL_ROWS);
      if (!rows || rows.length === 0) {
        parentRow.classList.add(DISABLED_CLASS);
      } else {
        observeAndListen(trigger, parentRow, rows);
      }
    });
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
  var showMore = {
    init,
    run
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

  setCSSDefaults();
  showMore.init();
  console.log(`"Level Up Theme" v: "1.4.3"`);
  console.log(`https://highlevelthemes.com`);

})();
//# sourceMappingURL=all.js.map
