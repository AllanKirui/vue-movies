<template>
  <div class="results-wrapper">
    <ul></ul>
  </div>
</template>

<script>
export default {
  props: ["searchResults"],
  name: "SearchHandler",
};
</script>

<style scoped>
.results-wrapper {
  position: absolute;
  top: 120%;
  right: 0.9375rem;
  width: 33.125rem;
  height: 250px;
  padding: 0.8125rem 0.625rem;
  background-color: #ececec;
  overflow-y: scroll;
}
</style>