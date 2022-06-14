<template>
  <div id="app">
    <Typenave v-if="$route.name != 'home'"></Typenave>
    <router-view></router-view>
    <Foot></Foot>
  </div>
</template>

<script>
import Typenave from "@/components/Typenave";
import Foot from "@/components/Foot/index.vue";

export default {
  name: "App",
  components: { Foot, Typenave },

  mounted() {}
};
</script>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}

/* [v-cloak] {
  display: none !important;
} */
</style>
