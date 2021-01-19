<template>
  <div class="login-container">
    <van-form @submit="onSubmit">
      <van-field
        prop="username"
        v-model="user.username"
        name="username"
        label="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="user.password"
        type="password"
        name="password"
        label="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getLogin } from '../../../api/index'
import router from '@/router'
export default {
  name: 'LoginContainer',
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
    async onSubmit() {
      const userMessage = this.user
      try {
        console.log(this.user)
        const { data } = await getLogin(userMessage)
        console.log(data)
        this.$store.state.eTime = data.data.etime
        this.$store.state.isVip = data.data.auth
        this.$store.state.id = data.data.id
        this.$toast(data.message)
        this.$store.state.loginSuccess = data.message
        this.$store.state.username = this.user.username
        this.$store.state.password = this.user.password
        router.push('/vip')
      } catch (err) {
        this.$toast('账号或者密码填写错误，请重试！')
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
