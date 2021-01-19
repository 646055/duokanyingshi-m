<template>
  <div class="vip-container">
    <!-- 标题栏 -->
    <van-nav-bar title="会员充值" />
    <!-- 提示语 -->
    <van-notice-bar
      left-icon="volume-o"
      text="钱真的不是花了，而是换一种形式陪伴在你身边！！！"
    />
    <van-grid :column-num="1">
      <van-grid-item
        v-if="this.$store.state.isVip == false"
        class="mine-container"
        width="100%"
        height="200px"
      >
        <div class="Vip-container">
          <div class="photos">
            <van-image
              width="100"
              height="100"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </div>
          <div class="become-vip">您当前未开通vip😭</div>
        </div>
      </van-grid-item>
      <van-grid-item v-else class="mine-container" width="100%" height="200px">
        <div class="Vip-container">
          <div class="photo">
            <van-image
              width="100"
              height="100"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </div>
          <div class="become-vip">
            {{ this.$store.state.username }}您当前已经开通vip
          </div>
          <div class="become-vip">{{ this.newData.eTime }}会员到期时间</div>
        </div>
      </van-grid-item>
    </van-grid>
    <!-- 提示语句 -->
    <van-cell class="fw">套餐选择-全站随便看，重复购买时间会叠加！</van-cell>

    <!-- 会员选择 -->
    <van-tabs type="card" :border="false">
      <!-- 1天 -->
      <van-tab>
        <template #title>
          <van-icon name="vip-card" />
          <div class="changeM" v-if="Price !== {}">
            1天/￥{{ Price.state1 }}
          </div>
        </template>
        <van-grid :column-num="1" :border="false">
          <van-grid-item>
            <van-button
              class="btn"
              @click="goPayfor(1)"
              round
              block
              type="danger"
              native-type="submit"
            >
              立即购买
            </van-button>
          </van-grid-item>
        </van-grid>
      </van-tab>
      <!-- 3天 -->
      <van-tab>
        <template #title>
          <van-icon name="vip-card" />
          <div class="changeM" v-if="Price !== {}">
            3天/￥{{ Price.state3 }}
          </div>
        </template>
        <van-grid :column-num="1" :border="false">
          <van-grid-item>
            <van-button
              class="btn"
              @click="goPayfor(3)"
              round
              block
              type="danger"
              native-type="submit"
            >
              立即购买
            </van-button>
          </van-grid-item>
        </van-grid>
      </van-tab>
      <!-- 5天 -->
      <van-tab>
        <template #title>
          <van-icon name="vip-card" />
          <div class="changeM" v-if="Price !== {}">
            5天/￥{{ Price.state5 }}
          </div>
        </template>
        <van-grid :column-num="1" :border="false">
          <van-grid-item>
            <van-button
              class="btn"
              round
              block
              type="danger"
              @click="goPayfor(5)"
              native-type="submit"
            >
              立即购买
            </van-button>
          </van-grid-item>
        </van-grid>
      </van-tab>
      <!-- 30天 -->
      <van-tab>
        <template #title>
          <van-icon name="vip-card" />
          <div class="changeM" v-if="Price !== {}">
            30天/￥ {{ Price.state30 }}
          </div>
        </template>
        <van-grid :column-num="1" :border="false">
          <van-grid-item>
            <van-button
              class="btn"
              round
              block
              type="danger"
              @click="goPayfor(30)"
              native-type="submit"
            >
              立即购买
            </van-button>
          </van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>
    <!-- 提示语句 -->
    <van-cell class="fw">会员特权</van-cell>
    <!-- 会员特权 -->
    <van-grid :column-num="2">
      <van-grid-item>
        <van-icon name="video" color="#ee0a24" />
        <van-cell class="van-cell-more">更多热剧</van-cell>
      </van-grid-item>
      <van-grid-item>
        <van-icon name="play-circle" color="#ee0a24" />
        <van-cell class="van-cell-more">最新大片</van-cell>
      </van-grid-item>
      <van-grid-item>
        <van-icon name="live" color="#ee0a24" />
        <van-cell class="van-cell-more">好评动漫</van-cell>
      </van-grid-item>
      <van-grid-item>
        <van-icon name="fire" color="#ee0a24" />
        <van-cell class="van-cell-more">海外综艺</van-cell>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import router from '@/router'
import { getVipList, getVipPrice, getLogin, dataMuch } from '../../api/index'

export default {
  name: 'vipContainer',
  data() {
    return {
      active: 0,
      getPayList: {
        state: 0,
        userName: '',
        name: ''
      },
      Price: {},
      videoName: {
        videoName: ''
      },
      user: {
        username: ''
      },
      users: {
        username: '',
        password: ''
      },
      userss: {
        username: ''
      },
      newData: {
        eTime: '',
        isVip: ''
      }
    }
  },
  created() {
    this.buyVip()
    this.newVip()
  },
  mounted() {},
  methods: {
    // 会员价格展示
    async buyVip() {
      this.videoName.videoName = this.$store.state.name
      const { data: res } = await getVipPrice(this.videoName)
      this.Price = res.data
    },
    // 购买
    async goPayfor(num) {
      const nums = num + ''
      this.getPayList.state = nums
      this.getPayList.name = '无'
      this.getPayList.userName = this.$store.state.username
      console.log(this.getPayList)
      const { data: res } = await getVipList(this.getPayList)
      console.log(res)
      if (res.flag) {
        this.userss.username = this.$store.state.username
        const { data: res } = await dataMuch(this.userss)
        this.$store.commit('checkData1', res.data)
        console.log(res, 111)
      }
      this.$store.state.money = res.data.money
      this.$store.state.url = res.data.url
      router.push('payfor')
    },
    // 刷新会员界面信息
    async newVip() {
      this.users.username = this.$store.state.username
      this.users.password = this.$store.state.password
      const { data: res } = await getLogin(this.users)
      console.log(res)
      this.newData.eTime = res.data.etime
      this.newData.isVip = res.data.auth
      this.$store.commit('newVip', this.newData)
    }
  }
}
</script>

<style scoped lang="less">
/deep/.fw {
  font-weight: 700;
}
/deep/.van-tabs__wrap {
  height: 77px;
  .van-tab__text {
    width: 100%;
    height: 100%;
    font-size: 10px;

    .changeM {
      text-align: center;
      margin: 0 !important;
    }
    .van-icon {
      margin-left: 1 !important;
    }
  }
  .van-tabs__nav--card {
    height: 77px;
    border: 0;
    margin: 0;
    .van-tab {
      border: 0;
    }
    .van-icon-vip-card {
      font-size: 29px;
      margin: 5px 0 0 30px;
    }
    .vc {
      color: #070001;
    }
  }
}
/deep/.mine-container > .van-grid-item__content {
  width: 100%;
  height: 200px;
  background-color: #ee0a24;
}
/deep/.btn {
  width: 80%;
  margin: 0px 0px 0px 20px;
}
/deep/.Vip-container {
  .photo {
    width: 100px;
    height: 100px;
    background-color: red;
    border-radius: 50%;
    overflow: hidden;
    margin-left: 70px;
    // text-align: center;
  }
  .photos {
    width: 100px;
    height: 100px;
    background-color: red;
    border-radius: 50%;
    overflow: hidden;
    margin-left: 18px;
    // text-align: center;
  }
  .become-vip {
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
    color: #fff;
    font-weight: 600;
  }
}
/deep/.van-cell-more {
  padding-left: 10px 0;
  .van-cell__value {
    text-align: center;
  }
}
</style>
