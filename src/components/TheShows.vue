<template>
  <h2>TV Shows</h2>
</template>

<script>
export default {
  emits: ["activated-side"],
  beforeMount() {
    // emit a custom event that sets active styling on the header links
    this.$emit("activated-side", "shows");
  },
};
</script>