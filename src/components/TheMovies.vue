<template>
  <div class="movies-list-wrapper flex flex-fd-c">
    <MoviesList :page-num="activePage" />
  </div>
</template>

<script>
import MoviesList from "./movies/MoviesList.vue";

export default {
  name: "TheMovies",
  components: {
    MoviesList,
  },
  data() {
    return {
      activePage: null,
    };
  },
  updated() {
    let newPage = +this.$route.query.page;
    this.activePage = newPage;
  },
};
</script>