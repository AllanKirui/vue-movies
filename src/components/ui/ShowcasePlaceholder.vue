<template>
  <div class="showcase-wrapper">
    <Carousel :settings="carouselSettings">
      <Slide v-for="item in 8" :key="item">
        <div class="carousel__item">
          <div class="showcase__poster animated-bg">
            <img
              src="../../assets/showcase-placeholder.png"
              alt="placeholder image"
              class="placeholder-img"
            />
          </div>

          <!-- movie text for large screens -->
          <div class="showcase__info hide-for-small">
            <h2 class="showcase__info-title animated-bg animated-bg-text"></h2>

            <div class="meta">
              <div class="meta-section-1 flex">
                <!-- movie rating -->
                <p
                  class="showcase__info-rating animated-bg animated-bg-text"
                ></p>
                <!-- movie release date -->
                <p class="showcase__info-date animated-bg animated-bg-text"></p>
              </div>

              <!-- movie overview -->
              <div class="meta-section-2">
                <p
                  class="showcase__info-overview animated-bg animated-bg-text"
                ></p>
                <p
                  class="showcase__info-overview animated-bg animated-bg-text"
                ></p>
                <p
                  class="showcase__info-overview animated-bg animated-bg-text"
                ></p>
              </div>

              <!-- more info button -->
              <div class="view-info-link animated-bg animated-bg-text"></div>
            </div>
          </div>
        </div>

        <!-- movie text for small screens -->
        <div class="mobile-info">
          <div class="showcase__info hide-for-large">
            <h2 class="showcase__info-title animated-bg animated-bg-text"></h2>

            <div class="meta">
              <div class="meta-section-1 flex">
                <!-- movie rating -->
                <p
                  class="showcase__info-rating animated-bg animated-bg-text"
                ></p>
                <!-- movie release date -->
                <p class="showcase__info-date animated-bg animated-bg-text"></p>
              </div>

              <!-- movie overview -->
              <div class="meta-section-2">
                <p
                  class="showcase__info-overview animated-bg animated-bg-text"
                ></p>
                <p
                  class="showcase__info-overview animated-bg animated-bg-text"
                ></p>
                <p
                  class="showcase__info-overview animated-bg animated-bg-text"
                ></p>
              </div>

              <!-- more info button -->
              <div class="view-info-link animated-bg animated-bg-text"></div>
            </div>
          </div>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

export default {
  name: "ShowcasePlaceholder",
  inject: [
    "setSlidesBeforeScreenResize",
    "setSlidesAfterScreenResize",
    "setCarouselSettings",
  ],
  components: { Carousel, Slide },
  data() {
    return {
      screenSize: null,
    };
  },
  computed: {
    carouselSettings() {
      // return settings before and after the screen has been resized
      return !this.screenSize
        ? this.setSlidesAfterScreenResize()
        : this.setSlidesBeforeScreenResize();
    },
  },
  methods: {
    checkWindowSize() {
      // listen to the resize event and call the method to set the info card's position
      window.addEventListener("resize", () => {
        this.screenSize = window.innerWidth;
      });
    },
  },
  beforeMount() {
    // get the window's width before data is shown on the screen
    this.screenSize = window.innerWidth;
  },
  mounted() {
    // call the method after data has been loaded to the screen
    this.checkWindowSize();
  },
};
</script>

<style scoped>
.showcase__info {
  text-align: left;
}

.showcase__info-title {
  width: 100%;
  max-width: 450px;
  height: 1.4rem;
}

.showcase__info-rating {
  width: 3.125rem;
}

.showcase__info-date {
  width: 7.5rem;
}

.showcase__info .meta .view-info-link {
  width: 5rem;
  cursor: unset;
}

@media screen and (min-width: 769px) {
  .hide-for-large {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  .hide-for-small {
    display: none;
  }

  .showcase__info-title {
    width: 100%;
    max-width: 300px;
  }
}
</style>