<template>
  <div class="movies section">
    <div class="container">
      <div class="movies-heading">
        <h2 class="movies-title">{{ title }}</h2>
      </div>
      <div class="content flex">
        <SearchPanel
          :movie-type="$route.params.movieType"
          :sort-by="conditions.sortBy"
          :genres="conditions.genres"
          :condition-changed="conditionChanged"
          @changeGenre="changeGenre"
          @changeSortBy="changeSortBy"
          @search="search"
        />
        <MovieList
          :movies="movies"
          :is-last-page="isLastPage"
          :loading="$fetchState.pending || loading"
          @load-more="handleLoadMore"
        />
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/utils/http.js'
import { formatDate } from '@/utils/formatDate.js'
export default {
  name: 'Movies',
  data() {
    return {
      conditionChanged: true,
      conditions: {
        sortBy: 'popularity.desc',
        genres: [],
      },
      voteCount: '',
      currentPage: 1,
      totalResults: 0,
      movies: [],
      loading: false,
    }
  },
  async fetch() {
    const result = await this.fetchMovies()
    const data = result.data
    this.movies = data.results
    this.currentPage = data.page
    this.totalResults = data.total_results
  },
  computed: {
    title() {
      const map = {
        nowPlaying: '現正熱映',
        popular: '熱門電影',
        upcoming: '即將上映',
        topRated: '最高評分',
      }
      return map[this.$route.params.movieType]
    },
    isLastPage() {
      return this.totalResults === this.movies.length
    },
    releaseDateGte() {
      const type = this.$route.params.movieType
      if (type === 'nowPlaying') {
        const dateObj = new Date()
        dateObj.setDate(dateObj.getDate() - 31)
        return formatDate(dateObj)
      } else if (type === 'upcoming') {
        return formatDate(new Date())
      }
      return ''
    },
    releaseDateLte() {
      const type = this.$route.params.movieType
      if (type === 'nowPlaying') {
        return formatDate(new Date())
      }
      return ''
    },
  },
  watch: {
    conditions: {
      handler() {
        this.conditionChanged = true
      },
      deep: true,
    },
  },
  created() {
    const type = this.$route.params.movieType
    if (type === 'topRated') {
      this.conditions.sortBy = 'vote_average.desc'
      this.voteCount = '500'
    }
  },
  methods: {
    async fetchMovies(page = 1) {
      this.loading = true
      const result = await http.get('discover/movie', {
        params: {
          sort_by: this.conditions.sortBy,
          page,
          'release_date.gte': this.releaseDateGte,
          'release_date.lte': this.releaseDateLte,
          release_type: '2|3',
          with_genres: this.conditions.genres.join(','),
          vote_count: this.voteCount,
        },
      })
      this.loading = false
      return result
    },
    async handleLoadMore() {
      const result = await this.fetchMovies(this.currentPage + 1)
      const data = result.data
      this.movies = [...this.movies, ...data.results]
      this.currentPage = data.page
      this.totalResults = data.total_results
    },
    async search() {
      const result = await this.fetchMovies()
      const data = result.data
      this.movies = [...data.results]
      this.currentPage = data.page
      this.totalResults = data.total_results
      this.conditionChanged = false
      window.scrollTo(0, 0)
    },
    changeSortBy(sortBy) {
      this.conditions.sortBy = sortBy
    },
    changeGenre(seletedGenres) {
      this.conditions.genres = seletedGenres
    },
  },
}
</script>

<style lang="scss" scoped deep>
.movies {
  background-color: $black-color;
  width: 100%;
  height: auto;
  color: $text-white;
  .container {
    .movies-heading {
      margin-bottom: 24px;
      .movies-title {
        font-size: 32px;
        font-weight: 900;
        position: relative;
        padding-left: 16px;
        &::before {
          content: '';
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
          background-color: $primary-color;
          border-radius: 4px;
        }
      }
    }
    .content {
      align-items: start;
      @media screen and (max-width: 1140px) {
        flex-direction: column;
        align-items: stretch;
      }
    }
  }
}
</style>
