import createPalette, { ColorPartial } from '@material-ui/core/styles/createPalette'

declare module '@material-ui/core/styles/createPalette' {
  interface TypeBackground {
    error: string
    nested: string
  }

  interface CustomPalette {
    graphs: {
      grid: string
      axis: string
      tooltip: string
      series: string[]
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface PaletteOptions extends CustomPalette {}

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Palette extends CustomPalette {}
}
