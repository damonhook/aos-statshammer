import { LoremIpsum as Generator } from 'lorem-ipsum';

// eslint-disable-next-line import/prefer-default-export
export const loremIpsum = new Generator({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});
