<template>
  <div class="my">
    <header>
      <div class="login" @click="handleLogin">登录/注册</div>
    </header>
    <section>
      <ul>
        <li>地址管理</li>
      </ul>
    </section>
    <TabBar/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TabBar from '@/components/common/TabBar.vue';
export default {
  name: "My",
  methods: {
    handleLogin() {
      this.$router.push('/login');
    }
  },
  components: {
    TabBar
  },
};
</script>

<style lang="scss" scoped>
.my {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  header {
    position: relative;
    width: 100%;
    height: 4.3rem;
    background-color: #b0352f;

    .login {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0.16rem 0.4rem;
      color: #fff;
      font-size: 0.43rem;
      border-radius: 6px;
      background-color: #f6ab32;
      cursor: pointer;
    }
  }

  section {
    flex: 1;
    overflow: hidden;

    ul li {
      padding: 0.4rem;
      gz: 0.43rem;
    }
  }
}
</style>