<template>
  <div class="film-container">
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
import { getMovie } from '../../../api/index'
import router from '@/router'
export default {
  name: 'filmContainer',
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  mounted() {},
  methods: {
    // 电影页面渲染
    async onLoad() {
      try {
        const { data } = await getMovie()
        // console.log(data.data)
        this.list.push(...data.data)
        console.log(this.list)
      } catch (err) {
        // console.log(err)
        this.$toast('获取数据失败')
      }
      this.loading = false
    },
    // 点击跳转到视频播放页面
    goVideo(vip, filmName) {
      if (vip) {
        this.$store.commit('changeShow', true)
      } else {
        this.$store.commit('changeShow', false)
      }
      this.$store.state.name = filmName
      router.push('/video')
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
