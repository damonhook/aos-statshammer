export const startWithUppercase = (str: string) => (str ? str[0].toUpperCase() + str.slice(1) : str)

export const titleCase = (str: string) => {
  var words = str
    .toLowerCase()
    .split(' ')
    .map(w => startWithUppercase(w))
  return words.join(' ')
}

export const removeEmpty = (obj: Record<string, any>) => {
  let finalObj: Record<string, any> = {}
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') {
      const nestedObj = removeEmpty(obj[key])
      if (Object.keys(nestedObj).length) {
        finalObj[key] = nestedObj
      }
    } else if (obj[key] !== '' && obj[key] !== undefined && obj[key] !== null) {
      finalObj[key] = obj[key]
    }
  })
  return finalObj
}
