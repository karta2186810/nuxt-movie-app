<template>
  <form class="search-panel" @submit="search">
    <Card class="sort-by pa-12 mb-16">
      <div class="search-title" @click="showSortBy">
        排序
        <i
          class="ri-arrow-right-s-line search-title__icon"
          :class="{ open: sortByShow }"
        ></i>
      </div>
      <select
        :value="sortBy"
        class="sort-by__input search-field fw-500"
        :class="{ mobileShow: sortByShow }"
        @change="changeSortBy"
      >
        <option value="popularity.desc">依照人氣降序</option>
        <option value="popularity.asc">依照人氣升序</option>
        <option value="vote_average.desc">依照評分降序</option>
        <option value="vote_average.asc">依照評分升序</option>
        <option value="release_date.desc">依照日期降序</option>
        <option value="release_date.asc">依照日期升序</option>
      </select>
    </Card>
    <Card class="filter mb-16">
      <div class="search-title" @click="showFilter">
        篩選
        <i
          class="ri-arrow-right-s-line search-title__icon"
          :class="{ open: filterShow }"
        ></i>
      </div>
      <div class="search-field" :class="{ mobileShow: filterShow }">
        <div class="genres">
          <div v-for="genre in genreList" :key="genre.id" class="genre">
            <label
              :for="genre.id"
              class="genre__label"
              :class="{ isChecked: isChecked(genre.id) }"
              >{{ genre.name }}</label
            >
            <input
              :id="genre.id"
              v-model="selectedGenres"
              class="genre__input"
              :value="genre.id"
              type="checkbox"
              @change="$emit('changeGenre', selectedGenres)"
            />
          </div>
        </div>
      </div>
    </Card>
    <Button
      class="search-btn"
      :type="!conditionChanged ? 'disabled' : 'primary'"
    >
      搜尋
    </Button>
  </form>
</template>

<script>
export default {
  name: 'SearchPanel',
  props: {
    sortBy: {
      type: String,
      default: 'popularity.desc',
    },
    genres: {
      type: Array,
      default() {
        return []
      },
    },
    conditionChanged: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      sortByShow: false,
      filterShow: false,
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
  methods: {
    isChecked(value) {
      return this.genres.includes(value)
    },
    showFilter() {
      this.filterShow = !this.filterShow
    },
    showSortBy() {
      this.sortByShow = !this.sortByShow
    },
    search(e) {
      e.preventDefault()
      this.$emit('search')
    },
    changeSortBy(e) {
      this.$emit('changeSortBy', e.target.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.search-panel {
  width: 240px;
  position: sticky;
  top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 1024px) {
    width: 100%;
    position: static;
    font-size: 20px;
  }
}
.search-title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 12px;
  font-weight: 700;
  border-bottom: 1px solid $primary;
  @media (max-width: 1024px) {
    border: none;
    padding: 6px 0;
  }
  @media (max-width: 768px) {
    font-size: 16px;
  }
  &__icon {
    display: none;
    transition: 0.3s;
    &.open {
      transform: rotate(90deg);
    }
    @media (max-width: 1024px) {
      display: block;
    }
  }
}

.search-field {
  margin-top: 12px;
  width: 100%;
  @media (max-width: 1024px) {
    display: none;
  }
  &.mobileShow {
    @media (max-width: 1024px) {
      display: block;
    }
  }
}

.sort-by {
  width: 100%;
  &__input {
    border-radius: 4px;
    padding: 8px;
    outline: none;
    cursor: pointer;
    border: none;
  }
}

.filter {
  width: 100%;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.genres {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.genre {
  &__input {
    display: none;
  }
  &__label {
    display: block;
    background-color: $black-alt;
    color: $white;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    @media (max-width: 1024px) {
      padding: 12px 24px;
    }
    &.isChecked {
      background-color: $primary;
      color: $text-black;
    }
  }
}

.search-btn {
  width: 100%;
  font-size: 16px;
}
</style>
