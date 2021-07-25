<template>
  <div class="container">
    <h3>
      Article: <a :href="article">{{ title }}</a>
    </h3>
    <h3>Sample</h3>
    <div>sample</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: "sample.com",
      title: "sample",
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  text-align: left;

  padding: 2px 20px 20px 20px;

  background: #f6f8fa;
  border-radius: 10px;
}
</style>