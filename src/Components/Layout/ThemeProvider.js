import React from 'react';

import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';

import { light, dark } from '../../util/theme';

const ThemeProvider = ({ theme, children }) => {
  return (
    <MuiThemeProvider
      theme={theme ? createMuiTheme(dark) : createMuiTheme(light)}
    >
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
