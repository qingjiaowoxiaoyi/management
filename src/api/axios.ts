import axios from 'axios';
import router from '@/router';
// import Qs from 'qs';
 
axios.defaults.baseURL = "/api";
// 设置请求超时时间
axios.defaults.timeout = 30000;
 
// 设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

//请求拦截器
axios.interceptors.request.use(function(config) {
    //从localStorage里取出token
    const token = localStorage.getItem('tokenName');
    //把token塞入Authorization里
    config.headers.Authorization = `Bearer ${token}`;
    
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

//响应拦截器
axios.interceptors.response.use(function(response) {
    //获取更新的token
    const { authorization } = response.headers;
    //如果token存在则存在localStorage
    authorization && localStorage.setItem('tokenName', authorization);
    return response;
  },
  function(error) {
    if (error.response) {
      const { status } = error.response;
      //如果401或405则到登录页
      if (status == 401) {
        localStorage.removeItem('tokenName');  
        router.push('/login');
      }
    }
    return Promise.reject(error);
  }
);
 
 
// 封装get方法和post方法
 
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(this:any, url:any) {
    return new Promise((resolve, reject) => {
        axios.get(url).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}
 
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(this:any, url:any, params?:any) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
 
/**
 * post方法，参数序列化
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function qspost(this:any, url:any, params:any) {
    return new Promise((resolve, reject) => {
        // axios.post(url, Qs.stringify(params))
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
                //  Loading.service(true).close();
                //  Message({message: '请求成功', type: 'success'});
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
 
 
/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(this:any, url:any, params:any) {
    return new Promise((resolve, reject) => {
        axios.put(url, params)
            .then(res => {
                resolve(res.data);
                // Loading.service(true).close();
                //  Message({message: '请求成功', type: 'success'});
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
 
 
/**
 * delete
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function deletefn(this:any, url:any, params:any) {
    return new Promise((resolve, reject) => {
        axios.delete(url, params)
            .then(res => {
                resolve(res.data);
                // Loading.service(true).close();
                //  Message({message: '请求成功', type: 'success'});
            })
            .catch(err => {
                reject(err.data)
            })
    });
}