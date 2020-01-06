export const updateItemInArray = (array, index, callback) =>
  array.map((item, i) => {
    if (i === index) {
      return callback(item);
    }
    return item;
  });

export const moveItemInArray = (
  array: any[],
  index: number,
  newIndex: number,
  callback: (data: any[]) => void,
) => {
  const newArray = array.slice();
  const sanitizedNewIndex = Math.min(Math.max(newIndex, 0), array.length - 1);
  newArray.splice(sanitizedNewIndex, 0, ...newArray.splice(index, 1));
  return callback(newArray);
};
