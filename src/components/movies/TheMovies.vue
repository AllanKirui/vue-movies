<template>
  <div class="movies-list-wrapper flex flex-fd-c">
    <MovieShowcase />
    <MoviesList
      :chosen-page="chosenPage"
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
  components: {
    MovieShowcase,
    MoviesList,
  },
  data() {
    return {
      chosenPage: null,
    };
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