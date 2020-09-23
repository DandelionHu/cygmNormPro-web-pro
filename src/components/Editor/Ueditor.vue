<template>
  <div :class="prefixCls">
    <vue-ueditor-wrap v-model="content" :config="editorConfig" @ready="ueditorReady" :destroy="true"></vue-ueditor-wrap>
  </div>
</template>

<script>
  import VueUeditorWrap from 'vue-ueditor-wrap'

  export default {
    name: 'UEditor',
    props: {
      prefixCls: {
        type: String,
        default: 'ant-editor-wang'
      },
      value: {
        type: String,
        default: ''
      },
      contenteditable: {
        type: Boolean,
        default: true
      }
    },
    components: {
      VueUeditorWrap
    },
    data () {
      return {
        editorConfig: {
          autoHeightEnabled: false, // 编译器不自动被内容撑高
          initialFrameHeight: 350, // 初始容器高度
          initialFrameWith: '100%',
          serverUrl: '', // 上传文件地址
          imagePathFormat: '/editor/{filename}', // 上传图片路径
          imageFieldName: 'file', // 上传文件名
          imageMaxSize: 2048000, // 图片大小
          imageActionName: 'uploadimage', // 执行上传图片的action名称
          imageAllowFiles: ['.png', '.jpg', '.jpeg', '.gif', '.bmp'], // 上传图片格式显示
          UEDITOR_HOME_URL: '/UEditor/' // UEditor资源文件的存放路径
        },
        content: ''
      }
    },
    computed: {
    },
    mounted () {
      this.content = this.value
    },
    watch: {
      value (val) {
        this.content = val
      },
      content (val) {
        this.$emit('change', val)
      }
    },
    methods: {
      ueditorReady(editorInstance) {
        // 这里可以拿到ueditor的实例，比如editorInstance.getContent()就可以拿到编辑器的html内容
        // editorInstance.execCommand('serverparam', editor => {
        //   // 携带其他参数
        //   return {
        //     token: storage.get(ACCESS_TOKEN)
        //   }
        // })
        if (!this.contenteditable) {
          editorInstance.setDisabled('fullscreen')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .ant-editor-wang {
    .editor-wrapper {
      text-align: left;
    }
  }
  .ant-editor-info{
    max-width:1000px;
  }
</style>
