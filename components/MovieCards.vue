<template>
  <section class="movie-cards">
    <div class="container">
      <div class="list-heading flex">
        <h2 class="list-title">{{ title }}</h2>
        <NuxtLink :to="`/${dataType}`" class="show-more flex"
          >查看全部 <i class="ri-arrow-right-s-line"></i
        ></NuxtLink>
      </div>
      <div v-if="$fetchState.pending">Loading</div>
      <div v-else-if="$fetchState.error">Opps, Something went wrong</div>
      <div v-else class="content">
        <div class="card-group flex">
          <div v-for="movie in movies" :key="movie.id" class="card">
            <div class="movie-image">
              <img
                v-if="movie.poster_path"
                :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
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
  async fetch() {
    await this.$store.dispatch('fetchMovies', {
      type: this.dataType,
      page: 1,
    })
  },
  computed: {
    movies() {
      return this.$store.getters.getMovies(this.dataType).slice(0, 20)
    },
  },
}
</script>

<style lang="scss" scoped>
.movie-cards {
  padding-bottom: 80px;
  .list-heading {
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    .list-title {
      font-size: 32px;
      font-weight: 700;
      color: $text-white;
      display: inline-block;
      vertical-align: middle;
      border-left: 4px solid $primary-color;
      padding-left: 16px;
    }
    .show-more {
      color: $text-white;
      font-weight: 600;
      align-items: center;
      &:hover {
        color: $primary-color;
      }
      i {
        font-size: 16px;
        display: inline-block;
        margin-left: 6px;
        &:hover {
          color: $primary-color;
        }
      }
    }
  }

  .content {
    width: 100%;
    height: auto;
    border-radius: 4px;
    color: $text-white;
    overflow-x: scroll;
    padding: 8px 32px;
    padding-bottom: 16px;
    &::-webkit-scrollbar {
      background-color: transparent;
      height: 12px;
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
}
</style>
