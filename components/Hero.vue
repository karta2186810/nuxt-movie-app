<template>
  <div class="hero">
    <div class="bg-video">
      <video autoplay muted loop src="@/assets/videos/hero-video-2.mp4"></video>
      <div class="video-filter"></div>
    </div>
    <div class="hero-info">
      <h1 class="hero-title">Nuxt Movie</h1>
      <p class="hero-description">
        上百萬部電影和人物在等你。<br />馬上開始探索吧！
      </p>
      <a class="hero-button" href="#nowPlaying">開始探索</a>
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
      background: linear-gradient(
        -180deg,
        rgba(0, 0, 0, 0.4) 75%,
        $black-color 100%
      );
    }
  }
  .hero-info {
    position: absolute;
    left: 30%;
    top: 50%;
    transform: translate(-50%, -50%);
    @media screen and (max-width: 768px) {
      left: 30%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
    }
    @media screen and (max-width: 640px) {
      width: 100%;
      left: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .hero-title {
      color: $text-white;
      font-size: 72px;
      margin-bottom: 32px;
      @media screen and (max-width: 768px) {
        font-size: 60px;
      }
      @media screen and (max-width: 640px) {
        font-size: 54px;
        text-align: center;
      }
    }
    .hero-description {
      color: $text-white;
      font-size: 24px;
      font-weight: 600;
      line-height: 1.5;
      @media screen and (max-width: 768px) {
        font-size: 20px;
      }
      @media screen and (max-width: 640px) {
        text-align: center;
      }
    }
    .hero-button {
      display: inline-block;
      background-color: $primary-color;
      color: $text-black;
      font-size: 16px;
      font-weight: 800;
      border: none;
      padding: 12px 24px;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 32px;
      &:hover {
        background-color: $primary-color-alt;
      }
    }
  }
}
</style>
