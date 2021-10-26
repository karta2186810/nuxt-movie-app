<template>
  <BoxCenter
    class="scroll-to-top"
    :class="{ 'scroll-to-top--show': isScrolled }"
    @click="toTop"
  >
    <i class="ri-arrow-up-s-line scroll-to-top__icon"></i>
  </BoxCenter>
</template>

<script>
export default {
  name: 'ScrollToTop',
  data() {
    return {
      isScrolled: false,
    }
  },
  mounted() {
    document.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      if (document.documentElement.scrollTop > window.innerHeight) {
        this.isScrolled = true
      } else {
        this.isScrolled = false
      }
    },
    toTop() {
      document.documentElement.scroll(0, 0)
    },
  },
}
</script>

<style lang="scss" scoped>
.scroll-to-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 10;
  background-color: $black-alt;
  width: 48px;
  height: 48px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
  opacity: 0;
  pointer-events: none;
  &--show {
    opacity: 1;
    pointer-events: initial;
  }
  &:hover,
  &:active {
    background-color: $primary;
    .scroll-to-top__icon {
      color: $text-black;
    }
  }
  &__icon {
    color: $white;
    font-size: 32px;
  }
}
</style>
