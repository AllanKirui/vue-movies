<template>
  <TheHeader
    :remove-search="isRemoveSearchResults"
    @no-scroll="setScrollBehaviour"
    @find-searchterm="showMoreResults"
    @remove-results="removeSearchResults"
    @send-id="showMovieInfo"
    @search-status="resetRemoveSearch"
  />

  <!-- only show this if it's the activeComponent and MovieInfo is not active-->
  <div
    v-if="activeComponent === 'MoviesList' && !isMovieInfoActive"
    class="movies-list-wrapper flex flex-fd-c"
  >
    <MoviesList
      :page-num="selectedPage"
      @set-status="setLoadingStatus"
      @total-pages="setTotalPages"
      @send-id="showMovieInfo"
    />
    <ContentPlaceholder v-if="isLoading" />
    <ThePagination
      v-if="totalPages && !isLoading && componentName === 'MoviesList'"
      :received-pages="totalPages"
      :chosen-page="selectedPage"
      @switch-page="switchPages"
    />
  </div>

  <!-- only show this if it's the activeComponent and MovieInfo is not active-->
  <div
    v-if="activeComponent === 'ExpandedSearch' && !isMovieInfoActive"
    class="expanded-search-wrapper flex flex-fd-c"
  >
    <ExpandedSearch
      v-if="isShowMoreResults"
      :page-num="selectedPage"
      :search-this="keyword"
      @total-pages="setTotalPages"
      @set-status="setLoadingStatus"
      @reset-pages="resetPages"
      @send-id="showMovieInfo"
    />
    <ContentPlaceholder v-if="isLoading" />
    <ThePagination
      v-if="totalPages && !isLoading && componentName === 'ExpandedSearch'"
      :received-pages="totalPages"
      :chosen-page="selectedPage"
      @switch-page="switchPages"
    />
  </div>

  <div class="movie-info-wrapper">
    <MovieInfo
      v-if="isShowMovieInfo"
      :movie-id="movieId"
      :set-time="setTimeFormat"
      @send-id="showMovieInfo"
      @set-status="setLoadingStatus"
    />
    <div v-if="isMovieInfoLoading" class="content-holder-wrapper">
      <InfoPlaceholder />
      <ContentPlaceholder />
    </div>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import MoviesList from "./components/MoviesList.vue";
import ExpandedSearch from "./components/ExpandedSearch.vue";
import ContentPlaceholder from "./components/ContentPlaceholder.vue";
import ThePagination from "./components/ThePagination.vue";
import MovieInfo from "./components/MovieInfo.vue";
import InfoPlaceholder from "./components/InfoPlaceholder.vue";

const imgPath = "https://image.tmdb.org/t/p/w500";
const backdropImgPath = "https://image.tmdb.org/t/p/w1280";

export default {
  name: "App",
  components: {
    TheHeader,
    MoviesList,
    ExpandedSearch,
    ContentPlaceholder,
    ThePagination,
    MovieInfo,
    InfoPlaceholder,
  },
  data() {
    return {
      isLoading: false,
      totalPages: null,
      activePage: null,
      selectedPage: 1, // the default page is 1
      isShowMoreResults: false,
      keyword: "",
      movieId: null,
      isRemoveSearchResults: false,
      isMovieInfoLoading: false,
      componentName: "",
      activeComponent: "MoviesList",
      isMovieInfoActive: false,
      isShowMovieInfo: false,
    };
  },
  methods: {
    setPath(poster_path) {
      return imgPath + poster_path;
    },
    setBackdropPath(backdrop_path) {
      return backdropImgPath + backdrop_path;
    },
    setOverviewLength(overview) {
      if (overview.length <= 150) {
        return overview;
      }

      let shortOverview = "";
      for (let i = 0; i <= 150; i++) {
        shortOverview += overview[i];
      }
      return shortOverview + "...";
    },
    setTitleLength(title) {
      if (title.length <= 20) {
        return title;
      }

      let shortTitle = "";
      for (let i = 0; i <= 20; i++) {
        shortTitle += title[i];
      }
      return shortTitle + "...";
    },
    setDateFormat(dateString) {
      if (!dateString) return;
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const date = dateString.split("-");
      const year = date[0];
      const monthIdx = parseInt(date[1]) - 1;
      const day = date[2];
      const stringMonth = months.find((month) => month === months[monthIdx]);
      return `${day} ${stringMonth} ${year}`;
    },
    setTimeFormat(runtime) {
      const time = parseInt(runtime);
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      if (hours === 0) return `${minutes}min`;
      if (minutes < 10) return `${hours}h 0${minutes}min`;
      return `${hours}h ${minutes}min`;
    },
    setLoadingStatus(status) {
      // whenever we're loading set this property to true
      this.isShowMovieInfo = true;

      if (status === "MovieInfoLoading") {
        this.movieId = null;
        this.isMovieInfoLoading = true;
        return;
      } else if (status === "MovieInfoLoaded") {
        this.isMovieInfoLoading = false;
        return;
      }
      this.isLoading = status;
    },
    setTotalPages(pages, selectedPage, name) {
      this.totalPages = pages;
      this.activePage = selectedPage;
      this.componentName = name;
    },
    switchPages(pageNum) {
      this.selectedPage = pageNum;
    },
    resetPages() {
      this.selectedPage = 1;
    },
    scrollToTop() {
      // scroll to top when a new page is fetched
      window.scrollTo(0, 0);
    },
    setScrollBehaviour() {
      document.body.classList.toggle("no-scroll");
    },
    showMoreResults(keyword) {
      // perform resets
      this.movieId = null;
      this.isMovieInfoActive = false;
      this.isShowMovieInfo = false;

      this.isShowMoreResults = true;
      this.keyword = keyword;
      this.activeComponent = "ExpandedSearch";
      this.selectedPage = 1;
    },
    removeSearchResults() {
      this.isShowMoreResults = false;
      this.totalPages = null;
      this.activeComponent = "MoviesList";
      this.selectedPage = 1;
    },
    showMovieInfo(id) {
      this.isMovieInfoActive = true;
      this.isMovieInfoLoading = true;
      this.isRemoveSearchResults = true;
      this.movieId = id;
    },
    resetRemoveSearch(status) {
      this.isRemoveSearchResults = status;
    },
    setActiveComponent(cmp) {
      this.activeComponent = cmp;
    },
    setInfoCardPosition() {
      let viewportWidth = window.innerWidth;
      // only show hover information for screens 768px and above
      if (viewportWidth >= 1024) {
        this.isShowInfo = true;
        const movieItems = document.querySelectorAll(".hover__info");
        movieItems.forEach((movie) => {
          // find the distance to the right of each movie card
          let distToRight = movie.getBoundingClientRect().right;

          // add an extra 250px to the distance, to make sure that it will be more
          // than the viewport width, then set the appropriate postiion for the info card
          if (
            distToRight > viewportWidth ||
            distToRight + 250 > viewportWidth
          ) {
            movie.style.right = "95%";
          } else {
            movie.style.right = "-110%";
          }
        });
      } else {
        this.isShowInfo = false;
      }
    },
    checkWindowSize() {
      // listen to the resize event and call the method to set the info card's position
      window.addEventListener("resize", this.setInfoCardPosition);
    },
  },
  provide() {
    // send the scrollToTop method to SimilarMovies
    return {
      scrollToTop: this.scrollToTop,
      setOverviewLength: this.setOverviewLength,
      imgPath: imgPath,
      backdropImgPath: backdropImgPath,
      setPath: this.setPath,
      setBackdropPath: this.setBackdropPath,
      setTitleLength: this.setTitleLength,
      setDate: this.setDateFormat,
    };
  },
  watch: {
    selectedPage() {
      // when the selectedPage data property changes, call the scrollToTop method
      this.scrollToTop();
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400&display=swap");

:root {
  /* Colors */
  --color-clouds: #ececec;
  --color-smokey-black: #111111;
  --color-jet-black: #090909;
  --color-white: #ffffff;
  --color-black-blue: #212429;
  --color-charleston-green: #272727;
  --color-spanish-gray: #999999;
  --color-silver-chalice: #b0b0b0;

  /* Font sizes */
  --font-size-16: 1rem;
  --font-size-18: 1.125rem;
  --font-size-20: 1.25rem;
  --font-size-22: 1.375rem;
  --font-size-24: 1.5rem;
  --font-size-28: 1.75rem;
  --font-size-40: 2.5rem;
}

html {
  font-size: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  margin: 0;
  padding: 0;
  font-family: "PT Sans", sans-serif;
  background-color: var(--color-smokey-black);
  overflow-x: hidden;
}

h1,
h2,
h3,
p {
  margin: 0;
}

a {
  text-decoration: none;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Flex box styles */
.flex {
  display: flex;
}

.flex-fd-c {
  flex-direction: column;
}

.flex-jc-c {
  justify-content: center;
}

.flex-jc-sb {
  justify-content: space-between;
}

.flex-ai-c {
  align-items: center;
}

.flex-fw-w {
  flex-wrap: wrap;
}

.wrapper {
  /* max-width: 83.125rem; 1330px */
  max-width: 87.5rem; /* 1400px */
}

.text-white {
  color: var(--color-white);
}

.no-scroll {
  overflow: hidden;
}

.overlay.active-overlay {
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  height: calc(100vh - 80px);
  background-color: rgba(9, 9, 9, 0.5);
  backdrop-filter: blur(10px);
  cursor: pointer;
  z-index: 2;
}

/* start of scrollbar styles */
html::-webkit-scrollbar,
.results-wrapper::-webkit-scrollbar {
  width: 1vw;
}

html::-webkit-scrollbar-thumb,
.results-wrapper::-webkit-scrollbar-thumb {
  background-color: var(--color-clouds);
}

html::-webkit-scrollbar-track,
.results-wrapper::-webkit-scrollbar-track {
  background-color: var(--color-charleston-green);
}
/* end of scrollbar styles */

/* start of global placeholder styles */
.animated-bg {
  background-image: linear-gradient(
    to right,
    #1a1a1a 0%,
    #272727 10%,
    #1a1a1a 15%,
    #1a1a1a 100%
  );
  background-size: 200% 100%;
  animation: bgPos 1.2s linear infinite;
}

.animated-bg-text {
  border-radius: 50px;
  display: inline-block;
  margin: 0;
  height: 0.75rem;
  width: 100%;
}

@keyframes bgPos {
  0% {
    background-position: 50% 0;
  }
  100% {
    background-position: -150% 0;
  }
}
/* end of global placeholder styles */

/* start of movie card styles*/
.results-container {
  width: 100%;
  padding-right: 0.9375rem;
  padding-left: 0.9375rem;
  margin-right: auto;
  margin-left: auto;
}

.content-wrapper .content {
  width: 23.5%;
  height: 29.6875rem;
  margin: 0 0.4%;
  float: left;
  display: block;
  position: relative;
  cursor: pointer;
}

.placeholder__poster,
.content__poster {
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: var(--color-jet-black);
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  overflow: hidden;
}

.content__poster img {
  width: 100%;
  height: 100%;
  max-height: 23.75rem;
  object-fit: cover;
  transition: transform 0.2s ease-in-out;
}

.content__poster img.poster-img {
  position: absolute;
  top: 0;
  left: 0;
}

.content__poster:hover img.poster-img {
  transform: scale(1.025);
}

.content__poster img.placeholder-img,
.content__poster img.no-poster-img {
  transition: none;
  transform: none;
}

.poster-height {
  height: 85%;
}

.placeholder__poster {
  height: 80%;
}

.content .tag {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0.125rem 0.5rem;
  border-radius: 0 10px 0 0;
  background-color: var(--color-smokey-black);
  color: var(--color-white);
}

.content__info-title {
  margin-bottom: 0.4375rem;
  font-size: var(--font-size-20);
  color: var(--color-white);
}

.content__info .meta {
  font-size: var(--font-size-18);
  color: var(--color-clouds);
}

.content__info img {
  margin-right: 0.1875rem;
}

.movies-list-wrapper .results-container {
  top: -80px;
  margin: 2.5rem 0;
}
/* end of movie card styles */

/* start of movie info card styles */
.content-wrapper .content .hover__info {
  position: absolute;
  top: 50px;
  width: 300px;
  padding: 0.9375rem 0.9375rem 0 0.9375rem;
  border-radius: 10px;
  background-color: var(--color-jet-black);
  color: var(--color-clouds);
  opacity: 0;
  cursor: default;
  visibility: hidden;
  z-index: 2;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.content-wrapper .content.hover:hover .hover__info {
  opacity: 0.98;
  visibility: visible;
  transition: 0.4s ease 0.5s;
}

.content-wrapper .content .hover__info-title {
  margin-bottom: 0.5rem;
  color: var(--color-white);
  font-size: var(--font-size-18);
}

.content-wrapper .content .hover__info span.grey-bg {
  display: block;
  position: relative;
  left: -15px;
  margin-bottom: 0.5rem;
  width: calc(100% + 30px);
  height: 10px;
  background-color: var(--color-smokey-black);
}

.content-wrapper .content .hover__info .meta__info,
.content-wrapper .content .hover__info-overview {
  margin-bottom: 0.875rem;
}

.content-wrapper .content .hover__info .description {
  margin-right: 0.875rem;
  color: var(--color-spanish-gray);
}

.content-wrapper .content .hover__info .meta__info-rating {
  margin-bottom: 3px;
}

.content-wrapper .content .hover__info button {
  position: relative;
  left: -0.9375rem;
  padding: 0.5rem 0.75rem;
  width: calc(100% + 1.875rem);
  border: none;
  border-radius: 0 0 0.625rem 0.625rem;
  background-color: var(--color-smokey-black);
  color: var(--color-clouds);
  font-family: inherit;
  font-size: var(--font-size-16);
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.content-wrapper .content .hover__info button:hover {
  color: var(--color-smokey-black);
  background-color: var(--color-clouds);
}

/* end of movie info card styles */

/* start of pagination styles */
#pagination-wrapper {
  margin: 0 auto 100px;
  transition: all 0.3s ease-in-out;
}

.page-btn {
  position: relative;
  min-width: 3.125rem;
  min-height: 2.8125rem;
  border: none;
  outline: none;
  border-radius: 5px;
  font-family: inherit;
  font-size: var(--font-size-18);
  background-color: var(--color-black-blue);
  color: var(--color-silver-chalice);
  cursor: pointer;
  overflow: hidden;
}

.page-btn.active::before,
.page-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  transform: skewX(-30deg);
  transition: left 0.75s;
  z-index: -1;
}

.page-btn::before {
  background: linear-gradient(
    to right,
    transparent,
    transparent,
    var(--color-clouds),
    transparent,
    transparent
  );
}

.page-btn.active::before {
  background: linear-gradient(
    to right,
    transparent,
    transparent,
    var(--color-jet-black),
    transparent,
    transparent
  );
}

.page-btn:hover::before {
  left: 100%;
  z-index: 1;
}

.page-btn:not(:last-child) {
  margin-right: 0.5rem;
}

.page-btn.active {
  background-color: var(--color-clouds);
  color: var(--color-smokey-black);
}
/* end of pagination styles */

@media screen and (max-width: 1439px) {
  .content-wrapper {
    margin: 0 -0.5%;
  }

  .content-wrapper .content {
    width: 19%;
    margin: 0 0.5%;
  }
}

@media screen and (max-width: 1279px) {
  .content-wrapper {
    margin: 0 -0.5%;
  }

  .content-wrapper .content {
    width: 19%;
    height: 26.875rem;
    margin: 0 0.5%;
  }

  .content__info-title {
    font-size: var(--font-size-18);
  }

  .content__info .meta {
    font-size: var(--font-size-16);
  }
}

@media screen and (max-width: 1139px) {
  .content-wrapper .content {
    height: 24.375rem;
  }

  /* MovieInfo styles */
  .info-wrapper {
    gap: 1.875rem !important;
    grid-template-columns: 31.3333333333% auto !important;
  }
}

@media screen and (max-width: 1023px) {
  .content-wrapper .content {
    height: 22.5rem;
    margin-bottom: 0px !important;
  }

  /* MovieInfo styles */
  .info-wrapper {
    grid-template-columns: 34% auto !important;
  }
}

@media screen and (max-width: 939px) {
  .search-form.nav {
    display: none;
  }
  /* MovieInfo styles */
  .info-wrapper {
    grid-template-columns: 1fr !important;
    grid-template-rows: 1fr auto !important;
  }

  .info-wrapper .content-poster {
    width: 31.3333333333%;
    margin: 0 auto;
    grid-column: span 1;
    grid-row: 1/2;
  }

  .info-wrapper .content-text {
    grid-column: span 1;
    grid-row: 2/3;
  }

  .info-wrapper .content-text .title {
    margin-top: 0;
  }
}

@media screen and (max-width: 768px) {
  .content-wrapper {
    margin: 0 -0.75%;
  }

  .content-wrapper .content {
    width: 31.3333333333%;
    margin: 0 0.75%;
    margin-bottom: 4.375rem !important;
  }
}

@media screen and (max-width: 719px) {
  .content-wrapper .content {
    margin-bottom: 2.5rem !important;
  }
}

@media screen and (max-width: 576px) {
  .content-wrapper {
    margin: 0 -1%;
  }

  .content-wrapper .content {
    width: 47%;
    margin: 0 1%;
    margin-bottom: 6.25rem !important;
  }
}

@media screen and (max-width: 519px) {
  .content-wrapper .content {
    margin-bottom: 3.4375rem !important;
  }
}

@media screen and (max-width: 480px) {
  .content-wrapper {
    margin: 0 -1.5%;
  }

  .content-wrapper .content {
    width: 47%;
    margin: 0 1.5%;
    margin-bottom: 1.875rem !important;
  }
}

@media screen and (max-width: 419px) {
  .content-wrapper .content {
    margin-bottom: 0.625rem !important;
  }
}
/* end of movie card styles*/
</style>