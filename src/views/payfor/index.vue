<template>
  <div>
    <van-notice-bar
      scrollable
      text="请注意：临时用户购买单片后请观看完视频后离开，退出多看影视后购买的单片会失效呦~~"
    />
    <van-grid :column-num="1">
      <van-grid-item>
        <van-image :src="list[0].img"></van-image>
      </van-grid-item>

      <!-- 显示收款码 -->
      <van-grid-item class="fw">
        <!-- 显示金额 -->
        ￥{{ this.$store.state.money }}
        <van-image
          class="payforImg"
          :src="this.$store.state.url"
          v-if="this.active === true"
        ></van-image>
        <van-image :src="list[2].img" v-else></van-image>
      </van-grid-item>
      <!-- 支付倒计时 -->
      <van-grid-item class="countDown">
        支付倒计时
      </van-grid-item>
      <!-- 显示倒计时 -->
      <van-grid-item class="btnTime">
        <van-button class="btnTime1" round type="primary"
          >{{ this.min }}分</van-button
        >
        <van-button class="btnTime2" round type="primary"
          >{{ this.sec }}秒</van-button
        >
      </van-grid-item>
      <!-- 提示用户付款 -->
      <van-grid-item>
        <van-cell>支付金额必须等于提示金额,否则购买失败</van-cell>
        <van-image class="img" :src="list[1].img"></van-image>
        <van-cell>请保存图片后打开支付宝付款</van-cell>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { dataMuchs } from '../../api/index'
export default {
  data() {
    return {
      min: 2,
      sec: 59,
      i: 2,
      active: true,
      list: [
        { img: require('./image/alipay.jpg') },
        { img: require('./image/alipay (2).jpg') },
        { img: require('./image/overdue.png') }
      ],
      data1: 0,
      data2: 0,
      user: { username: '' },
      timeOut1: ''
    }
  },

  created() {
    this.countDown()
    this.goBack()
  },
  mounted() {},
  beforeDestroy() {
    window.clearInterval(this.timeOut1)
  },
  methods: {
    // 支付倒计时
    countDown() {
      const timeOut = setTimeout(() => {
        if (this.sec !== 0) {
          this.sec--
        } else if (this.sec === 0 && this.i >= 1) {
          this.i--
          this.sec = 60
          this.min--
        } else {
          this.sec = 0
          this.active = false
          clearTimeout(timeOut)
        }
        this.countDown()
      }, 1000)
    },
    // 支付成功返回上一个界面
    goBack() {
      this.timeOut1 = setInterval(() => {
        this.data1 = this.$store.state.dataNumber1
        this.data2 = this.$store.state.dataNumber2
        if (this.data1 === this.data2) {
          this.checkedData()
        } else {
          this.$toast('支付成功')
          this.$router.go(-1)
          window.clearInterval(this.timeOut1)
        }
      }, 3000)
    },
    // 检查数据
    async checkedData() {
      this.user.username = this.$store.state.username
      const { data: res } = await dataMuchs(this.user)
      console.log(res, 222)
      this.$store.commit('checkData2', res.data)
    }
  }
}
</script>

<style scoped lang="less">
.van-grid-item {
  border: none !important;
}
.img {
  width: 30px;
  height: 25px;
}
.van-cell__value {
  text-align: center;
}
.btnTime {
  height: 50px;
  .btnTime1 {
    position: absolute;
    left: 35%;
  }
  .btnTime2 {
    position: absolute;
    left: 50%;
  }
}
.countDown {
  font-size: 18px;
  font-weight: 700;
  color: rgb(238, 0, 0);
}
.payforImg {
  margin-top: 10px;
  width: 50%;
}
.fw {
  font-weight: 700;
  color: red;
}
</style>
