<template>
  <footer class="flex flex-fd-c flex-jc-c">
    <div class="footer flex flex-jc-sb flex-ai-fe">
      <!-- footer left/top -->
      <div class="footer__left flex flex-fd-c">
        <div class="footer__left-logo">
          <img
            src="../assets/logo.svg"
            width="170"
            height="57"
            alt="vue movies logo"
          />
        </div>
        <div class="footer__left-text">
          <p>
            Made with love by
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
  background-color: var(--color-clouds);
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