<template>
  <div class="results-wrapper">
    <ul v-for="result in searchResults" :key="result.id">
      <li class="result flex">
        <div class="result__poster"></div>
        <div class="result__info flex flex-fd-c">
          <h3 class="result__info-title">{{ result.title }}</h3>
          <p class="result__info-overview">{{ result.overview }}</p>
          <div class="flex">
            <p class="result__info-date">{{ result.release_date }}</p>
            <p class="result__info-rating">{{ result.vote_average }}</p>
          </div>
        </div>
      </li>
    </ul>
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