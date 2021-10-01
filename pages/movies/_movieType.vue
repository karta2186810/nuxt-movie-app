<template>
  <div class="movies">
    <div class="container">
      <div class="movies-heading">
        <h2 class="movies-title">{{ title }}</h2>
      </div>
      <div class="content flex">
        <SearchPanel
          :movie-type="$route.params.movieType"
          :query-genre="$route.query.genre"
          @sortByChange="handleSortBy"
          @genreSearch="handleGenreSearch"
        />
        <MovieList :movies="movies" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Movies',
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
    isLastPage() {
      return this.$store.getters.getIsLastPage(this.$route.params.movieType)
    },
  },
  created() {
    if (this.$route.params.movieType === 'topRated') {
      this.sortBy = 'rated'
    }
    if (this.$route.query.genre) {
      this.selectedGenres = [this.$route.query.genre]
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

<style lang="scss" scoped deep>
.movies {
  background-color: $black-color;
  width: 100%;
  height: auto;
  min-height: 100vh;
  color: $text-white;
  padding-top: $nav-height;
  .container {
    padding-top: 40px;
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
  }
}
</style>
