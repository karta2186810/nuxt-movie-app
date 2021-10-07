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
}
