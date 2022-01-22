<template>
  <div class="results-container">
    <ul v-for="item in searchItems" :key="item" class="content-wrapper">
      <li class="content">
        <div class="placeholder__poster animated-bg">
          <p class="tag animated-bg animated-bg-text"></p>
        </div>
        <div class="content__info">
          <h3 class="content__info-title animated-bg animated-bg-text"></h3>
          <div class="meta flex flex-jc-sb">
            <p class="content__info-date animated-bg animated-bg-text"></p>
            <p class="content__info-rating animated-bg animated-bg-text"></p>
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
      searchItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  },
};
</script>

<style scoped>
.tag {
  width: 70px;
  height: 20px;
}

.content__info-title {
  width: 90%;
  height: 0.9375rem;
  margin-bottom: 1rem;
}

.content__info-date {
  width: 40%;
}

.content__info-rating {
  width: 3.125rem;
}
</style>