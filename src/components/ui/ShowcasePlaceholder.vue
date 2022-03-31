<template>
  <div class="showcase-wrapper">
    <Carousel :settings="settings">
      <Slide v-for="item in 8" :key="item">
        <div class="carousel__item">
          <div class="showcase__poster animated-bg">
            <img
              src="../../assets/video-placeholder.png"
              alt="placeholder image"
              class="placeholder-img"
            />
          </div>

          <!-- movie text -->
          <div class="showcase__info">
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
  components: { Carousel, Slide },
  data() {
    return {
      settings: {
        // carousel settings
        wrapAround: true,
        itemsToShow: 1.25,
        snapAlign: "center",
        autoplay: 8000, // 8 second duration
      },
    };
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
</style>