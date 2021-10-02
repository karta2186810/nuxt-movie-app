export const formatDate = (dateObj) => {
  return [
    dateObj.getFullYear(),
    ('0' + (dateObj.getMonth() + 1)).slice(-2),
    ('0' + dateObj.getDate()).slice(-2),
  ].join('-')
}
