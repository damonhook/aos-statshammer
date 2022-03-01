import humps from 'humps'

export const capitalizeFirstLetter = ([first, ...rest]: string, locale = navigator.language) =>
  first.toLocaleUpperCase(locale) + rest.join('')

export const humanize = (str: string, startWithUppercase: boolean = false) => {
  const formatted = humps.decamelize(str, { separator: ' ' }).replaceAll('_', ' ')
  return startWithUppercase ? capitalizeFirstLetter(formatted) : formatted
}
