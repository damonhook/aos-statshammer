export const startWithUppercase = (str: string) => (str ? str[0].toUpperCase() + str.slice(1) : str)

export const titleCase = (str: string) => {
  const words = str
    .toLowerCase()
    .split(' ')
    .map(w => startWithUppercase(w))
  return words.join(' ')
}

export const splitString = (value: string, maxLineLength: number = 15, maxLines: number = 2) => {
  const lengthOfEllipsis = 3
  let trimLength = maxLineLength * maxLines - lengthOfEllipsis
  if (value.length - trimLength > 0 && value.length - trimLength <= lengthOfEllipsis)
    trimLength += lengthOfEllipsis
  const trimWordsOverLength = new RegExp(`^(.{${trimLength}}[^\\w]*).*`)
  const groupWordsByLength = new RegExp(`([^\\s].{0,${maxLineLength}}(?=[\\s\\W]|$))`, 'gm')
  const splitValues = value.replace(trimWordsOverLength, '$1...').match(groupWordsByLength)
  return splitValues ?? ['']
}

export const removeEmpty = (obj: Record<string, any>) => {
  const finalObj: Record<string, any> = {}
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

export const getLoopingArray = (orig: any[], length: number) => {
  const newList = new Array(Math.floor(length / orig.length)).fill(orig).flat()
  newList.push(...orig.slice(0, length % orig.length))
  return newList
}

export const updateItemInArray = <T>(array: T[], index: number, callback: (data: T) => void) =>
  array.map((item, i) => (i === index ? callback(item) : item))

export const moveItemInArray = <T>(
  array: T[],
  index: number,
  newIndex: number,
  callback?: (arr: T[]) => void
) => {
  const newArray = array.slice()
  const sanitizedNewIndex = Math.min(Math.max(newIndex, 0), array.length - 1)
  newArray.splice(sanitizedNewIndex, 0, ...newArray.splice(index, 1))
  if (callback) callback(newArray)
  return newArray
}
