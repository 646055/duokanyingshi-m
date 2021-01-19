<template>
  <div class="swipe-container">
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item
        @click="goLook(item.name, item.type, item.vip)"
        v-for="item in indexInfo.rotationList"
        :key="item.id"
      >
        <img :src="item.image" />
      </van-swipe-item>
    </van-swipe>

    <!-- 选择类型 -->
    <van-grid>
      <van-grid-item icon="video" text="电影" @click="intoFilm" />
      <van-grid-item icon="play-circle" text="电视剧" @click="intoTv" />
      <van-grid-item icon="live" text="动漫" @click="intoCartoon" />
      <van-grid-item icon="fire" text="综艺" @click="intoZongyi" />
    </van-grid>
    <!-- 警告消息 -->
    <van-notice-bar
      wrapable
      left-icon="volume-o"
      :scrollable="false"
      mode="closeable"
    >
      {{ indexInfo.message.message }}
    </van-notice-bar>
    <!-- 精选电影 -->
    <van-nav-bar title="电影热映" @click-right="intoFilm">
      <template #left>
        <van-icon name="video" size="25" />
      </template>
      <template #right>
        <van-icon name="arrow" size="18" />
      </template>
    </van-nav-bar>
    <van-grid :border="false" :column-num="2">
      <van-grid-item
        @click="goVideo(item.name, item.vip)"
        v-for="item in indexInfo.movieList"
        :key="item.id"
      >
        <van-image :src="item.image" />
        <span>{{ item.nickName }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 热播电视 -->
    <van-nav-bar title="热播电视" @click-right="intoTv">
      <template #left>
        <van-icon name="play-circle" size="25" />
      </template>
      <template #right>
        <van-icon name="arrow" size="18" />
      </template>
    </van-nav-bar>
    <van-grid :border="false" :column-num="2">
      <van-grid-item
        @click="goTvVideo(item.name, item.vip)"
        v-for="item in indexInfo.televisionList"
        :key="item.id"
      >
        <van-image :src="item.image" />
        <span>{{ item.nickName }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 动漫 -->
    <van-nav-bar title="动漫" @click-right="intoCartoon">
      <template #left>
        <van-icon name="live" size="25" />
      </template>
      <template #right>
        <van-icon name="arrow" size="18" />
      </template>
    </van-nav-bar>
    <van-grid :border="false" :column-num="2">
      <van-grid-item
        @click="goCatoonVideo(item.name, item.vip)"
        v-for="item in indexInfo.comicList"
        :key="item.id"
      >
        <van-image :src="item.image" />
        <span>{{ item.nickName }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 综艺 -->
    <van-nav-bar title="综艺" @click-right="intoZongyi">
      <template #left>
        <van-icon name="fire" size="25" />
      </template>
      <template #right>
        <van-icon name="arrow" size="18" />
      </template>
    </van-nav-bar>
    <van-grid :border="false" :column-num="2">
      <van-grid-item
        @click="goZongyiVideo(item.name, item.vip)"
        v-for="item in indexInfo.varietyList"
        :key="item.id"
      >
        <van-image :src="item.image" />
        <span>{{ item.nickName }}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getIndexMessage } from '../../../api/index'
import router from '@/router'
import Vue from 'vue'
import { Lazyload, IndexBar, IndexAnchor } from 'vant'
Vue.use(IndexBar)
Vue.use(IndexAnchor)
Vue.use(Lazyload)
export default {
  name: 'SwipeContainer',
  data() {
    return {
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ],
      indexInfo: { message: {} },
      imgList: [],
      invitedId: ''
    }
  },
  created() {
    this.indexMessage()
  },
  mounted() {},
  methods: {
    // 主页信息获取
    async indexMessage() {
      // this.invitedId = window.location.hash.split('=')[1]
      // this.$store.commit('setInviteId', this.invitedId)
      try {
        const { data } = await getIndexMessage()
        this.indexInfo = data.data
        console.log(this.indexInfo)
      } catch (err) {
        this.$toast('获取数据失败')
      }
    },
    // 点击跳转到电影界面
    intoFilm() {
      this.$store.commit('intoOthers', 2)
    },
    // 点击跳转到电视剧
    intoTv() {
      this.$store.commit('intoOthers', 1)
    },
    // 点击跳转到综艺
    intoZongyi() {
      this.$store.commit('intoOthers', 4)
    },
    // 点击跳转到动漫
    intoCartoon() {
      this.$store.commit('intoOthers', 3)
    },
    // 点击轮播图的图片，跳转到播放界面
    goLook(filmName, type, vip) {
      this.$store.state.name = filmName
      if (vip) {
        this.$store.commit('changeShow', true)
      } else {
        this.$store.commit('changeShow', false)
      }
      if (type === '电影') {
        router.push('/video')
      } else if (type === '电视剧') {
        router.push('/videoTv')
      } else if (type === '动漫') {
        router.push('/videoCartoon')
      } else if (type === '综艺') {
        router.push('/videoVariety')
      }
    },
    // 点击图中的图片直接跳转到对应的播放页面
    goVideo(filmName, vip) {
      if (vip) {
        this.$store.commit('changeShow', true)
      } else {
        this.$store.commit('changeShow', false)
      }
      // 点击进行传值   存到全局变量里面 打开播放界面的时候播放界面调用当前要播放的地址
      // this.$store.commit('storeUrl', 3)
      this.$store.state.name = filmName
      router.push('/video')
    },
    goTvVideo(filmName, vip) {
      if (vip) {
        this.$store.commit('changeShow', true)
      } else {
        this.$store.commit('changeShow', false)
      }
      // 点击进行传值   存到全局变量里面 打开播放界面的时候播放界面调用当前要播放的地址
      // this.$store.commit('storeUrl', 3)
      this.$store.state.name = filmName
      router.push('/videoTv')
    },
    goCatoonVideo(filmName, vip) {
      if (vip) {
        this.$store.commit('changeShow', true)
      } else {
        this.$store.commit('changeShow', false)
      }
      // 点击进行传值   存到全局变量里面 打开播放界面的时候播放界面调用当前要播放的地址
      // this.$store.commit('storeUrl', 3)
      this.$store.state.name = filmName
      router.push('/videoCartoon')
    },
    goZongyiVideo(filmName, vip) {
      if (vip) {
        this.$store.commit('changeShow', true)
      } else {
        this.$store.commit('changeShow', false)
      }
      // 点击进行传值   存到全局变量里面 打开播放界面的时候播放界面调用当前要播放的地址
      // this.$store.commit('storeUrl', 3) this.$store.commit('changeShow', 3)
      this.$store.state.name = filmName
      router.push('/videoVariety')
    }
  }
}
</script>

<style scoped lang="less">
/deep/img {
  width: 100%;
  height: 200px;
}

/deep/.van-grid {
  font-size: 18px;
}
/deep/.van-tabs__wrap {
  padding-top: 0px !important;
}

/deep/.van-cell {
  .van-cell__value {
    a {
      color: #323233;
    }
    span {
      float: right;
    }
  }
}
</style>
