<template>
  <div class="search">
    <input v-model="searchVal" type="text" @keyup.enter="searchMovie" />
    <button @click="searchMovie">搜尋</button>
    <div v-for="movie in movies" :key="movie.id">{{ movie.title }}</div>
    <button v-show="!isLastPage" @click="loadMore">load more</button>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      searchVal: '',
    }
  },
  async fetch() {
    await this.$store.dispatch('searchMovies', {
      query: this.searchVal || this.$route.query.query,
      genre: this.$route.query.genre,
    })
  },
  computed: {
    currentPage() {
      return this.$store.getters.getCurrentPage('search')
    },
    totalResults() {
      return this.$store.getters.getTotalResults('search')
    },
    movies() {
      return this.$store.getters.getMovies({ type: 'search' })
    },
    isLastPage() {
      return this.$store.getters.getIsLastPage('search')
    },
  },
  watch: {
    '$route.query': {
      handler() {
        this.$store.dispatch('searchMovies', {
          query: this.$route.query.query,
          genre: this.$route.query.genre,
        })
      },
    },
  },
  methods: {
    searchMovie() {
      this.$router.push(`/search?query=${this.searchVal}`)
    },
    loadMore() {
      this.$store.dispatch('searchMovies', {
        page: this.currentPage + 1,
        query: this.$route.query.query,
        genre: this.$route.query.genre,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.search {
  margin-top: $nav-height;
}
</style>
