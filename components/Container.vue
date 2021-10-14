<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Container',
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 32px;
  height: 100%;
  @media screen and (max-width: 1024px) {
    margin: 0 32px;
    padding: 0;
  }
  @media screen and (max-width: 768px) {
    margin: 0 16px;
    padding: 0;
  }
}
</style>
