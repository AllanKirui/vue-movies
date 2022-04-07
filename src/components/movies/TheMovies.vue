<template>
  <div class="movies-list-wrapper flex flex-fd-c">
    <MovieShowcase :chosen-category="activeCategory" />
    <MoviesList
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
  emits: ["activated-side", "show-button"],
  props: ["chosenCategory"],
  components: {
    MovieShowcase,
    MoviesList,
  },
  data() {
    return {
      chosenPage: null,
      activeCategory: "popular", // default category is popular movie/tv shows
    };
  },
  watch: {
    chosenCategory(newValue) {
      if (newValue) {
        this.activeCategory = newValue;
      }
    },
  },
  beforeMount() {
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