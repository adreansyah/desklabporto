export const space = [
  0,
  4,
  8,
  12,
  16,
  20,
  24,
  28,
  32,
  36,
  40,
  44,
  48,
  52,
  56,
  72,
  80
];

export const colorPallete = {
  color: {
    orange10: "#FFF0E6",
    orange20: "#FF9242",
    orange30: "#FF7D1D", // Base
    orange40: "#FF6C00",
    orange50: "#E65015",

    blue10: "#88A9C3",
    blue20: "#4176A0",
    blue30: "#115488",
    blue40: "#0D436D",
    blue50: "#092E4B",

    // Blue / Secondary Color
    blueSecondary10: "#94C9EB",
    blueSecondary20: "#55A9DE",
    blueSecondary30: "#2A93D6",
    blueSecondary40: "#2480BB",
    blueSecondary50: "#1F71A5",


    // Green/Secondary Color
    green10: "#E7F6D1",
    green20: "#A4D067",
    green30: "#8FC742", // Base
    green40: "#82BB33",
    green50: "#5C940F",

    // Red
    red10: "#F68BA8",
    red20: "#F14574",
    red30: "#ED1651", // Base
    red40: "#D41449",
    red50: "#B8123F",

    // Black
    black10: "#F8FBFC",
    black20: "#EFF3F6",
    black30: "#DCDEE3",
    black40: "#9C9DA6",
    black50: "#70727D",
    black60: "#434755",
    black70: "#151823",

    // White
    white: "#FFFFFF"
  }
  // Orange/Primary Color
};

export const colorMain = {
  color: {
    primary: colorPallete.color.blue30,
    secondaryGreen: colorPallete.color.green30,
    secondaryRed: colorPallete.color.red30,
    success: colorPallete.color.green30,
    error: colorPallete.color.red30,
    warning: colorPallete.color.orange30,
    info: colorPallete.color.black50,
    light: colorPallete.color.black30,
    dark: colorPallete.color.black70
  }
};

export const colorAll = {
  color: {
    ...colorMain.color,
    ...colorPallete.color
  }
};

export const button = {
  btnVariant: {
    // background: background color
    // text: text color,
    // border: border color,
    // hover: background color when being hovered,
    // hoverText: text color when being hovered,
    // focus: background color when being focused,
    // disabled: background color when being disabled,
    // disabledText: text color when being disabled,
    primary: {
      background: colorPallete.color.blue30,
      text: colorPallete.color.white,
      border: "transparent",
      hover: colorPallete.color.blue20,
      focus: colorPallete.color.blue40,
      disabled: colorPallete.color.black30
    },
    "primary-alt": {
      background: colorPallete.color.green30,
      text: colorPallete.color.white,
      border: "transparent",
      hover: colorPallete.color.green20,
      focus: colorPallete.color.green40,
      disabled: colorPallete.color.black30
    },
    secondary: {
      background: colorPallete.color.white,
      text: colorPallete.color.black70,
      border: colorPallete.color.black30,
      hoverText: colorPallete.color.green30,
      focus: colorPallete.color.black20,
      disabledText: colorPallete.color.black30
    },
    "secondary-alt": {
      background: colorPallete.color.white,
      text: colorPallete.color.black50,
      border: colorPallete.color.black30,
      hoverText: colorPallete.color.black40,
      focus: colorPallete.color.black20,
      disabledText: colorPallete.color.black30
    }
  },
  btnSize: {
    small: {
      height: "28px",
      padding: "8px",
      fontSize: "10px",
      marginIcon: "4px"
    },
    medium: {
      height: "40px",
      padding: "12px 16px",
      fontSize: "14px",
      marginIcon: "8px"
    },
    large: {
      height: "50px",
      padding: "16px 24px",
      fontSize: "16px",
      marginIcon: "16px"
    },
    text: {
      height: "16px",
      padding: "4px",
      fontSize: "14px",
      marginIcon: "4px"
    }
  }
};

export const border = {
  border: {
    radius: "4px",
    color: "#DCDEE3",
    borderWidth: "1px",
    base: "1px solid" + colorMain.color.light,
    primary: "1px solid" + colorMain.color.primary
  }
};

export const icon = {
  iconSize: {
    small: "16px",
    large: "24px"
  }
};

export const zindex = {
  zindex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalbg: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070
  }
};

export const formControl = {
  formLabel: {
    default: {
      position: "relative",
      zindex: "0",
      marginBottom: "4px",
      fontSize: "14px",
      lineHeight: "20px",
      color: colorPallete.color.black70
    },
    static: {
      position: "absolute",
      zindex: "1",
      marginBottom: "0px",
      fontSize: "10px",
      fontWeight: "500",
      lineHeight: "12px",
      color: colorPallete.color.black50,
      textTransform: "uppercase"
    }
  },
  formHelpText: {
    default: {
      marginTop: "4px",
      fontSize: "12px",
      lineHeight: "16px"
    },
    static: {
      marginTop: "4px",
      fontSize: "10px",
      lineHeight: "12px"
    }
  }
};

export const inputControl = {
  inputStatus: {
    // background: background color
    // border: border color
    // helptext: helptext color
    normal: {
      background: colorPallete.color.white,
      border: colorPallete.color.blue30
    },
    success: {
      background: "#EBFFD0",
      border: colorPallete.color.green30,
      helptext: colorPallete.color.green30
    },
    error: {
      background: "#FFF3F4",
      border: colorPallete.color.red30,
      helptext: colorPallete.color.red30
    },
    autofill: {
      background: "#FFFEC5",
      border: colorPallete.color.orange30
    },
    disabled: {
      background: colorPallete.color.black20,
      border: colorPallete.color.black30
    }
  }
};

export const tooltip = {
  tooltipPosition: {
    top: {
      bottom: "125%",
      left: "-68px",
      arrowTop: "100%",
      arrowLeft: "50%",
      arrowMarginLeft: "-5px"
    },
    bottom: {
      top: "125%",
      left: "-68px",
      arrowBottom: "100%",
      arrowLeft: "50%",
      arrowMarginLeft: "-5px"
    },
    left: {
      top: "-50%",
      right: "150%",
      arrowTop: "18px",
      arrowRight: "0%",
      arrowMarginRight: "-12px"
    },
    right: {
      top: "-50%",
      left: "150%",
      arrowTop: "18px",
      arrowLeft: "0%",
      arrowMarginLeft: "-12px"
    }
  },
  tooltipColor: {
    light: {
      backgroundColor: colorPallete.color.white,
      color: colorPallete.color.black50
    },
    dark: {
      backgroundColor: colorPallete.color.black60,
      color: colorPallete.color.white
    }
  },
  tooltipArrow: {
    lightleft: {
      borderColor:
        "transparent transparent transparent " + colorPallete.color.white
    },
    lightright: {
      borderColor:
        "transparent " + colorPallete.color.white + " transparent transparent"
    },
    lighttop: {
      borderColor:
        colorPallete.color.white + " transparent transparent transparent"
    },
    lightbottom: {
      borderColor:
        "transparent transparent " + colorPallete.color.white + " transparent"
    },
    darkleft: {
      borderColor:
        "transparent transparent transparent " + colorPallete.color.black60
    },
    darkright: {
      borderColor:
        "transparent " + colorPallete.color.black60 + " transparent transparent"
    },
    darktop: {
      borderColor:
        colorPallete.color.black60 + " transparent transparent transparent"
    },
    darkbottom: {
      borderColor:
        "transparent transparent " + colorPallete.color.black60 + " transparent"
    }
  }
};

export const shadow = {
  shadow: {
    default: "0 1px 4px 0 rgba(112, 114, 125, 0.2)",
    action: "0 1px 4px 0 rgba(112, 114, 125, 0.4)",
    hover: "0 2px 8px 0 rgba(112, 114, 125, 0.4)",
    disabled: "0 1px 3px 0 rgba(112, 114, 125, 0.2)"
  }
};

export const popover = {
  popoverPosition: {
    "bottom-left": {
      left: "0%",
      transformX: "0"
    },
    "bottom-center": {
      left: "50%",
      transformX: "-50%"
    },
    "bottom-right": {
      left: "100%",
      transformX: "-100%"
    }
  }
};

export const varText = {
  textType: {
    H42: {
      fontSize: "42px",
      fontWeight: 500,
      lineHeight: "44px"
    },
    H28: {
      fontSize: "28px",
      fontWeight: 500,
      lineHeight: "30px"
    },
    H24: {
      fontSize: "24px",
      fontWeight: 500,
      lineHeight: "26px"
    },
    H20: {
      fontSize: "20px",
      fontWeight: 500,
      lineHeight: "22px"
    },
    H16: {
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "18px"
    },
    H14: {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "16px"
    },
    H12: {
      fontSize: "12px",
      fontWeight: 500,
      lineHeight: "14px"
    },
    H10: {
      fontSize: "10px",
      fontWeight: 500,
      lineHeight: "12px"
    },
    B14: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "16px"
    },
    B12: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "14px"
    },
    B10: {
      fontSize: "10px",
      fontWeight: 400,
      lineHeight: "12px"
    },
    B10B: {
      fontSize: "10px",
      fontWeight: 500,
      lineHeight: "12px"
    },
    P14: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "21px"
    },
    P12: {
      fontSize: "12px",
      fontWeight: 500,
      lineHeight: "18px"
    }
  }
};

export const progressTracker = {
  tracker: {
    stepDefaultBg: colorAll.color.black40, // default step number bg color
    stepDefaultColor: colorAll.color.white, // default step number font color
    stepActiveBg: colorAll.color.orange30, // active step number bg color
    stepActiveColor: colorAll.color.white, // active step number font color
    stepDoneBg: colorAll.color.green30, // done step number bg color
    stepDoneColor: colorAll.color.white, // done step number font color
    divider: colorAll.color.black30 // divider color
  }
};

export const breakpoints = {
  breakpoint: {
    xs: 240,
    sm: 320,
    md: 360,
    lg: 480,
    deskM: 900,
    deskL: 1140
  }
};
// const devices = Object.keys(breakpoints).reduce((acc, cur) => {
//   acc[cur] = `(min-width: ${breakpoints[cur]}px)`;
//   return acc;
// }, {});
// export const deviceList = {
//   device: { ...devices }
// };
// export const containerMaxWidth = `${breakpoints.deskL}px`;
