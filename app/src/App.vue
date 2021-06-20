<template>
  <div id="app" style="margin: 36px;">
    <div style="display: flex; align-items: center">
      <router-link :to="'permit'">permit(EIP-712, EIP-2612)</router-link>
      <img src="../public/thinking-face_1f914.png" alt="" width="20" height="20" style="margin-left: 4px;">
    </div>

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
