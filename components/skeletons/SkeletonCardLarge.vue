<template>
  <Card v-show="show" class="skeleton-card-large">
    <Skeleton type="square" class="skeleton-card-large__image" />
    <div class="pa-16 skeleton-info">
      <Skeleton type="title" class="skeleton-card-large__title" />
      <Skeleton type="article" class="skeleton-card-large__article" />
      <Skeleton type="article" class="skeleton-card-large__article" />
    </div>
  </Card>
</template>

<script>
export default {
  name: 'SkeletonCardLarge',
  data() {
    return {
      show: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.show = true
    }, 300)
  },
}
</script>

<style lang="scss" scoped>
.skeleton-card-large {
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  overflow: hidden;
  @media (max-width: 1024px) {
    flex-direction: row;
    height: 225px;
  }
  @media (max-width: 480px) {
    height: 150px;
  }
  &__image {
    min-height: 300px;
    @media (max-width: 1024px) {
      min-height: auto;
      height: 100%;
      min-width: 150px;
      width: 150px;
    }
    @media (max-width: 480px) {
      min-width: 100px;
      width: 100px;
    }
  }
}

.skeleton-info {
  flex: 1;
}
</style>
