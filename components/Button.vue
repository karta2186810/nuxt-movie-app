<template>
  <button
    class="button"
    :class="type ? 'button--' + type : ''"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'primary',
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  padding: 8px 16px;
  font-size: 20px;
  font-weight: 500;
  color: $text-black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  &--primary {
    background-color: $primary;
    &:hover {
      background-color: $primary-alt;
    }
  }
  &--disabled {
    background-color: $black-alt;
    pointer-events: none;
  }
}
</style>
