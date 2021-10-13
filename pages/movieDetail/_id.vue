<template>
  <Section class="movie-detail">
    <Container class="container">
      <!-- 頭部卡片 -->
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
      <div class="content-wrapper ph-30">
        <!-- 演員 -->
        <div class="actors">
          <h3 class="actors__heading fw-600 fz-28 mb-16">主要演員</h3>
          <Slider class="movie-detail-slider">
            <div class="actors-wrapper flex">
              <Card v-for="actor in actors.cast" :key="actor.id" class="actor">
                <div v-loading class="actor-avatar">
                  <img
                    v-if="actor.profile_path"
                    class="actor-avatar__image"
                    :src="`https://image.tmdb.org/t/p/w300${actor.profile_path}`"
                  />
                  <ImageDefault v-else
                    ><i class="ri-user-line"></i
                  ></ImageDefault>
                </div>
                <div class="actor-info pa-12">
                  <p class="actor-info__name">{{ actor.name }}</p>
                  <p class="actor-info__charater fz-14">
                    {{ actor.character }}
                  </p>
                </div>
              </Card>
            </div>
          </Slider>
        </div>
        <!-- 媒體 -->
        <div class="media">
          <h3 class="media__heading fw-600 fz-28 mb-16">媒體</h3>
          <!-- 媒體切換tab -->
          <div class="media-tabbar mb-10">
            <button
              class="media-tabbar__btn fw-500 fz-18"
              :class="{
                'media-tabbar__btn--active': currentMedia === 'posters',
              }"
              @click="currentMedia = 'posters'"
            >
              海報<span class="ml-4"
                >({{ (media.posters && media.posters.length) || 0 }})</span
              >
            </button>
            <button
              class="media-tabbar__btn fw-500 fz-18"
              :class="{
                'media-tabbar__btn--active': currentMedia === 'backdrops',
              }"
              @click="currentMedia = 'backdrops'"
            >
              背景<span class="ml-4"
                >({{ (media.backdrops && media.backdrops.length) || 0 }})</span
              >
            </button>
          </div>
          <Slider class="movie-detail-slider">
            <div v-if="currentMedia === 'posters'" class="media-wrapper">
              <div
                v-for="(poster, index) in media.posters"
                :key="index"
                v-loading
                class="media-poster"
                @click="showOriginalImage(poster.file_path)"
              >
                <img
                  class="media-poster__image"
                  :src="`https://image.tmdb.org/t/p/w300${poster.file_path}`"
                  alt="poster"
                />
              </div>
            </div>
            <div v-else class="media-wrapper">
              <div
                v-for="(backdrop, index) in media.backdrops"
                :key="index"
                v-loading
                class="media-backdrop"
                @click="showOriginalImage(backdrop.file_path)"
              >
                <img
                  class="media-backdrop__image"
                  :src="`https://image.tmdb.org/t/p/w500${backdrop.file_path}`"
                  alt="backdrop"
                />
              </div>
            </div>
          </Slider>
          <LightBox
            v-show="showLightBox"
            :url="currentImageUrl"
            @closeLightBox="closeLightBox"
          />
        </div>
      </div>
    </Container>

    <!-- 背景 -->
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
  </Section>
</template>

<script>
import http from '@/utils/http.js'
export default {
  name: 'MovieDetail',
  data() {
    return {
      movie: {},
      actors: {},
      media: {},
      currentMedia: 'posters',
      currentImageUrl: '',
      showLightBox: false,
    }
  },
  async fetch() {
    const movieId = this.$route.params.id
    const movie = await http.get(`movie/${movieId}`)
    this.movie = movie.data

    const actors = await http.get(`movie/${movieId}/credits`)
    this.actors = actors.data

    const media = await http.get(
      `movie/${movieId}/images?include_image_language=en`
    )
    this.media = media.data

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
  methods: {
    closeLightBox() {
      this.showLightBox = false
    },
    showOriginalImage(url) {
      this.currentImageUrl = url
      this.showLightBox = true
    },
  },
}
</script>

<style lang="scss" scoped>
.movie-detail {
  padding-top: $nav-height;
  position: relative;
  color: $white;
}
.container {
  overflow: hidden;
  height: auto;
}
.info-card {
  display: flex;
  margin-top: 40px;
  cursor: initial;
  @media screen and (max-width: 1140px) {
    flex-direction: column;
    padding: 0 16px;
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
    padding-top: 600px;
    position: relative;
    @media screen and (max-width: 1140px) {
      padding-top: 410px + $nav-height;
    }
    @media screen and (max-width: 768px) {
      padding-top: 260px + $nav-height;
    }
    @media screen and (max-width: 480px) {
      padding-top: 190px + $nav-height;
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
.content-wrapper {
  margin-top: 120px;
  @media screen and (max-width: 1140px) {
    padding: 0;
  }
}
.movie-detail-slider {
  &::v-deep .slider__content {
    padding: 8px 0;
    padding-bottom: 16px;
    @media screen and (max-width: 480px) {
      padding: 8px 0;
    }
  }
}
.actors-wrapper {
  flex-wrap: nowrap;
  align-items: stretch;
  column-gap: 16px;
}
.actor {
  min-width: 150px;
  width: 150px;
}
.actor-avatar {
  width: 100%;
  height: 225px;
  overflow: hidden;
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.actor-info {
  &__charater {
    color: $text-gray;
  }
}
.media {
  margin-top: 60px;
}
.media-wrapper {
  height: 300px;
  white-space: nowrap;
}

.media-tabbar {
  &__btn {
    border: none;
    background-color: transparent;
    color: $white;
    cursor: pointer;
    position: relative;
    padding: 8px 0;
    margin-right: 8px;

    &--active {
      &::before {
        content: '';
        display: block;
        left: 0;
        bottom: 0;
        position: absolute;
        background-color: $primary;
        height: 2px;
        width: 100%;
        border-radius: 8px;
      }
    }
  }
}

.media-poster,
.media-backdrop {
  min-width: 200px;
  height: 100%;
  display: inline-block;
  margin-right: 16px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  &::after {
    content: '查看原圖';
    font-size: 18px;
    font-weight: 500;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $white;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(12px);
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: 0.3s;
  }
  @media screen and (min-width: 1141px) {
    &:hover {
      &::after {
        opacity: 1;
      }
    }
  }
  &__image {
    height: 100%;
  }
}
</style>
