<template>
  <div class="skeleton-detail-card">
    <Skeleton type="square" class="skeleton-detail-card__image" />
    <div class="skeleton-detail-card__info">
      <Skeleton type="title" class="skeleton-detail-card__title" />
      <Skeleton type="article" class="skeleton-detail-card__article" />
      <Skeleton type="article" class="skeleton-detail-card__article" />
      <div class="skeleton-detail-card__description">
        <div>
          <Skeleton type="avatar" class="skeleton-detail-card__rated" />
        </div>
        <div class="skeleton-detail-card__overview">
          <Skeleton type="title" class="skeleton-detail-card__title" />
          <Skeleton type="article" class="skeleton-detail-card__article" />
          <Skeleton type="article" class="skeleton-detail-card__article" />
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

<style lang="scss" scoped>
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

  &__image {
    width: 250px !important;
    height: 375px !important;
    border-radius: 4px;
    @media (max-width: 1024px) {
      margin-bottom: 16px;
    }
    @media (max-width: 768px) {
      width: 150px !important;
      height: 225px !important;
    }
    @media (max-width: 480px) {
      width: 100px !important;
      height: 150px !important;
      margin-bottom: 16px;
    }
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
    }
  }
  &__overview {
    flex: 1;
    margin-left: 30px;
    @media (max-width: 1024px) {
      margin-left: 0;
      margin-top: 30px;
      background-color: $card-color;
      padding: 16px;
      border-radius: 4px;
    }
  }
  &__title {
    @media (max-width: 1024px) {
      margin-left: auto;
      margin-right: auto;
    }
  }
  &__rated {
    @media (max-width: 1024px) {
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
