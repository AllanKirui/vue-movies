<template>
  <div class="movies-list-wrapper flex flex-fd-c">
    <ShowsList @show-button="$emit('show-button', false)" />
  </div>
</template>

<script>
import ShowsList from "./ShowsList.vue";

export default {
  name: "TheMovies",
  emits: ["activated-side", "show-button"],
  components: {
    ShowsList,
  },
  beforeMount() {
    // emit a custom event that sets active styling on the header links
    this.$emit("activated-side", "shows");
  },
};
</script>