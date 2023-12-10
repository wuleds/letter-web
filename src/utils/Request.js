import axios from 'axios';
import Qs from 'qs';

const instance = axios.create({
    baseURL: '/api', // 设置基本URL
    timeout: 5000, // 设置请求超时时间
    headers:{
        'Content-Type': 'application/json; charset=utf-8'
    }
});

// 跨域请求，允许保存cookie
instance.defaults.withCredentials = true
// 针对不同的请求方法设置特定的配置
instance.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
// 设置POST请求的默认配置
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
// 设置GET请求的默认配置
instance.defaults.params = {};
instance.defaults.paramsSerializer = (params) => {
    return Qs.stringify(params, { arrayFormat: 'brackets' });
};
instance.defaults.withCredentials = true

// 请求拦截器，在请求被发送之前做一些处理
instance.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么，例如添加token等
        const token = localStorage.getItem('Authorization');
        if (token) {
            config.headers['Authorization'] = "bearer " + token; // 注入Authorization到请求头
        }
        console.log('请求拦截器 - 请求发送前:', config);
        //针对不同请求方法设置特定配置
        const type = config.method
        const arrayFormat = config.headers.arrayFormat || 'indices'
        if (
            type === 'post' &&
            config.headers['Content-Type'] ===
            'application/x-www-form-urlencoded; charset=utf-8'
        ) {
            // post请求参数处理
            config.data = Qs.stringify(config.data, {
                allowDots: true,
                arrayFormat: arrayFormat
            })
        } else if (type === 'get') {
            // get请求参数处理
            config.paramsSerializer = (params) => {
                return Qs.stringify(params, {
                    allowDots: true,
                    arrayFormat: arrayFormat
                })
            }
        }
        return config;
    },
    (error) => {
        // 处理请求错误
        console.error('请求拦截器 - 请求错误:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器，在接收到响应后做一些处理
instance.interceptors.response.use(
    (response) => {
        if(response.data.code === 401){
            deleteAuthorization();
            window.location.href = "/login"
        }
        // 对响应数据做些什么
        console.log('响应拦截器 - 接收到响应:', response);
        return response;
    },
    (error) => {
        // 对响应错误做些什么
        console.error('响应拦截器 - 响应错误:', error);
        if (error.response.status === 404) {
            window.location.href = "/404"; // 跳转到404页面
        }
        return Promise.reject(error);
    }
);

export default instance;