<template>
    <div>
        <van-empty v-if="paySuccess" image="default" description="支付成功" />
        <van-empty v-else image="error" description="支付失败" />
    </div>
</template>

<script>
import request from '@/common/api/request';

export default {
    name: 'Pay',
    data() {
        return {
            paySuccess: false,
        }
    },
    methods: {
        async getData() {
            const urlData = {
                out_trade_no: this.$router.query.out_trade_no,
                trade_no: this.$router.query.trade_no
            }
            const data = request.$axios({
                url: '/api/payment/result',
                methods: 'POST',
                data: urlData,
                headers: {
                    token: true,
                }
            })
            if (!!data) {
                this.paySuccess = true;
            }
        }
    },
    created() {

    }
}
</script>