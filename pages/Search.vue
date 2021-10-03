<template>
  <div class="search section">
    <div class="container flex">
      <div class="search-bar flex">
        <input
          v-model="searchVal"
          type="text"
          class="search-input"
          placeholder="開始探索"
          @keyup.enter="searchMovie"
        />
        <button class="search-button flex" @click="searchMovie">
          <i class="ri-search-line"></i>
        </button>
      </div>
      <div class="search-heading">
        <h2>
          當前搜尋 <span>"{{ searchHeading }}"</span> 的結果為
        </h2>
        <p>
          共 <span>{{ totalResults }}</span> 筆結果
        </p>
      </div>
      <div class="card-group flex">
        <div v-for="movie in movies" :key="movie.id" class="card flex">
          <div v-loading class="poster">
            <img
              v-if="movie.poster_path"
              :src="`https://image.tmdb.org/t/p/w400${movie.poster_path}`"
              alt="poster"
            />
            <div v-else class="default flex">尚未有圖片</div>
          </div>
          <div class="info">
            <h3 class="title">{{ movie.title }}</h3>
          </div>
        </div>
      </div>
      <button v-show="!isLastPage" class="loadmore-btn" @click="loadMore">
        加載更多
      </button>
    </div>
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
      query: this.$route.query.query,
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
    searchHeading() {
      return this.$route.query.query || this.$route.query.genre
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
      const searchVal = this.searchVal.trim()
      if (searchVal) {
        this.$router.push(`/search?query=${searchVal}`)
        this.searchVal = ''
      }
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
  background-color: $black-color;
  min-height: 100vh;
  color: $text-white;
  .container {
    align-items: center;
    flex-direction: column;
    .search-bar {
      width: 100%;
      margin-bottom: 48px;
      .search-input {
        background-color: $text-white;
        outline: none;
        border: none;
        color: $text-black;
        padding: 8px 16px;
        transition: 0.3s;
        flex: 1;
        border-radius: 4px 0 0 4px;
      }
      .search-button {
        height: inherit;
        border: none;
        background-color: $black-color-alt;
        justify-content: center;
        align-items: center;
        padding: 0 12px;
        color: $text-white;
        cursor: pointer;
        transition: 0.3s;
        border-radius: 0 4px 4px 0;
        &:hover {
          background-color: $primary-color;
          color: $text-black;
        }
      }
    }
    .search-heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      width: 100%;
      h2 {
        font-size: 24px;
      }
      span {
        color: $primary-color;
      }
    }
    .card-group {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: 16px;
      width: 100%;
      .card {
        width: 100%;
        background-color: $card-color;
        height: 225px;
        cursor: pointer;
        border-radius: 4px;
        overflow: hidden;
        .poster {
          height: 100%;
          img {
            width: 150px;
            height: 100%;
            object-fit: cover;
          }
          .default {
            justify-content: center;
            align-items: center;
            width: 150px;
            height: 100%;
            background-color: $black-color-alt;
          }
        }
        .info {
          padding: 16px 24px;
          .title {
            font-size: 20px;
            margin: 16px 0;
          }
        }
      }
    }
    .loadmore-btn {
      margin-top: 32px;
      background-color: $primary-color;
      color: $text-black;
      border: none;
      border-radius: 4px;
      width: 50%;
      padding: 8px 16px;
      font-size: 20px;
      font-weight: 600;
      cursor: pointer;
      i {
        display: block;
      }
      &:hover {
        background-color: $primary-color-alt;
      }
    }
  }
}
</style>
