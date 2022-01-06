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

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.result {
  padding: 0.625rem 0.8125rem;
  background-color: #212429;
  border-radius: 8px;
  margin-bottom: 0.8125rem;
}

.result__info {
  color: var(--color-white);
  width: 100%;
}

.result__info-date,
.result__info-rating {
  color: var(--color-clouds);
}

.result__info-title {
  font-size: var(--font-size-18);
}

.result__info-overview {
  font-size: var(--font-size-16);
  margin-bottom: 0.625rem;
}
</style>