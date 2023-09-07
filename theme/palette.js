const DefaultPalette = (mode='light', skin) => {
  // ** Vars
  const whiteColor = '#FFF'
  const lightColor = '51, 48, 60'
  const darkColor = '228, 230, 244'
  const darkPaperBgColor = '#2F3349'
  const mainColor = mode === 'light' ? lightColor : darkColor

  const defaultBgColor = () => {
    if (skin === 'bordered' && mode === 'light') {
      return whiteColor
    } else if (skin === 'bordered' && mode === 'dark') {
      return darkPaperBgColor
    } else if (mode === 'light') {
      return '#F8F7FA'
    } else return '#25293C'
  }

  return {
    custom: {
      dark: darkColor,
      main: mainColor,
      light: lightColor,
      lightPaperBg: whiteColor,
      darkPaperBg: darkPaperBgColor,
      bodyLight: mode === "light" ? "#ffffff" : "#383f5c",
      bodyGray: mode === "light" ? "#F3F5FF" : "#42496b",
      trackBg: mode === "light" ? "#F1F0F2" : "#3B405B",
      avatarBg: mode === "light" ? "#F6F6F7" : "#4A5072",
      tableHeaderBg: mode === "light" ? "#F6F6F7" : "#4A5072",
    },
    mode: mode,
    primary: {
      light: "#FFF5F9",
      main: "#F46197",
      dark: "#ed4c87",
    },
    secondary: {
      light: "#fcb415",
      main: "#FCB415",
      dark: "#949699",
    },
    error: {
      light: "#ED6F70",
      main: "#EA5455",
      dark: "#CE4A4B",
      contrastText: whiteColor,
    },
    warning: {
      light: "#FFAB5A",
      main: "#FF9F43",
      dark: "#E08C3B",
      contrastText: whiteColor,
    },
    info: {
      light: "#1FD5EB",
      main: "#00CFE8",
      dark: "#00B6CC",
      contrastText: whiteColor,
    },
    success: {
      light: "#42CE80",
      main: "#28C76F",
      dark: "#23AF62",
      contrastText: whiteColor,
    },
    grey: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#F5F5F5",
      A200: "#EEEEEE",
      A400: "#BDBDBD",
      A700: "#616161",
    },
    text: {
      primary: `rgba(${mainColor}, 0.87)`,
      secondary: `rgba(${mainColor}, 0.6)`,
      disabled: `rgba(${mainColor}, 0.38)`,
      contrastText: "#616161",
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === "light" ? whiteColor : darkPaperBgColor,
      default: defaultBgColor(),
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.04)`,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.26)`,
      disabledBackground: `rgba(${mainColor}, 0.12)`,
      focus: `rgba(${mainColor}, 0.12)`,
    },
  };
}

export default DefaultPalette
