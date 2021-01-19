<template>
  <div class="TV-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="film in list" :key="film.id">
        <van-grid :column-num="1">
          <van-grid-item @click="goVideo(film.vip, film.name)">
            <van-image :src="film.image" />
            <span>{{ film.name }}</span>
            <span>{{ '￥' + film.price }}</span>
          </van-grid-item>
        </van-grid>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getRotationList } from '../../../api/index'
import router from '@/router'
export default {
  name: 'TVContainer',
  data() {
    return {
      TVInfo: {},
      list: [],
      loading: false,
      finished: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 电影页面渲染
    async onLoad() {
      try {
        const { data } = await getRotationList()
        this.TVInfo = data.data
        this.list.push(...data.data)
        console.log(this.list)
      } catch (err) {
        this.$toast('获取数据失败')
      }
      this.loading = false
    },
    // 点击跳转到视频播放页面
    goVideo(vip, TVName) {
      if (!vip) {
        this.$store.commit('changeShow', false)
      } else {
        this.$store.commit('changeShow', true)
      }
      this.$store.state.name = TVName
      router.push('/videoTv')
    }
  }
}
</script>

<style scoped lang="less">
/deep/.van-cell {
  display: inline-block;
  width: 50%;
}
</style>
