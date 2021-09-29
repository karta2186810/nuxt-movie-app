<template>
  <div class="home">
    <Hero />
    <div class="movie-cards-container">
      <MovieCards id="nowPlaying" title="現正熱映" data-type="nowPlaying" />
      <MovieCards title="熱門電影" data-type="popular" />
      <MovieCards title="最高評分" data-type="topRated" sort-by="rated" />
      <MovieCards title="即將上映" data-type="upcoming" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style lang="scss" scoped>
.movie-cards-container {
  padding-top: 120px;
  background-color: $black-color;
}
</style>
