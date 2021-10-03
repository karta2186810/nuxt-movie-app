<template>
  <div class="movies section">
    <div class="container">
      <div class="movies-heading">
        <h2 class="movies-title">{{ title }}</h2>
      </div>
      <div class="content flex">
        <SearchPanel :movie-type="$route.params.movieType" />
        <MovieList
          :movies="movies"
          :current-page="currentPage"
          :is-last-page="isLastPage"
          :total-results="totalResults"
          :movie-type="$route.params.movieType"
          :loading="$fetchState.pending"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Movies',
  scrollToTop: false,
  async fetch() {
    await this.$store.dispatch('fetchMovies', {
      type: this.$route.params.movieType,
      conditions: {
        sortBy:
          this.$route.params.movieType === 'topRated'
            ? 'vote_average.desc'
            : 'popularity.desc',
        voteCount: this.$route.params.movieType === 'topRated' ? '500' : '',
      },
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
