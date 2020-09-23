<template>
  <div>
    <a-descriptions bordered :column="2" size="middle">
      <template slot="title">
        新闻详情
        <a-button class="f-r" type="primary" ghost @click="onGoback">返回</a-button>
      </template>
      <a-descriptions-item label="标题">{{ info.title }}</a-descriptions-item>
      <a-descriptions-item label="封面图片"><img :src="info.picture"/></a-descriptions-item>
      <a-descriptions-item label="来源于">{{ info.source }}</a-descriptions-item>
      <a-descriptions-item label="作者">{{ info.author }}</a-descriptions-item>
      <a-descriptions-item label="栏目">{{ info.fieldName }}</a-descriptions-item>
      <a-descriptions-item label="公司">{{ info.enterpriseName }}</a-descriptions-item>
      <a-descriptions-item label="点击次数">{{ info.clickNum }}</a-descriptions-item>
      <a-descriptions-item label="状态">{{ info.state | state }}</a-descriptions-item>
      <a-descriptions-item label="是否推荐">{{ info.isRecommend | isRecommend }}</a-descriptions-item>
      <a-descriptions-item label="发布时间">{{ info.releaseTime | dayjs }}</a-descriptions-item>
      <a-descriptions-item label="内容">
        <u-editor :value="info.content" :contenteditable="false" prefixCls="ant-editor-info"></u-editor>
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
  import { baseNewsFindById } from '@/api/cygmNormPro'
  import { UEditor } from '@/components'
  export default {
    name: 'NewsInfo',
    components: {
      UEditor
    },
    props: {
      editID: {
        type: [Number, String],
        default: ''
      }
    },
    data() {
      return {
        info: {}
      }
    },
    filters: {
      state(value) {
        const stateObj = {
          1: '正常',
          2: '待审',
          3: '禁用',
          4: '不通过'
        }
        return stateObj[value] || ''
      },
      isRecommend(value) {
        const isRecommendObj = {
          1: '是',
          0: '否'
        }
        return isRecommendObj[value] || ''
      }
    },
    mounted() {
      // demo渲染完成
      this.$nextTick(() => {
        // demo更新后的回调
        if (this.editID) {
          // 编辑
          this.loadInfo(this.editID)
        }
      })
    },
    methods: {
      // 获取详情
      async loadInfo(id) {
        const { returnValue: res } = await baseNewsFindById({ id })
        this.info = res
      },
      // 返回
      onGoback() {
        this.$emit('editClose')
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
