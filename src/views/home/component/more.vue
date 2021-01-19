<template>
  <div class="more-container">
    <!-- 反馈标语 -->
    <van-notice-bar
      left-icon="volume-o"
      :scrollable="true"
      size="large"
      autosize
      text="您的反馈，是我们前进的动力。"
    />
    <!-- 反馈文本框 -->
    <van-field
      class="gaodu"
      v-model="message"
      rows="5"
      autosize
      label="反馈"
      type="textarea"
      maxlength="1000"
      placeholder="请输入反馈内容"
      show-word-limit
    />
    <!-- 提交 -->
    <div style="margin: 16px;">
      <van-button
        @click="submitText"
        round
        block
        type="info"
        native-type="submit"
      >
        提交反馈
      </van-button>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  name: 'moreContainer',
  data() {
    return { message: '' }
  },
  created() {},
  mounted() {},
  methods: {
    // 提交反馈，返回提示信息
    submitText() {
      Dialog.alert({
        message: '反馈已提交,感谢您的反馈'
      }).then(() => {
        // on close
      })
    }
  }
}
</script>

<style scoped lang="less">
// /deep/.gaodu {
//   height: 500px;
// }
</style>
