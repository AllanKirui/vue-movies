<template>
  <div class="movies-list-wrapper flex flex-fd-c">
    <MoviesList @show-button="$emit('show-button', false)" />
  </div>
</template>

<script>
import MoviesList from "./MoviesList.vue";

export default {
  name: "TheMovies",
  emits: ["activated-side", "show-button"],
  components: {
    MoviesList,
  },
  beforeMount() {
    // emit a custom event that sets active styling on the header links
    this.$emit("activated-side", "movies");
  },
};
</script>