<template>
  <div class="section">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Section',
}
</script>

<style lang="scss" scoped>
.section {
  min-height: 100vh;
  padding-top: 120px;
  padding-bottom: 80px;
}
</style>
