<template>
  <div class="movies-list-wrapper flex flex-fd-c">
    <MoviesList />
  </div>
</template>

<script>
import MoviesList from "./movies/MoviesList.vue";

export default {
  name: "TheMovies",
  components: {
    MoviesList,
  },
};
</script>