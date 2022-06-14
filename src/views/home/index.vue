<template>
  <div>
    <Header></Header>
    <Bodys></Bodys>
  </div>
</template>

<script>
import Header from "./heade/Header.vue";
import Bodys from "./body/index.vue";

export default {
  name: "home",
  components: { Header, Bodys }
};
</script>

<style></style>
