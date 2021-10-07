<template>
  <div class="slider">
    <div class="slider__content" @scroll="handleScroll">
      <slot></slot>
    </div>
    <div
      class="gradient-left gradient"
      :class="{ 'gradient--show': rightmost }"
    ></div>
    <div
      class="gradient-right gradient"
      :class="{ 'gradient--show': leftmost }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  data() {
    return { leftmost: true, rightmost: false }
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
.slider {
  position: relative;
  &__content {
    width: 100%;
    height: auto;
    color: $text-white;
    overflow-x: scroll;
    padding: 8px 32px;
    padding-bottom: 16px;
    @media screen and (max-width: 480px) {
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
  }
}

.gradient {
  height: 100%;
  width: 200px;
  position: absolute;
  opacity: 0;
  transition: 0.3s;
  pointer-events: none;
  @media screen and (max-width: 768px) {
    width: 48px;
  }
  &--show {
    opacity: 1;
  }
  &-left {
    top: 8px;
    left: 0;
    background: linear-gradient(-90deg, transparent, $color-black);
  }
  &-right {
    top: 8px;
    right: 0;
    background: linear-gradient(90deg, transparent, $color-black);
  }
}
</style>
