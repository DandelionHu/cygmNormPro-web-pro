<template>
  <div v-if="Object.keys(info).length>0">
    <a-descriptions bordered :column="2" size="middle">
      <template slot="title">
        管理员详情
        <a-button class="f-r" type="primary" ghost @click="onGoback">返回</a-button>
      </template>
      <a-descriptions-item label="名称">{{ info.name }}</a-descriptions-item>
      <a-descriptions-item label="账号">{{ info.account }}</a-descriptions-item>
      <a-descriptions-item label="手机号码">{{ info.phone }}</a-descriptions-item>
      <a-descriptions-item label="性别">{{ info.sex }}</a-descriptions-item>
      <a-descriptions-item label="头像"><img :src="info.photo"/></a-descriptions-item>
      <a-descriptions-item label="是否超级管理员">{{ info.isAdmin | isAdmin }}</a-descriptions-item>
      <a-descriptions-item label="创建人">{{ info.creator }}</a-descriptions-item>
      <a-descriptions-item label="创建时间">{{ info.createTime | dayjs }}</a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
  import { baseEnterpriseFindById } from '@/api/cygmNormPro'

  export default {
    name: 'ManagerInfo',
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
      isAdmin(value) {
        const adminObj = {
          1: '是',
          0: '否'
        }
        return adminObj[value] || ''
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
        const { returnValue: res } = await baseEnterpriseFindById({ id })
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
