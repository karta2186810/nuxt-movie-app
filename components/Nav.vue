<template>
  <div class="nav" :class="{ 'nav--hidden': isScrollDown }">
    <Container>
      <SingleCenter justify="between" class="nav__content">
        <div class="logo">
          <NuxtLink class="logo__link" to="/">Nuxt Movie</NuxtLink>
        </div>
        <BoxCenter class="menu">
          <SingleCenter
            class="menu__content"
            :class="{ 'menu__content--show': showMenu }"
          >
            <NuxtLink
              class="menu__link"
              style="animation-delay: 0.4s"
              to="/movies/nowPlaying"
              @click.native="linkClick"
            >
              現正熱映
            </NuxtLink>
            <NuxtLink
              class="menu__link"
              to="/movies/popular"
              style="animation-delay: 0.5s"
              @click.native="linkClick"
            >
              熱門電影
            </NuxtLink>
            <NuxtLink
              class="menu__link"
              to="/movies/topRated"
              style="animation-delay: 0.6s"
              @click.native="linkClick"
            >
              最高評分
            </NuxtLink>
            <NuxtLink
              class="menu__link"
              to="/movies/upcoming"
              style="animation-delay: 0.7s"
              @click.native="linkClick"
            >
              即將上映
            </NuxtLink>
            <div class="close-menu" @click="closeMenu">
              <i class="ri-close-line close-menu__icon"></i>
            </div>
          </SingleCenter>
          <div class="open-search" @click="openSearch">
            <i class="ri-search-line open-search__icon"></i>
          </div>
          <div class="open-menu" @click="openMenu">
            <i class="ri-menu-3-line open-menu__icon"></i>
          </div>
        </BoxCenter>
      </SingleCenter>
    </Container>
    <div class="search" :class="{ 'search--show': showSearch }">
      <Container>
        <SingleCenter>
          <SearchBar
            v-model="searchVal"
            placeholder="開始探索"
            @search="searchMovie"
          />
          <button class="close-search flex" @click="closeSearch">
            <i class="ri-close-line close-search__icon"></i>
          </button>
        </SingleCenter>
      </Container>
    </div>
  </div>
</template>

<script>
import SearchBar from './SearchBar.vue'
export default {
  name: 'Nav',
  components: { SearchBar },
  data() {
    return {
      showMenu: false,
      showSearch: false,
      searchVal: '',
      isScrollDown: false,
      scrollTopVal: 0,
    }
  },
  mounted() {
    document.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    closeMenu() {
      this.showMenu = false
    },
    openMenu() {
      this.showMenu = true
    },
    linkClick() {
      this.showMenu = false
    },
    openSearch() {
      this.showSearch = true
    },
    closeSearch() {
      this.showSearch = false
    },
    searchMovie() {
      this.$router.push(`/search?query=${this.searchVal}`)
      this.searchVal = ''
    },
    handleScroll(e) {
      const scrollTop = e.target.documentElement.scrollTop
      if (scrollTop > this.scrollTopVal) {
        this.isScrollDown = true
      } else {
        this.isScrollDown = false
      }
      this.scrollTopVal = scrollTop
    },
  },
}
</script>

<style lang="scss" scoped>
.nav {
  background-color: rgba(34, 34, 34, 0.5);
  color: $white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $nav-height;
  z-index: 1000;
  box-shadow: 0 6px 8px 0px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(12px);
  transition: 0.3s;
  &--hidden {
    transform: translateY(-100%);
    box-shadow: none;
  }
  &__content {
    height: 100%;
  }
}

.logo {
  &__link {
    color: $primary;
  }
}

.menu {
  height: 100%;
  &__content {
    transition: 0.4s;
    height: 100%;
    margin-right: 18px;
    @media (max-width: 1024px) {
      position: fixed;
      top: 0;
      left: 0;
      flex-direction: column;
      padding: 32px 0;
      width: 100vw;
      height: 100vh;
      background-color: $black;
      pointer-events: none;
      transform: translateY(-100%);
      display: flex;
      justify-content: center;
      align-items: center;
      &--show {
        top: 0;
        pointer-events: initial;
        transform: translateY(0);
        .menu__link {
          animation: 0.3s in ease-in-out both;
        }
        @keyframes in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      }
    }
  }

  &__link {
    display: inline-block;
    font-weight: bolder;
    height: 100%;
    color: $white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
    transition: 0.3s;
    position: relative;
    overflow: hidden;
    font-size: 14px;
    @media (min-width: 1025px) {
      &:hover {
        color: $text-black;
        &::before {
          bottom: 0;
        }
      }
    }
    @media (max-width: 1024px) {
      font-size: 20px;
      width: 100%;
      height: auto;
      padding: 16px;
    }

    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background-color: $primary;
      position: absolute;
      bottom: -100%;
      left: 0;
      z-index: -1;
      transition: 0.3s;
    }
    &.nuxt-link-active {
      background-color: $primary;
      color: $text-black;
    }
  }
}

.open-menu {
  font-size: 32px;
  display: none;
  cursor: pointer;
  &__icon {
    display: block;
  }
  @media (max-width: 1024px) {
    display: block;
  }
}

.close-menu {
  display: none;
  font-size: 32px;
  cursor: pointer;
  &__icon {
    display: block;
  }
  &:active {
    .close-menu__icon {
      color: $primary;
    }
  }
  @media (max-width: 1024px) {
    display: block;
    margin-top: 32px;
  }
}

.open-search {
  cursor: pointer;
  margin-right: 18px;
  @media (max-width: 1024px) {
    font-size: 24px;
  }

  &:active,
  &:hover {
    i {
      color: $primary;
    }
  }
}

.search {
  position: absolute;
  width: 100%;
  background-color: rgba(34, 34, 34, 0.5);
  backdrop-filter: blur(12px);
  left: 50%;
  top: -100%;
  transform: translateX(-50%);
  padding: 32px 0;
  transition: 0.3s;
  opacity: 0;
  box-shadow: inset 0 4px 8px 0px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  &--show {
    top: $nav-height;
    opacity: 1;
    pointer-events: initial;
  }

  .search-bar {
    width: 100%;
  }

  .close-search {
    height: inherit;
    border: none;
    background-color: transparent;
    justify-content: center;
    align-items: center;
    padding: 0 12px;
    color: $white;
    cursor: pointer;
    transition: 0.3s;
    border-radius: 50%;
    margin-left: 16px;
    font-size: 24px;
    &__icon {
      display: block;
    }

    &:active,
    &:hover {
      .close-search__icon {
        color: $primary;
      }
    }
  }
}
</style>
