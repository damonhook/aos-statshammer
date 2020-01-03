import createPalette, { ColorPartial } from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface TypeBackground {
    error: string;
    nested: string;
  }

  interface PaletteOptions {
    graphs: {
      grid: string;
      axis: string;
      tooltip: string;
      series: string[];
    };
  }

  interface Palette {
    graphs: {
      grid: string;
      axis: string;
      tooltip: string;
      series: string[];
    };
  }
}
