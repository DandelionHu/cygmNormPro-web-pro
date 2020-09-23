<template>
  <div v-if="Object.keys(info).length>0">
    <a-descriptions bordered :column="2" size="middle">
      <template slot="title">
        角色详情
        <a-button class="f-r" type="primary" ghost @click="onGoback">返回</a-button>
      </template>
      <a-descriptions-item label="角色名称">{{ info.name }}</a-descriptions-item>
      <a-descriptions-item label="描述">{{ info.content }}</a-descriptions-item>
      <a-descriptions-item label="类型">{{ info.type | isType }}</a-descriptions-item>
      <a-descriptions-item label="创建人">{{ info.creator }}</a-descriptions-item>
      <a-descriptions-item label="创建时间">{{ info.createTime | dayjs }}</a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
  import { baseRoleFindById } from '@/api/cygmNormPro'

  export default {
    name: 'RoleInfo',
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
      isType(value) {
        const typeObj = {
          1: '管理员角色',
          2: '企业角色'
        }
        return typeObj[value] || ''
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
        const { returnValue: res } = await baseRoleFindById({ id })
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
