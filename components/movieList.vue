<template>
  <div class="movie-list">
    <div v-if="movies.length" class="movie-list__content">
      <Card
        v-for="movie in movies"
        :key="movie.id"
        class="movie"
        @click="toMovieDetail(movie.id)"
      >
        <div v-loading class="movie-poster">
          <img
            v-if="movie.poster_path"
            class="movie-poster__img"
            :src="`https://image.tmdb.org/t/p/w400${movie.poster_path}`"
            alt="poster"
          />
          <ImageDefault v-else class="movie-poster__default"></ImageDefault>
        </div>

        <div class="movie-info">
          <h3 class="movie-info__title">{{ movie.title }}</h3>
          <p class="movie-info__rated">
            評分: {{ movie.vote_average ? movie.vote_average : '--' }}
          </p>
          <p class="movie-info__release-date">
            上映日期: {{ movie.release_date }}
          </p>
          <BoxCenter class="movie-overview">
            <h4 v-if="movie.overview" class="movie-overview__title">摘要</h4>
            <p class="movie-overview__description">
              {{ movie.overview ? movie.overview : '尚未有摘要' }}
            </p>
          </BoxCenter>
        </div>
      </Card>
    </div>
    <div v-else-if="loading" class="loading">
      <img src="@/assets/images/loading.svg" />
    </div>
    <SingleCenter v-else direction="column" class="no-movie">
      <i class="ri-movie-2-line"></i>
      沒有相關的電影哦
    </SingleCenter>
    <Button
      v-show="!isLastPage && movies.length"
      class="loadmore-btn"
      @click="handleLoadMore"
    >
      <span>加載更多</span>
    </Button>
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
      this.$emit('load-more')
    },
    toMovieDetail(id) {
      this.$router.push(`/movieDetail/${id}`)
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
  &__content {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-content: center;
    gap: 16px;
    @media screen and (max-width: 1140px) {
      grid-template-columns: repeat(1, 1fr);
      width: 100%;
    }
  }
  .movie {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    transition: 0.3s;
    @media screen and (max-width: 1140px) {
      flex-direction: row;
    }
    @media screen and (min-width: 1141px) {
      &:hover {
        transform: scale(1.1);
        z-index: 100;
        .movie-overview {
          opacity: 1;
          pointer-events: initial;
        }
      }
    }
  }

  .movie-poster {
    flex: 1;
    overflow: hidden;
    min-height: 300px;
    @media screen and (max-width: 1140px) {
      flex: initial;
      min-height: 225px;
      min-width: 150px;
    }
    @media screen and (max-width: 480px) {
      width: 100px;
      min-width: 100px;
      min-height: 125px;
    }
    &__default {
      width: 100%;
      height: 100%;
      transition: 0.3s;
    }
    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: 0.3s;
      @media screen and (max-width: 1140px) {
        width: 150px;
      }
      @media screen and (max-width: 480px) {
        width: 100px;
      }
    }
  }
  .movie-info {
    padding: 16px;
    overflow: hidden;
    @media screen and (max-width: 1140px) {
      padding: 32px;
      font-size: 20px;
    }
    @media screen and (max-width: 480px) {
      padding: 24px;
    }
    &__title {
      @include ellipsis(1);
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
      letter-spacing: 1px;
      @media screen and (max-width: 1140px) {
        font-size: 24px;
      }
      @media screen and (max-width: 480px) {
        font-size: 20px;
      }
    }
    &__rated {
      @media screen and (max-width: 480px) {
        display: none;
      }
    }
    &__release-date {
      font-size: 14px;
      font-weight: 100;
      color: $text-gray;
      margin-top: 8px;
      @media screen and (max-width: 1140px) {
        font-size: 16px;
      }
    }
  }

  .movie-overview {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
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
      overflow: hidden;
      font-size: 16px;
      height: 48px;
    }

    &__title {
      font-size: 20px;
      margin-bottom: 8px;
      color: $color-primary;
      @media screen and (max-width: 1140px) {
        display: none;
      }
    }
    &__description {
      @include ellipsis(5);
      @media screen and (max-width: 1140px) {
        @include ellipsis(2);
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
    color: $color-primary;
    i {
      font-size: 120px;
      margin-bottom: 24px;
      color: $color-primary;
      font-weight: normal;
    }
  }
  .loadmore-btn {
    margin-top: 32px;
    width: 50%;
  }
}
</style>
