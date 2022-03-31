<template>
  <div v-if="!isLoading" class="showcase-wrapper">
    <!-- show the data once we're done loading -->
    <Carousel :settings="settings">
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
            <!-- show a placeholder image before the backdrop loads -->
            <img
              v-if="movie.poster_path"
              src="../../assets/video-placeholder.png"
              alt="placeholder image"
              class="placeholder-img"
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
                class="view-info-link"
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
  </div>

  <!-- if we're loading, show the content placeholder -->
  <ShowcasePlaceholder v-else />
</template>

<script>
import apiKey from "../../../config.js";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import ShowcasePlaceholder from "../ui/ShowcasePlaceholder.vue";

export default {
  name: "MovieShowcase",
  inject: [
    "setBackdropPath",
    "setDate",
    "setOverviewLength",
    "setMovieInfoRoute",
  ],
  components: { Carousel, Pagination, Slide, ShowcasePlaceholder },
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
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

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