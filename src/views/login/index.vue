<template>
  <div class="login-container">
    <van-nav-bar
      left-text="返回"
      title="多看影视"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 登录和注册组件 -->
    <van-tabs v-model="currentActiveLR">
      <van-tab title="注册"><register /></van-tab>
      <van-tab title="登录"><login /></van-tab>
    </van-tabs>
  </div>
</template>
<script>
import router from '@/router'
import register from './component/register'
import login from './component/login'
import { mapState } from 'vuex'
export default {
  name: 'LoginIndex',
  components: {
    register,
    login
  },
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState(['activeLR']),
    currentActiveLR: {
      get() {
        return this.activeLR
      },
      set(v) {
        this.$store.commit('intoLogin', v)
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 点击返回主页面
    onClickLeft() {
      router.go(-1)
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  .login-btn {
    border: none;
  }
  .toutiao {
    font-size: 20px;
  }
  .send-sms-btn {
    width: 100px;
    height: 30px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 12px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
