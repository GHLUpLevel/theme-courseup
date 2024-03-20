/****************************************
 * Level Up Theme for High Level (GHL)
 * https//highlevelthemes.com
 * Version: v1.5.0
 ****************************************/

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

export { setCSSDefaults };
//# sourceMappingURL=defaults.js.map
