<template>
  <div class="box-center" @click="$emit('click')">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BoxCenter',
}
</script>

<style lang="scss" scoped>
.box-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
