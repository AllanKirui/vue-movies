<template>
  <div class="movies-list-wrapper flex flex-fd-c">
    <ShowsList :page-num="activePage" />
  </div>
</template>

<script>
import ShowsList from "./tv/ShowsList.vue";

export default {
  name: "TheMovies",
  components: {
    ShowsList,
  },
  emits: ["activated-side"],
  data() {
    return {
      activePage: null,
    };
  },
  beforeMount() {
    // emit a custom event that sets active styling on the header links
    this.$emit("activated-side", "shows");
  },
  updated() {
    let newPage = +this.$route.query.page;
    this.activePage = newPage;
  },
};
</script>