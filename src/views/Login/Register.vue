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
            <!-- <div class="login-tel">
                <input type="text" v-model="userTel" placeholder="请输入手机号" />
            </div>
            <div class="login-code">
                <input type="text" v-model="msgCode" placeholder="请输入短信验证码" pattern="[0-9]*" />
                <button @click="handleMsgCode" :disabled="disabled">{{ codeMsg }}</button>
            </div>
            <div class="login-pwd">
                <input type="password" v-model="userPwd" placeholder="请输入密码" />
            </div>
            <div class="register-btn" @click="handleRegister">注册</div> -->
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
            codeTime: 6,
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
                    url: '/api/register',
                    methods: 'POST',
                    data: {
                        userTel: this.userTel,
                        userPwd: this.userPwd
                    }
                })
                console.log("register:", data);
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
                url: 'api/login/code',
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
                this.codeTime = 6;
                this.disabled = false;
                this.codeMsg = '重新发送';
            }, 6000)
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
    
//     .login{
//         &-tel {
//             margin-top: 0.8rem;
//             input {
//                 width: 100%;
//             }
//         }
//         &-pwd {
//             margin-top: 0.28rem;
//             input {
//                 width: 100%;
//             }
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
    
//     .register-btn {
//         line-height: 1.17rem;
//         color: #fff;
//         text-align: center;
//         background-color: #b0352f;
//         border-radius: 4px;

//     }
// }

</style>