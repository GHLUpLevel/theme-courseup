/****************************************
 * Level Up Theme for High Level (GHL)
 * https//highlevelthemes.com
 * Version: v1.4.0
 ****************************************/

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

export { showMore as default };
//# sourceMappingURL=show-more.js.map
