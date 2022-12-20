<template>
  <div class="home">
    Home
    <TabBar></TabBar>
  </div>
  
</template>

<script>
import TabBar from '../components/common/TabBar.vue';
export default {
  name: "Home",
  components: {
    TabBar,
  },
};
</script>

<style scoped>
.home {

}
</style>