<template>
  <div class="userhome">
    <div class="user_main">
      <left style="margin-right:10px"></left>
      <right></right>
    </div>
  </div>
</template>

<script>
import left from "./left";
import right from "./right/";

export default {
  components: { left, right },
  data() {
    return {};
  }
};
</script>

<style scoped>
.user_main {
  width: 100%;

  display: flex;
  justify-content: center;
}
.userhome {
  min-height: 100%;
  padding-top: 10%;

  background: url("~@/assets/userhome-bg.jpeg") no-repeat;
  background-size: 100% 100%;
  height: 75%;
}
</style>
