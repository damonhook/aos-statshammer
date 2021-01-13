export const startWithUppercase = (str: string) => (str ? str[0].toUpperCase() + str.slice(1) : str)

export const titleCase = (str: string) => {
  var words = str
    .toLowerCase()
    .split(' ')
    .map(w => startWithUppercase(w))
  return words.join(' ')
}
