<template>
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
                <!-- <div class="login-code">
                    <input type="text" v-model="msgCode" placeholder="请输入短信验证码" pattern="[0-9]*"/>
                    <button @click="handleMsgCode" :disabled="disabled">{{ codeMsg }}</button>
                </div> -->
                <!-- <div class="login-btn" @click="handleLogin">登录</div> -->
                
            </van-form>
            <!-- <div class="login-tel">
                <input type="text" v-model="userTel" placeholder="请输入手机号" pattern="[0-9]*"/>
            </div> -->
            <!-- <div class="login-tel">
                <input type="password" v-model="userPwd" placeholder="请输入密码"/>
            </div> -->
            <!-- <div class="login-btn" @click="handleLogin">登录</div> -->
            <div class="tab">
                <span @click="handleLoginType">短信登录</span>
                <span @click="handleRecover">找回密码</span>
                <span @click="handleRegister">快速注册</span>
            </div>
        </section>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { mapMutations } from "vuex";
import request from '@/common/api/request';
import Header from './Header.vue';

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
                url: '/api/login',
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
// section {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     background-color: #f5f5f5;

//     div {
//         margin: 0.27rem 0;
//         width: 8.9rem;
//         height: 1.17rem;
//     }

//     input {
//         box-sizing: border-box;
//         padding: 0 0.27rem;
//         line-height: 1.17rem;
//         background-color: #fff;
//         border: solid 1px #ccc;
//         border-radius: 4px;
//     }
    
//     .login-tel {
//         margin-top: 0.8rem;
//         input{
//             width: 100%;
//         }
//     }

//     .login-code {
//         display: flex;

//         input {
//             flex: 1;
//         }

//         button {
//             margin-left: 0.27rem;
//             padding: 0 0.53rem;
//             line-height: 1.17rem;
//             background-color: #b0352f;
//             color: #fff;
//             border: 0;
//             border-radius: 4px;
//         }
//     }
    
//     .login-btn {
//         line-height: 1.17rem;
//         color: #fff;
//         text-align: center;
//         background-color: #b0352f;
//         border-radius: 4px;

//     }

//     .tab {
//         display: flex;
//         justify-content: space-between;
//         font-size: 0.48rem;
//         font-weight: 500;
//     }
// }

</style>