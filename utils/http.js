import axios from 'axios'

const http = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
})

http.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: 'a6ea09492bb176ba23fdf9847c57b825',
    language: 'zh-TW',
    include_adult: false,
    region: 'TW',
  }
  return config
})

export default http
