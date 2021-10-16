<template>
  <div class="skeleton-detail-card">
    <Skeleton type="square" />
    <div class="skeleton-detail-card__info">
      <Skeleton type="title" />
      <Skeleton type="article" />
      <Skeleton type="article" />
      <div class="skeleton-detail-card__description">
        <div>
          <Skeleton type="avatar" />
        </div>
        <div class="skeleton-detail-card__overview">
          <Skeleton type="title" />
          <Skeleton type="article" />
          <Skeleton type="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonDetailCard',
}
</script>

<style lang="scss" scoped deep>
.skeleton-detail-card {
  display: flex;
  padding: 30px;
  margin-top: 40px;
  background-color: $card-color;
  border-radius: 4px;
  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 0 16px;
    box-shadow: none;
    background-color: transparent;
    margin: 0;
    margin-top: 16px;
  }

  &__info {
    flex: 1;
    padding: 0 30px;
    @media (max-width: 1024px) {
      padding: 0;
      margin-top: 32px;
    }
  }
  &__description {
    display: flex;
    margin-top: 30px;
    @media (max-width: 1024px) {
      flex-direction: column;
      background-color: $card-color;
      padding: 16px;
      border-radius: 4px;
    }
  }
  &__overview {
    flex: 1;
    margin-left: 30px;
    @media (max-width: 1024px) {
      margin-left: 0;
      margin-top: 30px;
    }
  }
}
.skeleton--title {
  @media (max-width: 1024px) {
    margin-left: auto;
    margin-right: auto;
  }
}
.skeleton--avatar {
  @media (max-width: 1024px) {
    margin-left: auto;
    margin-right: auto;
  }
}
.skeleton--square {
  width: 250px;
  height: 375px;
  border-radius: 4px;
  @media (max-width: 1024px) {
    margin-bottom: 16px;
  }
  @media (max-width: 768px) {
    width: 150px;
    height: 225px;
  }
  @media (max-width: 480px) {
    width: 100px;
    height: 150px;
    margin-bottom: 16px;
  }
}
</style>
