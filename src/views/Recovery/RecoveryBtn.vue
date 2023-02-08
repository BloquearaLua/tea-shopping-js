<template>
    <div class="container">
        <Header title="找回密码" back="/login"></Header>
        <section>
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
            <van-button class="info-btn" type="info" @click="handleSubmit">确认修改</van-button>
        </section>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import request from '@/common/api/request';
import Header from '../Login/Header.vue';

export default {
    name: 'RecoveryIndex',
    data() {
        return {
            disabled: false,
            userPwd: '',
            trueCode: '',
            rules: {
                userPwd: {
                    rule: /^\w{6,12}$/,
                    msg: '密码不能为空，且6至12位数字、字母',
                }
            }
        }
    },
    methods: {
        async handleSubmit() {
            if (!this.validate('userPwd')) return;

            const data = await request.$axios({
                url: '/api/user/recovery',
                methods: 'POST',
                data: {
                    userTel: this.$route.query.userTel,
                    userPwd: this.userPwd
                }
            })
            console.log("------", data);
            if (!!data) {
                Toast("修改成功");
                this.$router.push('/login');
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
    },
    components: {
        Header,
    },
}
</script>

<style lang="scss" scoped>
section {
    .info-btn {
        margin: 0.6rem 5% 0.1rem;
        width: 90%;
    }
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // background-color: #f5f5f5;

    // div {
    //     margin: 0.27rem 0;
    //     width: 8.9rem;
    //     height: 1.17rem;
    // }

    // input {
    //     box-sizing: border-box;
    //     padding: 0 0.27rem;
    //     line-height: 1.17rem;
    //     background-color: #fff;
    //     border: solid 1px #ccc;
    //     border-radius: 4px;
    // }
    
    // .login{
    //     &-tel {
    //         margin-top: 0.8rem;
    //         input {
    //             width: 100%;
    //         }
    //     }
    //     &-pwd {
    //         margin-top: 0.28rem;
    //         input {
    //             width: 100%;
    //         }
    //     }
    // }
    

    // .login-code {
    //     display: flex;

    //     input {
    //         flex: 1;
    //     }

    //     button {
    //         margin-left: 0.27rem;
    //         padding: 0 0.53rem;
    //         line-height: 1.17rem;
    //         background-color: #b0352f;
    //         color: #fff;
    //         border: 0;
    //         border-radius: 4px;
    //     }
    // }
    
    // .register-btn {
    //     line-height: 1.17rem;
    //     color: #fff;
    //     text-align: center;
    //     background-color: #b0352f;
    //     border-radius: 4px;

    // }
}

</style>