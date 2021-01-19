<template>
  <div class="register-container">
    <van-form>
      <van-field
        v-model="user.username"
        name="username"
        label="用户名"
        :rules="[{ required: true, message: '用户名不能为空' }]"
      />
      <van-field
        v-model="user.password"
        type="password"
        name="password"
        label="密码"
        :rules="[{ required: true, message: '密码不能为空' }]"
      />
      <span class="goLogin" @click="goLogin">已有账号？去登录</span>
      <div style="margin: 16px;">
        <van-button
          @click="goRegist"
          round
          block
          type="info"
          native-type="submit"
        >
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { goRegister } from '../../../api/index'
export default {
  name: 'RegisterContainer',
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 注册请求
    async goRegist(user) {
      const userMessage = this.user
      try {
        const { data } = await goRegister(userMessage)
        console.log(data)
        this.$toast(data.message)
        if (data.message === '注册成功') {
          this.$store.commit('intoLogin', 1)
        }
      } catch (err) {
        this.$message.error('注册失败')
      }
    },
    goLogin() {
      this.$store.commit('intoLogin', 1)
    }
  }
}
</script>

<style scoped lang="less">
.goLogin {
  font-size: 12px;
  float: right;
  margin: 15px 10px 15px 0;
}
.goVip {
  margin: 20px 20px;
  width: 90%;
}
</style>
