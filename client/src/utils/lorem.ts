import { LoremIpsum as Generator } from 'lorem-ipsum';

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
