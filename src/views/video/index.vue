<template>
  <div class="video-container">
    <!-- 头部导航栏 -->
    <van-nav-bar
      title="多看影视"
      left-text="返回"
      right-text="购买会员"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
    >
      <!-- <template #right>
        <van-icon name="manager" size="18" />
      </template> -->
    </van-nav-bar>
    <!-- 视频播放 -->
    <video
      :src="movie"
      controls
      id="vi"
      poster="http://shp.qpic.cn/collector/1789764317/73cd90cc-99a3-4dae-a8cf-7db5693b2bab/0"
    ></video>

    <!-- 遮罩层 -->
    <van-overlay :show="this.$store.state.show">
      <div class="wrapper">
        <div class="block">
          <van-panel
            title="该视频需要购买"
            desc="可以选择单片购买或者开通会员,单片购买不需要注册。"
          >
            <div class="fzSmall" v-if="Price !== {}">
              单片购买仅需{{ this.Price.state0 }}元
            </div>
            <div class="fzSmall" v-if="Price !== {}">
              1天/vip仅需{{ this.Price.state1 }}元
            </div>
            <div class="fzSmall" v-if="Price !== {}">
              3天/vip仅需{{ this.Price.state3 }}元
            </div>
            <div class="fzSmall" v-if="Price !== {}">
              5天/vip仅需{{ this.Price.state5 }}元
            </div>
            <div class="fzSmall" v-if="Price !== {}">
              30天/vip仅需{{ this.Price.state30 }}元
            </div>
            <div class="btn">
              <div class="buy">
                <van-button round size="large" type="info" @click="goPayforOne"
                  >单片购买</van-button
                >
              </div>
              <div class="buy">
                <van-button round size="large" type="danger" @click="goPayfor"
                  >开通会员</van-button
                >
              </div>
            </div>
          </van-panel>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import router from '@/router'
import { getMovieUrl, getVipList, getVipPrice, dataMuch } from '../../api/index'
import { Notify } from 'vant'
export default {
  name: 'videoContainer',
  data() {
    return {
      user: {
        username: '',
        id: '',
        movieName: ''
      },
      movie: '',
      getPayList: {
        state: 0,
        userName: '',
        name: ''
      },
      Price: {},
      videoName: {
        videoName: ''
      },
      users: {
        username: ''
      }
    }
  },
  components: {},
  created() {
    this.getUrl()
    this.buyVip()
  },
  mounted() {},
  methods: {
    // 点击回到主页面
    onClickLeft() {
      // router.go(-1)
      router.back()
    },
    // 点击进行登录
    onClickRight() {
      router.push('/login')
    },
    // 发送请求获取资源
    async getUrl() {
      if (this.$store.state.isVip) {
        this.$store.commit('changeShow', false)
      }
      // 准备请求需要的参数,如果用户直接选择免费的电影观看，生成临时用户名和id
      if (this.$store.state.username === '') {
        this.$store.state.randomUsername =
          'linshi' + Math.floor(Math.random() * 100000000 + 1)
        this.$store.state.username = this.$store.state.randomUsername
        this.user.username = this.$store.state.randomUsername
        this.$store.state.id = 'id' + Math.floor(Math.random() * 100000000 + 1)
        this.user.id = this.$store.state.id
        this.user.movieName = this.$store.state.name
        // 发送请求
        console.log(this.user.username)
        const { data: res } = await getMovieUrl(this.user)
        console.log(this.user)
        this.movie = res.data
        if (res.flag) {
          this.$store.commit('changeShow', false)
        } else {
          this.$store.commit('changeShow', true)
          Notify('该片为会员观看,请充值')
        }
        console.log(res)
      } else {
        this.user.username = this.$store.state.username
        this.user.movieName = this.$store.state.name
        this.user.id = this.$store.state.id
        console.log(this.user.username)
        const { data: res } = await getMovieUrl(this.user)
        this.movie = res.data
        if (res.flag) {
          this.$store.commit('changeShow', false)
        } else {
          this.$store.commit('changeShow', true)
          Notify('该片为会员观看,请充值')
        }
        console.log(res)
      }
    },
    // 跳转到注册登录界面，然后购买
    goPayfor() {
      router.push('/login')
    },
    // 单片购买
    async goPayforOne() {
      this.getPayList.state = 0
      this.getPayList.name = this.$store.state.name
      this.getPayList.userName = this.$store.state.username
      console.log(this.getPayList)
      const { data: res } = await getVipList(this.getPayList)
      console.log(res)
      if (res.flag) {
        this.users.username = this.$store.state.username
        const { data: res } = await dataMuch(this.users)
        this.$store.commit('checkData1', res.data)
        console.log(res, 111)
      }
      this.$store.state.money = res.data.money
      this.$store.state.url = res.data.url
      this.$router.push('/payfor')
    },
    // 会员价格展示
    async buyVip() {
      this.videoName.videoName = this.$store.state.name
      const { data: res } = await getVipPrice(this.videoName)
      this.Price = res.data
      console.log(this.Price)
    }
  }
}
</script>

<style scoped lang="less">
video {
  width: 100%;
  height: 200px;
}
.btn {
  width: 80%;
  margin-left: 40px;
  .van-button {
    width: 100%;
    margin: 10px 20px 5px 0;
  }
}
.wrapper {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 100%;
}
.block {
  width: 100%;
  height: 340px;
  background-color: #fff;
}
.fzSmall {
  font-size: 15px;
  color: rgb(243, 41, 41);
  margin: 5px 0 0 15px;
}
</style>
