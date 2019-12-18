import { Font } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://github.com/google/fonts/blob/master/apache/roboto/Roboto-Regular.ttf' },
    { src: 'https://github.com/google/fonts/blob/master/apache/roboto/Roboto-Bold.ttf', fontWeight: 'bold' },
  ],
});
