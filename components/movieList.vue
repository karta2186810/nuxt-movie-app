<template>
  <div class="movie-list">
    <div v-if="movies.length" class="card-group grid">
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
          <div class="overview">
            <h4 v-if="movie.overview" class="overview-title">摘要</h4>
            <p>
              {{ movie.overview ? movie.overview.slice(0, 50) : '尚未有摘要' }}
              <span v-if="movie.overview.length > 50">...</span>
            </p>
          </div>
          <p class="release-date">{{ movie.release_date }}</p>
        </div>
      </div>
    </div>
    <div v-else-if="loading" class="loading">
      <img src="@/assets/images/loading.svg" alt="" />
    </div>
    <div v-else class="no-movie">
      <i class="ri-movie-2-line"></i>
      沒有相關的電影哦
    </div>
    <button
      v-show="!isLastPage && movies.length"
      class="loadmore-btn btn-primary"
      @click="handleLoadMore"
    >
      <span>加載更多</span>
    </button>
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
  @media screen and (max-width: 1140px) {
    margin-top: 32px;
    padding-left: 0;
  }
  .card-group {
    grid-template-columns: repeat(4, 1fr);
    align-content: center;
    gap: 24px;
    @media screen and (max-width: 1140px) {
      grid-template-columns: repeat(1, 1fr);
      width: 100%;
    }
    .card {
      width: 100%;
      flex-direction: column;
      border-radius: 4px;
      overflow: hidden;
      background-color: $card-color;
      cursor: pointer;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
      position: relative;
      transition: 0.3s;
      @media screen and (max-width: 1140px) {
        flex-direction: row;
      }
      @media screen and (min-width: 1141px) {
        &:hover {
          transform: scale(1.1);
          z-index: 100;
          .info {
            .overview {
              opacity: 1;
              pointer-events: initial;
            }
          }
        }
      }
      .poster {
        flex: 1;
        overflow: hidden;
        min-height: 300px;
        @media screen and (max-width: 1140px) {
          flex: initial;
          min-height: 225px;
          min-width: 150px;
        }
        @media screen and (max-width: 480px) {
          min-width: 125px;
          min-height: 175px;
        }
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
          @media screen and (max-width: 1140px) {
            width: 150px;
          }
          @media screen and (max-width: 480px) {
            width: 125px;
          }
        }
      }
      .info {
        padding: 16px;
        @media screen and (max-width: 1140px) {
          padding: 32px;
          font-size: 20px;
        }
        .title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
          letter-spacing: 1px;
          text-overflow: ellipsis;
          white-space: nowrap;
          @media screen and (max-width: 1140px) {
            font-size: 24px;
          }
        }
        .release-date {
          font-size: 14px;
          font-weight: 100;
          color: $text-gray;
          @media screen and (max-width: 1140px) {
            font-size: 16px;
          }
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
          @media screen and (max-width: 1140px) {
            margin-top: 16px;
            display: block;
            position: static;
            opacity: 1;
            background-color: transparent;
            padding: 0;
            height: auto;
            pointer-events: initial;
          }
          @media screen and (max-width: 480px) {
            display: none;
          }
          .overview-title {
            font-size: 20px;
            margin-bottom: 8px;
            color: $primary-color;
            @media screen and (max-width: 1140px) {
              display: none;
            }
          }
        }
      }
    }
  }
  .no-movie {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    min-height: 300px;
    color: $primary-color;
    i {
      font-size: 120px;
      margin-bottom: 24px;
      color: $primary-color;
      font-weight: normal;
    }
  }
  .loadmore-btn {
    margin-top: 32px;
    width: 50%;
    padding: 8px 16px;
    font-size: 20px;
    font-weight: 500;
    i {
      display: block;
    }
  }
}
</style>
