<template>
  <div v-if="Object.keys(info).length>0">
    <a-descriptions bordered :column="2" size="middle">
      <template slot="title">
        用户详情
        <a-button class="f-r" type="primary" ghost @click="onGoback">返回</a-button>
      </template>
      <a-descriptions-item label="名称">{{ info.name }}</a-descriptions-item>
      <a-descriptions-item label="手机号码">{{ info.phone }}</a-descriptions-item>
      <a-descriptions-item label="邮箱账号">{{ info.email }}</a-descriptions-item>
      <a-descriptions-item label="性别">{{ info.sex }}</a-descriptions-item>
      <a-descriptions-item label="头像"><img :src="info.photo"/></a-descriptions-item>
      <a-descriptions-item label="身份证号码">{{ info.idCard }}</a-descriptions-item>
      <a-descriptions-item label="身份证图片">
        <div v-for="(item,index) in info.idCardImgArr" :key="index">
          <img :src="item"/>
        </div>
      </a-descriptions-item>
      <a-descriptions-item label="状态">{{ info.state | state }}</a-descriptions-item>
      <a-descriptions-item label="创建时间">{{ info.createTime | dayjs }}</a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
  import { baseUserFinById } from '@/api/cygmNormPro'

  export default {
    name: 'UserInfo',
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
          0: '正常',
          1: '冻结'
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
        const { returnValue: res } = await baseUserFinById({ id })
        if (res) {
          res.idCardImgArr = res.idCardImg.split(',')
          this.info = res
        }
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
