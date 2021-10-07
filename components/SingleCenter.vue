<template>
  <div
    class="single-center"
    :class="
      (direction ? 'single-center--' + direction : '',
      justify ? 'single-center--' + justify : '')
    "
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SingleCenter',
  props: {
    direction: {
      type: String,
      default: 'row',
    },
    justify: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.single-center {
  display: flex;
  align-items: center;
  &--row {
    flex-direction: row;
  }
  &--col {
    flex-direction: column;
  }
  &--start {
    justify-content: flex-start;
  }
  &--end {
    justify-content: flex-end;
  }
  &--between {
    justify-content: space-between;
  }
  &--center {
    justify-content: center;
  }
  &--around {
    justify-content: space-around;
  }
  &--evenly {
    justify-content: space-evenly;
  }
}
</style>
