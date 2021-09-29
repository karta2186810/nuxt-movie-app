<template>
  <div>
    <div v-for="movie in movies" :key="movie.id">{{ movie.title }}</div>
    {{ currentPage }}
  </div>
</template>

<script>
export default {
  name: 'Upcoming',
  async fetch() {
    await this.$store.dispatch('fetchMovies', { type: 'upcoming' })
  },
  computed: {
    movies() {
      return this.$store.getters.getMovies('upcoming')
    },
    currentPage() {
      return this.$store.getters.getCurrentPage('upcoming')
    },
    totalResults() {
      return this.$store.getters.getTotalResults('upcoming')
    },
  },
}
</script>

<style lang="scss" scoped>
* {
  color: black;
}
</style>
