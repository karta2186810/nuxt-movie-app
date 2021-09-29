export const filterMovies = (conditions, data) => {
  const filter = (conditions, data) => {
    return data.filter((item) => {
      return conditions.every((key) => item.genre_ids.includes(key * 1))
    })
  }
  return filter(conditions, data)
}
