<template>
    <div class="login container">
        <Header title="验证码登录" back="/my"></Header>
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
                    v-if="loginType === 'code'"
                    v-model="msgCode"
                    center
                    clearable
                    name="短信验证码"
                    label="短信验证码"
                    placeholder="请输入短信验证码"
                    :rules="[{ required: true }, { pattern: /\d{4}/, message: '验证码格式不正确'}]"
                    >
                    <template #button>
                        <van-button size="small" plain type="info" @click="handleMsgCode">{{ codeMsg }}</van-button>
                    </template>
                </van-field>
                <van-field
                    v-if="loginType === 'pwd'"
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
                    <span @click="handleUserLogin">密码登录</span>
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
import { Toast } from "vant";

export default {
    name: 'Login', 
    data() {
        return {
            disabled: false,
            userTel: '',
            codeTime: 60,
            msgCode: '',
            codeMsg: '获取验证码',
            trueCode: '',
            userPwd: '',
            loginType: 'code',
            rules: {
                userTel: {
                    rule: /^1[23456789]\d{9}$/,
                    msg: '手机号不能为空，且为11位数字',
                },
                msgCode: {
                    rule: /\d{4}/,
                    msg: '手机验证码输入不正确',
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
        handleUserLogin() {
            // this.$router.push('/userLogin');
            if (this.loginType === "code") {
                this.loginType = "pwd";
            } else {
                this.loginType = "code";
            }
        },
        validtor(val) {
            return /^1[3456789]\d{9}$/.test(val);
        },
        handleLogin() {
            this.loginType === 'code' ? this.handleLoginByCode() : this.handleLoginByPwd();
        },
        async handleLoginByPwd() {
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
        async handleLoginByCode() {
            console.log(this.userTel, this.msgCode);
            // if (!this.validate('userTel')) return;
            // if (!this.validate('msgCode')) return;

            console.log(this.trueCode, this.msgCode);
            if (this.trueCode == this.msgCode) {
                const data = await request.$axios({
                    url: '/api/user/add',
                    methods: 'POST',
                    data: {
                        userTel: this.userTel
                    }
                })
                console.log("addUser:", data[0]);
                this.userLogin(data[0]);
                this.$router.push('/my');
                Toast({
                    message: '登录成功',
                    duration: 1000
                })
            } else {
                Toast({
                    message: '验证码错误，请重新输入',
                    duration: 1000
                })
            }
        },
        async handleMsgCode() {
            if (!this.validate('userTel')) return;

            const data = await request.$axios({
                url: '/api/user/login/code',
                methods: 'POST',
                data: {
                    phone: this.userTel
                }
            })
            this.trueCode = data.code;

            this.disabled = true;
            let  timer = setInterval(() => {
                this.codeTime--;
                this.codeMsg = this.codeTime;
            }, 1000)

            setTimeout(() => {
                clearInterval(timer);
                this.codeTime = 60;
                this.disabled = false;
                this.codeMsg = '重新发送';
            }, 60000)
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
        handleRegister() {
            this.$router.push('/register')
        },
        handleRecover() {
            this.$router.push('/recovery');
        },
    },
    components: {
        Header,
    },
}
</script>

<style lang="scss" scoped>
section {
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
}

</style>