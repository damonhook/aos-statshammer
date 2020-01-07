// eslint-disable-next-line @typescript-eslint/no-unused-vars
import createPalette, { ColorPartial } from '@material-ui/core/styles/createPalette';
import { TNotificationVariants } from 'types/notification';

declare module '@material-ui/core/styles/createPalette' {
  interface TypeBackground {
    error: string;
    nested: string;
  }

  interface CustomPalette {
    graphs: {
      grid: string;
      axis: string;
      tooltip: string;
      series: string[];
    };
    notifications: {
      [V in TNotificationVariants]: string;
    };
  }

  interface PaletteOptions extends CustomPalette {}

  interface Palette extends CustomPalette {}
}
