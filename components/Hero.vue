<template>
  <div class="hero">
    <div class="hero-background">
      <img
        src="@/assets/images/hero-background.jpg"
        class="hero-background__image"
      />
      <div class="hero-background__filter"></div>
    </div>
    <div class="hero-info">
      <h1 class="hero-info__title">Nuxt Movie</h1>
      <p class="hero-info__description">
        上百萬部電影和人物在等你。<br />馬上開始探索吧！
      </p>
      <SearchBar
        v-model="searchVal"
        placeholder="開始探索"
        class="search-bar mt-16"
        @search="searchMovie"
      >
        <i class="ri-search-line"></i>
      </SearchBar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hero',
  data() {
    return {
      searchVal: '',
    }
  },
  methods: {
    searchMovie() {
      this.$router.push(`/search?query=${this.searchVal}`)
      this.searchVal = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.hero {
  width: 100%;
  height: 70vh;
  position: relative;
}

.hero-background {
  width: 100%;
  height: 100%;
  position: relative;

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: rotateY(180deg);
  }
  &__filter {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      -180deg,
      rgba(darken($primary, 40%), 0.3),
      $black 100%
    );
  }
}

.hero-info {
  position: absolute;
  left: 30%;
  top: 50%;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 768px) {
    left: 30%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  &__title {
    color: $white;
    font-size: 72px;
    margin-bottom: 32px;
    @media screen and (max-width: 768px) {
      font-size: 60px;
    }
    @media screen and (max-width: 480px) {
      font-size: 54px;
      text-align: center;
    }
  }
  &__description {
    color: $white;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.5;
    @media screen and (max-width: 768px) {
      font-size: 20px;
    }
    @media screen and (max-width: 480px) {
      text-align: center;
    }
  }
}

.search-bar {
  &::v-deep .search-bar__button {
    background-color: $primary;
    color: $text-black;
    font-weight: 600;
    &:hover {
      background-color: $primary-alt;
    }
  }
}
</style>
