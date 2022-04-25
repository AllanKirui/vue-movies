<template>
  <div class="net-error-wrapper wrapper flex flex-fd-c flex-jc-c flex-ai-c">
    <div class="net-error-img">
      <img
        src="../../assets/net-error-pc.svg"
        width="160"
        height="138"
        alt="connection error image"
      />
    </div>
    <div class="net-error-text">
      <h2 class="error-alert">OOPS!... Unable to connect to the internet</h2>
      <p class="error-description">Slow or no internet connection.</p>
      <button class="reload-btn" @click="refreshPage" title="Reload Page">
        Try Reloading
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NetError",
  methods: {
    refreshPage() {
      document.location.reload();
    },
  },
};
</script>

<style scoped>
.net-error-wrapper {
  width: 100%;
  height: 100vh;
  color: var(--color-clouds);
  text-align: center;
}

.net-error-img {
  margin-bottom: 2rem;
}

.net-error-img img {
  max-width: 100%;
}

.error-alert {
  margin-bottom: 1rem;
}

.error-description {
  margin-bottom: 2.5rem;
}

.reload-btn {
  padding: 8px 12px;
  border-radius: 5px;
  border: none;
  outline: none;
  background-color: var(--color-clouds);
  color: var(--color-smokey-black);
  font-family: inherit;
  font-size: var(--font-size-16);
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.reload-btn:hover {
  outline: var(--color-clouds) 1px solid;
  background-color: var(--color-smokey-black);
  color: var(--color-clouds);
}
</style>