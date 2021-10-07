<template>
  <BoxCenter class="image-default">
    <slot>
      <i class="ri-image-2-fill"></i>
    </slot>
  </BoxCenter>
</template>

<script>
export default {
  name: 'ImageDefault',
}
</script>

<style lang="scss" scoped>
.image-default {
  font-size: 120px;
  color: $text-gray;
  background-color: $color-black-alt;
}
</style>
