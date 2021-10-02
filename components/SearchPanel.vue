<template>
  <form class="search-panel" @submit="handleSearch">
    <select v-model="conditions.sortBy">
      <option value="popularity.desc">依照人氣降序</option>
      <option value="popularity.asc">依照人氣升序</option>
      <option value="vote_average.desc">依照評分降序</option>
      <option value="vote_average.asc">依照評分升序</option>
      <option value="release_date.desc">依照日期降序</option>
      <option value="release_date.asc">依照日期升序</option>
    </select>
    <div v-for="genre in genreList" :key="genre.id" class="genre">
      <label :for="genre.id">{{ genre.name }}</label>
      <input
        :id="genre.id"
        v-model="conditions.genres"
        :value="genre.id"
        type="checkbox"
      />
    </div>
    <button>搜尋</button>
  </form>
</template>

<script>
export default {
  name: 'SearchPanel',
  props: {
    movieType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      conditionChanged: false,
      conditions: {
        genres: [],
        sortBy: 'popularity.desc',
      },
    }
  },
  async fetch() {
    await this.$store.dispatch('fetchGenres')
  },
  computed: {
    genreList() {
      return this.$store.state.genres
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
    if (this.movieType === 'topRated') {
      this.conditions.sortBy = 'vote_average.desc'
    }
  },
  methods: {
    handleSearch(e) {
      e.preventDefault()
      this.$store.dispatch('fetchMovies', {
        type: this.movieType,
        conditionChanged: this.conditionChanged,
        conditions: this.conditions,
      })
      this.conditionChanged = false
    },
  },
}
</script>

<style lang="scss" scoped>
.search-panel {
  flex: 1;
  height: 300px;
  background-color: skyblue;
  position: sticky;
  top: $nav-height;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>
