<template>
  <div v-if="!isConnectionError" class="movies-list-wrapper flex flex-fd-c">
    <MovieShowcase
      :chosen-page="showcasePage"
      :chosen-category="activeCategory"
      @loading-status="setLoadingStatus"
      @connection-error="setConnectionStatus"
    />
    <MoviesList
      :is-loaded="isShowcaseLoaded"
      :chosen-page="chosenPage"
      :chosen-category="activeCategory"
      @show-button="$emit('show-button', false)"
      @connection-error="setConnectionStatus"
    />
  </div>
</template>

<script>
import MovieShowcase from "./MovieShowcase.vue";
import MoviesList from "./MoviesList.vue";

export default {
  name: "TheMovies",
  emits: [
    "activated-side",
    "show-button",
    "update-category",
    "connection-error",
  ],
  props: ["chosenCategory"],
  components: {
    MovieShowcase,
    MoviesList,
  },
  data() {
    return {
      chosenPage: null,
      activeCategory: this.chosenCategory,
      defaultCategory: "popular",
      isShowcaseLoaded: null,
      showcasePage: null,
      isConnectionError: false,
    };
  },
  methods: {
    setLoadingStatus(status) {
      this.isShowcaseLoaded = status;
    },
    setConnectionStatus(status) {
      this.isConnectionError = status;
      this.$emit("connection-error", status);
    },
  },
  watch: {
    chosenCategory(newValue) {
      if (newValue) {
        this.activeCategory = newValue;
      }
    },
    chosenPage(newValue) {
      if (newValue) {
        // Add 1 so that movie showcase is showing 1 page ahead of the movie list below
        this.showcasePage = newValue + 1;
      }
    },
  },
  beforeMount() {
    // get stored app states from local storage
    const retrievedState = JSON.parse(localStorage.getItem("appState"));
    // if there's no stored app states
    if (!retrievedState) {
      // get the value of the category prop from the active route
      const newCategory = this.$route.query.category;
      this.activeCategory = newCategory ? newCategory : this.defaultCategory;
      // emit custom events to carry the category and active side data
      this.$emit("update-category", this.activeCategory);
      this.$emit("activated-side", "movies");
      return;
    }
    // otherwise use the stored app states
    const retrievedCategory = retrievedState.lastActiveCategory;
    this.activeCategory = retrievedCategory
      ? retrievedCategory
      : this.defaultCategory;
    // emit custom events to carry the category and active side data
    this.$emit("update-category", this.activeCategory);
    this.$emit("activated-side", "movies");
  },
  updated() {
    // get the page number from the route's query parameter
    const newPage = +this.$route.query.page;
    this.chosenPage = newPage;
  },
};
</script>