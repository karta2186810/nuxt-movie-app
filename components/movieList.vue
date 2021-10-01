<template>
  <div class="movie-list">
    <div class="card-group grid">
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
          <p>評分: {{ movie.vote_average ? movie.vote_average : '--' }}</p>
          <p class="release-date">{{ movie.release_date }}</p>
          <div class="overview">
            <h4 v-if="movie.overview" class="overview-title">摘要</h4>
            <p>
              {{ movie.overview ? movie.overview.slice(0, 100) : '尚未有摘要' }}
              <span v-if="movie.overview.length > 100">...</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <button
      v-show="!isLastPage && movies.length"
      class="loadmore-btn"
      @click="handleLoadMore"
    >
      <i v-if="loading" class="ri-loader-3-line"></i>
      <span v-else>加載更多</span>
    </button>
    <div v-if="loading">Loading</div>
  </div>
</template>

<script>
export default {
  name: 'MovieList',
  props: {
    movies: {
      type: Array,
      default() {
        return []
      },
    },
    isLastPage: {
      type: Boolean,
      default: false,
    },
    totalResults: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 0,
    },
    movieType: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      loadingImg: require('@/assets/images/loading.svg'),
    }
  },
  methods: {
    handleLoadMore() {
      if (!this.isLastPage) {
        this.$store.dispatch('fetchMovies', {
          type: this.movieType,
          page: this.currentPage + 1,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.movie-list {
  flex: 5;
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .card-group {
    grid-template-columns: repeat(5, 1fr);
    align-content: center;
    gap: 24px;
    .card {
      width: 100%;
      flex-direction: column;
      border-radius: 4px;
      overflow: hidden;
      background-color: #333;
      cursor: pointer;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
      position: relative;
      &:hover {
        .info {
          .overview {
            opacity: 1;
            pointer-events: initial;
          }
        }
      }
      .poster {
        flex: 1;
        overflow: hidden;
        .default {
          height: 100%;
          font-size: 20px;
          font-weight: 600;
          align-items: center;
          justify-content: center;
          background-color: $black-color-alt;
          transition: 0.3s;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: 0.3s;
        }
      }
      .info {
        padding: 16px;
        .title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
          letter-spacing: 1px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .release-date {
          font-size: 14px;
          font-weight: 100;
          color: $text-gray;
        }
        .overview {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(12px);
          padding: 16px;
          line-height: 1.5;
          transition: 0.3s;
          opacity: 0;
          pointer-events: none;
          .overview-title {
            font-size: 20px;
            margin-bottom: 8px;
            color: $primary-color;
          }
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
</style>
