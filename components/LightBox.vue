<template>
  <div class="light-box">
    <div v-loading class="original-image">
      <img
        class="original-image__image"
        :src="`https://image.tmdb.org/t/p/original${url}`"
      />
    </div>
    <div class="close-btn" @click="$emit('closeLightBox')">
      <i class="ri-close-line"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LightBox',
  props: {
    url: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.light-box {
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.close-btn {
  font-size: 50px;
  color: $white;
  font-weight: 300;
  position: absolute;
  top: 32px;
  right: 32px;
  cursor: pointer;
  &:hover {
    color: $primary;
  }
  @media screen and (max-width: 480px) {
    top: 16px;
    right: 16px;
    font-size: 36px;
  }
}
.original-image {
  width: 100vw;
  height: 100vh;
  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
