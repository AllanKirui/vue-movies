<template>
  <div class="movies-list-wrapper flex flex-fd-c">
    <ShowShowcase
      :chosen-category="activeCategory"
      @loading-status="setLoadingStatus"
    />
    <ShowsList
      :is-loaded="isShowcaseLoaded"
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
  emits: ["activated-side", "show-button", "update-category"],
  props: ["chosenCategory"],
  components: {
    ShowShowcase,
    ShowsList,
  },
  data() {
    return {
      chosenPage: null,
      activeCategory: this.chosenCategory,
      isShowcaseLoaded: null,
    };
  },
  methods: {
    setLoadingStatus(status) {
      this.isShowcaseLoaded = status;
    },
  },
  watch: {
    chosenCategory(newValue) {
      if (newValue) {
        this.activeCategory = newValue;
      }
    },
  },
  beforeMount() {
    // get the value of the category prop from the active route and emit the value
    const newCategory = this.$route.query.category;
    this.activeCategory = newCategory;
    this.$emit("update-category", this.activeCategory);
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