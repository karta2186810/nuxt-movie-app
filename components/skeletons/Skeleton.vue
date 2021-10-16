<template>
  <div class="skeleton" :class="`skeleton--${type}`"></div>
</template>

<script>
export default {
  name: 'Skeleton',
  props: {
    type: {
      validator(value) {
        return ['article', 'avatar', 'square', 'title'].includes(value)
      },
      default: 'article',
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.skeleton {
  background-color: $gray;
  background: linear-gradient(
      60deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 60%
    )
    $gray;
  background-size: 300% 200%;
  background-position-x: 280%;
  animation: 2s loading ease-in-out infinite;
  &--title {
    width: 50%;
    height: 20px;
    margin: 8px 0;
    border-radius: 4px;
  }
  &--article {
    width: 100%;
    height: 20px;
    margin: 8px 0;
    border-radius: 4px;
  }
  &--avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  &--square {
    width: 100%;
    height: 100%;
  }
}
@keyframes loading {
  to {
    background-position-x: -20%;
  }
}
</style>
