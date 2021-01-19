import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeHome: 0,
    activeLR: 0,
    cuerrentUrl: '',
    username: '',
    password: '',
    name: '',
    randomUsername: '0',
    money: 0,
    id: 0,
    url: '',
    loginSuccess: '',
    invitedId: window.localStorage.getItem('userInfo'),
    isVip: '',
    show: true,
    dataNumber1: 0,
    dataNumber2: 0,
    eTime: ''
  },
  mutations: {
    // 点击跳转到对应的类型界面
    intoOthers(state, num) {
      state.activeHome = num
    },
    // 点击跳转到登录界面
    intoLogin(state, num) {
      state.activeLR = num
    },
    // 存储当前请求的视频地址
    storeUrl(state, url) {
      state.cuerrentUrl = url
    },
    // 修改遮罩层显示与隐藏
    changeShow(state, now) {
      state.show = now
    },
    // 推广人链接
    setInviteId(state, id) {
      state.invitedId = id
      window.localStorage.setItem(
        'userInfo',
        state.invitedId
      )
    },
    // 修改会员状态
    changeVipState(state, vip) {
      state.isVip = vip
    },
    // 判断数据库的订单个数
    checkData1(state, num) {
      state.dataNumber1 = num
    },
    checkData2(state, num) {
      state.dataNumber2 = num
    },
    // 刷新会员状态
    newVip(state, newData) {
      state.isVip = newData.isVip
      state.eTime = newData.eTime
    }
  },
  actions: {
  },
  modules: {
  }
})
