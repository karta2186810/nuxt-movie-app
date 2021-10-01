<template>
  <div class="search-panel">
    <form class="sort-by">
      <select @change="handleSortBy">
        <option value="popularity">依照人氣降序</option>
        <option value="popularity-reverse">依照人氣升序</option>
        <option value="rated" :selected="$props.movieType === 'topRated'">
          依照評分降序
        </option>
        <option value="rated-reverse">依照評分升序</option>
        <option value="release-date">依照日期降序</option>
        <option value="release-date-reverse">依照日期升序</option>
      </select>
    </form>
    <form class="genres-list" @submit.prevent.stop="handleGenreSearch">
      <div v-for="genre in genreList" :key="genre.id" class="genre">
        <label :for="genre.id">{{ genre.name }}</label>
        <input
          :id="genre.id"
          v-model="selectedGenres"
          type="checkbox"
          :value="genre.id"
        />
      </div>
      <button>搜尋類別</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SearchPanel',
  props: {
    movieType: {
      type: String,
      default: 'nowPlaying',
    },
    queryGenre: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selectedGenres: [],
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
  created() {
    if (this.queryGenre) {
      this.selectedGenres = [this.queryGenre]
    }
  },
  methods: {
    handleSortBy(e) {
      const value = e.target.value
      this.$emit('sortByChange', value)
    },
    handleGenreSearch(e) {
      this.$emit('genreSearch', this.selectedGenres)
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
}
</style>
