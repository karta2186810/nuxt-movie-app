<template>
  <div class="home">
    <Hero />
    <div class="movie-cards-container">
      <MovieCards
        id="nowPlaying"
        title="現正熱映"
        link-to="nowPlaying"
        :data="nowPlaying.slice(0, 10)"
      />
      <MovieCards
        title="熱門電影"
        link-to="popular"
        :data="popular.slice(0, 10)"
      />
      <MovieCards
        title="最高評分"
        link-to="topRated"
        :data="topRated.slice(0, 10)"
      />
      <MovieCards
        title="即將上映"
        link-to="upcoming"
        :data="upcoming.slice(0, 10)"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  async fetch() {
    await this.$store.dispatch('fetchMovies', { type: 'nowPlaying', page: 1 })
    await this.$store.dispatch('fetchMovies', { type: 'topRated', page: 1 })
    await this.$store.dispatch('fetchMovies', { type: 'popular', page: 1 })
    await this.$store.dispatch('fetchMovies', { type: 'upcoming', page: 1 })
  },
  computed: {
    ...mapGetters({
      nowPlaying: 'getNowPlaying',
      topRated: 'getTopRated',
      popular: 'getPopular',
      upcoming: 'getUpcoming',
    }),
  },
}
</script>

<style lang="scss" scoped>
.movie-cards-container {
  padding-top: 120px;
  background-color: $black-color;
}
</style>
