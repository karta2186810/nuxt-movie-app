<template>
  <div class="movies">
    <div class="container">
      <div class="movies-heading">
        <h2>{{ title }}</h2>
      </div>
      <div class="content flex">
        <SearchPanel
          :movie-type="$route.params.movieType"
          @sortByChange="handleSortBy"
          @genreSearch="handleGenreSearch"
        />
        <div class="movie-list">
          <div v-for="movie in movies" :key="movie.id">{{ movie.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieList',
  data() {
    return {
      sortBy: 'release-date',
      selectedGenres: [],
    }
  },
  async fetch() {
    await this.$store.dispatch('fetchMovies', {
      type: this.$route.params.movieType,
    })
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
    movies() {
      return this.$store.getters.getMovies({
        type: this.$route.params.movieType,
        sortBy: this.sortBy,
        conditions: this.selectedGenres,
      })
    },
    currentPage() {
      return this.$store.getters.getCurrentPage(this.$route.params.movieType)
    },
    totalResults() {
      return this.$store.getters.getTotalResults(this.$route.params.movieType)
    },
  },
  created() {
    if (this.$route.params.movieType === 'topRated') {
      this.sortBy = 'rated'
    }
  },
  methods: {
    handleSortBy(value) {
      this.sortBy = value
    },
    handleGenreSearch(selectedGenres) {
      this.selectedGenres = selectedGenres
    },
  },
}
</script>

<style lang="scss" scoped>
.movies {
  background-color: $black-color;
  width: 100%;
  height: auto;
  color: $text-white;
  padding-top: $nav-height;
}
</style>
