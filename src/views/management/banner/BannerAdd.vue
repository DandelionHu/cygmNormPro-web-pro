<template>
  <div>
    <editForms
      ref="editForms"
      :editData="editData"
      :items="items"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      @on_submit="onSubmit"
      @on_cancel="onCancel"/>
  </div>
</template>

<script>
  import { baseFieldSaveField } from '@/api/cygmNormPro'
  import editForms from '@/components/EditForm/index'

  export default {
    props: {
      editForm: {
        type: Object,
        default: () => {
          return {}
        }
      },
      cancelKey: {
        type: String,
        default: ''
      }
    },

    components: {
      editForms
    },
    watch: {
      editForm: {
        handler() {
          this.editData = { ...this.editForm }
        },
        deep: true
      }
    },
    data() {
      return {
        labelCol: { lg: { span: 2 }, sm: { span: 3 } },
        wrapperCol: { lg: { span: 16 }, sm: { span: 16 } },
        editData: { ...this.editForm },
        items: [
          {
            title: '广告图：',
            num: 1, // 上传张数
            name: 'content',
            type: 'images',
            desc: '为了保证轮播图最佳展示效果，图片像素为：1200 X 400', // 其他提示
            descStyle: {
              color: 'red'
            },
            labelCol: { lg: { span: 2 }, sm: { span: 3 } },
            wrapperCol: { lg: { span: 16 }, sm: { span: 16 } },
            required: true, // true false 是否为必须填写？
            validate: [ // required为true时 必填
              { required: true, message: '请点击上传广告图片', trigger: 'blur' },
              { required: true, message: '请点击上传广告图片', trigger: 'change' }
            ]
          },
          {
            title: '图片链接：',
            placeholder: '请填写图片链接', // 提示
            name: 'others',
            type: 'string'
          }
        ]

      }
    },
    // 方法
    methods: {
      onSubmit(item) {
        this.edit(item)
      },
      async edit(item) {
        const obj = { ...item }
        obj.title = '广告图'
        obj.content = item.content.join(',')
        obj.groups = 'groups_banner'
        const { returnValue: res } = await baseFieldSaveField(obj)
        if (res) {
          this.$message.info(item.id ? '编辑成功' : '保存成功')
          setTimeout(() => {
            this.onCancel()
          }, 1000)
        }
      },
      // 点击取消按钮
      onCancel() {
        this.$emit('onCancel')
      }
    },
    // 计算属性
    computed: {},
    mounted() {

    }
  }
</script>

<style scoped lang="less">
</style>
