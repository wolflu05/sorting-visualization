import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";

import { light, dark } from "../../util/theme";

interface ThemeProviderProps {
  theme: "dark" | "light";
  children: JSX.Element;
}

const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
  return (
    <MuiThemeProvider
      theme={theme === "dark" ? createMuiTheme(dark) : createMuiTheme(light)}
    >
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
