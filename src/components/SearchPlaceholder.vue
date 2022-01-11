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