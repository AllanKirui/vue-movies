<template>
  <div :class="[isSearchActive ? 'active' : '', 'results-wrapper']">
    <ul v-for="result in results" :key="result.id">
      <li
        class="result flex"
        :title="result.title"
        @click="sendMovieId(result.id)"
      >
        <div class="result__poster">
          <img
            v-if="result.poster_path"
            :src="setPath(result.poster_path)"
            :alt="`poster image for ${result.title}`"
            class="poster-img"
          />
          <img
            v-else
            src="../assets/no-poster-img.svg"
            width="70"
            height="35.3"
            alt="no poster image"
            class="no-poster-img"
          />
          <!-- show a placeholder image before the poster loads -->
          <img
            v-if="result.poster_path"
            src="../assets/poster-placeholder.png"
            width="70"
            height="35.3"
            alt="placeholder image"
            class="placeholder-img"
          />
        </div>
        <div class="result__info flex flex-fd-c">
          <h3 class="result__info-title">{{ result.title }}</h3>
          <p v-if="result.overview" class="result__info-overview">
            {{ setOverviewLength(result.overview) }}
          </p>
          <p v-else class="result__info-overview">n/a</p>
          <div class="flex">
            <p v-if="result.release_date" class="result__info-date">
              {{ result.release_date }}
            </p>
            <p v-else class="result__info-date">n/a</p>
            <p class="result__info-rating flex flex-ai-c">
              <img
                src="../assets/rating-icon.svg"
                width="15"
                height="14.4"
                alt="star icon"
              />{{ result.vote_average }}
            </p>
          </div>
        </div>
      </li>
    </ul>
    <button
      v-if="isMoreResults"
      class="view-more-btn"
      @click="$emit('emit-searchterm')"
      title="View More Results"
    >
      View More Results
    </button>

    <!-- Code to show if there are no results found -->
    <div
      v-if="results.length === 0"
      class="result no-result flex flex-jc-c flex-ai-c flex-fd-c"
    >
      <img
        src="../assets/search-icon-light.svg"
        width="35"
        height="35"
        alt="no results found image"
      />
      <p>Oops! No results found</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchHandler",
  props: ["searchResults"],
  emits: ["emit-searchterm", "send-id"],
  inject: ["setOverviewLength", "setPath"],
  data() {
    return {
      isSearchActive: this.searchResults[0],
      results: this.searchResults[1],
      isMoreResults: this.searchResults[2],
    };
  },
  methods: {
    sendMovieId(id) {
      this.$emit("send-id", id);
    },
  },
};
</script>

<style scoped>
.result {
  cursor: pointer;
}

.result:hover {
  outline: 1px solid var(--color-clouds);
}

.result__poster {
  position: relative;
}

.result__poster img {
  width: 100%;
  height: 100%;
}

.result__poster img.poster-img {
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
}

.result__poster img.no-poster-img {
  object-fit: contain;
}

.result__info {
  color: var(--color-white);
  width: 100%;
}

.result__info > div {
  position: absolute;
  bottom: 8px;
  gap: 15px;
}
.result__info > div p > img {
  margin-right: 3px;
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

.view-more-btn {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin: 1.25rem 0;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  background-color: var(--color-smokey-black);
  color: var(--color-clouds);
  font-family: inherit;
  font-size: var(--font-size-16);
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.view-more-btn:hover {
  color: var(--color-smokey-black);
  background-color: var(--color-clouds);
}

.result.no-result {
  min-height: 8.125rem;
  text-align: center;
  font-size: var(--font-size-16);
  color: var(--color-clouds);
}

.result.no-result:hover {
  outline: none;
  cursor: initial;
}

.result.no-result img {
  margin-bottom: 0.625rem;
}
</style>