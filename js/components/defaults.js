/****************************************
 * Level Up Theme for High Level (GHL)
 * https//highlevelthemes.com
 * Version: v1.3.0
 ****************************************/

const themeVariablesDefaults = [
  "primary-color",
  "secondary-color",
  "text-headline-color",
  "text-content-color",
  "text-bold-color",
  "text-italic-color",
  "text-underlined-color",
  "text-link-color",
  "text-highlight-color",
  "text-dark-bg-color",
  "icon-color",
  "button-primary-text-color",
  "button-primary-bg-color",
  "button-secondary-text-color",
  "button-secondary-bg-color",
  "background-1-color",
  "background-2-color",
  "background-3-color"
];
function setCSSDefaults() {
  themeVariablesDefaults.forEach((name) => {
    const themeVar = `--theme-${name}`;
    if (getComputedStyle(document.documentElement).getPropertyValue(themeVar).trim().length < 2) {
      const defaultValue = getComputedStyle(
        document.documentElement
      ).getPropertyValue(`--theme-default-${name}`);
      document.documentElement.style.setProperty(themeVar, defaultValue);
      console.log(`${themeVar} set to default:`, defaultValue);
    }
  });
}

export { setCSSDefaults };
//# sourceMappingURL=defaults.js.map
