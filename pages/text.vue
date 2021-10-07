<template>
  <div class="text">
    <SearchBar v-model="inputVal"></SearchBar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputVal: '',
    }
  },
}
</script>

<style lang="scss">
.text {
  margin-top: 100px;
  background-color: $color-black;
}
</style>
