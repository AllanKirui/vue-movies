<template>
  <div class="info-wrapper wrapper">
    <div class="content-poster animated-bg"></div>
    <div class="content-text">
      <div class="title">
        <h1 class="content-title animated-bg animated-bg-text"></h1>
        <p class="content-tagline animated-bg animated-bg-text"></p>
      </div>

      <div class="meta">
        <div class="meta-section-1 flex">
          <p class="content-rating animated-bg animated-bg-text"></p>
          <p class="content-runtime animated-bg animated-bg-text"></p>
        </div>

        <div class="meta-section-2">
          <p class="content-overview animated-bg animated-bg-text"></p>
          <p class="content-overview animated-bg animated-bg-text"></p>
          <p class="content-overview animated-bg animated-bg-text"></p>
        </div>

        <div class="meta-section-3 flex flex-fd-c">
          <div class="content-country flex">
            <p class="animated-bg animated-bg-text"></p>
            <div class="animated-bg animated-bg-text"></div>
          </div>

          <div class="content-genre flex">
            <p class="animated-bg animated-bg-text"></p>
            <div class="animated-bg animated-bg-text"></div>
          </div>

          <div class="content-release flex">
            <p class="animated-bg animated-bg-text"></p>
            <p class="animated-bg animated-bg-text"></p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- trailer card placeholder -->
  <div class="trailer-wrapper wrapper">
    <h2 class="heading animated-bg animated-bg-text"></h2>
    <div class="trailer-card animated-bg"></div>
  </div>

  <!-- title placeholder for SimilarMovies -->
  <div class="title-wrapper wrapper">
    <div class="title-placeholder animated-bg animated-bg-text"></div>
  </div>
</template>

<style scoped>
.info-wrapper {
  display: grid;
  gap: 3.125rem;
  grid-template-columns: 23.5% auto;
  padding: 2.1875rem 0.9375rem;
  margin-bottom: 2.8125rem;
}

.content-poster {
  width: 19.375rem;
  height: 28.125rem;
  grid-column: 1/2;
}

.content-text {
  grid-column: 2/3;
}

.title {
  margin-top: 1.375rem;
  margin-bottom: 1.125rem;
}

.title .content-title {
  width: 60%;
  height: 1.5rem;
}

.title .content-tagline {
  width: 41%;
}

.meta .meta-section-1 {
  gap: 1.375rem;
  margin-bottom: 2rem;
}

.meta .meta-section-1 .content-rating {
  width: 3.125rem;
}

.meta .meta-section-1 .content-runtime {
  width: 7.5rem;
}

.meta .meta-section-2 {
  margin-bottom: 1.75rem;
}

.meta .meta-section-2 .content-overview {
  margin-bottom: 0.625rem;
  width: 90%;
}

.meta .meta-section-2 .content-overview:last-child {
  width: 80%;
}

.meta .meta-section-3 {
  gap: 1rem;
}

.meta .meta-section-3 .content-country > p:first-child,
.meta .meta-section-3 .content-genre > p:first-child,
.meta .meta-section-3 .content-release > p:first-child {
  margin-right: 2rem;
  width: 7.5rem;
}

.meta .meta-section-3 .content-country div,
.meta .meta-section-3 .content-genre div,
.meta .meta-section-3 .content-release p:last-child {
  width: 10rem;
}

.trailer-wrapper {
  padding: 0 0.9375rem;
}

.title-placeholder {
  width: 30%;
  height: 1.5rem;
  margin-left: 0.9375rem;
}

.trailer-wrapper {
  margin-bottom: 4.1875rem;
}

.title-placeholder {
  margin-bottom: 2.1875rem;
}

.trailer-wrapper .heading {
  width: 30%;
  height: 1.5rem;
  margin-bottom: 2.1875rem;
}

.trailer-wrapper .trailer-card {
  width: 37.5rem;
  max-width: 100%;
  height: 21.875rem;
  max-height: 100%;
}

@media screen and (max-width: 939px) {
  .info-wrapper {
    grid-template-columns: 1fr !important;
    grid-template-rows: 1fr auto !important;
  }

  .content-poster {
    width: 180px;
    height: 270px;
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
    grid-column: span 1;
    grid-row: 1/2;
  }

  .content-text {
    grid-column: span 1;
    grid-row: 2/3;
  }

  .meta .meta-section-2 .content-overview:not(:last-child) {
    width: 100%;
  }

  .trailer-wrapper .heading,
  .title-placeholder {
    width: 50%;
  }
}

@media screen and (max-width: 639px) {
  .trailer-wrapper .trailer-card {
    width: 100%;
    height: 36vh;
  }
}
</style>