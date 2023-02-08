<!-- <template>
    <div class="container">
        <Header title="密码登录" back="/my"></Header>
        <section>
            <van-form @submit="handleLogin">
                <van-field
                    v-model="userTel"
                    type="tel"
                    label="手机号"
                    name="手机号"
                    placeholder="请输入手机号"
                    :rules="[{ required: true }, { pattern: /^1[23456789]\d{9}$/, message: '手机格式不正确'}]"
                 />
                <van-field
                    v-model="userPwd"
                    center
                    clearable
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="请输入密码"
                    :rules="[{ required: true }, { pattern: /^\w{6,12}$/, message: '密码格式不正确'}]"
                />
                <van-button class="login-btn" type="info" native-type="submit">登录</van-button>
            </van-form>
            <div class="tab">
                <span @click="handleLoginType">短信登录</span>
                <span @click="handleRecover">找回密码</span>
                <span @click="handleRegister">快速注册</span>
            </div>
        </section>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import request from '@/common/api/request';
import Header from './Header.vue';
import { Toast } from 'vant';

export default {
    name: 'Login',
    data() {
        return {
            userTel: '',
            userPwd: '',
            rules: {
                userTel: {
                    rule: /^1[23456789]\d{9}$/,
                    msg: '手机号不能为空，且为11位数字',
                },
                userPwd: {
                    rule: /^\w{6,12}$/,
                    msg: '密码不能为空，且6至12位数字、字母',
                }
            }
        }
    },
    methods: {
        ...mapMutations(['userLogin']),
        async handleLogin() {
            // console.log(this.userTel, this.userPwd);
            if (!this.validate('userTel')) return;
            if (!this.validate('userPwd')) return;
            const data = await request.$axios({ 
                url: '/api/user/login',
                methods: 'POST',
                data: {
                    userTel: this.userTel,
                    userPwd: this.userPwd
                }
            })
            console.log('userData:', data[0]);
            if (!!data) {
                this.userLogin(data[0]);
                this.$router.push('/my');
            }
        },
        validate(key) {
            let bool = true;
            if (!this.rules[key].rule.test(this[key])) {
                Toast(this.rules[key].msg);
                bool = false;
                return false;
            }
            return bool;
        },
        handleLoginType() {
            this.$router.push('/login');
        },
        handleRecover() {
            this.$router.push('/recovery');
        },
        handleRegister() {
            this.$router.push('/register')
        },
    },
    components: {
        Header,
    },
}
</script>

<style lang="scss" scoped>
.login-btn {
    margin: 0.6rem 5% 0.1rem;
    width: 90%;
}

.tab {
    display: flex;
    justify-content: space-between;
    padding: 0 5%;
    font-size: 0.48rem;
    font-weight: 500;
    color: #646566;
}

</style> -->