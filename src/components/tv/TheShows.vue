<template>
  <div class="movies-list-wrapper flex flex-fd-c">
    <ShowsList
      :chosen-page="chosenPage"
      @show-button="$emit('show-button', false)"
    />
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
  data() {
    return {
      chosenPage: null,
    };
  },
  beforeMount() {
    // emit a custom event that sets active styling on the header links
    this.$emit("activated-side", "shows");
  },
  updated() {
    // get the page number from the route's query parameter
    const newPage = +this.$route.query.page;
    this.chosenPage = newPage;
  },
};
</script>