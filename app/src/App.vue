<template>
  <div id="app" style="margin: 36px;">
    <router-link :to="'permit'">permit(EIP-712, EIP-2612)</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("connect")
  },
}
</script>
