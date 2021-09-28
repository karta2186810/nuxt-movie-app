import _ from 'lodash'
import { arrToObj } from '../utils/arrToObj'
import http from '@/utils/http.js'

export const state = () => ({
  data: {},
  nowPlaying: {
    currentPage: 0,
    totalPages: 0,
    totalResults: 0,
    loaded: [],
  },
  popular: {
    currentPage: 0,
    totalPages: 0,
    totalResults: 0,
    loaded: [],
  },
  topRated: {
    currentPage: 0,
    totalPages: 0,
    totalResults: 0,
    loaded: [],
  },
  upcoming: {
    currentPage: 0,
    totalPages: 0,
    totalResults: 0,
    loaded: [],
  },
})

export const getters = {
  getCurrentPage: (state) => (type) => {
    return state[type].currentPage
  },
  getTotalPages: (state) => (type) => {
    return state[type].totalPages
  },
  getMovies: (state) => (type) => {
    const result = []
    state[type].loaded.forEach((key) => {
      result.push(state.data[key])
    })
    return result
  },
}

export const actions = {
  async fetchMovies({ state, commit }, { type, page }) {
    if (state[type].currentPage < page) {
      const map = {
        nowPlaying: 'now_playing',
        popular: 'popular',
        topRated: 'top_rated',
        upcoming: 'upcoming',
      }

      let result
      try {
        result = await http.get(`movie/${map[type]}?page=${page}`)
      } catch (e) {
        return Promise.reject(e)
      }

      commit('fetchMovies', { data: result.data, type })

      return Promise.resolve(result)
    }
    return Promise.resolve()
  },
  // getMovieDetail({ state, commit }, { id, type }) {
  //   const currentMovie = state[type].data[id]
  //   if (!currentMovie || !currentMovie.imdb_id) {
  //     http
  //       .get(`/movie/${id}`)
  //       .then((res) => {
  //         commit('getMovieDetail', { data: res.data, id })
  //       })
  //       .then(() => {
  //         http.get(`/movie/${id}/videos`).then((res) => {
  //           commit('getVideos', { data: res.data, id })
  //         })
  //         http.get(`/movie/${id}/images`).then((res) => {
  //           commit('getImages', { data: res.data, id })
  //         })
  //       })
  //   }
  // },
}

export const mutations = {
  fetchMovies(state, { data, type }) {
    const currentType = state[type]
    const dataObj = arrToObj(data.results)
    const newData = { ...dataObj, ...state.data }
    state.data = newData
    currentType.currentPage = data.page * 1
    currentType.totalPages = data.total_pages * 1
    currentType.totalResults = data.total_results * 1
    currentType.loaded = _.uniq([
      ...currentType.loaded,
      ...Object.keys(dataObj),
    ])
  },
  getMovieDetail(state, { data, id }) {},
}
