<template>
  <div class="nav">
    <Container>
      <SingleCenter justify="between">
        <div class="nav__logo">
          <NuxtLink class="link" to="/">Nuxt Movie</NuxtLink>
        </div>
        <div class="menu-container flex">
          <div class="menu flex" :class="{ show: showMenu }">
            <NuxtLink
              class="link"
              to="/movies/nowPlaying"
              @click.native="linkClick"
            >
              現正熱映
            </NuxtLink>
            <NuxtLink
              class="link"
              to="/movies/popular"
              @click.native="linkClick"
            >
              熱門電影
            </NuxtLink>
            <NuxtLink
              class="link"
              to="/movies/topRated"
              @click.native="linkClick"
            >
              最高評分
            </NuxtLink>
            <NuxtLink
              class="link"
              to="/movies/upcoming"
              @click.native="linkClick"
            >
              即將上映
            </NuxtLink>
            <div class="close-menu" @click="closeMenu">
              <i class="ri-close-line"></i>
            </div>
          </div>
          <div class="open-search" @click="openSearch">
            <i class="ri-search-line"></i>
          </div>
          <div class="open-menu" @click="openMenu">
            <i class="ri-menu-3-line"></i>
          </div>
        </div>
      </SingleCenter>
    </Container>
    <div class="search" :class="{ show: showSearch }">
      <div class="container">
        <div class="search-bar flex">
          <input
            v-model="searchVal"
            type="text"
            class="search-input"
            placeholder="開始探索"
            @keyup.enter="searchMovie"
          />
          <button class="search-button flex" @click="searchMovie">
            <i class="ri-search-line"></i>
          </button>
        </div>
        <button class="close-search flex" @click="closeSearch">
          <i class="ri-close-line"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      showMenu: false,
      showSearch: false,
      searchVal: '',
    }
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
    },
  },
}
</script>

<style lang="scss" scoped>
.nav {
  background-color: rgba(34, 34, 34, 0.5);
  color: $text-white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $nav-height;
  z-index: 1000;
  box-shadow: 0 6px 8px 0px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(12px);

  &__logo {
    .link {
      color: $color-primary;
    }
  }
  .menu-container {
    justify-content: center;
    align-items: center;
    column-gap: 18px;
    height: 100%;
    .menu {
      align-items: center;
      transition: 0.4s;
      height: 100%;
      @media screen and (max-width: 768px) {
        position: fixed;
        top: -100%;
        left: 0;
        flex-direction: column;
        align-items: center;
        padding: 32px 0;
        width: 100%;
        background-color: $color-black;
        opacity: 0;
        height: auto;
        pointer-events: none;
        &.show {
          top: 0;
          opacity: 1;
          pointer-events: initial;
        }
      }
      .link {
        display: inline-block;
        font-weight: bolder;
        height: 100%;
        color: $text-white;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 16px;
        transition: 0.3s;
        position: relative;
        overflow: hidden;
        font-size: 14px;
        @media screen and (max-width: 768px) {
          font-size: 20px;
        }
        &::before {
          content: '';
          display: block;
          width: 100%;
          height: 100%;
          background-color: $color-primary;
          position: absolute;
          bottom: -100%;
          left: 0;
          z-index: -1;
          transition: 0.3s;
        }
        &.nuxt-link-active {
          background-color: $color-primary;
          color: $text-black;
        }
        &:hover {
          color: $text-black;
          &::before {
            bottom: 0;
          }
        }
        @media screen and (max-width: 768px) {
          width: 100%;
          padding: 16px;
        }
      }
      .close-menu {
        display: none;
        font-size: 32px;
        cursor: pointer;
        i {
          display: block;
        }
        @media screen and (max-width: 768px) {
          display: block;
          margin-top: 32px;
        }
      }
    }
    .open-search {
      cursor: pointer;
      &:active,
      &:hover {
        i {
          color: $color-primary;
        }
      }
      @media screen and (max-width: 768px) {
        font-size: 24px;
      }
    }
    .open-menu {
      font-size: 32px;
      display: none;
      cursor: pointer;
      i {
        display: block;
      }
      @media screen and (max-width: 768px) {
        display: block;
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
    &.show {
      top: $nav-height;
      opacity: 1;
      pointer-events: initial;
    }
    .search-bar {
      width: 100%;
      .search-input {
        background-color: $text-white;
        outline: none;
        border: none;
        color: $text-black;
        padding: 8px 16px;
        transition: 0.3s;
        flex: 1;
        border-radius: 4px 0 0 4px;
      }
      .search-button {
        height: inherit;
        border: none;
        background-color: $color-black-alt;
        justify-content: center;
        align-items: center;
        padding: 0 12px;
        color: $text-white;
        cursor: pointer;
        transition: 0.3s;
        border-radius: 0 4px 4px 0;
        &:hover {
          background-color: $color-primary;
          color: $text-black;
        }
      }
    }
    .close-search {
      height: inherit;
      border: none;
      background-color: transparent;
      justify-content: center;
      align-items: center;
      padding: 0 12px;
      color: $text-white;
      cursor: pointer;
      transition: 0.3s;
      border-radius: 50%;
      margin-left: 16px;
      font-size: 24px;
      i {
        display: block;
      }
      &:active,
      &:hover {
        i {
          color: $color-primary;
        }
      }
    }
  }
}
</style>
