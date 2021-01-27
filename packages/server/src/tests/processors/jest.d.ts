namespace jest {
  interface Matchers<R> {
    toBeWithinDeviation(expected: number, deviation?: number): R
  }
}
