import { Indicator, Toast } from 'mint-ui';

import axios from 'axios';
export default {
    common: {
        methods: 'GET',
        data: {},
        params: {},
    },
    $axios(options={}) {
        options.method = options.methods || this.common.methods;
        options.data = options.data || this.common.data;
        options.params = options.params || this.common.params;

        // 请求前 loading...
        Indicator.open('加载中...');
        
        return axios(options).then(value => {
            console.log(value);
            let data = value.data.data;
            let code = value.data.code;
            return new Promise((res, rej) => {
                if (code !== 0) {
                    Indicator.close();
                    Toast({
                        message: value.data.msg || 'Error',
                        duration: 3000,
                    })
                    return;
                }

                if (!value) return rej();
                
                setTimeout(() => {
                    Indicator.close();
                }, 500);
                console.log(data);
                res(data);
            })
        })
    }
}