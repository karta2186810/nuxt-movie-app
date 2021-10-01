<template>
  <div class="loadingImg flex">
    <img src="@/assets/images/loading.svg" />
  </div>
</template>

<script>
export default {
  name: 'LoadingImg',
}
</script>

<style lang="scss" scoped>
.loadingImg {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
}
</style>
