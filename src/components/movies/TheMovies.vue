<template>
  <div class="movies-list-wrapper flex flex-fd-c">
    <MovieShowcase
      :chosen-page="showcasePage"
      :chosen-category="activeCategory"
      @loading-status="setLoadingStatus"
    />
    <MoviesList
      :is-loaded="isShowcaseLoaded"
      :chosen-page="chosenPage"
      :chosen-category="activeCategory"
      @show-button="$emit('show-button', false)"
    />
  </div>
</template>

<script>
import MovieShowcase from "./MovieShowcase.vue";
import MoviesList from "./MoviesList.vue";

export default {
  name: "TheMovies",
  emits: ["activated-side", "show-button", "update-category"],
  props: ["chosenCategory"],
  components: {
    MovieShowcase,
    MoviesList,
  },
  data() {
    return {
      chosenPage: null,
      activeCategory: this.chosenCategory,
      isShowcaseLoaded: null,
      showcasePage: null,
    };
  },
  methods: {
    setLoadingStatus(status) {
      this.isShowcaseLoaded = status;
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
    // get the value of the category prop from the active route and emit the value
    const newCategory = this.$route.query.category;
    this.activeCategory = newCategory;
    this.$emit("update-category", this.activeCategory);
    // emit a custom event that sets active styling on the header links
    this.$emit("activated-side", "movies");
  },
  updated() {
    // get the page number from the route's query parameter
    const newPage = +this.$route.query.page;
    this.chosenPage = newPage;
  },
};
</script>