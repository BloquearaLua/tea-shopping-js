<template>
    <van-address-edit
        :area-list="areaList"
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="handleSavePath"
        @delete="handleDeletePath"
        @change-detail="handleChangeDetail"
        />
</template>

<script>
import request from '@/common/api/request';
import { Toast } from 'vant';

export default {
    name: 'PathDetails',
    data() {
    return {
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
            searchResult: [],
        };
    },
    methods: {
        async handleSavePath(content) {
            console.log(content);
            const data = await request.$axios({
                url: '/api/address/add',
                methods: 'POST',
                data: {
                    ...content,
                    isDefault: +content.isDefault
                },
                headers: {
                    token: true,
                }
            });
            if (!!data) {
                Toast('添加成功');
                this.$router.push('/path');
            }
            console.log('add address:', data);
        },
        handleDeletePath() {
            Toast('delete');
        },
        handleChangeDetail(val) {
            if (val) {
                this.searchResult = [
                {
                    name: '黄龙万科中心',
                    address: '杭州市西湖区',
                },
                ];
            } else {
                this.searchResult = [];
            }
        },
    },
    components: {
        
    }
}
</script>

<style scoped lang="scss">


.van-address-edit {
    padding: 0px;
}

::v-deep .van-button--danger {
    background-color: #b0352f;
}

</style>