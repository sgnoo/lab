<template>
  <div id="app">
    <span class="title">Lab</span>
    <img
      src="../public/thinking-face_1f914.png"
      alt=""
      width="60"
      height="60"
    />
    <div style="margin-top: 16px">
      <div>chainId: {{ $store.state.chainId }}</div>
      <div style="margin: 4px 5%">account: {{ $store.state.account }}</div>
      <div>balance: {{ $store.state.balance }}</div>
    </div>
    <div class="sections">
      <div class="section">
        <span class="lang">Solidity</span>
        <div
          class="contents"
          v-for="solFile in $store.state.solFiles"
          :key="solFile"
        >
          <router-link :to="solFile">{{ solFile }}</router-link>
        </div>
      </div>
      <div class="section">
        <span class="lang">JavaScript</span>
        <div
          class="contents"
          v-for="jsFile in $store.state.jsFiles"
          :key="jsFile"
        >
          <router-link :to="jsFile">{{ jsFile }}</router-link>
        </div>
      </div>
      <div class="section">
        <span class="lang">TypeScript</span>
        <div
          class="contents"
          v-for="tsFile in $store.state.tsFiles"
          :key="tsFile"
        >
          <router-link :to="tsFile">{{ tsFile }}</router-link>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("get");
    this.$store.dispatch("connect");
  },
};
</script>

<style lang="scss" scoped>
#app {
  margin: 0 auto;
  text-align: center;
  width: 960px;

  margin-top: 64px;
}

.title {
  font-size: 64px;
  margin-right: 20px;
}

.sections {
  display: flex;
  margin: 60px 0px 60px 0px;

  .section {
    flex: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.lang {
  font-size: 20px;
  margin-bottom: 12px;
  font-style: italic;
}

.contents {
  margin: 4px 0px;
}
</style>