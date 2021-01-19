<template>
  <div class="home-container">
    <van-index-bar :index-list="indexList">
      <van-index-anchor index="回到顶部"></van-index-anchor>
      <!-- 导航栏 -->
      <van-nav-bar
        fixed
        class="page-nav-bar"
        left-text="多看影视"
        right-text="个人中心"
        @click-right="onClickRight"
      >
        <van-button
          class="search-btn"
          slot="title"
          type="info"
          size="small"
          round
          icon="search"
          to="/search"
          >全网搜索</van-button
        >
        <template #right>
          <van-icon name="manager" size="18" />
        </template>
      </van-nav-bar>
      <!-- /导航栏 -->
      <!-- 频道列表 -->
      <van-tabs
        class="channel-tabs"
        v-model="currentActiveHome"
        animated
        swipeable
      >
        <van-tab title="首页"><swipe /></van-tab>
        <van-tab title="电视剧"><Tv /></van-tab>
        <van-tab title="电影"><film /></van-tab>
        <van-tab title="动漫"><cartoon /></van-tab>
        <van-tab title="综艺"><zongyi /></van-tab>
        <van-tab title="意见反馈"><more /></van-tab>
      </van-tabs>
    </van-index-bar>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import router from '@/router'
import swipe from './component/swipe'
import Tv from './component/TV'
import film from './component/film'
import cartoon from './component/cartoon'
import Zongyi from './component/zongyi.vue'
import more from './component/more.vue'
export default {
  data() {
    return { indexList: ['回到顶部'], isShowimg: false, indexData: {} }
  },
  created() {
    this.invitedId = window.location.hash.split('=')[1]
    this.$store.commit('setInviteId', this.invitedId)
  },
  components: {
    swipe,
    film,
    Tv,
    cartoon,
    Zongyi,
    more
  },
  methods: {
    // 点击登录
    onClickRight() {
      if (this.$store.state.loginSuccess === '登录成功') {
        router.push('/vip')
      } else {
        router.push('/login')
      }
    }
  },
  computed: {
    ...mapState(['activeHome']),
    currentActiveHome: {
      get() {
        return this.activeHome
      },
      set(v) {
        this.$store.commit('intoOthers', v)
      }
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  /deep/.van-index-anchor {
    height: 46px;
  }
  /deep/.van-index-bar__sidebar {
    padding: 10px 15px 10px 0;
    // border: 2px solid#1989fa;
    background-color: #4a9ff5;
    top: 80%;
    border-top-left-radius: 75%;
    border-bottom-left-radius: 45%;
    .van-index-bar__index {
      font-size: 15px;
      // color: #323233;
      color: #fff;
      font-weight: 500;
    }
  }

  /deep/.van-nav-bar__title {
    max-width: unset;
    margin: 0 0 0 90px;
  }

  .search-btn {
    width: 230px;
    height: 34px;
    background-color: #449af0;
    border: none;
    font-size: 15px;
    .van-icon {
      color: #fff;
      font-size: 20px;
    }
  }
  /deep/ .channel-tabs {
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 100px;
      height: 40px;
      .van-tab__text {
        font-size: 14px;
        color: #777777;
      }
    }

    .van-tab--active .van-tab__text {
      color: #333 !important;
    }
    .van-tabs__line {
      width: 60px !important;
      height: 3px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 8px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 40px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
    }
    .van-tabs__nav {
      padding: 0;
    }
  }
  .scollTop {
    position: fixed;
    bottom: 15rem;
    right: 3rem;
  }
}
</style>
