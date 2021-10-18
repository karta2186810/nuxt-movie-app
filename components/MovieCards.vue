<template>
  <section class="movie-cards">
    <Container>
      <div class="cards-heading">
        <NuxtLink :to="`/movies/${dataType}`" class="cards-heading__title flex">
          <h2>{{ title }}</h2>
          <i class="ri-arrow-right-s-line"></i>
        </NuxtLink>
      </div>

      <div v-if="$fetchState.pending" class="content-loading">Loading</div>
      <div v-else-if="$fetchState.error" class="content-fallback">
        Opps, Something went wrong
      </div>

      <Slider class="card-slider">
        <SingleCenter class="card-group">
          <Card
            v-for="movie in movies"
            :key="movie.id"
            class="movie-card pointer"
            @click="toMovieDetail(movie.id)"
          >
            <div v-loading class="movie-poster">
              <img
                v-if="movie.poster_path"
                class="movie-poster__img"
                :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`"
                :alt="movie.title"
              />
              <ImageDefault class="movie-poster"></ImageDefault>
            </div>
            <div class="movie-info">
              <h3 class="movie-info__title">
                {{ movie.title }}
              </h3>
              <p class="movie-info__release-date">{{ movie.release_date }}</p>
            </div>
            <div class="movie-info__rated"></div>
          </Card>
          <div class="card-group__spacer"></div>
        </SingleCenter>
      </Slider>
    </Container>
  </section>
</template>

<script>
import http from '@/utils/http.js'
export default {
  props: {
    title: {
      type: String,
      default: '',
      required: true,
    },
    dataType: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      movies: [],
      voteCount: '',
      sortBy: 'popularity',
    }
  },
  async fetch() {
    const map = {
      nowPlaying: 'now_playing',
      topRated: 'top_rated',
      upcoming: 'upcoming',
      popular: 'popular',
    }
    const type = map[this.dataType]
    const result = await http.get(`movie/${type}?page=1`)
    this.movies = result.data.results
  },
  methods: {
    toMovieDetail(id) {
      this.$router.push(`/movieDetail/${id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.movie-cards {
  padding-bottom: 80px;
}

.cards-heading {
  margin-bottom: 16px;
  &__title {
    font-size: 28px;
    font-weight: 700;
    color: $white;
    vertical-align: middle;
    padding-left: 16px;
    position: relative;
    transition: 0.3s;
    &::before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 4px;
      background-color: $primary;
      border-radius: 4px;
    }
    &:hover {
      color: $primary;
    }
  }
}

.card-slider {
  &::v-deep .slider__content {
    padding: 8px 0;
    padding-bottom: 16px;
  }
  &::v-deep .gradient-left,
  .gradient-right {
    top: 8px;
  }
}

.card-group {
  flex-wrap: nowrap;
  &__spacer {
    min-width: 16px;
    height: 200px;
  }
}

.movie-card {
  min-width: 150px;
  width: 150px;
  position: relative;
  overflow: hidden;
  margin-right: 16px;
  &:hover {
    .movie-poster__img {
      transform: scale(1.1);
    }
    .movie-info__title {
      color: $primary;
    }
  }
}

.movie-poster {
  width: 100%;
  height: 225px;
  overflow: hidden;
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.3s;
  }
}

.movie-info {
  width: 100%;
  padding: 12px;
  &__title {
    @include ellipsis(1);
    font-weight: 700;
    margin-bottom: 6px;
  }
  &__release-date {
    font-size: 14px;
    font-weight: 100;
    color: $text-gray;
  }
}
</style>
