<template>
    <div class="path-detail">
        <Header :title="type === 'add' ? '新增地址' : '编辑地址'" back="/path"></Header>
        <van-address-edit
            v-if="type==='add'"
            :area-list="areaList"
            show-set-default
            @save="handleSavePath"
        />
        <van-address-edit
            v-else
            :area-list="areaList"
            :address-info="addressInfo"
            show-delete
            show-set-default
            @save="handleSavePath"
            @delete="handleDeletePath"
        />
    </div>
</template>

<script>
import request from '@/common/api/request';
import { Toast } from 'vant';
import Header from "@/views/Login/Header.vue";

export default {
    name: 'PathDetails',
    data() {
    return {
            type: 'add',
            addressInfo: {},
            areaList: {
                province_list: {
                    110000: '北京市',
                    120000: '天津市',
                },
                city_list: {
                    110100: '北京市',
                    120100: '天津市',
                },
                county_list: {
                    110101: '东城区',
                    110102: '西城区',
                    // ....
                },
            },
        };
    },
    methods: {
        async handleSavePath(content) {
            console.log(content);
            let url = this.type === 'add' ? '/api/address/add' : '/api/address/edit';
            let { id } = this.addressInfo;
            const data = await request.$axios({
                url,
                methods: 'POST',
                data: {
                    ...content,
                    id,
                    isDefault: +content.isDefault,
                },
                headers: {
                    token: true,
                }
            });
            if (!!data) {
                this.type === 'add' ? Toast('添加成功') : Toast('编辑成功');
                this.$router.push('/path');
            }
            console.log('add address:', data);
        },
        async handleDeletePath(content) {
            console.log(content,'ff');
            const data = request.$axios({
                url: '/api/address/delete',
                methods: 'POST',
                data: {
                    id: content.id
                },
                headers: {
                    token: true
                }
            })
            if (!!data) {
                Toast('删除成功');
                this.$router.push('/path')
            }
            
        },
    },
    created() {
        this.type = this.$route.params.type;
        console.log('type???', this.type);
        if (this.type === 'edit') {
            this.addressInfo = JSON.parse(this.$route.params.data);
        }
    },
    components: {
        Header
    }
}
</script>

<style scoped lang="scss">


.van-address-edit {
    padding: 0px;
}

::v-deep .van-button--danger {
    border: solid 1px #6091E8;
    background-color: #6091E8;
}

</style>