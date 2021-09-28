<template>
  <section class="movie-cards">
    <div class="container">
      <div class="list-heading">
        <h2 class="list-title">{{ title }}</h2>
        <NuxtLink :to="`/${linkTo}`" class="show-more"
          >查看全部 <i class="ri-arrow-right-s-line"></i
        ></NuxtLink>
      </div>
      <div class="content">
        <h3 v-for="movie in data" :key="movie.id">{{ movie.title }}</h3>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    linkTo: {
      type: String,
      default: '',
    },
    data: {
      default() {
        return []
      },
      type: Array,
    },
  },
}
</script>

<style lang="scss" scoped>
.movie-cards {
  padding: 80px 0;
  .list-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    .list-title {
      font-size: 32px;
      font-weight: 700;
      color: $text-white;
      display: inline-block;
      vertical-align: middle;
      border-left: 4px solid $primary-color;
      padding-left: 16px;
    }
    .show-more {
      color: $text-white;
      font-weight: 600;
      display: flex;
      align-items: center;
      &:hover {
        color: $primary-color;
      }
      i {
        font-size: 16px;
        display: inline-block;
        margin-left: 6px;
        &:hover {
          color: $primary-color;
        }
      }
    }
  }

  .content {
    width: 100%;
    background-color: #111;
    border-radius: 4px;
    height: 100px;
  }
}
</style>
