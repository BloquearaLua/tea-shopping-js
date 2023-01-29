<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('initUser');
  }
}
</script>
<style>
</style>
