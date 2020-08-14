import * as themeBase from "./_variable";

const theme = {
  ...themeBase.colorAll,
  ...themeBase.button,
  ...themeBase.border,
  ...themeBase.icon,
  ...themeBase.zindex,
  ...themeBase.formControl,
  ...themeBase.inputControl,
  ...themeBase.tooltip,
  ...themeBase.shadow,
  ...themeBase.popover,
  ...themeBase.varText,
  ...themeBase.breakpoints,
  ...themeBase.progressTracker,
  // ...themeBase.deviceList,
  // ...themeBase.containerMaxWidth
};

export default theme;
