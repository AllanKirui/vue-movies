<template>
  <div class="showcase-wrapper">
    <Carousel v-if="!isLoading" :settings="settings">
      <Slide v-for="movie in results" :key="movie.id">
        <div class="carousel__item">
          <!-- movie poster -->
          <div class="showcase__poster">
            <img
              v-if="movie.backdrop_path"
              :src="setBackdropPath(movie.backdrop_path)"
              :alt="`poster image for ${movie.title}`"
              class="poster-img"
            />
          </div>

          <!-- movie text -->
          <div class="showcase__info">
            <h2 class="showcase__info-title">
              {{ movie.title }}
            </h2>

            <div class="meta">
              <div class="meta-section-1 flex">
                <!-- movie rating -->
                <p class="showcase__info-rating">
                  <img
                    src="../../assets/rating-icon.svg"
                    width="15"
                    height="14.4"
                    alt="star icon"
                  />{{ movie.vote_average }}
                </p>
                <!-- movie release date -->
                <p v-if="movie.release_date" class="showcase__info-date">
                  {{ setDate(movie.release_date) }}
                </p>
                <p v-else class="showcase__info-date">n/a</p>
              </div>

              <!-- movie overview -->
              <div class="meta-section-2">
                <p v-if="movie.overview" class="showcase__info-overview">
                  {{ setOverviewLength(movie.overview, overviewLength) }}
                </p>
                <p v-else class="showcase__info-overview">n/a</p>
              </div>

              <!-- more info button -->
              <router-link
                :to="setMovieInfoRoute(movie.title, movie.id)"
                :title="movie.title"
                >View Info</router-link
              >
            </div>
          </div>
        </div>
      </Slide>

      <template #addons>
        <!-- <Navigation /> -->
        <Pagination />
      </template>
    </Carousel>
    <div v-else style="color: #fff">Loading...</div>
  </div>
</template>

<script>
import apiKey from "../../../config.js";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

export default {
  name: "MovieShowcase",
  inject: [
    "setBackdropPath",
    "setDate",
    "setOverviewLength",
    "setMovieInfoRoute",
  ],
  components: { Carousel, Pagination, Slide },
  data() {
    return {
      isLoading: false,
      results: [],
      settings: {
        // carousel settings
        wrapAround: true,
        itemsToShow: 1.25,
        snapAlign: "center",
        autoplay: 8000, // 8 second duration
      },
      overviewLength: 300, // to show 300 characters for overview
    };
  },
  methods: {
    async getMovies() {
      this.isLoading = true;
      const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US`;

      // perform resets before a new fetch request
      this.searchResults = [];

      // fetch data
      const response = await fetch(url);
      const data = await response.json();

      this.isLoading = false;
      this.checkResults(data.results);
    },
    checkResults(results) {
      // only get the first 8 movies
      if (results.length > 8) {
        for (let i = 0; i < 8; i++) {
          this.results.push(results[i]);
        }
      } else {
        this.results.push(results);
      }
    },
  },
  beforeMount() {
    this.getMovies();
  },
};
</script>

<style>
.carousel__slide {
  padding: 0 10px 10px;
  position: relative;
}

.carousel__item {
  max-height: calc(95vh - 5rem);
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.carousel__slide > .carousel__item {
  transform: scale(0.92);
}

.carousel__slide--active > .carousel__item {
  transform: scale(1);
}

.carousel__slide > .carousel__item .showcase__info {
  visibility: hidden;
}

.carousel__slide--active > .carousel__item .showcase__info {
  visibility: visible;
}

.carousel__pagination {
  margin-top: -2rem;
  position: relative;
  top: 0;
}

.carousel__pagination-button {
  width: 5px;
  height: 8px;
  border-radius: 50px;
  background-color: var(--color-spanish-gray);
}

.carousel__pagination-button.carousel__pagination-button--active {
  background-color: var(--color-white);
}

.showcase__poster img {
  width: 100%;
  object-fit: cover;
}

.showcase__info {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  min-height: 30%;
  padding: 0.875rem 1rem;
  background: rgba(0, 0, 0, 0.75);
  text-shadow: 1px 1px 2px var(--color-jet-black);
}

.showcase__info-title {
  text-align: left;
  margin-bottom: 0.5rem;
}

.showcase__info-rating {
  margin-right: 1rem;
}

.showcase__info-rating img {
  margin-right: 0.3125rem;
}

.meta {
  font-size: var(--font-size-18);
  text-align: left;
  color: var(--color-white);
}

.meta .meta-section-1 {
  margin-bottom: 1rem;
}

.meta .meta-section-2 {
  width: 90%;
  margin-bottom: 1rem;
}

.meta a {
  padding: 8px 12px;
  border-radius: 5px;
  font-size: var(--font-size-14);
  /* font-weight: bold; */
  background-color: var(--color-smokey-black);
  color: var(--color-clouds);
  cursor: pointer;
  text-shadow: none;
  transition: all 0.15s ease-in-out;
}

.meta a:hover {
  color: var(--color-smokey-black);
  background-color: var(--color-clouds);
}
</style>