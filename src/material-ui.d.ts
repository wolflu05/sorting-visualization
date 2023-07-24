/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PaletteOptions,
  Palette,
} from "@material-ui/core/styles/createPalette";
import { HiddenProps } from "@material-ui/core/Hidden";
/* eslint-enable @typescript-eslint/no-unused-vars */

declare module "@material-ui/core/styles/createPalette" {
  export interface PaletteOptions {
    bars: {
      default: string;
      a: string;
      b: string;
      c: string;
      d: string;
      sorted: string;
    };
  }
  export interface Palette extends PaletteOptions {}
}

declare module "@material-ui/core/Hidden" {
  export interface HiddenProps {
    children: JSX.Element | JSX.Element[];
  }
}
