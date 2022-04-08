<template>
  <div class="movies-list-wrapper flex flex-fd-c">
    <ShowShowcase :chosen-category="activeCategory" />
    <ShowsList
      :chosen-page="chosenPage"
      :chosen-category="activeCategory"
      @show-button="$emit('show-button', false)"
    />
  </div>
</template>

<script>
import ShowShowcase from "./ShowShowcase.vue";
import ShowsList from "./ShowsList.vue";

export default {
  name: "TheMovies",
  emits: ["activated-side", "show-button"],
  props: ["chosenCategory"],
  components: {
    ShowShowcase,
    ShowsList,
  },
  data() {
    return {
      chosenPage: null,
      activeCategory: this.chosenCategory,
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
    this.$emit("activated-side", "shows");
  },
  updated() {
    // get the page number from the route's query parameter
    const newPage = +this.$route.query.page;
    this.chosenPage = newPage;
  },
};
</script>