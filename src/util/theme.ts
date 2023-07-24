// Other color ideas
// main: '#9448D5',
// main: '#B17AE1',

import { ThemeOptions } from "@material-ui/core";

export const light: ThemeOptions = {
  palette: {
    type: "light",
    secondary: {
      main: "#1F8BFF",
    },
    bars: {
      default: "#FFC2E2",
      a: "#88A3FF",
      b: "#FF613D",
      c: "#FFED4B",
      d: "#8138EF",
      sorted: "#00DC80",
    },
  },
};

export const dark: ThemeOptions = {
  palette: {
    type: "dark",
    background: {
      paper: "#28282d",
      default: "#1e1e1e",
    },
    secondary: {
      main: "#1F8BFF",
    },
    bars: {
      default: "#FFC2E2",
      a: "#88A3FF",
      b: "#FF613D",
      c: "#FFED4B",
      d: "#8138EF",
      sorted: "#00DC80",
    },
  },
};
