import { arrToObj } from '../utils/arrToObj'
import http from '@/utils/http.js'
export const state = () => ({
  genres: {},
})

export const getters = {}

export const actions = {
  async fetchGenres({ state, commit }) {
    if (Object.keys(state.genres).length === 0) {
      let result
      try {
        result = await http.get('/genre/movie/list')
      } catch (e) {
        return Promise.reject(e)
      }
      commit('fetchGenres', result.data)

      return Promise.resolve(result)
    }
    return Promise.resolve()
  },
}

export const mutations = {
  fetchGenres(state, data) {
    state.genres = arrToObj(data.genres)
  },
  searchMovies(state, { data, genre, query }) {
    const search = state.search

    // 字串或類別發生變化，清空data
    if (search.genre !== genre || search.query !== query) {
      search.data = [...data.results]
    } else {
      search.data = [...search.data, ...data.results]
    }

    search.currentPage = data.page * 1
    search.totalResults = data.total_results * 1
    search.query = query
    search.genre = genre
  },
  getMovieDetail(state, { data, id }) {},
}
