<template>
  <div class="nowPlaying">
    <div class="container">
      <div class="movies-heading">
        <h2>{{ title }}</h2>
      </div>
      <div v-for="movie in movies" :key="movie.id">
        {{ movie.title }}--{{ movie.vote_average }}
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
}
</script>

<style lang="scss" scoped>
.nowPlaying {
  background-color: $black-color;
  width: 100%;
  height: auto;
  color: $text-white;
  padding-top: $nav-height;
}
</style>
