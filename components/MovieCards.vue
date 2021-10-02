<template>
  <section class="movie-cards">
    <div class="container">
      <div class="cards-heading flex">
        <NuxtLink :to="`/movies/${dataType}`" class="cards-title flex">
          <h2>{{ title }}</h2>
          <i class="ri-arrow-right-s-line"></i>
        </NuxtLink>
      </div>
      <div v-if="$fetchState.pending">Loading</div>
      <div v-else-if="$fetchState.error">Opps, Something went wrong</div>
      <div v-else class="content-wrapper">
        <div class="content" @scroll="handleScroll">
          <div class="card-group flex">
            <div v-for="movie in movies" :key="movie.id" class="card">
              <div class="movie-image">
                <img
                  v-if="movie.poster_path"
                  :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
                  :alt="movie.title"
                />
                <div class="movie-image default flex">尚未有圖片</div>
              </div>
              <div class="movie-info">
                <h3 class="movie-title">
                  {{ movie.title }}
                </h3>
                <p class="release-date">{{ movie.release_date }}</p>
              </div>
              <div class="movie-rated"></div>
            </div>
            <div class="spacer"></div>
          </div>
        </div>
        <div class="left-gradient gradient" :class="{ show: rightmost }"></div>
        <div class="right-gradient gradient" :class="{ show: leftmost }"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
      required: true,
    },
    dataType: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      leftmost: true,
      rightmost: false,
    }
  },
  async fetch() {
    await this.$store.dispatch('fetchMovies', {
      type: this.dataType,
      page: 1,
    })
  },
  computed: {
    movies() {
      return this.$store.getters.getMovies({ type: this.dataType }).slice(0, 20)
    },
  },
  methods: {
    handleScroll(e) {
      const scrollLeft = e.target.scrollLeft
      const clientWidth = e.target.clientWidth
      const cardGroupWidth = e.target.scrollWidth

      if (scrollLeft === 0) {
        this.leftmost = true
      } else {
        this.leftmost = false
      }

      if (Math.round(clientWidth + scrollLeft) === cardGroupWidth) {
        this.rightmost = true
      } else {
        this.rightmost = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.movie-cards {
  padding-bottom: 80px;
  .cards-heading {
    margin-bottom: 16px;
    .cards-title {
      font-size: 28px;
      font-weight: 700;
      color: $text-white;
      vertical-align: middle;
      padding-left: 16px;
      position: relative;
      transition: 0.3s;
      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 4px;
        background-color: $primary-color;
        border-radius: 4px;
      }
      &:hover {
        color: $primary-color;
      }
    }
  }

  .content-wrapper {
    position: relative;
    .content {
      width: 100%;
      height: auto;
      color: $text-white;
      overflow-x: scroll;
      padding: 8px 32px;
      padding-bottom: 16px;
      @media screen and (max-width: 640px) {
        padding: 8px 0;
      }
      &::-webkit-scrollbar {
        background-color: transparent;
        height: 12px;
        @media screen and (max-width: 768px) {
          height: 10px;
        }
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 40px;
        background-color: $scrollbar-thumb-color;
        &:hover,
        &:active {
          background-color: $scrollbar-thumb-color-alt;
        }
      }
      .card-group {
        flex-wrap: nowrap;
        align-items: center;
        column-gap: 16px;
        .card {
          min-width: 150px;
          width: 150px;
          position: relative;
          cursor: pointer;
          &:hover {
            .movie-image {
              img {
                transform: scale(1.1);
              }
            }
            .movie-title {
              color: $primary-color;
            }
          }
          .movie-image {
            width: 100%;
            height: 225px;
            overflow: hidden;
            border-radius: 4px;
            margin-bottom: 12px;
            &.default {
              background-color: $black-color-alt;
              justify-content: center;
              align-items: center;
              font-weight: 700;
              letter-spacing: 1px;
            }
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: 0.3s;
            }
          }
          .movie-info {
            width: 100%;
            .movie-title {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-weight: 700;
              margin-bottom: 6px;
            }
            .release-date {
              font-size: 14px;
              font-weight: 100;
              color: $text-gray;
            }
          }
        }
        .spacer {
          min-width: 16px;
          height: 200px;
        }
      }
    }
    .gradient {
      height: calc(100% - 32px);
      width: 200px;
      position: absolute;
      opacity: 0;
      transition: 0.3s;
      pointer-events: none;
      @media screen and (max-width: 768px) {
        width: 48px;
      }
      &.show {
        opacity: 1;
      }
      &.left-gradient {
        top: 8px;
        left: 0;
        background: linear-gradient(-90deg, transparent, $black-color);
      }
      &.right-gradient {
        top: 8px;
        right: 0;
        background: linear-gradient(90deg, transparent, $black-color);
      }
    }
  }
}
</style>
