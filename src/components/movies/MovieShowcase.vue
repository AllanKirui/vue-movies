<template>
  <div v-if="!isLoading" class="showcase-wrapper">
    <!-- show the data once we're done loading and we have results -->
    <Carousel v-if="results.length !== 0" :settings="carouselSettings">
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
            <img
              v-else
              src="../../assets/showcase-placeholder.png"
              alt="placeholder image"
              class="placeholder-img"
            />
            <!-- show a placeholder image before the backdrop loads -->
            <img
              v-if="movie.backdrop_path"
              src="../../assets/showcase-placeholder.png"
              alt="placeholder image"
              class="placeholder-img"
            />
          </div>

          <!-- movie text for large screens -->
          <div class="showcase__info hide-for-small">
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

        <!-- movie text for small screens -->
        <div class="mobile-info">
          <div class="showcase__info hide-for-large">
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
  components: { Carousel, Pagination, Slide, ShowcasePlaceholder },
  props: ["chosenCategory", "chosenPage"],
  emits: ["loading-status", "connection-error"],
  inject: [
    "setBackdropPath",
    "setDate",
    "setOverviewLength",
    "setMovieInfoRoute",
    "setSlidesBeforeScreenResize",
    "setSlidesAfterScreenResize",
    "setCarouselSettings",
  ],
  data() {
    return {
      isLoading: false,
      results: [],
      overviewLength: 300, // to show 300 characters for overview
      screenSize: null,
      category: null,
      defaultCategory: "popular",
      isLoaded: null,
      selectedPage: null,
      defaultPage: 2,
      hasLoadedFromHook: false, // holds a Boolean if component has been loaded in beforeMount hook
      canReload: false,
      routePage: null,
      routeCategory: null,
    };
  },
  computed: {
    carouselSettings() {
      // return settings before and after the screen has been resized
      return !this.screenSize
        ? this.setSlidesAfterScreenResize()
        : this.setSlidesBeforeScreenResize();
    },
  },
  methods: {
    async getMovies(page) {
      try {
        this.isLoaded = false;
        this.isLoading = true;
        const url = `https://api.themoviedb.org/3/movie/${this.category}?api_key=${apiKey}&language=en-US&page=${page}`;

        // perform resets before a new fetch request
        this.results = [];

        // fetch data
        const response = await fetch(url);
        const data = await response.json();

        this.isLoading = false;
        this.isLoaded = true;
        // emit a custom event to carry the loading status
        this.$emit("loading-status", this.isLoaded);
        this.checkResults(data.results);
        this.$emit("connection-error", false);
      } catch (error) {
        this.$emit("connection-error", true);
      }
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
    checkWindowSize() {
      // listen to the resize event and call the method to set the info card's position
      window.addEventListener("resize", () => {
        this.screenSize = window.innerWidth;
      });
    },
    getCategory() {
      // check if there is a chosen category, or use the default instead
      this.category = this.chosenCategory
        ? this.chosenCategory
        : this.defaultCategory;
    },
    getPage(routePage) {
      // check if there is a page from the route, selected page prop, or use the default instead
      this.selectedPage = routePage
        ? routePage
        : this.selectedPage
        ? this.selectedPage
        : this.defaultPage;
    },
  },
  watch: {
    $route(newRoute) {
      this.routePage = +newRoute.query.page;
      this.routeCategory = newRoute.query.category;

      // only allow a fetch request to be made for the first page of any
      // of the categories if the page number from the route is one.
      // This avoids duplicate requests made when navigating with the
      // back and forward buttons between the various categories
      if (
        (this.routePage === 1 && this.routeCategory === "popular") ||
        (this.routePage === 1 && this.routeCategory === "top_rated")
      ) {
        this.canReload = true;
      } else {
        this.canReload = false;
      }
    },
    chosenCategory(newValue) {
      this.getCategory();
      // only run this fetch request if the chosen page from the pagination is less
      // than 3, if there's a new category and if the canReload prop holds true
      if (this.chosenPage < 3 && newValue && this.canReload) {
        // reset the selected page when switching categories
        this.selectedPage = this.defaultPage;
        this.getMovies(this.selectedPage);
      }
    },
    chosenPage(newValue) {
      this.selectedPage = newValue;
      // if the component had already been loaded in a lifecycle hook, don't load it again
      if (this.hasLoadedFromHook && this.selectedPage === this.defaultPage)
        return;

      // if there's a new page value from within the component, reset the hasLoadedFromHook prop
      if (newValue) this.hasLoadedFromHook = false;
      this.getMovies(this.selectedPage);
    },
  },
  beforeMount() {
    // get the window's width before data is shown on the screen
    this.screenSize = window.innerWidth;
    // get the page and category from the route
    const newPage = +this.$route.query.page;
    const newCategory = this.$route.query.category;

    // when the site is first loaded set the canReload prop to true
    if (
      (newPage === 1 && newCategory === "popular") ||
      (newPage === 1 && newCategory === "top_rated")
    ) {
      this.canReload = true;
    }

    // Add 1 so that movie showcase is showing 1 page ahead of the movies list below
    this.getPage(newPage + 1);
    this.getCategory();

    // set the hasLoadedFromHook prop to true so we don't make multiple fetch requests
    this.hasLoadedFromHook = true;
    this.getMovies(this.selectedPage);
  },
  mounted() {
    // call the method after data has been loaded to the screen
    this.checkWindowSize();
  },
};
</script>