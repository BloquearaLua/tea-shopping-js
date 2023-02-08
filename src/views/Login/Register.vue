<template>
    <div class="container">
        <Header title="注册" back="/login"></Header>
        <section>
            <van-form @submit="handleRegister">
                <van-field
                    v-model="userTel"
                    type="tel"
                    label="手机号"
                    name="手机号"
                    placeholder="请输入手机号"
                    :rules="[{ required: true }, { pattern: /^1[23456789]\d{9}$/, message: '手机格式不正确'}]"
                 />
                <van-field
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
                    v-model="userPwd"
                    center
                    clearable
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="请输入密码"
                    :rules="[{ required: true }, { pattern: /^\w{6,12}$/, message: '密码格式不正确'}]"
                />
                <van-button class="login-btn" type="info" native-type="submit">注册</van-button>
            </van-form>
        </section>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import request from '@/common/api/request';
import Header from './Header.vue';

export default {
    name: 'Register', 
    data() {
        return {
            disabled: false,
            userTel: '',
            userPwd: '',
            codeTime: 60,
            msgCode: '',
            codeMsg: '获取验证码',
            trueCode: '',
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
        async handleRegister() {
            if (!this.validate('userTel')) return;
            if (!this.validate('msgCode')) return;
            if (!this.validate('userPwd')) return;
            
            if (this.trueCode == this.msgCode) {
                const data = await request.$axios({
                    url: '/api/user/register',
                    methods: 'POST',
                    data: {
                        userTel: this.userTel,
                        userPwd: this.userPwd
                    }
                })
                console.log("register:", data);
                Toast({
                    message: '注册成功',
                    duration: 1000
                });
                this.$router.push('/login');
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
                // Toast(this.rules[key].msg);
                bool = false;
                return false;
            }
            return bool;
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

</style>