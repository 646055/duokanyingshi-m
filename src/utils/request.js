/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
var strcookie = window.localStorage.getItem('userInfo')
const request = axios.create({
    headers: { 'X-Requested-With': strcookie },
    withCredentials: true,
    baseURL: 'http://192.168.1.9:8083'
})
export default request
