<template>
  <div class="my">
    <header>
      <div class="user-info" v-if="loginStatus">
        <img src="../../public/images/avatar.jpeg" alt="">
        <span>{{ userInfo.nick_name || userInfo.tel }}</span>
      </div>
      <div v-else class="login" @click="handleLogin">登录/注册</div>

    </header>
    <section>
      <ul>
        <li>地址管理</li>
        <li v-if="loginStatus" @click="logout">退出账号</li>
      </ul>
    </section>
    <TabBar/>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import TabBar from '@/components/common/TabBar.vue';
export default {
  name: "My",
  methods: {
    ...mapMutations(['logout']),
    handleLogin() {
      this.$router.push('/login');
    }
  },
  computed: {
    ...mapState({
      loginStatus: (state) => {
        console.log("loginStatus", state, state.user.loginStatus);
        return state.user.loginStatus
      },
      userInfo: (state) => state.user.userInfo,
    })
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

    .user-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      img {
        width: 1.76rem;
        height: 1.76rem;
        border-radius: 50%;
      }

      span {
        display: block;
        padding-top: 0.13rem;
        font-size: 0.48rem;
        text-align: center;
        color: #fff;
      }
    }
  }

  section {
    flex: 1;
    overflow: hidden;

    ul li {
      padding: 0.4rem;
      fz : 0.43rem;
    }
  }
}
</style>