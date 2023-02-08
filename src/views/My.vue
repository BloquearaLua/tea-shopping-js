<template>
  <div class="my">
    <header>
      <div class="user-info" v-if="loginStatus">
        <img src="../../public/images/avatar.jpeg" alt="">
        <span>{{ userInfo.nick_name || userInfo.tel }}</span>
      </div>
      <van-button 
        v-else
        class="login"
        type="default"
        size="small"
        @click="handleLogin"
      >
        登录/注册
      </van-button>
    </header>
    <section>
      <van-list>
        <van-cell />
        <van-cell title="我的订单" />
        <van-cell title="查看物流" />
        <van-cell title="地址管理" @click="handlePathManage" />
        <van-cell title="我的客服" />
        <van-cell title="退出账号" v-if="loginStatus" @click="logout" />
      </van-list>
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
    },
    handlePathManage() {
      this.$router.push('/path');
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
    background: linear-gradient(to right, #3395E5, #EC6FAE);

    .login {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
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
}
</style>