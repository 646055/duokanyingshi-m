<template>
  <div class="search-container">
    <!-- 顶部搜素栏 -->
    <form action="/">
      <van-search
        v-model="user.condition"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @keydown.native="keydown($event)"
      />
    </form>
    <!-- 搜索结果 -->
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
      finished-text="没有更多了"
    >
      <van-cell
        v-for="item in list"
        :key="item"
        :title="item"
        @click="searchMovie(item)"
      />
    </van-list>
  </div>
</template>
<script>
import { getResultList } from '../../api/index'
export default {
  name: 'SearchIndex',
  data() {
    return {
      user: {
        condition: ''
      },
      isResultShow: false,
      ResultInfo: {
        comicList: {},
        movieList: {},
        rotationList: {},
        televisionList: {},
        varietyList: {}
      },
      list: ['让子弹飞', '邪不压正', '一步之遥'],
      loading: false,
      finished: false
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    // 搜索返回数据
    async onSearch(user) {
      const userMessage = this.user
      try {
        const { data } = await getResultList(userMessage)
        this.isResultShow = true
        this.ResultInfo = data.data
        console.log(this.ResultInfo)
        this.list = []
        if (this.ResultInfo.comicList.length !== 0) {
          for (var i = 0; i <= this.ResultInfo.comicList.length; i++) {
            this.list.push(this.ResultInfo.comicList[i].name)
          }
        } else if (this.ResultInfo.movieList.length !== 0) {
          for (var j = 0; j <= this.ResultInfo.movieList.length; j++) {
            this.list.push(this.ResultInfo.movieList[j].name)
          }
        } else if (this.ResultInfo.rotationList.length !== 0) {
          for (var k = 0; k <= this.ResultInfo.rotationList.length; k++) {
            this.list.push(this.ResultInfo.rotationList[k].name)
          }
        } else if (this.ResultInfo.televisionList.length !== 0) {
          for (var l = 0; l <= this.ResultInfo.televisionList.length; l++) {
            this.list.push(this.ResultInfo.televisionList[l].name)
          }
        } else if (this.ResultInfo.varietyList.length !== 0) {
          for (var m = 0; m <= this.ResultInfo.varietyList.length; m++) {
            this.list.push(this.ResultInfo.varietyList[m].name)
          }
        }
      } catch (err) {}
    },
    // 点击取消，返回上一个页面
    onCancel() {
      this.$router.back()
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= 0) {
          this.finished = true
        }
      }, 1000)
    },
    // 点击展示出来的信息跳转到播放界面
    searchMovie(item) {
      this.$store.state.name = item
      this.$router.push('/video')
    },
    // 搜索输入框内禁止空格输入
    keydown(event) {
      if (event.keyCode === 32) {
        event.returnValue = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
