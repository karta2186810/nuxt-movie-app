<template>
  <form class="search-panel" @submit="handleSearch">
    <div class="sort-by card">
      <div class="input-title" @click="showSortBy">
        排序
        <i class="ri-arrow-right-s-line" :class="{ open: sortByShow }"></i>
      </div>
      <select
        v-model="conditions.sortBy"
        class="sort-by-select input-section"
        :class="{ mobileShow: sortByShow }"
      >
        <option value="popularity.desc">依照人氣降序</option>
        <option value="popularity.asc">依照人氣升序</option>
        <option value="vote_average.desc">依照評分降序</option>
        <option value="vote_average.asc">依照評分升序</option>
        <option value="release_date.desc">依照日期降序</option>
        <option value="release_date.asc">依照日期升序</option>
      </select>
    </div>
    <div class="genres card">
      <div class="input-title" @click="showFilter">
        篩選
        <i class="ri-arrow-right-s-line" :class="{ open: filterShow }"></i>
      </div>
      <div class="input-section" :class="{ mobileShow: filterShow }">
        <div class="genre-group flex">
          <div v-for="genre in genreList" :key="genre.id">
            <label
              :for="genre.id"
              class="genre"
              :class="{ isChecked: isChecked(genre.id) }"
              >{{ genre.name }}</label
            >
            <input
              :id="genre.id"
              v-model="conditions.genres"
              :value="genre.id"
              type="checkbox"
            />
          </div>
        </div>
      </div>
    </div>
    <button
      class="search-btn btn-primary"
      :class="{ disabled: !conditionChanged }"
    >
      搜尋
    </button>
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
      sortByShow: false,
      filterShow: false,
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
    isChecked(value) {
      return this.conditions.genres.includes(value)
    },
    showFilter() {
      this.filterShow = !this.filterShow
    },
    showSortBy() {
      this.sortByShow = !this.sortByShow
    },
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
  position: sticky;
  top: $nav-height + 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  row-gap: 16px;
  @media screen and (max-width: 1140px) {
    position: static;
    font-size: 20px;
  }
  .input-title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 12px;
    font-weight: 700;
    border-bottom: 1px solid $primary-color;
    @media screen and (max-width: 1140px) {
      border: none;
      padding: 6px 0;
    }
    i {
      display: none;
      transition: 0.3s;
      &.open {
        transform: rotate(90deg);
      }
      @media screen and (max-width: 1140px) {
        display: block;
      }
    }
  }
  .input-section {
    margin-top: 12px;
    width: 100%;
    @media screen and (max-width: 1140px) {
      display: none;
    }
    &.mobileShow {
      @media screen and (max-width: 1140px) {
        display: block;
      }
    }
  }
  .sort-by {
    width: 100%;
    padding: 12px;
    .sort-by-select {
      border-radius: 4px;
      padding: 8px;
      outline: none;
      cursor: pointer;
      border: none;
    }
  }
  .genres {
    width: 100%;
    padding: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .genre-group {
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
      input[type='checkbox'] {
        display: none;
      }
      .genre {
        display: block;
        background-color: $black-color-alt;
        color: $text-white;
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        &.isChecked {
          background-color: $primary-color;
          color: $text-black;
        }
      }
    }
  }
  .search-btn {
    width: 100%;
    padding: 8px 16px;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 1px;
    &.disabled {
      background-color: $black-color-alt;
      pointer-events: none;
    }
  }
}
</style>
