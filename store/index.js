import axios from 'axios'
import { arrToObj } from '../utils/arrToObj'
axios.defaults.baseURL = 'https://api.themoviedb.org/3/'

axios.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: 'a6ea09492bb176ba23fdf9847c57b825',
    language: 'zh-TW',
  }
  return config
})

export const state = () => ({
  data: {},
  nowPlaying: {
    currentPage: 0,
    totalPages: 0,
    totalResults: 0,
    loaded: [],
  },
  latest: {
    currentPage: 0,
    totalPages: 0,
    totalResults: 0,
    loaded: [],
  },
  papular: {
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
    const currentType = state[type]
    const result = []
    currentType.loaded.forEach((id) => {
      result.push(state.data[id])
    })
    return result
  },
}

export const actions = {
  getMovies({ state, commit }, { type, page }) {
    let reqType = ''
    switch (type) {
      case 'nowPlaying':
        reqType = 'now_playing'
        break
      case 'latest':
        reqType = 'latest'
        break
      case 'papular':
        reqType = 'papular'
        break
      case 'topRated':
        reqType = 'topRated'
        break
      case 'upcoming':
        reqType = 'upcoming'
        break
    }
    return new Promise(() => {
      axios.get(`/movie/${reqType}?page=${page}`)
    }).then((res) => {
      commit('getMovies', { type, data: res.data })
    })
  },
  getMovieDetail({ state, commit }, { id, type }) {
    const currentMovie = state[type].data[id]
    if (!currentMovie || !currentMovie.imdb_id) {
      axios
        .get(`/movie/${id}`)
        .then((res) => {
          commit('getMovieDetail', { data: res.data, id })
        })
        .then(() => {
          axios.get(`/movie/${id}/videos`).then((res) => {
            commit('getVideos', { data: res.data, id })
          })
          axios.get(`/movie/${id}/images`).then((res) => {
            commit('getImages', { data: res.data, id })
          })
        })
    }
  },
}

export const mutations = {
  getMovies(state, { data, type }) {
    const currentType = state[type]
    state.data = { ...arrToObj(data.results), ...state.data }
    currentType.currentPage = data.page
    currentType.totalPages = data.total_pages
    currentType.totalResults = data.total_results
  },
  getMovieDetail(state, { data, id }) {},
}
