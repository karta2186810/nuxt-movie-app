<template>
  <Section class="movie-detail">
    <Container class="container">
      <!-- 頭部卡片 -->
      <SkeletonDetailCard v-if="$fetchState.pending" />
      <Card v-else class="info-card pa-30">
        <div v-loading class="movie-poster radius-4">
          <img
            v-if="movie.poster_path"
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
            <div class="movie-genres mt-20">
              <NuxtLink
                v-for="genre in movie.genres"
                :key="genre.id"
                :to="`/search?genre=${genre.id}`"
                class="movie-genres__tag pa-10 radius-4 fz-14 mr-6 fw-500"
                >{{ genre.name }}</NuxtLink
              >
            </div>
          </div>
          <div class="movie-description flex mt-30">
            <SingleCenter direction="col" class="movie-rated">
              <h3 class="fw-600 fz-24 mb-16 movie-rated__heading">評分</h3>
              <Circular size="75" :value="movie.vote_average" />
            </SingleCenter>
            <div class="movie-overview ml-30">
              <h3 class="movie-overview__heading fw-600 fz-24 mb-16">摘要</h3>
              <p v-if="movie.overview" class="movie-overview__content">
                {{ movie.overview }}
              </p>
              <p v-else style="text-align: center">尚未有摘要</p>
            </div>
          </div>
        </div>
      </Card>
      <div class="content-wrapper ph-30 flex">
        <div class="main">
          <!-- 演員 -->
          <div class="actors">
            <SingleCenter justify="between" class="actors-header mb-16">
              <h3 class="actors__heading fw-600 fz-28">主要演員</h3>
              <!-- <SingleCenter class="actors__view-all fz-16 fw-500">
                完整演員與製作團隊<i class="ri-arrow-right-s-line"></i>
              </SingleCenter> -->
            </SingleCenter>
            <Slider
              v-if="actors.cast && actors.cast.length"
              class="movie-detail-slider"
            >
              <div class="actors-wrapper flex">
                <Card
                  v-for="actor in actors.cast"
                  :key="actor.id"
                  class="actor"
                >
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
            <BoxCenter v-else class="no-actors fz-20 radius-4"
              >資料不足</BoxCenter
            >
          </div>
          <hr style="margin-top: 40px; margin-bottom: 40px" />
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
                  >({{
                    (media.backdrops && media.backdrops.length) || 0
                  }})</span
                >
              </button>
            </div>
            <!-- 不存在媒體時 -->
            <BoxCenter
              v-if="media[currentMedia] && media[currentMedia].length === 0"
              class="media-fallback fz-20"
            >
              資料不足
            </BoxCenter>
            <!-- 媒體Slider -->
            <Slider v-else class="movie-detail-slider">
              <div class="media-wrapper">
                <div
                  v-for="(mediaItem, index) in media[currentMedia]"
                  :key="index"
                  v-loading
                  class="media-item"
                  @click="showOriginalImage(mediaItem.file_path)"
                >
                  <img
                    class="media-item__image"
                    :src="`https://image.tmdb.org/t/p/w500${mediaItem.file_path}`"
                    alt="media-item"
                  />
                </div>
              </div>
            </Slider>
            <!-- 全尺寸媒體檢視器 -->
            <LightBox
              v-if="showLightBox"
              :url="currentImageUrl"
              @closeLightBox="closeLightBox"
            />
          </div>
        </div>
        <div class="aside ml-30">
          <div class="original-title mb-24">
            <h3 class="fz-20 fw-600 mb-10">原始標題</h3>
            <p>{{ movie.original_title }}</p>
          </div>
          <div class="budget mb-24">
            <h3 class="fz-20 fw-600 mb-10">電影成本</h3>
            <p>{{ movieBudget }}</p>
          </div>
          <div class="revenue mb-24">
            <h3 class="fz-20 fw-600 mb-10">票房收入</h3>
            <p>{{ movieRevenue }}</p>
          </div>
          <div v-if="keywords.length !== 0" class="keywords mb-24">
            <h3 class="fz-20 fw-600 mb-10">關鍵字</h3>
            <div class="keyword-group flex">
              <NuxtLink
                v-for="keyword in keywords"
                :key="keyword.id"
                :to="`/search?keyword=${keyword.id}`"
                class="keyword-group__tag fw-500 fz-14 radius-4 pa-10"
              >
                {{ keyword.name }}
              </NuxtLink>
            </div>
          </div>
          <div class="social-links">
            <a
              v-if="socialIds.facebook_id"
              title="facebook"
              class="social-links__link"
              :href="`https://www.facebook.com/${socialIds.facebook_id}`"
              target="_blank"
            >
              <i class="ri-facebook-box-fill"></i>
            </a>
            <a
              v-if="socialIds.twitter_id"
              title="twitter"
              class="social-links__link"
              :href="`https://www.twitter.com/${socialIds.twitter_id}`"
              target="_blank"
            >
              <i class="ri-twitter-fill"></i>
            </a>
            <a
              v-if="socialIds.instagram_id"
              title="instagram"
              class="social-links__link"
              :href="`https://www.instagram.com/${socialIds.instagram_id}`"
              target="_blank"
            >
              <i class="ri-instagram-line"></i>
            </a>
            <a
              v-if="movie.homepage"
              :href="movie.homepage"
              target="_blank"
              class="social-links__link"
            >
              <i class="ri-home-2-line"></i>
            </a>
          </div>
        </div>
      </div>
    </Container>

    <!-- 背景 -->
    <div v-if="movie.backdrop_path" class="movie-backdrop">
      <div
        :style="{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
        }"
        class="movie-backdrop__image"
      >
        <div class="movie-backdrop__filter"></div>
      </div>
    </div>
  </Section>
</template>

<script>
import http from '@/utils/http.js'
import formatMoney from '@/utils/formatMoney.js'
export default {
  name: 'MovieDetail',
  data() {
    return {
      movie: {},
      actors: {},
      media: {},
      socialIds: {},
      keywords: [],
      currentMedia: 'posters',
      currentImageUrl: '',
      showLightBox: false,
    }
  },
  async fetch() {
    const movieId = this.$route.params.id
    const movie = await http.get(
      `movie/${movieId}?include_image_language=en&append_to_response=images,credits,external_ids,keywords`
    )
    this.movie = movie.data
    this.actors = movie.data.credits
    this.media = movie.data.images
    this.socialIds = movie.data.external_ids
    this.keywords = movie.data.keywords.keywords
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
    movieBudget() {
      if (!this.movie.budget) return '未知'
      return `$${formatMoney(this.movie.budget)}`
    },
    movieRevenue() {
      if (!this.movie.revenue) return '未知'
      return `$${formatMoney(this.movie.revenue)}`
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
  @media (max-width: 1024px) {
    flex-direction: column;
    background-color: transparent;
    box-shadow: none;
    padding: 0;
    margin: 0;
    margin-top: 16px;
  }
}
.movie-poster {
  width: 250px;
  height: 375px;
  @media (max-width: 1024px) {
    margin-bottom: 16px;
  }
  @media (max-width: 768px) {
    width: 150px;
    height: 225px;
  }
  @media (max-width: 480px) {
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
  @media (max-width: 1024px) {
    line-height: 1.5;
  }
  span {
    vertical-align: top;
  }
}
.movie-info {
  flex: 1;
  @media (max-width: 1024px) {
    padding: 0;
    margin-top: 32px;
  }
  &__header {
    @media (max-width: 1024px) {
      text-align: center;
    }
  }
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
.movie-genres,
.keyword-group {
  &__tag {
    color: $white;
    display: inline-block;
    border: 1px solid $white;
    user-select: none;
    margin-right: 6px;
    margin-bottom: 6px;
    cursor: pointer;
    @media (max-width: 1024px) {
      padding: 16px 20px;
      font-size: 16px;
    }
    &:hover {
      border-color: $primary;
      color: $primary;
    }
  }
}

.movie-description {
  @media (max-width: 1024px) {
    flex-direction: column;
  }
}
.movie-rated {
  min-width: 100px;
}
.movie-overview {
  @media (max-width: 1024px) {
    margin: 0;
    margin-top: 32px;
    border-radius: 4px;
    padding: 16px;
    background-color: $card-color;
  }
  &__heading {
    @media (max-width: 1024px) {
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

  &__image {
    width: 100%;
    height: 600px;
    position: absolute;
    left: 0;
    top: 0;
    background-position: center;
    background-size: cover;
    @media (max-width: 1024px) {
      height: 410px + $nav-height;
    }
    @media (max-width: 768px) {
      height: 260px + $nav-height;
    }
    @media (max-width: 480px) {
      height: 190px + $nav-height;
    }
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
  @media (max-width: 1024px) {
    padding: 0;
    margin-top: 60px;
    flex-direction: column-reverse;
  }
}
.main {
  overflow: hidden;
  flex: 1;
  @media (max-width: 1024px) {
    margin-top: 40px;
  }
}

.aside {
  width: 300px;
  @media (max-width: 1024px) {
    width: 100%;
    margin-left: 0;
  }
}

.social-links {
  font-size: 32px;
  &__link {
    transition: 0.3s;
    cursor: pointer;
    color: $white;
    &:hover {
      color: $primary;
    }
  }
}

.keywords {
  width: 100%;
  overflow: hidden;
}
.keyword-group {
  flex-wrap: wrap;
}

.movie-detail-slider {
  &::v-deep .slider__content {
    padding: 8px 0;
    padding-bottom: 16px;
    @media (max-width: 480px) {
      padding: 8px 0;
    }
  }
}
.actors__view-all {
  color: $primary;
  cursor: pointer;
  &:hover {
    color: $primary-alt;
  }
}
.actors-wrapper {
  flex-wrap: nowrap;
  align-items: stretch;
}
.no-actors {
  width: 100%;
  min-height: 300px;
  background: $card-color;
  color: $primary;
}
.actor {
  min-width: 150px;
  width: 150px;
  margin-right: 16px;
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

.media-item {
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
  @media (min-width: 1025px) {
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

.media-fallback {
  width: 100%;
  height: 300px;
  color: $primary;
  background-color: $card-color;
  border-radius: 4px;
}
</style>
