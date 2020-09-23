<template>
  <div v-if="Object.keys(info).length>0">
    <a-descriptions bordered :column="2" size="middle">
      <template slot="title">
        简历详情
        <a-button class="f-r" type="primary" ghost @click="onGoback">返回</a-button>
      </template>
      <a-descriptions-item label="简历标题">{{ info.title }}</a-descriptions-item>
      <a-descriptions-item label="姓名">{{ info.name }}</a-descriptions-item>
      <a-descriptions-item label="手机号码">{{ info.phone }}</a-descriptions-item>
      <a-descriptions-item label="出生">{{ info.years + info.months }}</a-descriptions-item>
      <a-descriptions-item label="性别">{{ info.sex }}</a-descriptions-item>
      <a-descriptions-item label="户籍">{{ info.province + info.city }}</a-descriptions-item>
      <a-descriptions-item label="政治面貌">{{ info.features }}</a-descriptions-item>
      <a-descriptions-item label="学历">{{ info.schooling }}</a-descriptions-item>
      <a-descriptions-item label="毕业院校">{{ info.school }}</a-descriptions-item>
      <a-descriptions-item label="专业">{{ info.major }}</a-descriptions-item>
      <a-descriptions-item label="求职意向">{{ info.intention }}</a-descriptions-item>
      <a-descriptions-item label="工作年限">{{ info.workLength }}</a-descriptions-item>
      <a-descriptions-item label="上家工作公司">{{ info.lastCompany }}</a-descriptions-item>
      <a-descriptions-item label="创建时间">{{ info.createTime | dayjs }}</a-descriptions-item>
      <a-descriptions-item label="个人简介">{{ info.introduce }}</a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
  import { baseUserResumeFindById } from '@/api/cygmNormPro'

  export default {
    name: 'ResumeInfo',
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
        const { returnValue: res } = await baseUserResumeFindById({ id })
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
