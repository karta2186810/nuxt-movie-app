<template>
  <div class="card radius-4" @click="$emit('click', $event)">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
}
</script>

<style lang="scss" scoped>
.card {
  background-color: $card-color;
  cursor: pointer;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
}
</style>
