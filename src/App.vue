<template>
  <TheHeader
    :close-button="isShowCloseBtn"
    :selected-side="selectedSide"
    @no-scroll="setScrollBehaviour"
  />

  <!-- listen to a custom event that hides the close button on the header -->
  <router-view
    @show-button="showCloseButton"
    @activated-side="setActivatedSide"
  ></router-view>

  <TheFooter />
</template>

<script>
import TheHeader from "./components/nav/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
const imgPath = "https://image.tmdb.org/t/p/w500";
const backdropImgPath = "https://image.tmdb.org/t/p/w1280";

export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter,
  },
  data() {
    return {
      isShowCloseBtn: false,
      selectedSide: null,
    };
  },
  methods: {
    setPath(poster_path) {
      return imgPath + poster_path;
    },
    setBackdropPath(backdrop_path) {
      return backdropImgPath + backdrop_path;
    },
    setOverviewLength(overview, size) {
      if (overview.length <= size) {
        return overview;
      }

      let shortOverview = "";
      for (let i = 0; i <= size; i++) {
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
    scrollToTop() {
      // scroll to top when a new page is fetched
      window.scrollTo(0, 0);
    },
    setScrollBehaviour() {
      document.body.classList.toggle("no-scroll");
    },
    setMovieInfoRoute(movieTitle, movieId) {
      const route = {
        path: "/movies/info",
        query: { name: movieTitle, id: movieId },
      };
      return route;
    },
    setShowsInfoRoute(showTitle, showId) {
      const route = {
        path: "/shows/info",
        query: { name: showTitle, id: showId },
      };
      return route;
    },
    showCloseButton(status) {
      if (status) {
        this.isShowCloseBtn = status;
        return;
      }
      this.isShowCloseBtn = false;
    },
    setActivatedSide(side) {
      // set the active part of the app to TV Shows
      this.selectedSide = side;
    },
    setTrailerLink(videoLinks) {
      const links = [];
      // loop through the available links
      for (const link of videoLinks) {
        // check if the video is of type Trailer
        if (
          link.type.toLowerCase() === "trailer" ||
          link.type.toLowerCase() === "clip"
        ) {
          // split the name property
          const nameArray = link.name.toLowerCase().split(" ");
          // check if it contains the string Official or Final or Trailer
          if (
            nameArray.indexOf("official") !== -1 ||
            nameArray.indexOf("final") !== -1 ||
            nameArray.indexOf("trailer") !== -1
          ) {
            // check if the trailer source is YouTube
            if (link.site.toLowerCase() !== "youtube") return;
            // add the link to the links array
            links.push(link);
          }
        }
      }
      return links;
    },

    setSlidesBeforeScreenResize() {
      // gets slides by calculating the viewport width before screen resizing
      let viewportWidth = window.innerWidth;
      let slideItems = this.getSlideItems(viewportWidth);

      // return carousel settings
      return this.setCarouselSettings(slideItems);
    },
    setSlidesAfterScreenResize() {
      // gets slides by calculating the viewport width after screen resizing
      let slideItems = this.getSlideItems(this.screenSize);

      // return carousel settings
      return this.setCarouselSettings(slideItems);
    },
    setCarouselSettings(size) {
      // return carousel settings
      return {
        wrapAround: true,
        itemsToShow: size,
        snapAlign: "center",
        autoplay: 8000, // 8 second duration
      };
    },
    getSlideItems(size) {
      // returns how many slide items to show based on screen size
      if (size <= 1023) {
        return 1; // one full width slide
      } else {
        return 1.25; // one full width item plus two partial slide
      }
    },
  },
  provide() {
    // send the various methods to the components that need them
    return {
      scrollToTop: this.scrollToTop,
      setOverviewLength: this.setOverviewLength,
      setPath: this.setPath,
      setBackdropPath: this.setBackdropPath,
      setTitleLength: this.setTitleLength,
      setDate: this.setDateFormat,
      setTime: this.setTimeFormat,
      setMovieInfoRoute: this.setMovieInfoRoute,
      setShowsInfoRoute: this.setShowsInfoRoute,
      setTrailerLink: this.setTrailerLink,
      setSlidesBeforeScreenResize: this.setSlidesBeforeScreenResize,
      setSlidesAfterScreenResize: this.setSlidesAfterScreenResize,
      setCarouselSettings: this.setCarouselSettings,
    };
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
  --font-size-14: 0.875rem;
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

.flex-ai-fe {
  align-items: flex-end;
}

.flex-fw-w {
  flex-wrap: wrap;
}

.wrapper {
  max-width: 1372px;
  margin-left: auto !important;
  margin-right: auto !important;
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

/* start of showcase styles */
.carousel__slide {
  padding: 0 10px 10px;
  position: relative;
}

.carousel__item {
  max-height: calc(95vh - 5rem);
  width: 100%;
  background-color: var(--color-jet-black);
  color: var(--color-white);
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.carousel__slide > .carousel__item {
  transform: scale(0.92);
}

.carousel__slide--active > .carousel__item {
  transform: scale(1);
}

.carousel__slide > .carousel__item .showcase__info {
  visibility: hidden;
}

.carousel__slide--active > .carousel__item .showcase__info {
  visibility: visible;
}

.carousel .carousel__pagination {
  margin-top: -2rem;
  position: relative;
  top: 0;
}

.carousel .carousel__pagination-button {
  width: 5px;
  height: 5px;
  background-color: var(--color-spanish-gray);
}

.carousel .carousel__pagination-button.carousel__pagination-button--active {
  height: 7px;
  background-color: var(--color-white);
}

.showcase__poster img {
  width: 100%;
  object-fit: cover;
}

.mobile-info {
  color: var(--color-clouds);
}

.showcase__info.hide-for-small {
  position: absolute;
  left: 0;
  bottom: 0;
}

.showcase__info.hide-for-large {
  width: 100vw;
}

.showcase__info {
  width: 100%;
  min-height: 30%;
  padding: 0.875rem 1rem 1.5rem;
  background: rgba(0, 0, 0, 0.75);
  text-shadow: 1px 1px 2px var(--color-jet-black);
}

.showcase__info-title {
  text-align: left;
  margin-bottom: 0.5rem;
}

.showcase__info-rating {
  margin-right: 1rem;
}

.showcase__info-rating img {
  margin-right: 0.3125rem;
}

.showcase__info .meta {
  font-size: var(--font-size-18);
  text-align: left;
  color: var(--color-white);
}

.showcase__info .meta .meta-section-1 {
  margin-bottom: 1rem;
}

.showcase__info .meta .meta-section-2 {
  width: 90%;
  margin-bottom: 1rem;
}

.showcase__info .meta .view-info-link {
  padding: 8px 12px;
  border-radius: 5px;
  font-size: var(--font-size-16);
  background-color: var(--color-smokey-black);
  color: var(--color-clouds);
  cursor: pointer;
  text-shadow: none;
  transition: all 0.15s ease-in-out;
}

.showcase__info .meta .view-info-link:hover {
  color: var(--color-smokey-black);
  background-color: var(--color-clouds);
}
/* end of showcase styles */

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

.content-wrapper .content.placeholder {
  cursor: initial;
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

.showcase__poster img.poster-img,
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

/* start of expanded search styles */
.search-container {
  margin-top: 2.1875rem;
  padding: 0 0.9375rem;
}

.search-form.expanded-search input {
  width: 100%;
}

.results-container.expanded-search {
  margin: 2.5rem 0;
}

.heading-wrapper {
  color: var(--color-spanish-gray);
  margin-bottom: 2.5rem;
}

.pages-found {
  font-size: var(--font-size-18);
}

.search-term .text-white {
  margin-left: 0.3125rem;
}

.content__poster img.no-poster-img {
  padding: 50% 0;
  object-fit: cover;
}

.no-results.expanded-search {
  position: relative;
  top: 6.25rem;
  width: 100%;
  text-align: center;
  font-size: var(--font-size-18);
  color: var(--color-clouds);
}

.no-results.expanded-search img {
  margin-bottom: 0.625rem;
}

.pagination.expanded-search {
  text-align: center;
  padding-top: 2.5rem;
}

.expanded-search-placeholder {
  margin-top: -2.5rem;
}
/* end of expanded search styles */

/* start of media queries */
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
  /* showcase styles */
  .carousel__slide {
    padding: 0 0 10px;
  }

  /* movie/shows list styles */
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
}

@media screen and (min-width: 769px) {
  /* showcase styles */
  .showcase__poster img {
    width: 100%;
    height: 100%;
  }
  .mobile-info {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  /* movie/shows list styles */
  .content-wrapper {
    margin: 0 -0.75%;
  }

  .content-wrapper .content {
    width: 31.3333333333%;
    margin: 0 0.75%;
    margin-bottom: 4.375rem !important;
  }

  /* expanded search styles */
  .results-container.expanded-search {
    margin-top: 1rem;
  }

  .heading-wrapper {
    margin-bottom: 1rem;
    flex-direction: column;
    align-items: start;
  }

  .search-term {
    font-size: var(--font-size-24);
    margin-bottom: 0.625rem;
  }

  .no-results {
    top: 3.125rem;
  }

  /* showcase styles */
  .carousel {
    height: fit-content;
    background-color: var(--color-jet-black);
  }

  .carousel__slide {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: fit-content;
  }

  .carousel__item {
    border-radius: unset;
  }

  .showcase__poster {
    position: relative;
    height: fit-content;
  }

  .showcase__poster img.placeholder-img {
    width: 100%;
    height: 100%;
  }

  .showcase__info.hide-for-small {
    display: none;
  }

  .showcase__info {
    background-color: var(--color-jet-black);
  }

  .showcase__info-title {
    font-size: var(--font-size-22);
  }

  .showcase__info .meta {
    font-size: var(--font-size-16);
  }

  .showcase__info .meta .meta-section-2 {
    width: 100%;
    margin-bottom: 1.5rem;
  }

  .showcase__info .meta .view-info-link {
    background-color: var(--color-clouds);
    color: var(--color-smokey-black);
  }

  .showcase__info .meta .view-info-link:hover {
    color: var(--color-clouds);
    background-color: var(--color-smokey-black);
  }
}

@media screen and (max-width: 719px) {
  .content-wrapper .content {
    margin-bottom: 2.5rem !important;
  }
}

@media screen and (max-width: 576px) {
  /* movie/shows list styles */
  .content-wrapper {
    margin: 0 -1%;
  }

  .content-wrapper .content {
    width: 47%;
    margin: 0 1%;
    margin-bottom: 6.25rem !important;
  }

  /* pagination styles */
  #pagination-wrapper {
    margin: 0 auto 3.75rem;
  }

  .page-btn {
    min-width: 2.5rem;
    min-height: 2.25rem;
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