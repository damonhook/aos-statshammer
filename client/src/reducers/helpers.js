/* eslint-disable import/prefer-default-export */
export const updateItemInArray = (array, index, callback) => array.map((item, i) => {
  if (i === index) {
    return callback(item);
  }
  return item;
});
