// eslint-disable-next-line @typescript-eslint/no-unused-vars
import createMixins from '@material-ui/core/styles/createMixins';

declare module '@material-ui/core/styles/createMixins' {
  interface CustomMixins {
    drawer: {
      width: number;
      miniWidth: number;
    };
  }

  interface MixinsOptions extends CustomMixins {}

  interface Mixins extends CustomMixins {}
}
