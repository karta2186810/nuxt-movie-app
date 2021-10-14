<template>
  <Section class="search">
    <Container class="flex">
      <SearchBar
        v-model="searchVal"
        placeholder="開始探索"
        @search="searchMovie"
      ></SearchBar>
      <div class="search-header">
        <h2 class="search-header__title">
          當前搜尋 <span>"{{ searchHeading }}"</span> 的結果為
        </h2>
        <p class="search-header__results">
          共 <span>{{ totalResults }}</span> 筆結果
        </p>
      </div>
      <MovieList
        class="movies"
        :movies="movies"
        :is-last-page="isLastPage"
        :loading="$fetchState.pending || loading"
        @load-more="handleLoadMore"
      />
    </Container>
  </Section>
</template>

<script>
import http from '@/utils/http.js'
export default {
  name: 'Search',
  data() {
    return {
      searchVal: '',
      totalResults: 0,
      currentPage: 1,
      movies: [],
      loading: false,
      keywordName: '',
    }
  },
  async fetch() {
    await this.$store.dispatch('fetchGenres')

    const result = await this.fetchMovies()
    this.movies = result.results
    this.currentPage = result.page
    this.totalResults = result.total_results

    const keywordName = await http.get(`keyword/${this.$route.query.keyword}`)
    this.keywordName = keywordName.data.name
  },
  computed: {
    isLastPage() {
      return this.movies.length === this.totalResults
    },
    searchHeading() {
      const { query, genre, keyword } = this.$route.query

      if (genre) {
        const genreName = this.genreList[genre] && this.genreList[genre].name
        return genreName
      }

      if (keyword) {
        return this.keywordName
      }

      return query || keyword
    },
    genreList() {
      return this.$store.state.genres
    },
  },
  watch: {
    '$route.query': {
      async handler() {
        const result = await this.fetchMovies()
        this.currentPage = result.page
        this.totalResults = result.total_results
        this.movies = result.results
      },
      immediate: true,
    },
  },
  methods: {
    async fetchMovies(page = 1) {
      let result

      const { genre, query, keyword } = this.$route.query

      this.loading = true

      const params = {
        with_genres: genre,
        page,
        query,
        with_keywords: keyword,
      }

      if (genre || keyword) {
        result = await http.get('discover/movie', {
          params,
        })
      } else if (query) {
        result = await http.get('search/movie', {
          params,
        })
      }

      this.loading = false

      return result.data
    },
    async handleLoadMore() {
      const result = await this.fetchMovies(this.currentPage + 1)
      this.currentPage = result.page
      this.movies = [...this.movies, ...result.results]
      this.totalResults = result.total_results
    },
    searchMovie() {
      const searchVal = this.searchVal.trim()
      if (searchVal) {
        this.$router.push(`/search?query=${searchVal}`)
        this.searchVal = ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.search {
  min-height: 100vh;
  color: $white;
}
.container {
  align-items: center;
  flex-direction: column;
}
.search-bar {
  width: 100%;
  margin-bottom: 48px;
}
.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  width: 100%;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 0;
  }
  span {
    color: $primary;
  }
  &__title {
    font-size: 24px;
  }
  &__results {
    @media screen and (max-width: 1024px) {
      margin-top: 16px;
    }
  }
}
.movies {
  padding: 0;
  &::v-deep .movie-list__content {
    grid-template-columns: repeat(5, 1fr);
    @media screen and (max-width: 1024px) {
      grid-template-columns: repeat(1, 1fr);
      width: 100%;
    }
  }
}
</style>
