export const arrToObj = (arr) => {
  const result = {}
  arr.forEach((item) => {
    result[item.id] = item
  })
  return result
}
