<template>
  <div class="movie-detail">
    <Container class="container">
      <Card class="info-card pa-30">
        <div v-loading class="movie-poster radius-4">
          <img
            class="movie-poster__image"
            :src="`https://image.tmdb.org/t/p/w400${movie.poster_path}`"
            alt="movie-poster"
          />
        </div>
        <div class="movie-info ph-30">
          <div class="movie-info__header">
            <h1 class="movie-title fw-900 fz-32">
              {{ movie.title }}
              <span class="fw-600 ml-6"
                >({{
                  (movie.release_date && movie.release_date.split('-')[0]) ||
                  ''
                }})</span
              >
            </h1>
            <div class="times mt-12">
              <span class="movie-release-date">{{ releaseDate }}</span>
              <span>{{ movieRuntime }}</span>
            </div>
            <div class="movie-genres mt-12">
              <NuxtLink
                v-for="genre in movie.genres"
                :key="genre.id"
                :to="`/search?genre=${genre.id}`"
                class="movie-genres__genre pa-6 radius-4 fz-14 mr-6 fw-500"
                >{{ genre.name }}</NuxtLink
              >
            </div>
          </div>
          <div class="movie-description flex mt-30">
            <SingleCenter direction="col" class="movie-rate">
              <h3 class="fw-600 fz-24 mb-16">平均評分</h3>
              <Circular size="75" :value="movie.vote_average" />
            </SingleCenter>
            <div class="movie-overview ml-30">
              <h3 class="movie-overview__heading fw-600 fz-24 mb-16">摘要</h3>
              <p class="movie-overview__content">{{ movie.overview }}</p>
            </div>
          </div>
        </div>
      </Card>
    </Container>
    <div
      class="movie-backdrop"
      :style="{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
      }"
    >
      <div class="movie-backdrop__inner">
        <div
          :style="{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
          }"
          class="movie-backdrop__image"
        ></div>
        <div class="movie-backdrop__filter"></div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '@/utils/http.js'
export default {
  name: 'MovieDetail',
  data() {
    return {
      movie: {},
    }
  },
  async fetch() {
    const result = await http.get(`movie/${this.$route.params.id}`)
    this.movie = result.data
    await this.$store.dispatch('fetchGenres')
  },
  computed: {
    movieRuntime() {
      const h = Math.floor(this.movie.runtime / 60)
      const m = this.movie.runtime % 60
      return `${h} 小時 ${m} 分`
    },
    releaseDate() {
      return this.movie.release_date?.replace(/-/g, '/') || ''
    },
  },
}
</script>

<style lang="scss" scoped>
.movie-detail {
  margin-top: $nav-height;
  position: relative;
  color: $white;
}
.container {
  overflow: hidden;
  height: auto;
}
.info-card {
  display: flex;
  margin-top: 120px;
  cursor: initial;
  @media screen and (max-width: 1140px) {
    flex-direction: column;
    padding: 0;
    background-color: transparent;
    box-shadow: none;
    margin: 0;
    margin-top: 16px;
  }
}
.movie-poster {
  width: 250px;
  height: 375px;
  @media screen and (max-width: 1140px) {
    margin-bottom: 16px;
    margin-left: 16px;
  }
  @media screen and (max-width: 768px) {
    width: 150px;
    height: 225px;
  }
  @media screen and (max-width: 480px) {
    width: 100px;
    height: 150px;
    margin-bottom: 16px;
  }
  &__image {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
.movie-title {
  span {
    vertical-align: top;
  }
}
.movie-info {
  flex: 1;
  @media screen and (max-width: 1140px) {
    padding: 0;
    margin-top: 32px;
  }
  &__header {
    @media screen and (max-width: 1140px) {
      text-align: center;
    }
  }
}
.original-title {
  color: $text-gray;
}
.movie-release-date {
  letter-spacing: 1.5px;
  &::after {
    content: '';
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: $white;
    vertical-align: middle;
    margin: 0 8px;
  }
}
.movie-genres {
  &__genre {
    color: $white;
    display: inline-block;
    border: 1px solid $white;
    user-select: none;
    cursor: pointer;
    &:hover {
      border-color: $primary;
      color: $primary;
    }
  }
}
.movie-description {
  @media screen and (max-width: 1140px) {
    flex-direction: column;
  }
}
.movie-rate {
  min-width: 100px;
}
.movie-overview {
  @media screen and (max-width: 1140px) {
    margin: 0;
    margin-top: 32px;
  }
  &__heading {
    @media screen and (max-width: 1140px) {
      text-align: center;
    }
  }
}
.movie-backdrop {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -10;
  &__inner {
    padding-top: 40%;
    position: relative;
    @media screen and (max-width: 1140px) {
      padding-top: 410px;
    }
    @media screen and (max-width: 768px) {
      padding-top: 260px;
    }
    @media screen and (max-width: 480px) {
      padding-top: 190px;
    }
  }
  &__image {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-position: center;
    background-size: cover;
  }
  &__filter {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(-180deg, rgba(0, 0, 0, 0.4) 75%, $black 100%);
  }
}
</style>
