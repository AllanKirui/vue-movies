<template>
  <footer class="flex flex-fd-c flex-jc-c">
    <div class="footer flex flex-jc-sb flex-ai-fe">
      <!-- footer left/top -->
      <div class="footer__left flex flex-fd-c">
        <div class="footer__left-logo">
          <router-link :to="moviesRoute" @click="scrollToTop" title="Home">
            <img
              src="../assets/logo.svg"
              width="170"
              height="57"
              alt="vue movies logo"
              class="logo-img"
            />
            <h2 class="logo-text">Vue Movies</h2>
          </router-link>
        </div>
        <div class="footer__left-text">
          <p>
            Made with
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="14"
              height="14"
            >
              <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                style="fill: #e6e6e6"
                d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"
              />
            </svg>
            by
            <a href="https://google.com" target="_blank">Allan Kirui</a>
          </p>
        </div>
      </div>
      <!-- footer center/mid -->
      <div class="footer__center flex flex-fd-c">
        <div class="footer__center-logo">
          <img
            src="../assets/git.svg"
            width="45"
            height="45"
            alt="github logo"
          />
        </div>
        <div class="footer__center-text">
          <p>
            View source code on
            <a href="https://google.com" target="_blank">GitHub</a>
          </p>
        </div>
      </div>
      <!-- footer right/bottom -->
      <div class="footer__right flex flex-fd-c">
        <div class="footer__right-logo">
          <a href="https://google.com">
            <img
              src="../assets/primary-long.svg"
              width="250"
              height="18"
              alt="the movie db logo"
            />
          </a>
        </div>
        <div class="footer__right-text">
          <p>
            Powered by VueJS using the
            <a href="https://google.com" target="_blank">TMDB API</a>
          </p>
        </div>
      </div>
    </div>

    <!-- attribution text -->
    <div class="attribution-text">
      <p>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
  inject: ["scrollToTop"],
  computed: {
    moviesRoute() {
      const route = {
        path: "/movies",
        query: { page: 1 },
      };
      return route;
    },
  },
};
</script>

<style scoped>
footer {
  width: 100%;
  min-height: 11.25rem;
  padding: 1rem 0.9375rem;
  background-color: var(--color-jet-black);
  color: var(--color-clouds);
  font-size: var(--font-size-16);
  position: relative;
  gap: 2rem;
}

footer p a {
  position: relative;
  color: var(--color-clouds);
}

footer p a::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -5px;
  transform: translateX(-50%);
  width: 100%;
  height: 2px;
  background-color: var(--color-silver-chalice);
  transition: width 0.2s ease-in-out;
}

footer p a:hover::before {
  width: 0;
}

.footer__right,
.footer__center,
.footer__left {
  gap: 1rem;
}

.footer__left-logo {
  position: relative;
  width: 10.625rem;
  height: 3.5625rem;
}

.footer__left-logo .logo-img {
  position: relative;
  z-index: 2;
}

.footer__left-logo .logo-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  color: var(--color-clouds);
  z-index: 1;
}

.footer__right {
  text-align: right;
}

.attribution-text,
.footer__center {
  text-align: center;
}

.attribution-text {
  font-style: italic;
  font-size: var(--font-size-14);
}

@media screen and (max-width: 768px) {
  footer {
    padding: 2rem 0.9375rem;
  }

  footer .footer {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 3rem;
  }

  footer p a:hover::before {
    width: 100%;
  }

  .footer__right,
  .footer__center,
  .footer__left {
    gap: 0.875rem;
  }
}
</style>