<template>
  <div class="not-found-wrapper wrapper flex flex-ai-c">
    <div class="not-found-text">
      <h1 class="error-code">404</h1>
      <h2 class="error-alert">OOPS!... Error</h2>
      <p class="error-description">
        Looks like the page you are looking for was not found.
      </p>
      <router-link
        :to="moviesRoute"
        @click="removeError"
        class="home-link"
        title="Go Home"
        >Return to Homepage</router-link
      >
    </div>
    <div class="not-found-img-pc">
      <img
        src="../../assets/404-pc.svg"
        width="380"
        height="331"
        alt="page not found image"
      />
    </div>
    <div class="not-found-img-tree">
      <img
        src="../../assets/404-tree.svg"
        width="251"
        height="480"
        alt="page not found image"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  emits: ["error-404"],
  data() {
    return {
      category: "popular",
      defaultPage: 1,
    };
  },
  computed: {
    moviesRoute() {
      const route = {
        path: "/vue-movies/movies",
        query: { category: this.category, page: this.defaultPage },
      };
      return route;
    },
  },
  methods: {
    removeError() {
      this.$emit("error-404", false);
    },
  },
  beforeMount() {
    this.$emit("error-404", true);
  },
};
</script>

<style scoped>
.not-found-wrapper {
  position: relative;
  height: 100vh;
  color: var(--color-clouds);
  justify-content: space-evenly;
}

.not-found-text {
  text-align: center;
  z-index: 2;
}

.error-code {
  background-image: linear-gradient(
    to bottom,
    var(--color-jet-black),
    var(--color-clouds)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
  font-size: 7.5rem;
}

.error-alert {
  margin-bottom: 1.5rem;
}

.error-description {
  margin-bottom: 2.5rem;
  font-size: var(--font-size-18);
}

.home-link {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 5px;
  background-color: var(--color-clouds);
  color: var(--color-smokey-black);
  font-family: inherit;
  font-size: var(--font-size-16);
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.home-link:hover {
  outline: var(--color-clouds) 1px solid;
  background-color: var(--color-smokey-black);
  color: var(--color-clouds);
}

.not-found-img-pc img {
  max-width: 100%;
}

.not-found-img-tree {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  z-index: 1;
}

@media screen and (max-width: 1023px) {
  .not-found-wrapper {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-evenly;
    padding: 0 2rem;
  }

  .error-code {
    font-size: 5rem;
  }

  .not-found-img-pc img {
    width: 17.5rem;
    height: 15.0625rem;
  }

  .not-found-img-tree {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  .not-found-wrapper {
    align-items: center;
    padding-top: 100px;
    padding-bottom: 100px;
  }

  .error-description {
    font-size: var(--font-size-16);
  }

  .not-found-img-pc img {
    width: 160px;
    height: 138px;
  }
}
</style>