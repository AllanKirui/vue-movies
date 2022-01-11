<template>
  <div class="results-wrapper">
    <!-- <ul v-for="result in searchResults[1]" :key="result.id"> -->
    <ul v-for="item in searchItems" :key="item">
      <li class="result flex">
        <div class="result__poster animated-bg"></div>
        <div class="result__info flex flex-fd-c">
          <h3 class="result__info-title animated-bg animated-bg-text"></h3>
          <p class="animated-bg animated-bg-text"></p>
          <p class="animated-bg animated-bg-text"></p>
          <div class="flex">
            <p class="result__info-date animated-bg animated-bg-text"></p>
            <p
              class="
                result__info-rating
                flex flex-ai-c
                animated-bg animated-bg-text
              "
            ></p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchItems: [1, 2, 3],
    };
  },
};
</script>
<style scoped>
.result__info {
  width: 100%;
  position: relative;
}

.result__info-title {
  position: absolute;
  top: 5px;
  height: 0.9375rem !important;
}

.result__info p:nth-child(1) {
  position: absolute;
  top: 35px;
}

.result__info p:nth-child(2) {
  position: absolute;
  top: 55px;
}

.result__info-overview p:first-child {
  margin-bottom: 1.25rem;
}

.result__info > div:last-child {
  position: absolute;
  bottom: 0;
  gap: 0.9375rem;
}

.result__info-date.animated-bg-text {
  width: 6.25rem;
  margin-right: 1.25rem;
}

.result__info-rating.animated-bg-text {
  width: 3.125rem;
}
</style>