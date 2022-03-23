<template>
  <div class="movies-list-wrapper flex flex-fd-c">
    <ShowsList />
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
  beforeMount() {
    // emit a custom event that sets active styling on the header links
    this.$emit("activated-side", "shows");
  },
};
</script>