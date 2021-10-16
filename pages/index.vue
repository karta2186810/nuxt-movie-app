<template>
  <div class="home">
    <Hero />
    <div class="movies">
      <MovieCards id="nowPlaying" title="現正熱映" data-type="nowPlaying" />
      <MovieCards title="熱門電影" data-type="popular" />
      <MovieCards title="最高評分" data-type="topRated" />
      <MovieCards title="即將上映" data-type="upcoming" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  scrollToTop: false,
}
</script>

<style lang="scss" scoped>
.movies {
  padding-top: 120px;
  @media (max-width: 480px) {
    padding-top: 60px;
  }
}
</style>
