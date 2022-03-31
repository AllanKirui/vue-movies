<template>
  <div v-if="!isLoading" class="showcase-wrapper">
    <!-- show the data once we're done loading -->
    <Carousel :settings="settings">
      <Slide v-for="show in results" :key="show.id">
        <div class="carousel__item">
          <!-- tv show poster -->
          <div class="showcase__poster">
            <img
              v-if="show.backdrop_path"
              :src="setBackdropPath(show.backdrop_path)"
              :alt="`poster image for ${show.name}`"
              class="poster-img"
            />
            <!-- show a placeholder image before the backdrop loads -->
            <img
              v-if="show.poster_path"
              src="../../assets/video-placeholder.png"
              alt="placeholder image"
              class="placeholder-img"
            />
          </div>

          <!-- tv show text -->
          <div class="showcase__info">
            <h2 class="showcase__info-title">
              {{ show.name }}
            </h2>

            <div class="meta">
              <div class="meta-section-1 flex">
                <!-- tv show rating -->
                <p class="showcase__info-rating">
                  <img
                    src="../../assets/rating-icon.svg"
                    width="15"
                    height="14.4"
                    alt="star icon"
                  />{{ show.vote_average }}
                </p>
                <!-- tv show release date -->
                <p v-if="show.first_air_date" class="showcase__info-date">
                  {{ setDate(show.first_air_date) }}
                </p>
                <p v-else class="showcase__info-date">n/a</p>
              </div>

              <!-- tv show overview -->
              <div class="meta-section-2">
                <p v-if="show.overview" class="showcase__info-overview">
                  {{ setOverviewLength(show.overview, overviewLength) }}
                </p>
                <p v-else class="showcase__info-overview">n/a</p>
              </div>

              <!-- more info button -->
              <router-link
                :to="setShowsInfoRoute(show.name, show.id)"
                :title="show.name"
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
  name: "ShowShowcase",
  inject: [
    "setBackdropPath",
    "setDate",
    "setOverviewLength",
    "setShowsInfoRoute",
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
    async getShows() {
      this.isLoading = true;
      const url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`;

      // perform resets before a new fetch request
      this.searchResults = [];

      // fetch data
      const response = await fetch(url);
      const data = await response.json();

      this.isLoading = false;
      this.checkResults(data.results);
    },
    checkResults(results) {
      // only get the first 8 tv shows
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
    this.getShows();
  },
};
</script>