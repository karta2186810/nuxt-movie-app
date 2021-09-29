import _ from 'lodash'
import { arrToObj } from '../utils/arrToObj'
import http from '@/utils/http.js'

export const state = () => ({
  data: {},
  searchData: [],
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
  getMovies:
    (state) =>
    ({ type, sortBy = 'popularity' }) => {
      const result = []
      state[type].loaded.forEach((key) => {
        result.push(state.data[key])
      })
      switch (sortBy) {
        case 'popularity':
          result.sort((a, b) => b.popularity - a.popularity)
          break
        case 'popularity-reverse':
          result.sort((a, b) => a.popularity - b.popularity)
          break
        case 'rated':
          result.sort((a, b) => b.vote_average - a.vote_average)
          break
        case 'rated-reverse':
          result.sort((a, b) => a.vote_average - b.vote_average)
          break
        case 'release-date':
          result.sort(
            (a, b) =>
              new Date(b.release_date).getTime() -
              new Date(a.release_date).getTime()
          )
          break
        case 'release-date-reverse':
          result.sort(
            (a, b) =>
              new Date(a.release_date).getTime() -
              new Date(b.release_date).getTime()
          )
          break
      }

      return result
    },
}

export const actions = {
  async fetchMovies({ state, commit }, { type, page = 1, region = 'TW' }) {
    if (state[type].currentPage < page) {
      const map = {
        nowPlaying: 'now_playing',
        popular: 'popular',
        topRated: 'top_rated',
        upcoming: 'upcoming',
      }

      let result
      try {
        result = await http.get(
          `movie/${map[type]}?page=${page}&region=${region}`
        )
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
