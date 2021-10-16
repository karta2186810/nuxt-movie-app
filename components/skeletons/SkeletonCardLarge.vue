<template>
  <Card class="skeleton-card--large">
    <Skeleton type="square" class="skeleton-card__image" />
    <div class="pa-16 skeleton-info">
      <Skeleton type="title" />
      <Skeleton type="article" />
    </div>
  </Card>
</template>

<script>
export default {
  name: 'SkeletonCardLarge',
}
</script>

<style lang="scss" scoped deep>
.skeleton-card--large {
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
}
.skeleton--square {
  min-height: 300px;
  @media (max-width: 1024px) {
    min-height: auto;
    height: 100%;
    width: 150px;
  }
  @media (max-width: 480px) {
    width: 100px;
  }
}
.skeleton-info {
  flex: 1;
}
</style>
