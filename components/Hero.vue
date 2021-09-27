<template>
  <div class="hero">
    <div class="bg-video">
      <video autoplay muted loop src="@/assets/videos/hero-video-2.mp4"></video>
      <div class="video-filter"></div>
    </div>
    <div class="hero-info">
      <h1 class="hero-title">Nuxt Movie</h1>
      <p class="hero-description">上百萬部電影和人物在等你探索。立即瀏覽吧！</p>
      <button class="hero-button">現正上映</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hero',
}
</script>

<style lang="scss" scoped>
.hero {
  width: 100%;
  height: 100vh;
  position: relative;
  .bg-video {
    width: 100%;
    height: 100%;
    position: relative;
    video {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    .video-filter {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
  .hero-info {
    position: absolute;
    left: 30%;
    top: 50%;
    transform: translate(-50%, -50%);
    .hero-title {
      color: $text-white;
      font-size: 72px;
      margin-bottom: 32px;
    }
    .hero-description {
      color: $text-white;
      font-size: 24px;
      font-weight: 600;
    }
    .hero-button {
      background-color: $primary-color;
      color: $text-black;
      font-size: 16px;
      font-weight: 500;
      border: none;
      padding: 12px 24px;
      border-radius: 40px;
      cursor: pointer;
      margin-top: 32px;
      &:hover {
        background-color: $primary-color-alt;
      }
    }
  }
}
</style>
