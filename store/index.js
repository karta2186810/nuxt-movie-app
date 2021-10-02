import { arrToObj } from '../utils/arrToObj'
import http from '@/utils/http.js'
import { formatDate } from '@/utils/formatDate.js'
export const state = () => ({
  genres: {},
  searchData: [],
  nowPlaying: {
    currentPage: 0,
    totalResults: 0,
    conditions: {},
    data: [],
  },
  popular: {
    currentPage: 0,
    totalResults: 0,
    data: [],
    conditions: {},
  },
  topRated: {
    currentPage: 0,
    totalResults: 0,
    data: [],
    conditions: {},
  },
  upcoming: {
    currentPage: 0,
    totalResults: 0,
    data: [],
    conditions: {},
  },
})

export const getters = {
  getCurrentPage: (state) => (type) => {
    return state[type].currentPage
  },
  getTotalResults: (state) => (type) => {
    return state[type].totalResults
  },
  getMovies:
    (state) =>
    ({ type }) => {
      return state[type].data
    },
  getIsLastPage: (state) => (type) => {
    const currentType = state[type]
    return currentType.data.length === currentType.totalResults
  },
}

export const actions = {
  async fetchMovies(
    { state, commit },
    { type, page = 1, conditionChanged = false, conditions }
  ) {
    // 當前數據類型
    const currentType = state[type]

    // 時間範圍
    let releaseDateGte = ''
    let releaseDateLte = ''

    // 過濾條件初始化
    if (!conditions) conditions = currentType.conditions
    const { genres, sortBy, fromDate, untilDate } = conditions

    let result

    // 依照類型設定時間範圍
    if (fromDate) {
      releaseDateGte = fromDate
    } else if (type === 'nowPlaying') {
      const dateObj = new Date()
      dateObj.setDate(dateObj.getDate() - 31)
      releaseDateGte = formatDate(dateObj)
    } else if (type === 'upcoming') {
      releaseDateGte = formatDate(new Date())
    }
    if (untilDate) {
      releaseDateLte = untilDate
    } else if (type === 'nowPlaying') {
      releaseDateLte = formatDate(new Date())
    }

    // 發送請求
    if (currentType.currentPage < page || conditionChanged) {
      try {
        result = await http.get('discover/movie', {
          params: {
            sort_by: sortBy,
            page,
            'release_date.gte': releaseDateGte,
            'release_date.lte': releaseDateLte,
            with_genres: genres && genres.join(','),
          },
        })
      } catch (e) {
        return Promise.reject(e)
      }

      commit('fetchMovies', {
        type,
        data: result.data,
        conditionChanged,
        conditions,
      })

      return Promise.resolve(result)
    }
    return Promise.resolve()
  },
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
  async discoverMovies({ state, commit }, { type, page = 1, genres = [] }) {},
}

export const mutations = {
  fetchMovies(state, { data, type, conditionChanged, conditions }) {
    const currentType = state[type]
    if (conditionChanged) {
      currentType.data = [...data.results]
    } else {
      currentType.data = [...currentType.data, ...data.results]
    }
    currentType.currentPage = data.page
    currentType.totalResults = data.total_results
    currentType.conditions = { ...conditions }
  },
  fetchGenres(state, data) {
    state.genres = arrToObj(data.genres)
  },
  getMovieDetail(state, { data, id }) {},
}
