// 封装接口
import request from '@/utils/request'
// 获取主页信息
export const getIndexMessage = (data) => {
    return request({
        method: 'POST',
        url: 'search/firstPage/id',
        data
    })
}
// 登录注册/film/login
export const getLogin = (data) => {
    return request({
        method: 'POST',
        url: 'film/login',
        data
    })
}
// 注册
export const goRegister = (data) => {
    return request({
        method: 'POST',
        url: 'film/register',
        data
    })
}
// 获取电影资源
export const getMovie = (data) => {
    return request({
        method: 'POST',
        url: 'search/movie',
        data
    })
}
// 获取动漫资源
export const getComicList = (data) => {
    return request({
        method: 'POST',
        url: 'search/comic',
        data
    })
}
// 获取电视剧资源
export const getRotationList = (data) => {
    return request({
        method: 'POST',
        url: 'search/rotation',
        data
    })
}
// 获取综艺资源
export const getVarietyList = (data) => {
    return request({
        method: 'POST',
        url: 'search/variety',
        data
    })
}
// 输入内容，搜索
export const getResultList = (data) => {
    return request({
        method: 'POST',
        url: 'search/condition',
        data
    })
}
// 获取支付信息
export const getVipList = (data) => {
    return request({
        method: 'POST',
        url: 'search/order',
        data
    })
}
// 获取电影视频资源
export const getMovieUrl = (data) => {
    return request({
        method: 'POST',
        url: 'look/movie',
        data
    })
}
// 获取电视剧视频资源
export const getTelevisionUrl = (data) => {
    return request({
        method: 'POST',
        url: 'look/lookTelevision',
        data
    })
}
// 获取动漫视频资源
export const getComicUrl = (data) => {
    return request({
        method: 'POST',
        url: 'look/comic',
        data
    })
}
// 获取综艺视频资源
export const getVarietyUrl = (data) => {
    return request({
        method: 'POST',
        url: 'look/variety',
        data
    })
}
// 会员价格展示
export const getVipPrice = (data) => {
    return request({
        method: 'POST',
        url: 'search/money',
        data
    })
}
// 查询是否支付成功
export const getPayforSuccess = (data) => {
    return request({
        method: 'POST',
        url: 'search/monitor',
        data
    })
}
// 支付
export const dataMuch = (data) => {
    return request({
        method: 'POST',
        url: '/search/monitor1',
        data
    })
}
export const dataMuchs = (data) => {
    return request({
        method: 'POST',
        url: '/search/monitor2',
        data
    })
}
