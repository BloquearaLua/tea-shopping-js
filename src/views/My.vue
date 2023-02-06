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
      <!-- <ul>
        <li @click="handlePathManage">地址管理</li>
        <li v-if="loginStatus" @click="logout">退出账号</li>
      </ul> -->
      <van-list>
        <van-cell />
        <van-cell title="地址管理" />
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
    // background-color: #b0352f;
    // background: linear-gradient(to right, #6068E8, #A6AAE7);
    background: linear-gradient(to right, #3395E5, #EC6FAE);

    .login {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0.16rem 0.4rem;
      color: black;
      font-size: 0.43rem;
      border-radius: 8px;
      background: linear-gradient(to right, #F2904F, #3B4270);
      background: #fff;
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
      font-size: 0.43rem;
    }
  }
}
</style>