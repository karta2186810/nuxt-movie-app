<template>
  <div class="movie-detail">
    {{ movie.title }}
  </div>
</template>

<script>
import http from '@/utils/http.js'
export default {
  name: 'MovieDetail',
  data() {
    return {
      movie: {},
    }
  },
  async fetch() {
    const result = await http.get(`movie/${this.$route.params.id}`)
    this.movie = result.data
  },
  computed: {
    genres() {
      return this.$store.getters.getGenres
    },
  },
}
</script>

<style lang="scss" scoped>
.movie-detail {
  margin-top: $nav-height;
}
</style>
