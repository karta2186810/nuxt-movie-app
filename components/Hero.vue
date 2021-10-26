<template>
  <div class="hero">
    <div class="hero-background">
      <img
        src="@/assets/images/hero-background.svg"
        class="hero-background__image"
      />
      <div class="hero-background__filter"></div>
    </div>
    <div class="hero-info">
      <h1 ref="title" class="hero-title">Nuxt Movie</h1>
      <p class="hero-description">
        <span>上百萬部電影和人物在等你。</span>
        <br />
        <span>馬上開始探索吧！</span>
      </p>
      <SearchBar
        v-model="searchVal"
        placeholder="開始探索"
        class="search-bar mt-24"
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
  mounted() {
    this.titleAnimation()
  },
  methods: {
    searchMovie() {
      if (this.searchVal.trim()) {
        this.$router.push(`/search?query=${this.searchVal}`)
        this.searchVal = ''
      }
    },
    titleAnimation() {
      const title = this.$refs.title
      title.innerHTML = title.textContent.replace(/\S/g, '<span>$&</span>')
      const spans = title.children
      for (let i = 0; i < spans.length; i++) {
        spans[i].style.setProperty('--delay', `${i * 0.05}s`)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.hero {
  width: 100%;
  height: 70vh;
  position: relative;
  @media (max-width: 480px) {
    height: 60vh;
  }
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
    @media (max-width: 480px) {
      object-fit: contain;
    }
  }
  &__filter {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      -180deg,
      rgba(darken($primary, 50%), 0.3),
      $black 100%
    );
  }
}

.hero-info {
  position: absolute;
  left: 30%;
  top: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 768px) {
    left: 30%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
  }
  @media (max-width: 480px) {
    width: 100%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}

.hero-title {
  color: $white;
  font-size: 72px;
  margin-bottom: 32px;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 60px;
  }
  @media (max-width: 480px) {
    font-size: 54px;
    text-align: center;
  }
  &::v-deep span {
    display: inline-block;
    transform: translateY(10px);
    animation: slideIn ease-in-out 0.5s both;
    animation-delay: var(--delay);
    text-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  }
}

.hero-description {
  color: $white;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.5;
  animation: slideIn ease-in-out 0.5s both;
  animation-delay: 0.5s;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 20px;
  }
  @media (max-width: 480px) {
    text-align: center;
  }
}
.search-bar {
  &::v-deep {
    .search-bar {
      &__input {
        background-color: darken($white, 5%);
      }
      &__button {
        background-color: $primary;
        color: $text-black;
        font-weight: 600;
        &:hover {
          background-color: $primary-alt;
        }
      }
    }
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
