/*!***************************************
 * Level Up Theme for High Level (GHL)
 * https//levelupthemes.com
 * Version: v1.7.31
 ****************************************/

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
const run = () => {
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
  run
};

export { showMore as default };
//# sourceMappingURL=showMore.js.map
