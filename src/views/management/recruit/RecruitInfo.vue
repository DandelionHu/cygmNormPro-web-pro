<template>
  <div>
    <a-descriptions bordered :column="2" size="middle">
      <template slot="title">
        新闻详情
        <a-button class="f-r" type="primary" ghost @click="onGoback">返回</a-button>
      </template>
      <a-descriptions-item label="标题">{{ info.title }}</a-descriptions-item>
      <a-descriptions-item label="联系人">{{ info.contact }}</a-descriptions-item>
      <a-descriptions-item label="联系电话">{{ info.tel }}</a-descriptions-item>
      <a-descriptions-item label="联系地址">{{ info.address }}</a-descriptions-item>
      <a-descriptions-item label="招聘类型">{{ info.fieldName }}</a-descriptions-item>
      <a-descriptions-item label="企业">{{ info.enterpriseName }}</a-descriptions-item>
      <a-descriptions-item label="状态">{{ info.state | state }}</a-descriptions-item>
      <a-descriptions-item label="有效期">{{ info.effective }}</a-descriptions-item>
      <a-descriptions-item label="内容">
        <u-editor :value="info.content" :contenteditable="false" prefixCls="ant-editor-info"></u-editor>
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
  import { baseRecruitFindById } from '@/api/cygmNormPro'
  import { UEditor } from '@/components'
  export default {
    name: 'RecruitInfo',
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
        const { returnValue: res } = await baseRecruitFindById({ id })
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
