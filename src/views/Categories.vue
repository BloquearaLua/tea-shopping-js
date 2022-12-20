<template>
  <div class="categories">
    Categories
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from '../components/common/TabBar.vue';
export default {
  name: "Categories",
  components: {
    TabBar,
  },
};
</script>